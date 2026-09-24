import { motion } from 'motion/react';
import Icon from './Icon.jsx';
import Reveal from './Reveal.jsx';
import { quickActions } from '../data/content.js';
import { requestJourney } from '../lib/links.js';
import { cardIn, fadeUp, spring, stagger } from '../lib/motion.js';

export default function QuickActions() {
  return (
    <section className="quick" aria-labelledby="quick-title">
      <div className="container">
        <Reveal as="h2" id="quick-title" className="quick__title" variants={fadeUp}>
          Where are you going?
        </Reveal>

        {/* the grid deals itself out card by card as it comes into view */}
        <Reveal as="ul" className="quick__grid" variants={stagger(0.09)}>
          {quickActions.map((action) => (
            <motion.li key={action.id} variants={cardIn}>
              <motion.a
                href={action.href}
                className="quick-card"
                onClick={requestJourney(action.journeyType)}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.985 }}
                transition={spring}
              >
                <motion.span
                  className="quick-card__icon"
                  whileHover={{ rotate: -6, scale: 1.1 }}
                  transition={spring}
                >
                  <Icon name={action.icon} size={26} />
                </motion.span>
                <span className="quick-card__title">{action.title}</span>
                <span className="quick-card__body">{action.body}</span>
                <span className="quick-card__cta">
                  {action.cta}
                  <Icon name="arrowRight" size={16} />
                </span>
              </motion.a>
            </motion.li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
