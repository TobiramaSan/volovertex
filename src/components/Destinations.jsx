import { motion, useReducedMotion } from 'motion/react';
import Icon from './Icon.jsx';
import Reveal from './Reveal.jsx';
import SectionHeading from './SectionHeading.jsx';
import { destinations } from '../data/content.js';
import { requestJourney } from '../lib/links.js';
import { cardIn, ease, spring, stagger } from '../lib/motion.js';

export default function Destinations() {
  const still = useReducedMotion();

  return (
    <section id="destinations" className="section section--pine" aria-labelledby="destinations-title">
      <div className="container stack-xl">
        <SectionHeading id="destinations-title" eyebrow="Destinations" title={destinations.headline} tone="dark" />

        <Reveal as="div" className="dest-grid" variants={stagger(0.11)}>
          {destinations.live.map((place) => (
            <motion.article
              key={place.city}
              className="dest-card"
              variants={cardIn}
              whileHover={{ y: -6 }}
              transition={spring}
            >
              <div className="dest-card__head">
                {/* the pin drops onto the map */}
                <motion.span
                  initial={{ y: -8, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 18, delay: 0.3 }}
                >
                  <Icon name="pin" size={20} />
                </motion.span>
                <span className="dest-card__status">Live at launch</span>
              </div>
              <h3 className="display dest-card__city">{place.city}</h3>
              <p className="dest-card__body">{place.body}</p>
              <motion.a
                href="#request-assistance"
                className="link-cta link-cta--light"
                onClick={requestJourney('')}
                whileHover={{ x: 4 }}
                transition={spring}
              >
                {place.cta}
                <Icon name="arrowRight" size={16} />
              </motion.a>
            </motion.article>
          ))}

          <motion.article
            className="dest-card dest-card--future"
            variants={cardIn}
            whileHover={{ y: -6 }}
            transition={spring}
          >
            <div className="dest-card__head">
              {/* the globe keeps turning — the network is still growing */}
              <motion.span
                animate={still ? undefined : { rotate: 360 }}
                transition={still ? { duration: 0 } : { duration: 26, ease: 'linear', repeat: Infinity }}
              >
                <Icon name="globe" size={20} />
              </motion.span>
              <span className="dest-card__status">{destinations.futureLabel}</span>
            </div>
            <ul className="dest-future">
              {destinations.future.map((city, i) => (
                <motion.li
                  key={city}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.35, ease, delay: 0.3 + i * 0.06 }}
                >
                  {city}
                </motion.li>
              ))}
            </ul>
            <p className="dest-card__body">{destinations.futureNote}</p>
            <motion.a
              href="#request-assistance"
              className="link-cta link-cta--light"
              onClick={requestJourney('Other')}
              whileHover={{ x: 4 }}
              transition={spring}
            >
              {destinations.futureCta}
              <Icon name="arrowRight" size={16} />
            </motion.a>
          </motion.article>
        </Reveal>
      </div>
    </section>
  );
}
