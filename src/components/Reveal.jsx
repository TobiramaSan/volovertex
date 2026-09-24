import { motion } from 'motion/react';
import { fadeUp, revealProps } from '../lib/motion.js';

/**
 * Scroll reveal wrapper. Renders `as` (any DOM tag) and plays `variants` the
 * first time it scrolls into view.
 *
 * Motion propagates variant labels down the tree, so any nested motion element
 * declaring its own `hidden`/`show` variants animates off the same trigger —
 * that is how the grids below stagger their cards without extra observers.
 */
export default function Reveal({
  as = 'div',
  variants = fadeUp,
  delay = 0,
  className,
  children,
  ...rest
}) {
  const Tag = motion[as];
  return (
    <Tag className={className} variants={variants} custom={delay} {...revealProps} {...rest}>
      {children}
    </Tag>
  );
}
