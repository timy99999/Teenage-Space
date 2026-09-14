import logo from '../assets/logo-ts.png';

// The boot screen is a fixed overlay on a literal black background, so these dot
// colours (tuned for that background) are fine as-is there.
const FULL_DOT_COLORS = ['#a9e6f5', '#a9e6f5', '#8b5cf6', '#8b5cf6', '#ffffff'];
// Inline use sits inside ordinary page content, which is `--ts-bg` (white in light
// theme) — the fixed cyan/white dots above would barely show, so this variant uses
// theme tokens that stay visible in both themes instead.
const INLINE_DOT_COLORS = ['var(--ts-violet)', 'var(--ts-blue)', 'var(--ts-violet)', 'var(--ts-blue)', 'var(--ts-muted)'];

/** `inline`: same animation, sized to drop into a content area instead of covering the screen. */
export function Loader({ inline = false }: { inline?: boolean } = {}) {
  const dotColors = inline ? INLINE_DOT_COLORS : FULL_DOT_COLORS;
  return (
    <div className={`ts-loader${inline ? ' ts-loader-inline' : ''}`}>
      <div className="ts-loader-ring">
        <div className="ts-loader-glow" />
        <div className="ts-loader-spin" />
        <img src={logo} alt="Teenage Space" className="ts-loader-logo" />
      </div>
      <div className="ts-loader-dots">
        {dotColors.map((color, i) => (
          <span key={i} style={{ background: color, animationDelay: `${i * 0.12}s` }} />
        ))}
      </div>
    </div>
  );
}
