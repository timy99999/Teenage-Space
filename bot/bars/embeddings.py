"""Gemini embeddings, wrapped so the rest of the code never touches the SDK directly."""

from __future__ import annotations

import logging
from functools import lru_cache

from langchain_google_genai import GoogleGenerativeAIEmbeddings

from .config import get_settings

logger = logging.getLogger(__name__)


@lru_cache(maxsize=1)
def _embedder() -> GoogleGenerativeAIEmbeddings:
    settings = get_settings()
    settings.require("gemini_api_key")
    return GoogleGenerativeAIEmbeddings(
        model=settings.gemini_embed_model,
        google_api_key=settings.gemini_api_key,
        # Must match the vector(N) column in the bars_bot migration.
        output_dimensionality=settings.embed_dim,
    )


async def embed_query(text: str) -> list[float]:
    """task_type defaults to RETRIEVAL_QUERY here, RETRIEVAL_DOCUMENT below — asymmetric
    embedding is what makes short questions match long event descriptions."""
    return await _embedder().aembed_query(text)


async def embed_documents(texts: list[str]) -> list[list[float]]:
    return await _embedder().aembed_documents(texts)
