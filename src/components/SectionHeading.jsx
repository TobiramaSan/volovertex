import { motion } from 'motion/react';
import Reveal from './Reveal.jsx';
import { fadeUp, maskLine, stagger } from '../lib/motion.js';

/**
 * Section heading. `title` may be a string or an array of lines.
 * `tone="dark"` switches the eyebrow colour for dark grounds.
 *
 * Each title line rises out of its own clipping mask, so the heading assembles
 * itself line by line as the section arrives.
 */
export default function SectionHeading({ eyebrow, title, intro, id, tone = 'light', split = false, align }) {
  const lines = Array.isArray(title) ? title : [title];
  return (
    <Reveal
      as="div"
      variants={stagger(0.09)}
      className={[
        'section-heading',
        split ? 'section-heading--split' : '',
        tone === 'dark' ? 'section-heading--dark' : '',
        align === 'center' ? 'section-heading--center' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="section-heading__main">
        {eyebrow && (
          <motion.p className="eyebrow" variants={fadeUp}>
            {eyebrow}
          </motion.p>
        )}
        <h2 className="display section-heading__title" id={id}>
          {lines.map((line) => (
            <span key={line} className="line-mask">
              <motion.span className="line-mask__inner display__line" variants={maskLine}>
                {line}
              </motion.span>
            </span>
          ))}
        </h2>
      </div>
      {intro && (
        <motion.p className="section-heading__intro" variants={fadeUp}>
          {intro}
        </motion.p>
      )}
    </Reveal>
  );
}
