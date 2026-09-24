import { motion } from 'motion/react';
import Icon from './Icon.jsx';
import Reveal from './Reveal.jsx';
import { premiumServices } from '../data/content.js';
import { requestJourney } from '../lib/links.js';
import { cardIn, fadeUp, spring, stagger } from '../lib/motion.js';

export default function PremiumServices() {
  return (
    <section id="premium" className="section section--tint" aria-labelledby="premium-title">
      <div className="container stack-lg">
        <Reveal as="h2" id="premium-title" className="display h2-lg" variants={fadeUp}>
          {premiumServices.headline}
        </Reveal>

        <Reveal as="div" className="premium-grid" variants={stagger(0.1)}>
          {premiumServices.items.map((item) => (
            <motion.article
              key={item.id}
              className="premium-card"
              variants={cardIn}
              whileHover={{ y: -6 }}
              transition={spring}
            >
              <motion.span
                className="icon-tile icon-tile--gold"
                whileHover={{ rotate: 8, scale: 1.08 }}
                transition={spring}
              >
                <Icon name={item.icon} size={24} />
              </motion.span>
              <h3 className="premium-card__title">{item.title}</h3>
              <p className="premium-card__body">{item.body}</p>
              <motion.a
                href="#request-assistance"
                className="link-cta"
                onClick={requestJourney(item.journeyType)}
                whileHover={{ x: 4 }}
                transition={spring}
              >
                {item.cta}
                <Icon name="arrowRight" size={16} />
              </motion.a>
            </motion.article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
