import { motion } from 'motion/react';
import Reveal from './Reveal.jsx';
import { about } from '../data/content.js';
import { cardIn, fadeSide, fadeUp, stagger } from '../lib/motion.js';

export default function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container stack-xl">
        <div className="split split--center">
          <Reveal as="div" className="stack-md" variants={stagger(0.1)}>
            <motion.p className="eyebrow" variants={fadeUp}>
              About VoloVertex
            </motion.p>
            <motion.h2 id="about-title" className="display h2-lg" variants={fadeUp}>
              {about.headline}
            </motion.h2>
            {about.copy.map((p) => (
              <motion.p key={p} className="lede" variants={fadeUp}>
                {p}
              </motion.p>
            ))}
          </Reveal>

          <Reveal as="div" className="mv" variants={stagger(0.14)}>
            {[about.mission, about.vision].map((item) => (
              <motion.div key={item.label} className="mv__item" variants={fadeSide(30)}>
                <p className="micro-label">{item.label}</p>
                <p className="display mv__text">{item.body}</p>
              </motion.div>
            ))}
          </Reveal>
        </div>

        {/* the three stages arrive in order, because they are an order */}
        <Reveal as="ol" className="arch" variants={stagger(0.12)}>
          {about.architecture.map((stage) => (
            <motion.li key={stage.stage} className="arch__item" variants={cardIn}>
              <span className="arch__stage">{stage.stage}</span>
              <span className="arch__body">{stage.body}</span>
            </motion.li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
