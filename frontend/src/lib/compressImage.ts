const WEBP_QUALITY = 0.82;
// Formats safe to decode/redraw on a canvas without losing something that matters:
// excludes GIF (would flatten any animation to a single frame) and SVG (vector — a
// canvas render would rasterise it at a fixed size instead of staying scalable).
const RESIZABLE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);

export interface CompressedImage {
  blob: Blob | File;
  ext: string;
  contentType: string;
}

/** Downscales an image client-side and re-encodes it as WebP (which also covers
 *  PNG transparency — WebP has an alpha channel) so a phone-camera original or a
 *  lossless poster PNG isn't shipped as-is to every visitor. Falls back to the
 *  original file on any decode/encode failure, or if re-encoding didn't actually
 *  shrink it — compression must never block an upload or make things worse. */
export async function compressImage(file: File, maxDimension: number): Promise<CompressedImage> {
  const fallback: CompressedImage = {
    blob: file,
    ext: file.name.split('.').pop() ?? 'jpg',
    contentType: file.type
  };
  if (!RESIZABLE_TYPES.has(file.type)) return fallback;

  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, maxDimension / Math.max(bitmap.width, bitmap.height));
    const width = Math.round(bitmap.width * scale);
    const height = Math.round(bitmap.height * scale);
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      bitmap.close();
      return fallback;
    }
    ctx.drawImage(bitmap, 0, 0, width, height);
    bitmap.close();
    const blob: Blob | null = await new Promise((resolve) =>
      canvas.toBlob(resolve, 'image/webp', WEBP_QUALITY)
    );
    if (!blob || blob.size === 0 || blob.size >= file.size) return fallback;
    return { blob, ext: 'webp', contentType: 'image/webp' };
  } catch {
    return fallback;
  }
}
