import { motion } from 'motion/react';
import Icon from './Icon.jsx';
import Logo from './Logo.jsx';
import Reveal from './Reveal.jsx';
import { brand, contact, footer } from '../data/content.js';
import { mailLink, telLink, whatsappLink } from '../lib/links.js';
import { cardIn, fadeUp, spring, stagger } from '../lib/motion.js';

/** Footer links nudge towards the reader on hover, like the CTAs above them. */
const linkHover = { whileHover: { x: 3 }, transition: spring };

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container stack-lg">
        <Reveal as="div" className="site-footer__top" variants={stagger(0.09)}>
          <motion.div className="site-footer__brand" variants={fadeUp}>
            <Logo variant="light" layout="stacked" height={92} href={null} />
            <p className="site-footer__category">{brand.category}</p>
            <p className="display site-footer__promise">{brand.promise}</p>
          </motion.div>

          <div className="site-footer__cols">
            {footer.columns.map((col) => (
              <motion.nav
                key={col.title}
                aria-label={col.title}
                className="site-footer__col"
                variants={cardIn}
              >
                <p className="site-footer__heading">{col.title}</p>
                {col.links.map((link) => (
                  <motion.a key={link.label} href={link.href} {...linkHover}>
                    {link.label}
                  </motion.a>
                ))}
              </motion.nav>
            ))}

            <motion.div className="site-footer__col" variants={cardIn}>
              <p className="site-footer__heading">Contact</p>
              <motion.a href={whatsappLink('default')} {...linkHover}>
                <Icon name="whatsapp" size={16} /> WhatsApp
              </motion.a>
              <motion.a href={telLink()} {...linkHover}>
                <Icon name="phone" size={16} /> {contact.phoneDisplay}
              </motion.a>
              <motion.a href={mailLink()} {...linkHover}>
                <Icon name="mail" size={16} /> {contact.email}
              </motion.a>
            </motion.div>

            <motion.div className="site-footer__col" variants={cardIn}>
              <p className="site-footer__heading">Legal</p>
              {footer.legal.map((link) => (
                <motion.a key={link.label} href={link.href} {...linkHover}>
                  {link.label}
                </motion.a>
              ))}
            </motion.div>
          </div>
        </Reveal>

        <Reveal as="div" className="site-footer__bottom" variants={fadeUp}>
          <p>
            © {year} {brand.name}. All rights reserved.
          </p>
          <p>{brand.launchMarket}</p>
        </Reveal>
      </div>
    </footer>
  );
}
