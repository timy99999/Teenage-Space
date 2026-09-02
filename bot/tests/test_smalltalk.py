"""Canned answers: what gets intercepted, and — more importantly — what must not.

A false positive here answers a real question with a platitude, so the negative cases
carry more weight than the positive ones.
"""

from __future__ import annotations

import pytest

from bars import smalltalk
from bars.catalog import availability, availability_line
from bars.persona import SMALLTALK_PROMPT, SYSTEM_PROMPT, system_prompt


@pytest.fixture(autouse=True)
def reset_rotation():
    smalltalk._cursor.clear()
    yield
    smalltalk._cursor.clear()


class TestNormalise:
    @pytest.mark.parametrize(
        ("raw", "expected"),
        [
            ("СПАСИБО!!!", "спасибо"),
            ("Привет 🙏", "привет"),
            ("  как   дела?  ", "как дела"),
            ("Спасибо,", "спасибо"),
            ("чё как", "че как"),  # ё is folded to е so the table needs only one spelling
        ],
    )
    def test_folds_to_a_stable_key(self, raw, expected):
        assert smalltalk.normalise(raw) == expected

    def test_cyrillic_survives(self):
        assert smalltalk.normalise("Здравствуйте") == "здравствуйте"


class TestCannedReply:
    @pytest.mark.parametrize(
        "text",
        ["привет", "Привет!", "СПАСИБО", "спасибо за работу", "как дела?", "ок", "пока", "спс"],
    )
    def test_pleasantries_are_intercepted(self, text):
        assert smalltalk.canned_reply(text) is not None

    @pytest.mark.parametrize(
        "text",
        [
            # Each of these carries a real request; answering with a platitude is the
            # failure this whole module has to avoid.
            "Привет, есть хакатоны?",
            "спасибо, а есть ещё варианты?",
            "как дела с регистрацией на олимпиаду",
            "Найди волонтерства",
            "Я хочу быть волонтером",
            "ок давай план",
            "как зарегистрироваться",
            "что есть для 16 лет",
        ],
    )
    def test_real_questions_fall_through(self, text):
        assert smalltalk.canned_reply(text) is None

    def test_empty_input_falls_through(self):
        assert smalltalk.canned_reply("") is None
        assert smalltalk.canned_reply("   ") is None

    def test_a_long_message_never_matches(self):
        # Guards against a phrase table entry ever being read as a prefix.
        assert smalltalk.canned_reply("спасибо большое тебе за всё что ты делаешь") is None

    def test_replies_rotate_rather_than_repeat(self):
        seen = [smalltalk.canned_reply("спасибо") for _ in range(3)]
        assert len(set(seen)) == 3

    def test_rotation_wraps_around(self):
        first = smalltalk.canned_reply("спасибо")
        count = len(smalltalk.REPLIES[smalltalk.THANKS])
        for _ in range(count - 1):
            smalltalk.canned_reply("спасибо")
        assert smalltalk.canned_reply("спасибо") == first

    def test_every_phrase_resolves_to_a_reply(self):
        # A typo in the PHRASES table would otherwise surface as a KeyError in prod.
        for phrase in smalltalk.PHRASES:
            assert smalltalk.canned_reply(phrase)

    def test_phrase_keys_are_already_normalised(self):
        # A key containing "ё" or capitals could never be matched at runtime.
        for phrase in smalltalk.PHRASES:
            assert smalltalk.normalise(phrase) == phrase

    def test_no_phrase_exceeds_the_word_cap(self):
        for phrase in smalltalk.PHRASES:
            assert len(phrase.split(" ")) <= smalltalk.MAX_WORDS


class TestAvailability:
    def test_counts_open_events_per_category(self, events, today):
        counts = availability(events, today)

        assert counts["volunteering"] == 2  # new-generation + rolling-help
        assert counts["olympiad"] == 2
        assert counts["hackathon"] == 0  # closed-hack is past its deadline

    def test_every_category_is_present_including_the_empty_ones(self, events, today):
        from bars.vocab import CATEGORIES

        assert set(availability(events, today)) == set(CATEGORIES)

    def test_the_line_names_zero_categories_explicitly(self, events, today):
        line = availability_line(events, today)

        assert "хакатоны — 0" in line
        assert "олимпиады — 2" in line


class TestPrompts:
    def test_the_census_lands_in_the_system_prompt(self):
        rendered = system_prompt("2026-09-02", "хакатоны — 0, олимпиады — 2")

        assert "хакатоны — 0" in rendered
        assert "2026-09-02" in rendered

    def test_a_missing_census_degrades_to_a_hint_not_an_empty_slot(self):
        assert "{availability}" not in system_prompt("2026-09-02")
        assert "уточни поиском" in system_prompt("2026-09-02")

    def test_the_smalltalk_prompt_is_a_fraction_of_the_persona(self):
        # The whole point: answering "спасибо" must not carry the catalogue rules.
        assert len(SMALLTALK_PROMPT) < len(SYSTEM_PROMPT) / 3

    def test_the_smalltalk_prompt_carries_no_format_rules(self):
        assert "[id:" not in SMALLTALK_PROMPT
