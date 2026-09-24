import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Icon from './Icon.jsx';
import Reveal from './Reveal.jsx';
import { contact, finalCta, requestFlow } from '../data/content.js';
import { mailLink, telLink, whatsappLink } from '../lib/links.js';
import { ease, fadeUp, spring, stagger } from '../lib/motion.js';

const STEPS = [
  { id: 1, label: 'Journey type' },
  { id: 2, label: 'Flight' },
  { id: 3, label: 'Pickup' },
  { id: 4, label: 'Traveller' },
  { id: 5, label: 'Extras' },
];

const emptyForm = {
  journeyType: '',
  flightNumber: '',
  travelDate: '',
  flightTime: '',
  airport: '',
  pickupLocation: '',
  destination: '',
  name: '',
  phone: '',
  email: '',
  passengers: '1',
  luggage: '',
  notes: '',
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Steps travel in the direction the user is going: forward slides in from the
 * right, Back from the left. `custom` carries that direction into the variants.
 */
const stepPanel = {
  enter: (dir) => ({ opacity: 0, x: dir >= 0 ? 34 : -34 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.32, ease } },
  exit: (dir) => ({ opacity: 0, x: dir >= 0 ? -34 : 34, transition: { duration: 0.2, ease } }),
};

/** Validation messages arrive rather than appear, so they are hard to miss. */
function FieldError({ id, children }) {
  return (
    <AnimatePresence>
      {children && (
        <motion.p
          id={id}
          className="field__error"
          initial={{ opacity: 0, y: -6, height: 0 }}
          animate={{ opacity: 1, y: 0, height: 'auto' }}
          exit={{ opacity: 0, y: -6, height: 0 }}
          transition={{ duration: 0.22, ease }}
        >
          {children}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

/**
 * The journey request flow (section 20 of the brief) paired with the closing
 * homepage CTA (section 25). Captures the CRM fields listed in section 28.
 */
export default function RequestAssistance() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent
  const headingRef = useRef(null);
  const shouldFocus = useRef(false);

  // Service CTAs elsewhere on the page pre-select a journey type and jump here.
  useEffect(() => {
    const onRequest = (event) => {
      const type = event.detail && event.detail.journeyType;
      if (status === 'sent') return;
      setDirection(1);
      if (type) {
        setForm((f) => ({ ...f, journeyType: type }));
        setStep(2);
      } else {
        setStep(1);
      }
    };
    window.addEventListener('vv:request', onRequest);
    return () => window.removeEventListener('vv:request', onRequest);
  }, [status]);

  // Move focus to the step heading after a step change the user triggered.
  useEffect(() => {
    if (shouldFocus.current && headingRef.current) {
      headingRef.current.focus();
      shouldFocus.current = false;
    }
  }, [step]);

  const update = (field) => (e) => {
    const { value } = e.target;
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((err) => (err[field] ? { ...err, [field]: undefined } : err));
  };

  const pickJourney = (type) => {
    setForm((f) => ({ ...f, journeyType: type }));
    setErrors((err) => ({ ...err, journeyType: undefined }));
  };

  const validateStep = (which) => {
    const next = {};
    if (which === 1 && !form.journeyType) next.journeyType = 'Choose the kind of journey you need.';
    if (which === 2) {
      if (!form.travelDate.trim()) next.travelDate = 'Add your travel date.';
      if (!form.airport) next.airport = 'Choose the airport.';
    }
    if (which === 3) {
      if (!form.pickupLocation.trim()) next.pickupLocation = 'Add where we should pick you up.';
      if (!form.destination.trim()) next.destination = 'Add where you are going.';
    }
    if (which === 4) {
      if (!form.name.trim()) next.name = 'Add your full name.';
      if (!form.phone.trim()) next.phone = 'Add a phone or WhatsApp number.';
      if (form.email.trim() && !emailPattern.test(form.email.trim())) {
        next.email = 'Enter an email address like you@example.com.';
      }
    }
    return next;
  };

  const goNext = () => {
    const found = validateStep(step);
    setErrors(found);
    if (Object.keys(found).length) return;
    shouldFocus.current = true;
    setDirection(1);
    setStep((s) => Math.min(s + 1, STEPS.length));
  };

  const goBack = () => {
    shouldFocus.current = true;
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Enter inside a field on an earlier step advances instead of submitting.
    if (step < STEPS.length) {
      goNext();
      return;
    }

    // Re-check every step so nothing skipped slips through.
    const all = [1, 2, 3, 4].reduce((acc, s) => ({ ...acc, ...validateStep(s) }), {});
    if (Object.keys(all).length) {
      setErrors(all);
      const firstBad = [1, 2, 3, 4].find((s) => Object.keys(validateStep(s)).length);
      shouldFocus.current = true;
      setDirection(-1);
      setStep(firstBad);
      return;
    }

    setStatus('sending');

    const payload = {
      ...form,
      leadSource: typeof document !== 'undefined' ? document.referrer || 'direct' : 'direct',
      submittedAt: new Date().toISOString(),
    };

    // ---------------------------------------------------------------------
    // TODO: send `payload` to your backend, CRM or form service, e.g.
    // await fetch('/api/journey-requests', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(payload),
    // });
    // ---------------------------------------------------------------------
    console.info('VoloVertex journey request:', payload);

    await new Promise((r) => setTimeout(r, 700));
    setStatus('sent');
  };

  const reset = () => {
    setForm(emptyForm);
    setErrors({});
    setDirection(-1);
    setStep(1);
    setStatus('idle');
  };

  const firstName = form.name.trim().split(' ')[0];

  return (
    <section id="request-assistance" className="section section--pine request" aria-labelledby="request-title">
      <div className="container split">
        <Reveal as="div" className="stack-md request__intro" variants={stagger(0.1)}>
          <motion.h2 id="request-title" className="display h2-xl" variants={fadeUp}>
            {finalCta.headline}
          </motion.h2>
          <motion.p className="lede lede--onDark" variants={fadeUp}>
            {finalCta.copy}
          </motion.p>

          <motion.div className="contact-options" id="contact" variants={fadeUp}>
            {[
              { icon: 'whatsapp', label: 'WhatsApp', value: contact.whatsappNumber, href: whatsappLink('default') },
              { icon: 'phone', label: 'Phone', value: contact.phoneDisplay, href: telLink() },
              { icon: 'mail', label: 'Email', value: contact.email, href: mailLink() },
            ].map((option) => (
              <motion.a
                key={option.label}
                href={option.href}
                className="contact-option"
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.99 }}
                transition={spring}
              >
                <Icon name={option.icon} size={20} />
                <span>
                  <span className="contact-option__label">{option.label}</span>
                  <span className="contact-option__value">{option.value}</span>
                </span>
              </motion.a>
            ))}
          </motion.div>
        </Reveal>

        <motion.div
          className="form-card"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {status === 'sent' ? (
              <motion.div
                key="success"
                className="form-success"
                role="status"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.4, ease, staggerChildren: 0.08 } }}
                exit={{ opacity: 0, y: -12, transition: { duration: 0.2, ease } }}
              >
                {/* the tick lands with a little weight — this is the payoff */}
                <motion.span
                  className="form-success__tick"
                  initial={{ scale: 0, rotate: -35 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 420, damping: 16, delay: 0.1 }}
                >
                  <Icon name="check" size={28} strokeWidth={2.4} />
                </motion.span>
                <motion.h3
                  className="display form-success__title"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease, delay: 0.24 }}
                >
                  Thank you{firstName ? `, ${firstName}` : ''}.
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease, delay: 0.32 }}
                >
                  We have your request for <strong>{form.journeyType || 'assistance'}</strong> on{' '}
                  <strong>{form.travelDate}</strong>. A VoloVertex coordinator will contact you on{' '}
                  <strong>{form.phone}</strong> to confirm your journey plan.
                </motion.p>
                <motion.div
                  className="btn-row"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease, delay: 0.4 }}
                >
                  <motion.a
                    href={whatsappLink('default')}
                    className="btn btn--gold"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    transition={spring}
                  >
                    <Icon name="whatsapp" size={18} />
                    Message us now
                  </motion.a>
                  <motion.button
                    type="button"
                    className="btn btn--outline-light"
                    onClick={reset}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    transition={spring}
                  >
                    Request another journey
                  </motion.button>
                </motion.div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                noValidate
                className="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.2, ease } }}
                transition={{ duration: 0.3, ease }}
              >
                <div className="form__head">
                  <h3 className="form__title" ref={headingRef} tabIndex={-1}>
                    {/* the title cross-fades so the step change reads as one move */}
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={step}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2, ease }}
                        style={{ display: 'inline-block' }}
                      >
                        {step === 1 ? requestFlow.headline : STEPS[step - 1].label}
                      </motion.span>
                    </AnimatePresence>
                  </h3>
                  <p className="form__progress">
                    Step {step} of {STEPS.length}
                  </p>
                </div>

                {/* each segment fills from its left edge as the step is reached */}
                <ol className="progress" aria-hidden="true">
                  {STEPS.map((s) => (
                    <li key={s.id} className="progress__seg">
                      <motion.span
                        className="progress__fill"
                        initial={false}
                        animate={{ scaleX: s.id <= step ? 1 : 0 }}
                        transition={{ duration: 0.4, ease }}
                      />
                    </li>
                  ))}
                </ol>

                <AnimatePresence mode="wait" custom={direction} initial={false}>
                  <motion.div
                    key={step}
                    custom={direction}
                    variants={stepPanel}
                    initial="enter"
                    animate="center"
                    exit="exit"
                  >
                    {step === 1 && (
                      <fieldset className="field">
                        <legend className="visually-hidden">Journey type</legend>
                        <div className="option-grid">
                          {requestFlow.journeyTypes.map((type) => {
                            const on = form.journeyType === type;
                            return (
                              <motion.button
                                key={type}
                                type="button"
                                className={`option${on ? ' is-on' : ''}`}
                                aria-pressed={on}
                                onClick={() => pickJourney(type)}
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.97 }}
                                transition={spring}
                              >
                                {/* one gold pill slides between the choices */}
                                {on && (
                                  <motion.span
                                    layoutId="journey-pick"
                                    className="option__fill"
                                    transition={{ type: 'spring', stiffness: 460, damping: 38 }}
                                  />
                                )}
                                <span className="option__label">{type}</span>
                              </motion.button>
                            );
                          })}
                        </div>
                        <FieldError>{errors.journeyType}</FieldError>
                      </fieldset>
                    )}

                    {step === 2 && (
                      <div className="form__fields">
                        <div className="field">
                          <label htmlFor="r-flight">Flight number</label>
                          <input
                            id="r-flight"
                            type="text"
                            placeholder="e.g. WB 402"
                            value={form.flightNumber}
                            onChange={update('flightNumber')}
                          />
                          <p className="field__hint">Optional if you have not booked yet.</p>
                        </div>
                        <div className="form__row">
                          <div className="field">
                            <label htmlFor="r-date">Travel date</label>
                            <input
                              id="r-date"
                              type="date"
                              value={form.travelDate}
                              onChange={update('travelDate')}
                              aria-invalid={Boolean(errors.travelDate)}
                              aria-describedby={errors.travelDate ? 'r-date-err' : undefined}
                            />
                            <FieldError id="r-date-err">{errors.travelDate}</FieldError>
                          </div>
                          <div className="field">
                            <label htmlFor="r-time">Departure / arrival time</label>
                            <input id="r-time" type="time" value={form.flightTime} onChange={update('flightTime')} />
                          </div>
                        </div>
                        <div className="field">
                          <label htmlFor="r-airport">Airport</label>
                          <select
                            id="r-airport"
                            value={form.airport}
                            onChange={update('airport')}
                            aria-invalid={Boolean(errors.airport)}
                            aria-describedby={errors.airport ? 'r-airport-err' : undefined}
                          >
                            <option value="">Choose an airport</option>
                            {requestFlow.airports.map((a) => (
                              <option key={a} value={a}>
                                {a}
                              </option>
                            ))}
                          </select>
                          <FieldError id="r-airport-err">{errors.airport}</FieldError>
                        </div>
                      </div>
                    )}

                    {step === 3 && (
                      <div className="form__fields">
                        <div className="field">
                          <label htmlFor="r-pickup">Pickup location</label>
                          <input
                            id="r-pickup"
                            type="text"
                            placeholder="Address, hotel or area"
                            value={form.pickupLocation}
                            onChange={update('pickupLocation')}
                            aria-invalid={Boolean(errors.pickupLocation)}
                            aria-describedby={errors.pickupLocation ? 'r-pickup-err' : undefined}
                          />
                          <FieldError id="r-pickup-err">{errors.pickupLocation}</FieldError>
                        </div>
                        <div className="field">
                          <label htmlFor="r-dest">Destination</label>
                          <input
                            id="r-dest"
                            type="text"
                            placeholder="Where the journey ends"
                            value={form.destination}
                            onChange={update('destination')}
                            aria-invalid={Boolean(errors.destination)}
                            aria-describedby={errors.destination ? 'r-dest-err' : undefined}
                          />
                          <FieldError id="r-dest-err">{errors.destination}</FieldError>
                        </div>
                      </div>
                    )}

                    {step === 4 && (
                      <div className="form__fields">
                        <div className="field">
                          <label htmlFor="r-name">Full name</label>
                          <input
                            id="r-name"
                            type="text"
                            autoComplete="name"
                            value={form.name}
                            onChange={update('name')}
                            aria-invalid={Boolean(errors.name)}
                            aria-describedby={errors.name ? 'r-name-err' : undefined}
                          />
                          <FieldError id="r-name-err">{errors.name}</FieldError>
                        </div>
                        <div className="form__row">
                          <div className="field">
                            <label htmlFor="r-phone">Phone / WhatsApp</label>
                            <input
                              id="r-phone"
                              type="tel"
                              autoComplete="tel"
                              placeholder="+234…"
                              value={form.phone}
                              onChange={update('phone')}
                              aria-invalid={Boolean(errors.phone)}
                              aria-describedby={errors.phone ? 'r-phone-err' : undefined}
                            />
                            <FieldError id="r-phone-err">{errors.phone}</FieldError>
                          </div>
                          <div className="field">
                            <label htmlFor="r-email">Email</label>
                            <input
                              id="r-email"
                              type="email"
                              autoComplete="email"
                              placeholder="you@example.com"
                              value={form.email}
                              onChange={update('email')}
                              aria-invalid={Boolean(errors.email)}
                              aria-describedby={errors.email ? 'r-email-err' : undefined}
                            />
                            <FieldError id="r-email-err">{errors.email}</FieldError>
                          </div>
                        </div>
                        <div className="form__row">
                          <div className="field">
                            <label htmlFor="r-pax">Passengers</label>
                            <input
                              id="r-pax"
                              type="number"
                              min="1"
                              max="60"
                              value={form.passengers}
                              onChange={update('passengers')}
                            />
                          </div>
                          <div className="field">
                            <label htmlFor="r-lugg">Luggage</label>
                            <select id="r-lugg" value={form.luggage} onChange={update('luggage')}>
                              <option value="">Choose an option</option>
                              {requestFlow.luggageOptions.map((l) => (
                                <option key={l} value={l}>
                                  {l}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    )}

                    {step === 5 && (
                      <div className="form__fields">
                        <div className="field">
                          <label htmlFor="r-notes">What else should we know about your journey?</label>
                          <textarea
                            id="r-notes"
                            rows={5}
                            placeholder="Child seats, wheelchair access, extra stops, lounge or hotel coordination…"
                            value={form.notes}
                            onChange={update('notes')}
                          />
                        </div>
                        <dl className="summary">
                          {[
                            { term: 'Journey', value: form.journeyType || '—' },
                            {
                              term: 'Date',
                              value: `${form.travelDate || '—'}${form.flightTime ? ` · ${form.flightTime}` : ''}`,
                            },
                            {
                              term: 'Route',
                              value: `${form.pickupLocation || '—'} → ${form.destination || '—'}`,
                            },
                          ].map((row, i) => (
                            <motion.div
                              key={row.term}
                              initial={{ opacity: 0, x: 12 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, ease, delay: 0.15 + i * 0.07 }}
                            >
                              <dt>{row.term}</dt>
                              <dd>{row.value}</dd>
                            </motion.div>
                          ))}
                        </dl>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                <div className="form__nav">
                  <AnimatePresence initial={false}>
                    {step > 1 && (
                      <motion.button
                        key="back"
                        type="button"
                        className="btn btn--outline-light"
                        onClick={goBack}
                        initial={{ opacity: 0, width: 0, paddingLeft: 0, paddingRight: 0 }}
                        animate={{ opacity: 1, width: 'auto', paddingLeft: 22, paddingRight: 22 }}
                        exit={{ opacity: 0, width: 0, paddingLeft: 0, paddingRight: 0 }}
                        transition={{ duration: 0.26, ease }}
                        whileTap={{ scale: 0.97 }}
                      >
                        Back
                      </motion.button>
                    )}
                  </AnimatePresence>
                  {/* Distinct keys: React must swap the element, not mutate `type`
                      on the same node — otherwise the click that advances to the
                      last step also fires the form's submit default action. */}
                  {step < STEPS.length ? (
                    <motion.button
                      key="continue"
                      type="button"
                      className="btn btn--gold btn--grow"
                      onClick={goNext}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      transition={spring}
                    >
                      Continue
                      <Icon name="arrowRight" size={16} />
                    </motion.button>
                  ) : (
                    <motion.button
                      key="submit"
                      type="submit"
                      className="btn btn--gold btn--grow"
                      disabled={status === 'sending'}
                      whileHover={status === 'sending' ? undefined : { y: -2 }}
                      whileTap={status === 'sending' ? undefined : { scale: 0.98 }}
                      transition={spring}
                    >
                      {/* while sending, the label breathes so the wait reads as work */}
                      <motion.span
                        animate={status === 'sending' ? { opacity: [1, 0.55, 1] } : { opacity: 1 }}
                        transition={
                          status === 'sending'
                            ? { duration: 1.1, ease: 'easeInOut', repeat: Infinity }
                            : { duration: 0.2 }
                        }
                      >
                        {status === 'sending' ? 'Sending…' : requestFlow.submitCta}
                      </motion.span>
                    </motion.button>
                  )}
                </div>

                <p className="form__foot">
                  Prefer to talk it through?{' '}
                  <a href={whatsappLink('default')}>Message us on WhatsApp</a>.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
