import { motion } from 'motion/react';
import Icon from './Icon.jsx';
import Reveal from './Reveal.jsx';
import SectionHeading from './SectionHeading.jsx';
import { launchServices } from '../data/content.js';
import { requestJourney } from '../lib/links.js';
import { cardIn, ease, spring, stagger } from '../lib/motion.js';

export default function LaunchServices() {
  return (
    <section id="services" className="section" aria-labelledby="services-title">
      <div className="container stack-xl">
        <SectionHeading
          id="services-title"
          eyebrow="Launch services"
          title="Travel Made Easier"
          intro="Four services cover the journey around your flight — leaving home, landing, and everything you might need alongside it."
          split
        />

        <Reveal as="div" className="service-grid" variants={stagger(0.1)}>
          {launchServices.map((service) => (
            <motion.article
              key={service.id}
              className="service-card"
              variants={cardIn}
              whileHover={{ y: -6 }}
              transition={spring}
            >
              <div className="service-card__head">
                <motion.span
                  className="icon-tile"
                  whileHover={{ rotate: -8, scale: 1.08 }}
                  transition={spring}
                >
                  <Icon name={service.icon} size={26} />
                </motion.span>
                <p className="service-card__label">{service.title}</p>
              </div>

              <h3 className="display service-card__headline">{service.headline}</h3>
              <p className="service-card__body">{service.body}</p>

              {service.suitableFor && (
                <div className="service-card__suitable">
                  <p className="micro-label">{service.suitableLabel}</p>
                  <ul>
                    {/* each tick lands in turn, so the list reads as it fills */}
                    {service.suitableFor.map((item, i) => (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ duration: 0.35, ease, delay: 0.15 + i * 0.07 }}
                      >
                        <Icon name="check" size={15} strokeWidth={2} />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}

              <motion.a
                href="#request-assistance"
                className="btn btn--primary service-card__cta"
                onClick={requestJourney(service.journeyType)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={spring}
              >
                {service.cta}
                <Icon name="arrowRight" size={16} />
              </motion.a>
            </motion.article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
