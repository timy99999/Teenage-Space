"""Answers that never need a model.

"Спасибо" cost 1086 prompt tokens and five and a half seconds: a guard call to
classify it, then the whole 780-token persona sent to Gemini so it could say
"пожалуйста". Both are pure waste on a closed set of phrases whose answer never
depends on the catalogue, the profile or anything said earlier.

Matching is deliberately exact-on-the-normalised-string rather than clever. A false
positive here is a real question answered with a canned platitude, which is far worse
than a missed saving -- anything not listed falls through to the normal path, which
still works and is now cheaper too. So the rule is: the *entire* message must be the
pleasantry. "Привет" is canned; "Привет, есть хакатоны?" is not.
"""

from __future__ import annotations

import re

GREETING = "greeting"
HOW_ARE_YOU = "how_are_you"
THANKS = "thanks"
BYE = "bye"
ACK = "ack"

# Normalised phrase -> intent. Written out rather than derived from stems: the list is
# short, reading it tells you exactly what is intercepted, and adding a phrase is a
# one-line change with no chance of widening the match by accident.
PHRASES: dict[str, str] = {
    # greetings
    "привет": GREETING,
    "приветик": GREETING,
    "прив": GREETING,
    "привет барс": GREETING,
    "здравствуй": GREETING,
    "здравствуйте": GREETING,
    "хай": GREETING,
    "ку": GREETING,
    "салам": GREETING,
    "саламатсызбы": GREETING,
    "доброе утро": GREETING,
    "добрый день": GREETING,
    "добрый вечер": GREETING,
    "здарова": GREETING,
    "хеллоу": GREETING,
    "hello": GREETING,
    "hi": GREETING,
    # how are you
    "как дела": HOW_ARE_YOU,
    "как ты": HOW_ARE_YOU,
    "как жизнь": HOW_ARE_YOU,
    # Keys are stored post-normalisation, so "ё" is written as "е" ("чё как" -> "че как").
    "че как": HOW_ARE_YOU,
    "что как": HOW_ARE_YOU,
    "как оно": HOW_ARE_YOU,
    "привет как дела": HOW_ARE_YOU,
    # thanks
    "спасибо": THANKS,
    "спасибо большое": THANKS,
    "большое спасибо": THANKS,
    "спасибо тебе": THANKS,
    "спасибо за работу": THANKS,
    "спасибо за помощь": THANKS,
    "спс": THANKS,
    "спасиб": THANKS,
    "пасибо": THANKS,
    "благодарю": THANKS,
    "рахмат": THANKS,
    "thanks": THANKS,
    # goodbyes
    "пока": BYE,
    "пока пока": BYE,
    "покеда": BYE,
    "до свидания": BYE,
    "до встречи": BYE,
    "бб": BYE,
    "увидимся": BYE,
    # acknowledgements
    "ок": ACK,
    "окей": ACK,
    "ok": ACK,
    "хорошо": ACK,
    "понял": ACK,
    "поняла": ACK,
    "понятно": ACK,
    "ясно": ACK,
    "класс": ACK,
    "круто": ACK,
    "супер": ACK,
    "отлично": ACK,
    "здорово": ACK,
}

# Several per intent so a chat that says "спасибо" twice does not get the same sentence
# twice. Every one ends by handing the conversation back -- a pleasantry is still a
# chance to ask what the person is actually looking for.
REPLIES: dict[str, tuple[str, ...]] = {
    GREETING: (
        "Привет! Что ищем — волонтёрство, олимпиаду, хакатон?",
        "Привет! Расскажи, что тебе интересно, и я подберу.",
        "На связи! С чего начнём?",
    ),
    HOW_ARE_YOU: (
        "Всё хорошо, готов искать. А у тебя как? Что хочешь найти?",
        "Отлично — жду интересную задачу. Чем займёмся?",
        "Нормально! Лучше расскажи, что тебе интересно.",
    ),
    THANKS: (
        "Всегда пожалуйста! Что ищем дальше?",
        "Обращайся. Подсказать ещё что-нибудь?",
        "Рад помочь! Заглядывай, когда понадобится.",
    ),
    BYE: (
        "Пока! Возвращайся, если что-то понадобится.",
        "До встречи! Напиши, когда захочешь найти мероприятие.",
        "Удачи! Буду тут.",
    ),
    ACK: (
        "Отлично. Что дальше?",
        "Понял. Нужно ещё что-нибудь найти?",
        "Хорошо! Если что — пиши.",
    ),
}

# Longest phrase above is three words; anything longer carries real content.
MAX_WORDS = 3

_PUNCTUATION = re.compile(r"[^\w\s]", flags=re.UNICODE)
_SPACES = re.compile(r"\s+")

# Round-robin cursor per intent. Process-global rather than per-chat on purpose: chats
# interleaving through the same rotation is invisible to any single reader, and it costs
# no state that has to be pruned.
_cursor: dict[str, int] = {}


def normalise(text: str) -> str:
    """Casefold, drop punctuation and emoji, collapse whitespace.

    Turns "СПАСИБО!!! 🙏" and "спасибо" into the same key. `\\w` under re.UNICODE keeps
    Cyrillic, so this is not an ASCII-only fold.
    """
    lowered = text.casefold().replace("ё", "е")
    return _SPACES.sub(" ", _PUNCTUATION.sub(" ", lowered)).strip()


def canned_reply(text: str) -> str | None:
    """A ready answer when the whole message is a pleasantry, otherwise None."""
    key = normalise(text)
    if not key or len(key.split(" ")) > MAX_WORDS:
        return None

    intent = PHRASES.get(key)
    if intent is None:
        return None

    options = REPLIES[intent]
    index = _cursor.get(intent, 0)
    _cursor[intent] = index + 1
    return options[index % len(options)]
