/** Phone helpers. The site's audience is Kyrgyzstan (+996), so a bare 9-digit
 *  national number or a `0`-prefixed local one is assumed to be Kyrgyz. */

export interface KgPhone {
  /** `+996555123456` — what we store and show. */
  e164: string;
  /** `996555123456` — digits only, ready for a `https://wa.me/` link. */
  digits: string;
}

/** Best-effort normalisation of whatever a user typed into a WhatsApp field.
 *  Returns null when the input can't be confidently read as a Kyrgyz number —
 *  callers keep the raw string in that case. */
export function normalizeKgPhone(raw?: string | null): KgPhone | null {
  if (!raw) return null;
  let d = raw.replace(/\D/g, '');
  if (d.startsWith('00')) d = d.slice(2);
  if (d.startsWith('996')) d = d.slice(3);
  else if (d.startsWith('0')) d = d.slice(1);
  if (d.length !== 9) return null;
  const digits = `996${d}`;
  return { e164: `+${digits}`, digits };
}

/** `https://wa.me/<digits>` for a parseable number, otherwise null. */
export function whatsappLink(raw?: string | null): string | null {
  const phone = normalizeKgPhone(raw);
  return phone ? `https://wa.me/${phone.digits}` : null;
}
