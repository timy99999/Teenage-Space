"""Thin async client for the Teenage Space NestJS API.

Public catalogue reads go to /api/events (already cached 60s server-side); everything
that needs to know *who* is asking goes to /api/bot/* with the shared secret.
"""

from __future__ import annotations

import logging
from typing import Any

import httpx

from .config import get_settings

logger = logging.getLogger(__name__)


class ApiError(RuntimeError):
    def __init__(self, status: int, message: str) -> None:
        super().__init__(f"API {status}: {message}")
        self.status = status
        self.message = message


class ApiClient:
    def __init__(self) -> None:
        settings = get_settings()
        self._base = settings.api_base_url.rstrip("/")
        self._client = httpx.AsyncClient(
            base_url=self._base,
            timeout=httpx.Timeout(20.0, connect=10.0),
            headers={"x-bot-secret": settings.bot_api_secret, "user-agent": "bars-bot/0.1"},
        )

    async def aclose(self) -> None:
        await self._client.aclose()

    async def _request(self, method: str, path: str, **kwargs: Any) -> Any:
        response = await self._client.request(method, path, **kwargs)
        if response.status_code >= 400:
            detail = ""
            try:
                body = response.json()
                detail = body.get("message", "") if isinstance(body, dict) else str(body)
            except ValueError:
                detail = response.text[:200]
            raise ApiError(response.status_code, detail or response.reason_phrase)
        if response.status_code == 204 or not response.content:
            return None
        return response.json()

    # --- catalogue ---------------------------------------------------------

    async def list_events(self, scope: str = "upcoming") -> list[dict[str, Any]]:
        return await self._request("GET", "/events", params={"scope": scope})

    async def get_event(self, event_id: str) -> dict[str, Any]:
        return await self._request("GET", f"/events/{event_id}")

    async def sync_events(self) -> list[dict[str, Any]]:
        """Full snapshot including archived rows — used by the embedding indexer."""
        return await self._request("GET", "/bot/events/sync")

    # --- per-chat ----------------------------------------------------------

    async def me(self, telegram_id: int) -> dict[str, Any]:
        return await self._request("GET", "/bot/me", params={"telegramId": telegram_id})

    async def confirm_link(
        self, token: str, telegram_id: int, telegram_username: str | None
    ) -> dict[str, Any] | None:
        payload: dict[str, Any] = {"token": token, "telegramId": telegram_id}
        if telegram_username:
            payload["telegramUsername"] = telegram_username
        return await self._request("POST", "/bot/link/confirm", json=payload)

    async def unlink(self, telegram_id: int) -> None:
        await self._request("DELETE", "/bot/link", params={"telegramId": telegram_id})

    async def favorites(self, telegram_id: int) -> list[str]:
        return await self._request("GET", "/bot/favorites", params={"telegramId": telegram_id})

    async def toggle_favorite(self, telegram_id: int, event_id: str) -> dict[str, Any]:
        return await self._request(
            "POST", f"/bot/favorites/{event_id}", json={"telegramId": telegram_id}
        )


_client: ApiClient | None = None


def api() -> ApiClient:
    global _client
    if _client is None:
        _client = ApiClient()
    return _client


async def close_api() -> None:
    global _client
    if _client is not None:
        await _client.aclose()
        _client = None
