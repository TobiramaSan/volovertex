import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Logo from './Logo.jsx';
import Icon from './Icon.jsx';
import { navLinks } from '../data/content.js';
import { whatsappLink } from '../lib/links.js';
import useMediaQuery from '../lib/useMediaQuery.js';
import { ease, spring } from '../lib/motion.js';

const drawerItem = {
  hidden: { opacity: 0, y: -10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.32, ease } },
};

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isCompact = useMediaQuery('(max-width: 1140px)');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  // Leaving the compact breakpoint mid-session must not strand an open drawer.
  useEffect(() => {
    if (!isCompact) setOpen(false);
  }, [isCompact]);

  const close = () => setOpen(false);

  const navContent = (
    <>
      {navLinks.map((link) => (
        <motion.a
          key={link.label}
          href={link.href}
          className="primary-nav__link"
          onClick={close}
          variants={isCompact ? drawerItem : undefined}
        >
          {link.label}
        </motion.a>
      ))}
      <motion.div className="primary-nav__actions" variants={isCompact ? drawerItem : undefined}>
        <a href={whatsappLink('default')} className="btn btn--ghost" onClick={close}>
          <Icon name="whatsapp" size={18} />
          WhatsApp
        </a>
        <a href="#request-assistance" className="btn btn--primary" onClick={close}>
          Request assistance
        </a>
      </motion.div>
    </>
  );

  return (
    <motion.header
      className={`site-header${scrolled ? ' is-scrolled' : ''}`}
      initial={{ y: -22, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease }}
    >
      {/* the bar condenses once the page starts moving, so the content leads */}
      <motion.div
        className="container site-header__inner"
        initial={{ minHeight: 80 }}
        animate={{ minHeight: scrolled ? 66 : 80 }}
        transition={{ duration: 0.35, ease }}
      >
        <motion.div
          className="site-header__logo"
          animate={{ scale: scrolled ? 0.93 : 1 }}
          transition={{ duration: 0.35, ease }}
          style={{ transformOrigin: 'left center' }}
        >
          <Logo height={40} />
        </motion.div>

        {isCompact ? (
          <AnimatePresence>
            {open && (
              <motion.nav
                id="primary-nav"
                className="primary-nav is-open"
                aria-label="Primary"
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.28, ease, staggerChildren: 0.05 } }}
                exit={{ opacity: 0, y: -12, transition: { duration: 0.2, ease } }}
              >
                {navContent}
              </motion.nav>
            )}
          </AnimatePresence>
        ) : (
          <nav id="primary-nav" className="primary-nav" aria-label="Primary">
            {navContent}
          </nav>
        )}

        <motion.a
          href="#request-assistance"
          className="btn btn--primary site-header__cta"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          transition={spring}
        >
          Request assistance
          <Icon name="arrowRight" size={16} />
        </motion.a>

        <motion.button
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="primary-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
          whileTap={{ scale: 0.9 }}
          transition={spring}
        >
          {/* the two glyphs turn into one another rather than snapping */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? 'close' : 'menu'}
              className="menu-toggle__glyph"
              initial={{ opacity: 0, rotate: open ? -90 : 90, scale: 0.7 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: open ? 90 : -90, scale: 0.7 }}
              transition={{ duration: 0.18, ease }}
            >
              <Icon name={open ? 'close' : 'menu'} size={22} />
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </motion.div>
    </motion.header>
  );
}
