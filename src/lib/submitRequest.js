/**
 * The one place the site hands a journey request to a backend.
 *
 * The endpoint comes from VITE_REQUEST_ENDPOINT (see .env.example) rather than
 * source, so the same build can point at staging or production. Whatever is
 * behind it — a serverless function, a form service, a database's REST layer —
 * only this file needs to know.
 *
 * It throws on failure instead of swallowing it. That matters: a journey request
 * is a lead, and a submission that quietly fails while the traveller reads
 * "Thank you" is worse than one that visibly fails and offers them WhatsApp.
 */

const ENDPOINT = import.meta.env.VITE_REQUEST_ENDPOINT;

/** How long we wait before treating a submission as failed. */
const TIMEOUT_MS = 12000;

export const isPersistenceConfigured = Boolean(ENDPOINT);

export async function submitJourneyRequest(payload) {
  if (!ENDPOINT) {
    // No backend wired up yet. Say so loudly rather than reporting a save that
    // did not happen — this branch should never survive to production.
    console.warn(
      '[VoloVertex] VITE_REQUEST_ENDPOINT is not set, so this journey request was NOT saved:',
      payload
    );
    return { persisted: false };
  }

  // An aborted fetch is the difference between "slow" and "lost" — without this
  // a stalled connection leaves the traveller on a spinner indefinitely.
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    // Being throttled is not the same as something being broken, and the
    // traveller deserves copy that says so — flagged here so the form can.
    if (response.status === 429) {
      const throttled = new Error('Journey request was rate limited');
      throttled.rateLimited = true;
      throw throttled;
    }

    if (!response.ok) {
      throw new Error(`Journey request rejected with ${response.status}`);
    }

    return { persisted: true };
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Journey request timed out');
    }
    throw error;
  } finally {
    clearTimeout(timer);
  }
}
