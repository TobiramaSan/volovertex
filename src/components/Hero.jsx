import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import Icon from './Icon.jsx';
import PhotoSlot from './PhotoSlot.jsx';
import { hero, brand, photos } from '../data/content.js';
import { requestJourney } from '../lib/links.js';
import { ease, fadeUp, maskLine, spring, stagger } from '../lib/motion.js';

const STAR_POSITIONS = [
  { cx: 86, cy: 92, r: 1.6 },
  { cx: 214, cy: 56, r: 1.2 },
  { cx: 330, cy: 120, r: 1.7 },
  { cx: 470, cy: 70, r: 1.3 },
  { cx: 566, cy: 150, r: 1.5 },
  { cx: 148, cy: 188, r: 1.2 },
  { cx: 404, cy: 200, r: 1.4 },
];

const WINDOWS = [
  { x: 160, y: 548 },
  { x: 174, y: 566 },
  { x: 280, y: 600 },
  { x: 344, y: 562 },
  { x: 448, y: 570 },
  { x: 552, y: 580 },
];

/**
 * Pre-dawn departure scene: the moment the brief is built around — leaving home
 * while it is still dark, with the airport ahead.
 *
 * The scene is alive rather than animated at: stars breathe, the flight path
 * streams, the aircraft floats, and the car pulls away from the city once. All
 * of it is slow enough to read as atmosphere behind the headline.
 */
function HeroArt() {
  // reducedMotion="user" only trims transforms; an endlessly looping twinkle is
  // exactly what someone asking for less motion does not want, so the ambient
  // loops are switched off outright here rather than merely shortened.
  const still = useReducedMotion();
  const loop = (config) => (still ? { duration: 0 } : config);
  const at = (values) => (still ? undefined : values);

  return (
    <svg className="hero__art" viewBox="0 0 640 720" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="vv-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0B2523" />
          <stop offset="55%" stopColor="#14413D" />
          <stop offset="100%" stopColor="#25635C" />
        </linearGradient>
        <linearGradient id="vv-dawn" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#C9A87C" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#C9A87C" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width="640" height="720" fill="url(#vv-sky)" />

      {/* the dawn band warms up as if the sun were still climbing */}
      <motion.rect
        y="430"
        width="640"
        height="290"
        fill="url(#vv-dawn)"
        initial={{ opacity: 0.3 }}
        animate={still ? { opacity: 0.55 } : { opacity: [0.38, 0.62, 0.38] }}
        transition={loop({ duration: 11, ease: 'easeInOut', repeat: Infinity })}
      />

      {/* stars, each breathing on its own clock */}
      <g fill="#F4F1E8">
        {STAR_POSITIONS.map((star, i) => (
          <motion.circle
            key={`${star.cx}-${star.cy}`}
            cx={star.cx}
            cy={star.cy}
            r={star.r}
            initial={{ opacity: 0 }}
            animate={still ? { opacity: 0.55 } : { opacity: [0.2, 0.75, 0.2] }}
            transition={loop({
              duration: 3.4 + i * 0.6,
              ease: 'easeInOut',
              repeat: Infinity,
              delay: i * 0.45,
            })}
          />
        ))}
      </g>

      {/* sun just under the horizon */}
      <motion.circle
        cx="320"
        cy="470"
        r="86"
        fill="#C9A87C"
        initial={{ opacity: 0.4, scale: 1 }}
        animate={still ? { opacity: 0.4 } : { opacity: [0.28, 0.48, 0.28], scale: [1, 1.07, 1] }}
        transition={loop({ duration: 9, ease: 'easeInOut', repeat: Infinity })}
        style={{ originX: '320px', originY: '470px' }}
      />
      <circle cx="320" cy="470" r="52" fill="#C9A87C" opacity="0.85" />

      {/* flight path — the dashes stream towards the aircraft */}
      <motion.path
        d="M-20 520 C 140 470, 250 330, 420 268 S 600 190, 680 150"
        stroke="#F4F1E8"
        strokeWidth="1.6"
        strokeDasharray="5 9"
        fill="none"
        opacity="0.65"
        animate={at({ strokeDashoffset: [0, -28] })}
        transition={loop({ duration: 2.6, ease: 'linear', repeat: Infinity })}
      />

      {/* aircraft climbing away, floating on the airstream */}
      <g transform="translate(420 268) rotate(-28)">
        <motion.g
          initial={{ opacity: 0, x: -56, y: 22 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1.5, ease, delay: 0.35 }}
        >
          <motion.g
            animate={at({ y: [-3.5, 3.5, -3.5] })}
            transition={loop({ duration: 5.5, ease: 'easeInOut', repeat: Infinity })}
          >
            <path
              d="M-30 0 L30 0 M5 0 L-11 -23 L-3 -23 L20 0 M5 0 L-11 23 L-3 23 L20 0 M-27 0 L-34 -11 L-28 -11 L-19 0 M-27 0 L-34 11 L-28 11 L-19 0"
              stroke="#F4F1E8"
              strokeWidth="2.6"
              strokeLinejoin="round"
              strokeLinecap="round"
              fill="none"
            />
          </motion.g>
        </motion.g>
      </g>

      {/* city skyline */}
      <path
        d="M0 720 L0 600 L48 600 L48 560 L96 560 L96 604 L150 604 L150 534 L188 534 L188 500 L216 500 L216 534 L268 534 L268 586 L332 586 L332 548 L384 548 L384 600 L436 600 L436 556 L486 556 L486 596 L540 596 L540 566 L592 566 L592 612 L640 612 L640 720 Z"
        fill="#0A211F"
      />

      {/* windows coming on one by one — the city waking up */}
      <g fill="#C9A87C">
        {WINDOWS.map((w, i) => (
          <motion.rect
            key={`${w.x}-${w.y}`}
            x={w.x}
            y={w.y}
            width="5"
            height="8"
            initial={{ opacity: 0 }}
            animate={still ? { opacity: 0.7 } : { opacity: [0, 0.75, 0.55, 0.75] }}
            transition={loop({
              duration: 4,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatType: 'reverse',
              delay: 0.8 + i * 0.5,
            })}
          />
        ))}
      </g>

      {/* road with a car heading out of the city */}
      <motion.path
        d="M0 700 L640 662"
        stroke="#F4F1E8"
        strokeWidth="1"
        strokeDasharray="14 12"
        opacity="0.35"
        animate={at({ strokeDashoffset: [0, -52] })}
        transition={loop({ duration: 2.2, ease: 'linear', repeat: Infinity })}
      />
      <g transform="translate(214 664)">
        <motion.g
          initial={{ x: -250, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 2.1, ease, delay: 0.15 }}
        >
          <rect x="-26" y="-12" width="52" height="15" rx="5" fill="#F4F1E8" opacity="0.92" />
          <path d="M-17 -12 l7 -9 h20 l7 9 z" fill="#F4F1E8" opacity="0.72" />
          <circle cx="-14" cy="4" r="4" fill="#0A211F" />
          <circle cx="15" cy="4" r="4" fill="#0A211F" />
          <motion.path
            d="M28 -6 l26 -4"
            stroke="#C9A87C"
            strokeWidth="2.4"
            strokeLinecap="round"
            animate={still ? { opacity: 0.9 } : { opacity: [0.55, 1, 0.55] }}
            transition={loop({ duration: 2.8, ease: 'easeInOut', repeat: Infinity, delay: 2 })}
          />
        </motion.g>
      </g>
    </svg>
  );
}

