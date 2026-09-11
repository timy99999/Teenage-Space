/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  readonly VITE_API_URL?: string;
  /** "Спросить Барса" (P1) deep link — same value as the backend's TELEGRAM_BOT_USERNAME.
   *  Optional: lib/barsDeepLink.ts falls back to the current production bot handle. */
  readonly VITE_TELEGRAM_BOT_USERNAME?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
