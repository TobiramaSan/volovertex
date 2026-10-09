import { motion } from 'motion/react';
import Icon from './Icon.jsx';
import Reveal from './Reveal.jsx';
import { business } from '../data/content.js';
import { mailLink, requestJourney, whatsappLink } from '../lib/links.js';
import { contact } from '../data/content.js';
import { cardIn, ease, fadeSide, fadeUp, listItem, maskLine, spring, stagger, viewport } from '../lib/motion.js';

export default function Business() {
  return (
    <section id="business" className="section section--tint" aria-labelledby="business-title">
      <div className="container stack-xl">
        <div className="split split--center">
          <Reveal as="div" className="stack-md" variants={stagger(0.1)}>
            <motion.p className="eyebrow" variants={fadeUp}>
              Business &amp; Partners
            </motion.p>
            <motion.h2 id="business-title" className="display h2-lg" variants={fadeUp}>
              {business.headline}
            </motion.h2>
            <motion.p className="lede" variants={fadeUp}>
              {business.copy}
            </motion.p>
            <motion.div className="btn-row" variants={fadeUp}>
              <motion.a
                href="#request-assistance"
                className="btn btn--primary btn--lg"
                onClick={requestJourney('Group travel')}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={spring}
              >
                {business.cta}
                <Icon name="arrowRight" size={17} />
              </motion.a>
              <motion.a
                href={mailLink(contact.partnershipsEmail, 'VoloVertex partnership enquiry')}
                className="btn btn--outline btn--lg"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={spring}
              >
                {business.secondaryCta}
              </motion.a>
            </motion.div>
          </Reveal>

          <Reveal as="div" className="partners" variants={fadeSide(32)}>
            <p className="micro-label">{business.partnersLabel}</p>
            <motion.ul className="partners__list" variants={stagger(0.09, 0.2)}>
              {business.partners.map((partner) => (
                <motion.li key={partner.title} variants={listItem({ y: 12 })}>
                  <span className="partners__title">{partner.title}</span>
                  <span className="partners__body">{partner.body}</span>
                </motion.li>
              ))}
            </motion.ul>
          </Reveal>
        </div>

        <Reveal as="div" className="account" variants={stagger(0.1)}>
          <motion.div className="account__copy" variants={fadeUp}>
            <h3 className="display account__title">
              <span className="line-mask">
                <motion.span className="line-mask__inner" variants={maskLine}>
                  {business.account.headline[0]}
                </motion.span>
              </span>
              <span className="line-mask">
                <motion.em className="line-mask__inner" variants={maskLine}>
                  {business.account.headline[1]}
                </motion.em>
              </span>
            </h3>
            <p className="account__body">{business.account.copy}</p>
            <div className="btn-row">
              <motion.a
                href="#request-assistance"
                className="btn btn--gold"
                onClick={requestJourney('Group travel')}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={spring}
              >
                {business.account.cta}
              </motion.a>
              <motion.a
                href={whatsappLink('corporate')}
                className="btn btn--outline-light"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={spring}
              >
                <Icon name="whatsapp" size={18} />
                WhatsApp us
              </motion.a>
            </div>
          </motion.div>

          <motion.div className="account__benefits" variants={cardIn}>
            <p className="micro-label micro-label--onDark">{business.account.benefitsLabel}</p>
            <motion.ul variants={stagger(0.07, 0.25)}>
              {business.account.benefits.map((benefit) => (
                <motion.li key={benefit} variants={listItem({ x: -12 })}>
                  <Icon name="check" size={15} strokeWidth={2.2} />
                  {benefit}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
