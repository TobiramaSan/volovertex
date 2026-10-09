/**
 * The shared motion language.
 *
 * VoloVertex is a calm, premium brand, so movement here is deliberately
 * restrained: short travel, a soft deceleration, nothing that bounces unless it
 * is confirming something back to the traveller.
 *
 * Every variant animates transform and opacity only, so reveals stay on the
 * compositor. `<MotionConfig reducedMotion="user">` in App.jsx strips the
 * transform half automatically when the operating system asks for less motion,
 * which leaves a plain cross-fade rather than nothing at all.
 *
 * Variants that take a `custom` value use it as an extra delay in seconds.
 */

/** Soft deceleration — the house ease. */
export const ease = [0.22, 1, 0.36, 1];

/** For things the user acts on directly and expects to feel physical. */
export const spring = { type: 'spring', stiffness: 380, damping: 30 };

/** A slower, heavier spring for panels and bars. */
export const springSoft = { type: 'spring', stiffness: 260, damping: 32 };

/**
 * Scroll reveals play once and start a little before the element is fully in
 * view, so content is already settled by the time it is worth reading.
 */
/**
 * Scroll reveals play once, triggered as soon as any part of the element clears
 * the bottom margin.
 *
 * `amount` is deliberately 'some' rather than a fraction. An IntersectionObserver
 * is only sampled once a frame, so a fractional threshold gives a narrow window
 * that a fast scroll can jump clean over — a flick on a phone, a scrollbar drag,
 * a restored scroll position. Combined with `once: true` the reveal then never
 * fires and the content is left sitting at its hidden value. 'some' widens the
 * window to the element's own height plus the viewport, which no realistic
 * scroll can skip. Every reveal on the site shares this object; per-element
 * thresholds are what caused that bug, so prefer a delay over a new threshold.
 */
export const viewport = { once: true, amount: 'some', margin: '0px 0px -40px 0px' };

export const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease, delay },
  }),
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: (delay = 0) => ({ opacity: 1, transition: { duration: 0.7, ease, delay } }),
};

/** Slide in from the side — for the two-column split layouts. */
export const fadeSide = (from = -30) => ({
  hidden: { opacity: 0, x: from },
  show: (delay = 0) => ({ opacity: 1, x: 0, transition: { duration: 0.65, ease, delay } }),
});

/** Cards settle with a touch of scale, so a grid feels dealt rather than dropped. */
export const cardIn = {
  hidden: { opacity: 0, y: 26, scale: 0.985 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease, delay },
  }),
};

/** A headline line rising out of its own clipping mask. */
export const maskLine = {
  hidden: { y: '125%' },
  show: (delay = 0) => ({ y: '0%', transition: { duration: 0.75, ease, delay } }),
};

/**
 * A list item arriving in sequence. These are driven by their parent's
 * `staggerChildren` rather than each item watching the viewport itself: a
 * per-item observer can be skipped independently of its section on a fast
 * scroll, which left single bullets invisible. One observer per section cannot
 * desync from the content around it.
 */
export const listItem = ({ x = 0, y = 0 } = {}) => ({
  hidden: { opacity: 0, x, y },
  show: { opacity: 1, x: 0, y: 0, transition: { duration: 0.38, ease } },
});

/** The map pin dropping onto a destination card. */
export const pinDrop = {
  hidden: { opacity: 0, y: -8 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 500, damping: 18 } },
};

/**
 * Parent that hands its children a staggered start. Children only need to
 * declare their own `hidden`/`show` variants — Motion propagates the trigger.
 */
export const stagger = (step = 0.08, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: step, delayChildren: delay } },
});

/** The standard reveal set-up, spread onto any motion component. */
export const revealProps = {
  initial: 'hidden',
  whileInView: 'show',
  viewport,
};
