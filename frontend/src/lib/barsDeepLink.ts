// Deep-link builder for "Спросить Барса" (P1, spec (d)). The payload only encodes
// *what the conversation is about* — section + at most one active preset — never
// the full filter set; Bars asks follow-up questions for the rest. Telegram caps a
// `?start=` payload at 64 chars total.
//
// slug shape (bot side mirrors this in bot/bars/ask_context.py — keep both in sync):
//   opps                          -- root catalog, no preset
//   opps-<category>               -- one category, no preset
//   opps-p-<preset>               -- root catalog, exactly one active preset
//   opps-<category>-p-<preset>    -- one category + one active preset
const ASK_PREFIX = 'ask_';
const MAX_PAYLOAD_LEN = 64;

// Public — the bot's own @handle, not a secret. Overridable via VITE_TELEGRAM_BOT_USERNAME
// (same value as the backend's TELEGRAM_BOT_USERNAME) if it ever changes without a redeploy.
const DEFAULT_BOT_USERNAME = 'bars_teenagespace_bot';

function botUsername(): string {
  const fromEnv = import.meta.env.VITE_TELEGRAM_BOT_USERNAME as string | undefined;
  return (fromEnv?.trim().replace(/^@/, '') || DEFAULT_BOT_USERNAME);
}

/** `@bot_username`, for the "no Telegram on this device" hint next to the button. */
export function barsBotHandle(): string {
  return `@${botUsername()}`;
}

const SAFE_SLUG_PART = /^[a-z0-9]+$/i;

/**
 * `category` — current catalog category key (`NAV_CATS`), or null on the root
 * catalog. `presetSlug` — the single active preset's slug when exactly one is
 * active, otherwise null (don't encode ambiguous multi-preset state).
 */
export function barsAskSlug(category: string | null | undefined, presetSlug: string | null | undefined): string {
  let slug = 'opps';
  if (category && SAFE_SLUG_PART.test(category)) slug += `-${category}`;
  if (presetSlug && SAFE_SLUG_PART.test(presetSlug)) slug += `-p-${presetSlug}`;
  // Leave room for the "ask_" prefix under Telegram's 64-char cap; falling back to
  // the bare root slug is always safe (the bot degrades gracefully either way).
  return `${ASK_PREFIX}${slug}`.length <= MAX_PAYLOAD_LEN ? slug : 'opps';
}

export function barsDeepLink(slug: string): string {
  return `https://t.me/${botUsername()}?start=${ASK_PREFIX}${slug}`;
}
