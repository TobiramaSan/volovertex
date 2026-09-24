import { motion } from 'motion/react';
import Icon from './Icon.jsx';
import Reveal from './Reveal.jsx';
import { trust } from '../data/content.js';
import { cardIn, fadeUp, spring, stagger } from '../lib/motion.js';

export default function Trust() {
  return (
    <section className="section" aria-labelledby="trust-title">
      <div className="container stack-lg">
        <Reveal as="h2" id="trust-title" className="display h2-lg trust__title" variants={fadeUp}>
          {trust.headline}
        </Reveal>

        <Reveal as="ul" className="trust-grid" variants={stagger(0.08)}>
          {trust.items.map((item) => (
            <motion.li key={item.title} className="trust-item" variants={cardIn}>
              <motion.span
                className="trust-item__icon"
                whileHover={{ scale: 1.12, rotate: 6 }}
                transition={spring}
              >
                <Icon name={item.icon} size={22} />
              </motion.span>
              <div>
                <h3 className="trust-item__title">{item.title}</h3>
                <p className="trust-item__body">{item.body}</p>
              </div>
            </motion.li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
