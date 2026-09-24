import { motion } from 'motion/react';
import { ease } from '../lib/motion.js';

/**
 * Shows a real photo when `src` is set, otherwise the supplied illustration.
 *
 * The artwork sits in its own layer so a caller can drive it independently of
 * the frame — the hero uses that for scroll parallax. Any further props are
 * passed to the figure, so callers can animate the frame itself.
 */
export default function PhotoSlot({
  src,
  alt,
  caption,
  className = '',
  artStyle,
  children,
  ...motionProps
}) {
  return (
    <motion.figure className={`photo-slot ${className}`} {...motionProps}>
      <motion.div className="photo-slot__layer" style={artStyle}>
        {src ? <img src={src} alt={alt} className="photo-slot__img" loading="lazy" /> : children}
      </motion.div>
      {!src && caption && (
        <motion.figcaption
          className="photo-slot__caption"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease, delay: 0.5 }}
        >
          {caption}
        </motion.figcaption>
      )}
    </motion.figure>
  );
}
