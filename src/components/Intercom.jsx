import { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import Icon from './Icon.jsx';
import { brand, intercom, requestFlow } from '../data/content.js';
import { hasWhatsapp, requestJourney, whatsappCompose } from '../lib/links.js';
import { ease, spring, springSoft } from '../lib/motion.js';

export function composeMessage({ topic, message }) {
  const lines = [`Hello ${brand.name},`];
  if (topic) lines.push(`I need help with: ${topic}`);
  const trimmed = message.trim();
  if (trimmed) lines.push(trimmed);
  if (!topic && !trimmed) lines.push(intercom.fallbackMessage);
  return lines.join('\n\n');
}

const bubble = {
  hidden: { opacity: 0, y: 12, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease } },
};

export default function Intercom() {
  const [open, setOpen] = useState(false);
  const [topic, setTopic] = useState('');
  const [message, setMessage] = useState('');
  const [handedOff, setHandedOff] = useState(false);
  const panelId = useId();
  const launcherRef = useRef(null);
  const inputRef = useRef(null);
  const still = useReducedMotion();
  const whatsappReady = hasWhatsapp();

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        if (launcherRef.current) launcherRef.current.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  const href = whatsappCompose(composeMessage({ topic, message }));

  const onSend = () => {
    setHandedOff(true);
    
    window.setTimeout(() => {
      setOpen(false);
      setHandedOff(false);
      setMessage('');
      setTopic('');
    }, 1400);
  };

  const onFallback = (event) => {
    setOpen(false);
    const carried = requestFlow.journeyTypes.includes(topic) ? topic : '';
    requestJourney(carried)(event);
  };

  const canSend = Boolean(topic) || message.trim().length > 0;

  return (
    <div className="intercom">
      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            className="intercom__panel"
            role="dialog"
            aria-label={`Message ${brand.name}`}
            initial={{ opacity: 0, y: 16, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96, transition: { duration: 0.18, ease } }}
            transition={springSoft}
            style={{ originX: 1, originY: 1 }}
          >
            <div className="intercom__head">
              <div className="intercom__identity">
                <span className="intercom__avatar" aria-hidden="true">
                  <Icon name="concierge" size={20} />
                </span>
                <span>
                  <span className="intercom__name">{brand.name}</span>
                  <span className="intercom__status">
                    {/* a live dot, because a person really is on the other end */}
                    <motion.span
                      className="intercom__dot"
                      animate={{ opacity: [1, 0.35, 1] }}
                      transition={{ duration: 2.2, ease: 'easeInOut', repeat: Infinity }}
                    />
                    {intercom.availability}
                  </span>
                </span>
              </div>
              <motion.button
                type="button"
                className="intercom__close"
                aria-label="Close chat"
                onClick={() => setOpen(false)}
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={spring}
              >
                <Icon name="close" size={18} />
              </motion.button>
            </div>

            <div className="intercom__body">
              <motion.p className="intercom__bubble" variants={bubble} initial="hidden" animate="show">
                {intercom.greeting}
              </motion.p>

              <motion.div
                className="intercom__topics"
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.12 } } }}
              >
                <p className="intercom__label">{intercom.topicsLabel}</p>
                <div className="intercom__chips">
                  {intercom.topics.map((item) => {
                    const on = topic === item;
                    return (
                      <motion.button
                        key={item}
                        type="button"
                        className={`intercom__chip${on ? ' is-on' : ''}`}
                        aria-pressed={on}
                        onClick={() => setTopic(on ? '' : item)}
                        variants={bubble}
                        whileTap={{ scale: 0.95 }}
                        transition={spring}
                      >
                        {item}
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>

              <label className="visually-hidden" htmlFor={`${panelId}-msg`}>
                Your message
              </label>
              <textarea
                id={`${panelId}-msg`}
                ref={inputRef}
                className="intercom__input"
                rows={3}
                placeholder={intercom.placeholder}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <div className="intercom__foot">
              <motion.a
                href={href}
                target={whatsappReady ? '_blank' : undefined}
                rel={whatsappReady ? 'noopener noreferrer' : undefined}
                className={`btn btn--gold intercom__send${canSend ? '' : ' is-disabled'}`}
                aria-disabled={!canSend}
                onClick={(e) => {
                  if (!canSend) {
                    e.preventDefault();
                    if (inputRef.current) inputRef.current.focus();
                    return;
                  }
                  if (!whatsappReady) {
                    onFallback(e);
                    return;
                  }
                  onSend();
                }}
                whileHover={canSend ? { y: -2 } : undefined}
                whileTap={canSend ? { scale: 0.98 } : undefined}
                transition={spring}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={handedOff && whatsappReady ? 'sent' : 'send'}
                    className="intercom__send-label"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.18, ease }}
                  >
                    {handedOff && whatsappReady ? (
                      <>
                        <Icon name="check" size={17} strokeWidth={2.2} />
                        {intercom.handoffLabel}
                      </>
                    ) : (
                      <>
                        <Icon name={whatsappReady ? 'whatsapp' : 'send'} size={17} />
                        {whatsappReady ? intercom.sendCta : intercom.sendCtaFallback}
                      </>
                    )}
                  </motion.span>
                </AnimatePresence>
              </motion.a>
              <p className="intercom__note">
                {whatsappReady ? intercom.handoffNote : intercom.handoffNoteFallback}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        ref={launcherRef}
        type="button"
        className="intercom__launcher"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        aria-label={open ? 'Close chat' : `Message ${brand.name}`}
        onClick={() => setOpen((v) => !v)}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ ...spring, delay: 1.1 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
      >
        {!open && !still && (
          <motion.span
            className="intercom__ring"
            aria-hidden="true"
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{ duration: 2.4, ease: 'easeOut', repeat: Infinity, repeatDelay: 2.6 }}
          />
        )}
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? 'close' : 'open'}
            className="intercom__launcher-glyph"
            initial={{ opacity: 0, rotate: open ? -90 : 90, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: open ? 90 : -90, scale: 0.6 }}
            transition={{ duration: 0.18, ease }}
          >
            <Icon name={open ? 'close' : 'message'} size={24} />
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
