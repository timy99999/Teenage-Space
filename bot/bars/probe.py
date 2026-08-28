"""Retrieval probe — check the search half without spending a Telegram message.

    python -m bars.probe "волонтёрство осенью, 16 лет"
    python -m bars.probe --reindex

Useful because stages 1-4 of this build (migration, API, indexer, retrieval) can be
verified end to end before the agent itself is wired up.
"""

from __future__ import annotations

import argparse
import asyncio
import sys

from .catalog import catalog
from .config import get_settings
from .db import close_pool, init_pool
from .indexer import reindex
from .retrieval import search


async def _run(query: str, age: int | None, do_reindex: bool) -> None:
    await init_pool()
    try:
        if do_reindex:
            print("Reindexing...", await reindex())

        events = await catalog().snapshot()
        print(f"Catalogue: {len(events)} event(s)")

        if not query:
            return

        results = await search(query, age=age, limit=5)
        if not results:
            print("Nothing matched.")
            return

        print(f"\nTop {len(results)} for {query!r}" + (f" (age {age})" if age else ""))
        for index, event in enumerate(results, start=1):
            when = event.get("eventDate") or event.get("deadlineDate") or "без даты"
            print(
                f"{index}. [{event['id']}] {event['title']}\n"
                f"   {event.get('category')} / {','.join(event.get('themes') or [])} "
                f"| {event.get('ageLabel')} | {event.get('price')} | {when}"
            )
    finally:
        await close_pool()


def main() -> None:
    parser = argparse.ArgumentParser(prog="bars.probe")
    parser.add_argument("query", nargs="?", default="", help="what a user might type")
    parser.add_argument("--age", type=int, default=None)
    parser.add_argument("--reindex", action="store_true", help="rebuild embeddings first")
    args = parser.parse_args()

    get_settings()
    asyncio.run(_run(args.query, args.age, args.reindex))


if __name__ == "__main__":
    sys.exit(main())
