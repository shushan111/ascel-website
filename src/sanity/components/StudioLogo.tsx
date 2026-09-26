/**
 * The site's own mark, redrawn for the Studio's navbar so the admin panel and
 * the website read as one product. Colours come from the Studio theme, not
 * from the site's stylesheet, which the Studio does not load.
 */
export function StudioLogo() {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.6rem',
        fontWeight: 600,
        letterSpacing: '0.18em',
      }}
    >
      <svg viewBox="0 0 40 40" width="26" height="26" aria-hidden="true">
        <rect
          x="1.25"
          y="1.25"
          width="37.5"
          height="37.5"
          rx="4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
        />
        <path
          d="M10 30.5 20 9.5 30 30.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="M14.5 21.5h11" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="20" cy="16.2" r="1.6" fill="currentColor" />
      </svg>
      ASCEL
    </span>
  )
}
