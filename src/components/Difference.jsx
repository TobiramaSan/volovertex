import { motion } from 'motion/react';
import Icon from './Icon.jsx';
import Reveal from './Reveal.jsx';
import { difference } from '../data/content.js';
import { cardIn, fadeUp, spring, stagger } from '../lib/motion.js';

export default function Difference() {
  return (
    <section className="section section--tint" aria-labelledby="difference-title">
      <div className="container stack-lg">
        <Reveal as="h2" id="difference-title" className="display h2-lg" variants={fadeUp}>
          {difference.headline}
        </Reveal>

        <Reveal as="ul" className="difference-grid" variants={stagger(0.08)}>
          {difference.items.map((item) => (
            <motion.li
              key={item.title}
              className="difference-item"
              variants={cardIn}
              whileHover={{ y: -4 }}
              transition={spring}
            >
              <motion.span
                className="difference-item__icon"
                whileHover={{ scale: 1.12, rotate: -6 }}
                transition={spring}
              >
                <Icon name={item.icon} size={22} />
              </motion.span>
              <h3 className="difference-item__title">{item.title}</h3>
              <p className="difference-item__body">{item.body}</p>
            </motion.li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
