import { motion, useScroll, useSpring } from 'motion/react';

/**
 * A gold hairline across the top of the page tracking reading progress. The
 * raw scroll value is passed through a spring so the bar glides instead of
 * jittering with every wheel tick.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });

  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />;
}
