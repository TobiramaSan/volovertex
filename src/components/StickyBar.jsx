import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Icon from './Icon.jsx';
import { telLink, whatsappLink } from '../lib/links.js';
import { ease, springSoft } from '../lib/motion.js';

/**
 * Persistent mobile conversion bar (section 22): WhatsApp | Call | Request Assistance.
 * Appears once the user scrolls past the hero, and hides again while the request
 * form is on screen so it never covers the form's own buttons.
 *
 * It is mounted only while visible, so it is out of the tab order and the
 * accessibility tree the rest of the time — the slide is driven by
 * AnimatePresence rather than by toggling visibility.
 */
export default function StickyBar() {
  const [scrolledPast, setScrolledPast] = useState(false);
  const [formInView, setFormInView] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolledPast(window.scrollY > 520);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const target = document.getElementById('request-assistance');
    if (!target || typeof IntersectionObserver === 'undefined') return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => setFormInView(entry.isIntersecting),
      { rootMargin: '-10% 0px -10% 0px' }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const visible = scrolledPast && !formInView;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="sticky-bar"
          aria-label="Quick contact"
          initial={{ y: '110%' }}
          animate={{ y: 0 }}
          exit={{ y: '110%', transition: { duration: 0.22, ease } }}
          transition={springSoft}
        >
          <motion.a
            href={whatsappLink('default')}
            className="sticky-bar__item"
            whileTap={{ scale: 0.95 }}
          >
            <Icon name="whatsapp" size={20} />
            WhatsApp
          </motion.a>
          <motion.a href={telLink()} className="sticky-bar__item" whileTap={{ scale: 0.95 }}>
            <Icon name="phone" size={20} />
            Call
          </motion.a>
          <motion.a
            href="#request-assistance"
            className="sticky-bar__item sticky-bar__item--primary"
            whileTap={{ scale: 0.95 }}
          >
            Request assistance
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
