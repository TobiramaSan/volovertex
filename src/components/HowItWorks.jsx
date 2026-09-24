import { motion } from 'motion/react';
import Icon from './Icon.jsx';
import Reveal from './Reveal.jsx';
import { howItWorks } from '../data/content.js';
import { requestJourney } from '../lib/links.js';
import { ease, fadeUp, maskLine, spring, stagger } from '../lib/motion.js';

const step = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
};

/** The step number sweeps up past its own baseline as the step lands. */
const stepNum = {
  hidden: { opacity: 0, y: 18, scale: 0.85 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease, delay: 0.1 } },
};

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section" aria-labelledby="how-title">
      <div className="container stack-xl">
        <Reveal as="h2" id="how-title" className="display h2-lg how__title" variants={stagger(0.09)}>
          <span className="line-mask">
            <motion.span className="line-mask__inner" variants={maskLine}>
              {howItWorks.headline[0]}
            </motion.span>
          </span>
          <span className="line-mask">
            <motion.em className="line-mask__inner" variants={maskLine}>
              {howItWorks.headline[1]}
            </motion.em>
          </span>
        </Reveal>

        <Reveal as="ol" className="steps" variants={stagger(0.13)}>
          {howItWorks.steps.map((s, i) => (
            <motion.li key={s.title} className="step" variants={step}>
              <motion.span className="step__num" variants={stepNum}>
                {String(i + 1).padStart(2, '0')}
              </motion.span>
              <h3 className="step__title">{s.title}</h3>
              <p className="step__body">{s.body}</p>
            </motion.li>
          ))}
        </Reveal>

        <Reveal as="div" className="how__cta" variants={fadeUp}>
          <motion.a
            href="#request-assistance"
            className="btn btn--primary btn--lg"
            onClick={requestJourney('')}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={spring}
          >
            {howItWorks.cta}
            <Icon name="arrowRight" size={17} />
          </motion.a>
        </Reveal>
      </div>
    </section>
  );
}
