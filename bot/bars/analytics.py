"""Quality-control journal and token accounting for Барс.

Two bot-owned tables (see the scope rule in db.py):

  bot_messages     a readable transcript, kept on a rolling window
                   (settings.transcript_ttl_days). It is what the super-admin reads
                   to check the agent behaves. Deliberately survives /reset and the
                   72h session sweep — it is an audit trail, not memory — and is
                   purged only by sweep_transcripts() and by account/link deletion.

  bot_usage_daily  per-day, per-chat, per-model token totals, upserted each turn.
                   Bounded by active chats rather than total history, so it is never
                   swept and outlives the transcript.

Every write is best-effort: a failure here must never cost the user their answer.
"""

from __future__ import annotations

import logging

from .db import execute, fetch_one

logger = logging.getLogger(__name__)

# A pathological paste should not bloat a row; the transcript is for spot-checks,
# not forensics.
MAX_TEXT = 4000


def _clip(text: str | None) -> str:
    text = text or ""
    return text if len(text) <= MAX_TEXT else text[:MAX_TEXT] + "…"


async def log_turn(
    chat_id: int,
    user_id: str | None,
    user_text: str,
    answer_text: str,
    *,
    status: str,
    tools: list[str],
) -> None:
    """Append one exchange — the user's line and the assistant's — to the journal."""
    try:
        await execute(
            """
            insert into bot_messages (chat_id, user_id, role, text, status, tools)
            values (%s, %s, 'user', %s, 'ok', '{}'),
                   (%s, %s, 'assistant', %s, %s, %s)
            """,
            (
                chat_id,
                user_id,
                _clip(user_text),
                chat_id,
                user_id,
                _clip(answer_text),
                status,
                tools,
            ),
        )
    except Exception:
        logger.warning("Could not journal turn for chat %s", chat_id, exc_info=True)


async def record_usage(chat_id: int, usage_by_model: dict[str, dict]) -> None:
    """Fold this turn's Gemini token counts into the daily rollup.

    `usage_by_model` is langchain-core's get_usage_metadata_callback().usage_metadata:
    {model_name: {"input_tokens", "output_tokens", "output_token_details": {...}}}.
    It already covers every LLM call in the turn — guard, agent and each tool round.
    """
    for model, usage in (usage_by_model or {}).items():
        input_tokens = int(usage.get("input_tokens", 0) or 0)
        output_tokens = int(usage.get("output_tokens", 0) or 0)
        details = usage.get("output_token_details") or {}
        thinking = int(details.get("reasoning", 0) or 0)
        if not (input_tokens or output_tokens):
            continue
        try:
            await execute(
                """
                insert into bot_usage_daily
                    (day, chat_id, model, turns, prompt_tokens, output_tokens, thinking_tokens)
                values ((now() at time zone 'Asia/Bishkek')::date, %s, %s, 1, %s, %s, %s)
                on conflict (day, chat_id, model) do update set
                    turns = bot_usage_daily.turns + 1,
                    prompt_tokens = bot_usage_daily.prompt_tokens + excluded.prompt_tokens,
                    output_tokens = bot_usage_daily.output_tokens + excluded.output_tokens,
                    thinking_tokens = bot_usage_daily.thinking_tokens + excluded.thinking_tokens
                """,
                (chat_id, str(model), input_tokens, output_tokens, thinking),
            )
        except Exception:
            logger.warning("Could not record usage for chat %s", chat_id, exc_info=True)


async def sweep_transcripts(ttl_days: int) -> int:
    """Drop journalled turns past the retention window. Called from sessions.sweep()."""
    row = await fetch_one(
        """
        with gone as (
            delete from bot_messages
            where created_at < now() - make_interval(days => %s)
            returning 1
        )
        select count(*) as n from gone
        """,
        (ttl_days,),
    )
    return int((row or {}).get("n") or 0)
