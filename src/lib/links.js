import { contact, whatsappMessages } from '../data/content.js';

const digitsOnly = (value) => String(value || '').replace(/\D/g, '');

/**
 * Build a WhatsApp deep link with a pre-filled message.
 * `key` is one of the keys in `whatsappMessages` (default, earlyFlight, arrival, corporate).
 * Falls back to the request form anchor while the number is still a placeholder.
 */
export function whatsappLink(key = 'default') {
  const number = digitsOnly(contact.whatsappNumber);
  const text = encodeURIComponent(whatsappMessages[key] || whatsappMessages.default);
  return number ? `https://wa.me/${number}?text=${text}` : '#request-assistance';
}

/** Build a tel: link. Falls back to the request form anchor if no number is set. */
export function telLink() {
  const number = digitsOnly(contact.phoneDial);
  return number ? `tel:+${number}` : '#request-assistance';
}

/** Build a mailto: link with an optional subject. */
export function mailLink(address = contact.email, subject = '') {
  const valid = /.+@.+\..+/.test(address || '');
  if (!valid) return '#request-assistance';
  return subject ? `mailto:${address}?subject=${encodeURIComponent(subject)}` : `mailto:${address}`;
}

/**
 * Jump to the request form and pre-select a journey type.
 * Every service CTA uses this so the form opens on the right option.
 */
export function requestJourney(journeyType) {
  return (event) => {
    event.preventDefault();
    window.dispatchEvent(new CustomEvent('vv:request', { detail: { journeyType } }));
    const target = document.getElementById('request-assistance');
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
}
