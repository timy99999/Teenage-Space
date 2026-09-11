"""`ask_<slug>` parsing (P1, "Спросить Барса" deep link) — bars/ask_context.py.

Keeps the greeting builder honest against the slug shapes the frontend actually
sends (frontend/src/lib/barsDeepLink.ts) plus the junk a stale/hand-typed link
can carry.
"""

from __future__ import annotations

import pytest

from bars.ask_context import ask_greeting


class TestAskGreeting:
    def test_root_no_preset(self):
        assert "разделе Возможности на сайте" in ask_greeting("opps")
        assert "фильтр" not in ask_greeting("opps")

    def test_category_only(self):
        text = ask_greeting("opps-hackathon")
        assert "Возможности → Хакатоны" in text
        assert "фильтр" not in text

    def test_root_with_preset(self):
        text = ask_greeting("opps-p-online")
        assert "Возможности (фильтр «Онлайн»)" in text

    def test_category_with_preset(self):
        text = ask_greeting("opps-contest-p-free")
        assert "Возможности → Конкурсы" in text
        assert "фильтр «Бесплатно»" in text

    @pytest.mark.parametrize(
        "slug", ["", "junk", "opps-nosuchcat", "opps-p-nosuchpreset", "opps-hackathon-p-"]
    )
    def test_unrecognised_pieces_degrade_gracefully(self, slug):
        # Never raises, and always still opens with the generic "Возможности" line —
        # a stale/hand-typed link should still start a normal conversation.
        text = ask_greeting(slug)
        assert "Возможности" in text
        assert text.endswith("Что интересует?")
