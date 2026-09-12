/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  readonly VITE_API_URL?: string;
  /** "Спросить Барса" (P1) deep link — same value as the backend's TELEGRAM_BOT_USERNAME.
   *  Optional: lib/barsDeepLink.ts falls back to the current production bot handle. */
  readonly VITE_TELEGRAM_BOT_USERNAME?: string;
  /** GA4 measurement id (e.g. "G-XXXXXXX"). Unset = no Google Analytics loaded. */
  readonly VITE_GA_MEASUREMENT_ID?: string;
  /** Yandex Metrika counter id. Unset = no Yandex Metrika loaded. */
  readonly VITE_YANDEX_METRIKA_ID?: string;
  /** Google Search Console HTML-tag verification token (the `content` value only). */
  readonly VITE_GOOGLE_SITE_VERIFICATION?: string;
  /** Yandex Webmaster HTML-tag verification token (the `content` value only). */
  readonly VITE_YANDEX_VERIFICATION?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
