const OBJECT_PATH_RE = /^\/storage\/v1\/object\/public\/([^/]+)\/(.+)$/;

// Matches compressImage.ts's WEBP_QUALITY (0.82).
const QUALITY = 82;

// Covers the ~300-500px CSS slots (card grid, modal grid — see
// EventPhoto.tsx) at 1x-2x DPR, staying under the 1200px longest-edge cap
// uploadPostImage.ts already applies, so none of these upscale past source.
const DEFAULT_WIDTHS = [480, 720, 1080];

/**
 * Builds srcset candidates for a Supabase Storage public object URL via the
 * project's on-the-fly image transform endpoint, so cards/modals stop
 * downloading full upload-resolution photos into ~300-500px slots.
 * `resize=contain` with only `width` set scales proportionally (preserves
 * the source aspect ratio) — passing `width` alone, with no `resize` param,
 * does not. Returns undefined — never throws — for anything that isn't a
 * plain public object URL in the expected shape, so callers fall back to
 * the original `src`.
 */
export function supabaseImageSrcSet(url: string, widths: number[] = DEFAULT_WIDTHS): string | undefined {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return undefined;
  }

  const match = parsed.pathname.match(OBJECT_PATH_RE);
  if (!match) return undefined;
  const [, bucket, path] = match;

  const renderBase = `${parsed.origin}/storage/v1/render/image/public/${bucket}/${path}`;
  return widths.map((w) => `${renderBase}?width=${w}&resize=contain&quality=${QUALITY} ${w}w`).join(', ');
}
