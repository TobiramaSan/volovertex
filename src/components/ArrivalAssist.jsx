import { motion, useReducedMotion } from 'motion/react';
import Icon from './Icon.jsx';
import PhotoSlot from './PhotoSlot.jsx';
import Reveal from './Reveal.jsx';
import { arrival, photos } from '../data/content.js';
import { requestJourney, whatsappLink } from '../lib/links.js';
import { ease, fadeSide, fadeUp, spring, stagger } from '../lib/motion.js';

const inView = { once: true, amount: 0.4 };

/**
 * Arrivals: the aircraft comes down the approach while the car and the name
 * board are already in place — which is the whole promise of the section.
 */
function ArrivalArt() {
  const still = useReducedMotion();

  return (
    <svg className="arrival__art" viewBox="0 0 620 460" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="620" height="460" fill="#EDF1EF" />
      <circle cx="470" cy="120" r="150" fill="#E2EAE7" />
      <path d="M0 360 H620" stroke="#C6D3CE" strokeWidth="2" />
      <path d="M40 380 H140 M190 380 H290 M340 380 H440 M490 380 H590" stroke="#C6D3CE" strokeWidth="6" strokeLinecap="round" />

      {/* The approach path streams towards the aircraft. It animates
          strokeDashoffset rather than pathLength, because pathLength would take
          over strokeDasharray and flatten the dotted line into a solid one. */}
      <motion.path
        d="M80 60 C 160 90, 220 130, 258 158"
        stroke="#1F5451"
        strokeWidth="1.6"
        strokeDasharray="5 8"
        fill="none"
        initial={{ opacity: 0 }}
        whileInView={still ? { opacity: 0.5 } : { opacity: 0.5, strokeDashoffset: [0, -26] }}
        viewport={inView}
        transition={
          still
            ? { duration: 0.4 }
            : {
                opacity: { duration: 0.6, ease },
                strokeDashoffset: { duration: 2.2, ease: 'linear', repeat: Infinity },
              }
        }
      />
      <g transform="translate(300 170) rotate(12)">
        <motion.g
          initial={{ opacity: 0, x: -70, y: -46 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={inView}
          transition={{ duration: 1.3, ease, delay: 0.25 }}
        >
          <path
            d="M-46 0 L46 0 M8 0 L-17 -35 L-6 -35 L30 0 M8 0 L-17 35 L-6 35 L30 0 M-41 0 L-52 -17 L-43 -17 L-29 0 M-41 0 L-52 17 L-43 17 L-29 0"
            stroke="#1F5451"
            strokeWidth="3.4"
            strokeLinejoin="round"
            strokeLinecap="round"
            fill="none"
          />
        </motion.g>
      </g>

      {/* waiting car — already there, settling on its suspension */}
      <g transform="translate(150 330)">
        <motion.g
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={inView}
          transition={{ duration: 0.8, ease }}
        >
          <rect x="-52" y="-26" width="104" height="30" rx="9" fill="#1F5451" />
          <path d="M-34 -26 l12 -18 h44 l12 18 z" fill="#2A6A66" />
          <circle cx="-28" cy="8" r="8" fill="#0E2B29" />
          <circle cx="30" cy="8" r="8" fill="#0E2B29" />
        </motion.g>
      </g>

      {/* the name board goes up, then the name is written on it */}
      <g transform="translate(430 300)">
        <motion.g
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ duration: 0.6, ease, delay: 0.5 }}
        >
          <rect x="-44" y="-34" width="88" height="56" rx="6" fill="#FFFFFF" stroke="#1F5451" strokeWidth="2" />
          {[
            { d: 'M-28 -16 h56', delay: 0.9 },
            { d: 'M-28 -4 h40', delay: 1.05 },
            { d: 'M-28 8 h30', delay: 1.2 },
          ].map((line) => (
            <motion.path
              key={line.d}
              d={line.d}
              stroke="#C9A87C"
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={inView}
              transition={{ duration: 0.4, ease, delay: line.delay }}
            />
          ))}
          <path d="M0 22 v26" stroke="#1F5451" strokeWidth="3" strokeLinecap="round" />
        </motion.g>
      </g>
    </svg>
  );
}

export default function ArrivalAssist() {
  return (
    <section id="arrival" className="section" aria-labelledby="arrival-title">
      <div className="container split split--center">
        <PhotoSlot
          className="arrival__visual"
          src={photos.arrival}
          alt="A VoloVertex driver waiting at arrivals with a name board"
          caption="Photo slot — meet and greet at arrivals"
          variants={fadeSide(-34)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <ArrivalArt />
        </PhotoSlot>

        <Reveal as="div" className="stack-md" variants={stagger(0.1)}>
          <motion.p className="eyebrow" variants={fadeUp}>
            {arrival.eyebrow}
          </motion.p>
          <motion.h2 id="arrival-title" className="display h2-lg" variants={fadeUp}>
            {arrival.headline}
          </motion.h2>
          {arrival.copy.map((p) => (
            <motion.p key={p} className="lede" variants={fadeUp}>
              {p}
            </motion.p>
          ))}
          <motion.div className="btn-row" variants={fadeUp}>
            <motion.a
              href="#request-assistance"
              className="btn btn--primary btn--lg"
              onClick={requestJourney('From the airport')}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={spring}
            >
              {arrival.cta}
              <Icon name="arrowRight" size={17} />
            </motion.a>
            <motion.a
              href={whatsappLink('arrival')}
              className="btn btn--outline btn--lg"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={spring}
            >
              <Icon name="whatsapp" size={18} />
              {arrival.secondaryCta}
            </motion.a>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