export default function Hero() {
  // The scene drifts slower than the page, which gives the hero a little depth
  // without ever exposing an edge — `.hero__art` is scaled up to leave room.
  const { scrollY } = useScroll();
  const artY = useTransform(scrollY, [0, 900], [-28, 28]);

  return (
    <section id="top" className="hero">
      <div className="container hero__grid">
        <motion.div className="hero__copy" initial="hidden" animate="show" variants={stagger(0.11, 0.1)}>
          <motion.p className="pill" variants={fadeUp}>
            <Icon name="pin" size={15} />
            Starting in {brand.launchMarket}
          </motion.p>

          {/* each line rises out of its own mask, the way a departure board flips */}
          <h1 className="display hero__title">
            <span className="hero__title-mask">
              <motion.span className="hero__title-line" variants={maskLine}>
                {hero.headline[0]}
              </motion.span>
            </span>
            <span className="hero__title-mask">
              <motion.span className="hero__title-line hero__title-accent" variants={maskLine}>
                {hero.headline[1]}
              </motion.span>
            </span>
          </h1>

          <motion.p className="hero__lede" variants={fadeUp}>
            {hero.copy}
          </motion.p>

          <motion.div className="hero__actions" variants={fadeUp}>
            <motion.a
              href="#request-assistance"
              className="btn btn--primary btn--lg"
              onClick={requestJourney('')}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={spring}
            >
              {hero.primaryCta}
              <Icon name="arrowRight" size={17} />
            </motion.a>
            <motion.a
              href="#early-flight"
              className="btn btn--outline btn--lg"
              onClick={requestJourney('Early flight')}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={spring}
            >
              {hero.secondaryCta}
            </motion.a>
          </motion.div>

          <motion.ul className="hero__tags" variants={stagger(0.07)}>
            {hero.microcopy.map((item) => (
              <motion.li key={item} variants={fadeUp}>
                {item}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        <PhotoSlot
          className="hero__visual"
          src={photos.hero}
          alt="A VoloVertex car leaving for the airport before sunrise"
          caption="Photo slot — pre-dawn departure"
          artStyle={{ y: artY, scale: 1.12 }}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease }}
        >
          <HeroArt />
        </PhotoSlot>
      </div>
    </section>
  );
}
