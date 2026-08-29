"""All configuration in one place, loaded from the environment (or bot/.env locally)."""

from __future__ import annotations

import os
from functools import lru_cache

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    # Telegram
    telegram_bot_token: str = ""
    telegram_bot_username: str = ""
    telegram_webhook_secret: str = ""
    webhook_base_url: str = ""
    port: int = 8080

    # Gemini
    gemini_api_key: str = ""
    gemini_model: str = "gemini-3.6-flash"
    gemini_router_model: str = "gemini-3.5-flash-lite"
    gemini_embed_model: str = "models/gemini-embedding-001"
    embed_dim: int = 768

    # Teenage Space backend
    api_base_url: str = "http://localhost:3000/api"
    bot_api_secret: str = ""
    site_url: str = "http://localhost:5173"

    # Postgres (bot-owned tables + LangGraph checkpoints)
    database_url: str = ""

    # Behaviour
    memory_ttl_hours: int = 72
    # How long the quality-control transcript (bot_messages) is kept. Longer than
    # memory_ttl_hours on purpose: the dialogue expires for the bot at 72h, the
    # admin's audit log a while later.
    transcript_ttl_days: int = 30
    max_concurrent_llm: int = 8
    catalog_ttl_seconds: int = 300
    index_interval_minutes: int = 30
    log_level: str = "INFO"

    reminder_poll_seconds: int = Field(default=60)

    @property
    def public_base_url(self) -> str:
        """Railway injects RAILWAY_PUBLIC_DOMAIN; a custom domain overrides it via env."""
        if self.webhook_base_url:
            return self.webhook_base_url.rstrip("/")
        domain = os.getenv("RAILWAY_PUBLIC_DOMAIN", "")
        return f"https://{domain}" if domain else ""

    @property
    def webhook_path(self) -> str:
        # The secret is in the path as well as the header: a wrong path is a 404 that
        # never reaches the dispatcher at all.
        return f"/telegram/webhook/{self.telegram_webhook_secret}"

    def require(self, *names: str) -> None:
        missing = [n for n in names if not getattr(self, n)]
        if missing:
            raise RuntimeError(f"Missing required settings: {', '.join(missing)}")


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    return Settings()
