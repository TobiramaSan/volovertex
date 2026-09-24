// Stroke icon set. Colour follows `currentColor`, size is square.
const paths = {
  takeoff: (
    <>
      <path d="M2 21h20" />
      <path d="M3.5 14.5l4 1.5 4-6 2 .8-2.2 6.4 4.7 1.7c1.2.4 2.5-.2 2.9-1.3l.1-.3-14-5.2-1.6-3.4 1.6-.6 2.5 2.4" />
    </>
  ),
  landing: (
    <>
      <path d="M2 21h20" />
      <path d="M3 10.5l3.5-1 3.8 5.7 2-.5-1-6.7 5-1.3c1.2-.3 2.4.4 2.7 1.6l.1.3-14.4 3.9-2.9-2.4" />
    </>
  ),
  sunrise: (
    <>
      <path d="M12 3v3M5.6 8.6L7.7 10.7M18.4 8.6l-2.1 2.1M2 18h20M4 14h2M18 14h2" />
      <path d="M8 18a4 4 0 0 1 8 0" />
    </>
  ),
  concierge: (
    <>
      <path d="M3 18h18" />
      <path d="M4.5 18a7.5 7.5 0 0 1 15 0" />
      <path d="M12 7.5V6" />
      <circle cx="12" cy="4.5" r="1.5" />
    </>
  ),
  car: (
    <>
      <path d="M5 17H3v-5l2-5h11l3 5h2v5h-2" />
      <circle cx="7.5" cy="17.5" r="2" />
      <circle cx="16.5" cy="17.5" r="2" />
      <path d="M9.5 17h5" />
      <path d="M3 12h18" />
    </>
  ),
  executive: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M3 13h18" />
    </>
  ),
  family: (
    <>
      <circle cx="8" cy="7" r="3" />
      <circle cx="17" cy="9" r="2.2" />
      <path d="M2 20a6 6 0 0 1 12 0" />
      <path d="M15 20a4 4 0 0 1 7-2.6" />
    </>
  ),
  group: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M2 20a7 7 0 0 1 14 0" />
      <path d="M16 5.5a3 3 0 0 1 0 5" />
      <path d="M18 14.5a6 6 0 0 1 4 5.5" />
    </>
  ),
  flight: (
    <>
      <path d="M12 2l3 8.5 7 2.5-7 2.5L12 22l-3-6.5-7-2.5 7-2.5z" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
      <path d="M8.5 14.5l2 2 4-4" />
    </>
  ),
  route: (
    <>
      <circle cx="5" cy="19" r="2.5" />
      <circle cx="19" cy="5" r="2.5" />
      <path d="M7.5 19h5a4 4 0 0 0 4-4V9.5" />
      <path d="M5 16.5V11" />
    </>
  ),
  support: (
    <>
      <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
      <rect x="2.5" y="13.5" width="4" height="6" rx="1.6" />
      <rect x="17.5" y="13.5" width="4" height="6" rx="1.6" />
      <path d="M19.5 19.5v.5a3 3 0 0 1-3 3H13" />
    </>
  ),
  verified: (
    <>
      <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  message: (
    <>
      <path d="M21 15a2 2 0 0 1-2 2H8l-4 4V6a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2z" />
      <path d="M8 9h9M8 13h6" />
    </>
  ),
  standard: (
    <>
      <circle cx="12" cy="9" r="5" />
      <path d="M8.5 13.2L7 22l5-2.6L17 22l-1.5-8.8" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M3.5 20.5l1.3-4.4A8.2 8.2 0 1 1 8 19.3z" />
      <path d="M9 9.2c.3-.8.6-.8 1-.8h.6c.2 0 .5 0 .7.6l.7 1.7c.1.3 0 .5-.1.7l-.4.5c-.2.2-.3.4-.1.7a6 6 0 0 0 2.8 2.4c.3.1.5 0 .7-.2l.5-.6c.2-.2.4-.2.6-.1l1.7.8c.3.1.5.3.5.5a2 2 0 0 1-1.4 1.8c-.6.2-1.4.3-3.6-.7a9 9 0 0 1-4-4.2c-.5-1.1-.5-2 .1-2.9z" />
    </>
  ),
  phone: (
    <>
      <path d="M21 16.9v2.6a2 2 0 0 1-2.2 2 19.5 19.5 0 0 1-8.5-3 19.2 19.2 0 0 1-5.9-5.9 19.5 19.5 0 0 1-3-8.6A2 2 0 0 1 3.4 2H6a2 2 0 0 1 2 1.7c.1 1 .3 1.9.6 2.8a2 2 0 0 1-.4 2.1L7 9.8a15.5 15.5 0 0 0 5.9 5.9l1.2-1.2a2 2 0 0 1 2.1-.4c.9.3 1.8.5 2.8.6a2 2 0 0 1 1.7 2z" />
    </>
  ),
  mail: (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </>
  ),
  arrowRight: <path d="M4 12h15M14 6l6 6-6 6" />,
  arrowDown: <path d="M12 4v15M6 14l6 6 6-6" />,
  check: <path d="M4 12.5l5 5L20 6.5" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  pin: (
    <>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z" />
    </>
  ),
};

export default function Icon({ name, size = 24, strokeWidth = 1.6, className }) {
  const d = paths[name];
  if (!d) return null;
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {d}
    </svg>
  );
}
