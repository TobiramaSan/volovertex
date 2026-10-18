import { bumpRateLimit, pruneRateLimit } from './db.js';

/**
 * Rate limiting for the public journey request endpoint.
 *
 * Abuse here is not just junk rows: every WhatsApp template send is billed, so
 * an unthrottled flood spends real money. That is what this is protecting.
 *
 * Two limits, because neither covers the other:
 *
 *   per IP   stops one source hammering the form.
 *   global   caps total spend even if the flood is distributed across many
 *            addresses, which a per-IP limit cannot see.
 *
 * Both are deliberately generous. Nigerian mobile networks make heavy use of
 * carrier-grade NAT, so a single address can legitimately represent a great
 * many travellers — a tight per-IP limit would turn real customers away. The
 * per-IP limit is there to blunt a crude attack, and the global cap is what
 * actually bounds the bill.
 */

const int = (value, fallback) => {
  const n = Number.parseInt(value, 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
};

const PER_IP_MAX = int(process.env.RATE_LIMIT_PER_IP_MAX, 10);
const PER_IP_WINDOW = int(process.env.RATE_LIMIT_PER_IP_WINDOW_SECONDS, 600);
const GLOBAL_MAX = int(process.env.RATE_LIMIT_GLOBAL_MAX, 120);
const GLOBAL_WINDOW = int(process.env.RATE_LIMIT_GLOBAL_WINDOW_SECONDS, 3600);

/** Roughly one request in fifty also tidies up, so no cron job is needed. */
const PRUNE_PROBABILITY = 0.02;

/**
 * Work out who is asking.
 *
 * Platform-set headers come first because a client cannot forge them: Netlify
 * sets x-nf-client-connection-ip, and on Vercel x-real-ip is supplied by the
 * platform and x-forwarded-for is overwritten rather than appended to.
 *
 * x-forwarded-for is the last resort, and we read the *rightmost* entry, not
 * the leftmost. A client can put anything in that header; whatever our own
 * infrastructure adds goes on the end. So the rightmost value is the one we
 * have some reason to believe, and the leftmost is the one an attacker
 * controls — rotating fake leftmost values is how a naive limiter is bypassed.
 */
export function clientIp(request) {
  const direct =
    request.headers.get('x-nf-client-connection-ip') || request.headers.get('x-real-ip');
  if (direct) return direct.trim();

  const forwarded = request.headers.get('x-forwarded-for');
  if (!forwarded) return null;

  const parts = forwarded
    .split(',')
    .map((p) => p.trim())
    .filter(Boolean);
  return parts.length ? parts[parts.length - 1] : null;
}

/**
 * Addresses are personal data, so what gets stored is a salted digest rather
 * than the address itself. The limiter only ever needs to know whether two
 * requests came from the same place, which a digest answers perfectly well.
 */
export async function ipBucket(ip) {
  const salt = process.env.RATE_LIMIT_SALT || '';
  const bytes = new TextEncoder().encode(`${salt}:${ip}`);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  const hex = [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
  return `ip:${hex.slice(0, 32)}`;
}

/**
 * Returns `{ allowed, retryAfter, reason }`.
 *
 * Fails open. If the limiter itself errors the request is allowed through,
 * because the only plausible cause is the database being unreachable — in
 * which case the insert immediately afterwards fails anyway and the traveller
 * gets a real error. Turning a transient limiter fault into a rejected lead
 * would be the worse trade.
 */
export async function checkRateLimit(
  request,
  { bump = bumpRateLimit, prune = pruneRateLimit, log = console, random = Math.random } = {}
) {
  try {
    const ip = clientIp(request);

    // Per IP first, so one abusive source does not inflate the global counter
    // and push legitimate traffic towards the global cap.
    if (ip) {
      const bucket = await ipBucket(ip);
      const { hits } = await bump(bucket, PER_IP_WINDOW);
      if (hits > PER_IP_MAX) {
        return { allowed: false, retryAfter: PER_IP_WINDOW, reason: 'per-ip' };
      }
    }

    const { hits: globalHits } = await bump('global', GLOBAL_WINDOW);
    if (globalHits > GLOBAL_MAX) {
      return { allowed: false, retryAfter: GLOBAL_WINDOW, reason: 'global' };
    }

    if (random() < PRUNE_PROBABILITY) {
      // Never block the response on housekeeping.
      Promise.resolve(prune(Math.max(PER_IP_WINDOW, GLOBAL_WINDOW) * 2)).catch((error) =>
        log.error('[rate-limit] prune failed:', error)
      );
    }

    return { allowed: true };
  } catch (error) {
    log.error('[rate-limit] check failed, allowing the request through:', error);
    return { allowed: true, degraded: true };
  }
}

export const limits = { PER_IP_MAX, PER_IP_WINDOW, GLOBAL_MAX, GLOBAL_WINDOW };
