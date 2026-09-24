import { brand } from '../data/content.js';

/**
 * The VoloVertex identity.
 *
 * layout="horizontal" (default) — the symbol beside a typeset wordmark. Used in
 *   the header, where the stacked lockup would be too small to read.
 * layout="stacked" — the supplied lockup artwork, symbol above wordmark.
 *
 * variant="light" uses the ivory artwork for dark grounds.
 */
export default function Logo({
  variant = 'dark',
  layout = 'horizontal',
  height = 44,
  href = '#top',
  showTagline = false,
}) {
  const light = variant === 'light';
  const stacked = layout === 'stacked';
  const file = `/images/volovertex-${stacked ? 'lockup' : 'mark'}${light ? '-light' : ''}.png`;

  const content = stacked ? (
    <img
      src={file}
      alt={`${brand.name} — ${brand.category}`}
      className="logo__img"
      style={{ height: `${height}px` }}
    />
  ) : (
    <>
      <img
        src={file}
        alt=""
        className="logo__img"
        style={{ height: `${height}px` }}
        aria-hidden="true"
      />
      <span className="logo__text">
        <span className="logo__word">Volo Vertex</span>
        {showTagline && <span className="logo__tagline">{brand.category}</span>}
      </span>
      <span className="visually-hidden">{brand.name}</span>
    </>
  );

  const className = `logo logo--${layout}${light ? ' logo--light' : ''}`;

  if (!href) {
    return <span className={className}>{content}</span>;
  }

  return (
    <a href={href} className={className} aria-label={`${brand.name} home`}>
      {content}
    </a>
  );
}
