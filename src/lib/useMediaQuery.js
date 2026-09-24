import { useEffect, useState } from 'react';

/**
 * Tracks a CSS media query from JS, so a component can render a different tree
 * at a breakpoint instead of hiding one with CSS. The header uses it to mount
 * the mobile drawer only when the drawer is actually the layout in play.
 */
export default function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches
  );

  useEffect(() => {
    const list = window.matchMedia(query);
    const onChange = (e) => setMatches(e.matches);
    setMatches(list.matches);
    list.addEventListener('change', onChange);
    return () => list.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}
