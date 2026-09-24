import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Icon from './Icon.jsx';
import Reveal from './Reveal.jsx';
import { ease, fadeUp, stagger } from '../lib/motion.js';

import { faq } from '../data/content.js';

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="section section--tint" aria-labelledby="faq-title">
      <div className="container faq">
        <Reveal as="div" className="faq__intro" variants={stagger(0.09)}>
          <motion.p className="eyebrow" variants={fadeUp}>
            FAQ
          </motion.p>
          <motion.h2 id="faq-title" className="display h2-lg" variants={fadeUp}>
            {faq.headline}
          </motion.h2>
          <motion.p className="lede" variants={fadeUp}>
            Still unsure? Send us a message and a person will answer.
          </motion.p>
        </Reveal>

        <Reveal as="ul" className="faq__list" variants={stagger(0.07)}>
          {faq.items.map((item, i) => {
            const open = openIndex === i;
            return (
              <motion.li key={item.q} className={`faq__item${open ? ' is-open' : ''}`} variants={fadeUp}>
                <h3>
                  <button
                    type="button"
                    className="faq__question"
                    aria-expanded={open}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-button-${i}`}
                    onClick={() => setOpenIndex(open ? -1 : i)}
                  >
                    <span>{item.q}</span>
                    {/* the sign spins from plus to minus rather than blinking */}
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={open ? 'minus' : 'plus'}
                        className="faq__sign"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.18, ease }}
                      >
                        <Icon name={open ? 'minus' : 'plus'} size={20} />
                      </motion.span>
                    </AnimatePresence>
                  </button>
                </h3>

                {/* the panel measures its own content, so answers of any length
                    open at the same pace */}
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      id={`faq-panel-${i}`}
                      role="region"
                      aria-labelledby={`faq-button-${i}`}
                      className="faq__panel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        height: { duration: 0.34, ease },
                        opacity: { duration: 0.22, ease },
                      }}
                    >
                      <div className="faq__answer">
                        <p>{item.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
