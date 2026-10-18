import { validateJourneyRequest } from './validate.js';
import { insertJourneyRequest } from './db.js';
import { sendAlerts, summarise } from './alerts.js';
import { checkRateLimit } from './rateLimit.js';

/**
 * The journey request endpoint, written against the Web standard Request and
 * Response so one implementation serves every host: Vercel's /api directory and
 * Netlify Functions v2 both accept this signature. The per-host files in /api
 * and /netlify/functions are adapters around this and nothing else.
 *
 * The ordering here is the important part. The database write decides the
 * traveller's outcome; the alerts do not. A lead that is stored but un-alerted
 * is a minor operational problem, while a lead that is alerted but not stored
 * is gone the moment someone closes the chat.
 */

/** Bodies larger than this are refused before being parsed. */
const MAX_BODY_BYTES = 16 * 1024;

const json = (status, body) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });

export function createJourneyRequestHandler({
  insert = insertJourneyRequest,
  alert = sendAlerts,
  rateLimit = checkRateLimit,
  log = console,
} = {}) {
  return async function handleJourneyRequest(request) {
    if (request.method !== 'POST') {
      return json(405, { ok: false, error: 'Method not allowed' });
    }

    const declared = Number(request.headers.get('content-length') || 0);
    if (declared > MAX_BODY_BYTES) {
      return json(413, { ok: false, error: 'Payload too large' });
    }

    // Checked before the body is parsed, so malformed and junk requests consume
    // quota too. A bot that can spend its allowance on 422s is not limited.
    const limit = await rateLimit(request, { log });
    if (!limit.allowed) {
      log.error(`[journey-requests] rate limited (${limit.reason})`);
      return new Response(
        JSON.stringify({ ok: false, error: 'Too many requests' }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store',
            'Retry-After': String(limit.retryAfter),
          },
        }
      );
    }

    let body;
    try {
      const text = await request.text();
      if (text.length > MAX_BODY_BYTES) {
        return json(413, { ok: false, error: 'Payload too large' });
      }
      body = JSON.parse(text);
    } catch {
      return json(400, { ok: false, error: 'Malformed JSON' });
    }

    const { ok, errors, value } = validateJourneyRequest(body);
    if (!ok) {
      return json(422, { ok: false, error: 'Validation failed', errors });
    }

    let saved;
    try {
      saved = await insert(value);
    } catch (error) {
      log.error('[journey-requests] insert failed:', error);
      return json(502, { ok: false, error: 'Could not save the request' });
    }

    let alerts = [];
    try {
      alerts = await alert(value, saved.id);
    } catch (error) {
      log.error('[journey-requests] alerting threw unexpectedly:', error);
    }

    const failures = alerts.filter((a) => a && a.failed);
    if (failures.length) {
      log.error(
        `[journey-requests] #${saved.id} saved but ${failures.length} alert(s) failed:`,
        failures,
        '\n',
        summarise(value, saved.id)
      );
    }

    return json(201, { ok: true, id: saved.id });
  };
}

export const handleJourneyRequest = createJourneyRequestHandler();
