import { motion } from 'motion/react';
import Icon from './Icon.jsx';
import Reveal from './Reveal.jsx';
import { coreMessage } from '../data/content.js';
import { requestJourney } from '../lib/links.js';
import { fadeSide, fadeUp, maskLine, spring, stagger } from '../lib/motion.js';

export default function CoreMessage() {
  return (
    <section className="section section--pine core" aria-labelledby="core-title">
      <Reveal as="div" className="container core__grid" variants={stagger(0.12)}>
        <h2 id="core-title" className="display core__title">
          <span className="line-mask">
            <motion.span className="line-mask__inner" variants={maskLine}>
              {coreMessage.headline[0]}
            </motion.span>
          </span>
          <span className="line-mask">
            <motion.em className="line-mask__inner" variants={maskLine}>
              {coreMessage.headline[1]}
            </motion.em>
          </span>
        </h2>

        <motion.div className="core__body" variants={fadeSide(34)}>
          {coreMessage.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <motion.a
            href="#request-assistance"
            className="btn btn--gold btn--lg"
            onClick={requestJourney('')}
            variants={fadeUp}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={spring}
          >
            {coreMessage.cta}
            <Icon name="arrowRight" size={17} />
          </motion.a>
        </motion.div>
      </Reveal>
    </section>
  );
}
