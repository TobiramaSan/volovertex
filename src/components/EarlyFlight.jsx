import { motion } from 'motion/react';
import Icon from './Icon.jsx';
import Reveal from './Reveal.jsx';
import { earlyFlight } from '../data/content.js';
import { requestJourney, whatsappLink } from '../lib/links.js';
import { ease, fadeSide, fadeUp, listItem, maskLine, spring, stagger, viewport } from '../lib/motion.js';

export default function EarlyFlight() {
  return (
    <section id="early-flight" className="section section--pine" aria-labelledby="early-title">
      <div className="container split split--center">
        <Reveal as="div" className="stack-md" variants={stagger(0.1)}>
          <motion.p className="eyebrow eyebrow--gold" variants={fadeUp}>
            {earlyFlight.eyebrow}
          </motion.p>
          <h2 id="early-title" className="display h2-lg">
            <span className="line-mask">
              <motion.span className="line-mask__inner" variants={maskLine}>
                {earlyFlight.headline[0]}
              </motion.span>
            </span>
            <span className="line-mask">
              <motion.em className="line-mask__inner" variants={maskLine}>
                {earlyFlight.headline[1]}
              </motion.em>
            </span>
          </h2>
          {earlyFlight.copy.map((p) => (
            <motion.p key={p} className="lede lede--onDark" variants={fadeUp}>
              {p}
            </motion.p>
          ))}
          <motion.p className="pull-quote" variants={fadeSide(-22)}>
            {earlyFlight.response}
          </motion.p>
          <motion.div className="btn-row" variants={fadeUp}>
            <motion.a
              href="#request-assistance"
              className="btn btn--gold btn--lg"
              onClick={requestJourney('Early flight')}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={spring}
            >
              {earlyFlight.cta}
              <Icon name="arrowRight" size={17} />
            </motion.a>
            <motion.a
              href={whatsappLink('earlyFlight')}
              className="btn btn--outline-light btn--lg"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={spring}
            >
              <Icon name="whatsapp" size={18} />
              {earlyFlight.secondaryCta}
            </motion.a>
          </motion.div>
        </Reveal>

        {/* the worry list builds up one line at a time, the way the worries do */}
        <Reveal as="div" className="problem-card" variants={fadeSide(36)}>
          <h3 className="problem-card__title">{earlyFlight.problemHeadline}</h3>
          <p className="problem-card__intro">{earlyFlight.problemIntro}</p>
          {/* the worries stack up one at a time, off the card's own reveal */}
          <motion.ul className="problem-card__list" variants={stagger(0.08, 0.2)}>
            {earlyFlight.problems.map((item) => (
              <motion.li key={item} variants={listItem({ x: 14 })}>
                {item}
              </motion.li>
            ))}
          </motion.ul>
        </Reveal>
      </div>
    </section>
  );
}
