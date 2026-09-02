"""Message shaping: recovering a truncated answer, and splitting a long one."""

from __future__ import annotations

from bars.formatting import MORE_HINT, chunks, event_ids, to_html, truncate_to_last_complete_line


class TestTruncateToLastCompleteLine:
    def test_drops_the_half_written_bullet(self):
        # Verbatim shape of the real failure: the answer stopped inside a title.
        text = (
            "Вот актуальные мероприятия:\n"
            "• Набор волонтеров — бесплатно.\n"
            "• Практический воркшоп — 450 сом.\n"
            "• Мо"
        )
        result = truncate_to_last_complete_line(text)

        assert "• Мо" not in result
        assert "Практический воркшоп" in result
        assert result.endswith(MORE_HINT)

    def test_falls_back_to_the_last_finished_sentence(self):
        text = "Первое предложение. Второе оборва"
        result = truncate_to_last_complete_line(text)

        assert result == "Первое предложение." + MORE_HINT

    def test_keeps_an_answer_that_already_ends_cleanly(self):
        text = "Вот что нашёл.\nВыбирай любое!"
        assert truncate_to_last_complete_line(text) == text + MORE_HINT

    def test_single_unfinished_line_survives_rather_than_vanishing(self):
        # Nothing to fall back to — returning "" would lose the answer entirely.
        result = truncate_to_last_complete_line("Совсем короткий обрыв")
        assert result.startswith("Совсем короткий обрыв")

    def test_empty_stays_empty(self):
        assert truncate_to_last_complete_line("   ") == ""


class TestChunks:
    def test_short_text_is_one_part(self):
        assert chunks("привет") == ["привет"]

    def test_splits_on_paragraph_boundaries(self):
        parts = chunks("a" * 60 + "\n\n" + "b" * 60, limit=100)
        assert parts == ["a" * 60, "b" * 60]

    def test_hard_splits_a_paragraph_that_cannot_fit(self):
        parts = chunks("x" * 250, limit=100)
        assert [len(p) for p in parts] == [100, 100, 50]

    def test_never_exceeds_the_limit(self):
        text = "\n\n".join("слово " * 40 for _ in range(20))
        assert all(len(part) <= 300 for part in chunks(text, limit=300))


class TestEventRefs:
    def test_ids_are_extracted_in_order_and_deduplicated(self):
        text = "А [id:one] и Б [id:two], снова А [id:one]"
        assert event_ids(text) == ["one", "two"]

    def test_markers_are_stripped_and_bold_becomes_html(self):
        assert to_html("**Хакатон** [id:abc] ждёт") == "<b>Хакатон</b> ждёт"

    def test_angle_brackets_are_escaped_before_bold_is_applied(self):
        assert to_html("<script> и **жирный**") == "&lt;script&gt; и <b>жирный</b>"
