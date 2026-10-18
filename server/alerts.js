

/**
 * Notifying the team about a new journey request.
 *
 * Nothing in this file is allowed to fail a request. The lead is already safely
 * in the database by the time these run, so a Telegram outage or an expired
 * WhatsApp token must not turn a saved request into an error for the traveller.
 * Every function here resolves with an outcome rather than throwing, and
 * sendAlerts settles all of them.
 */

const GRAPH_VERSION = process.env.WHATSAPP_GRAPH_VERSION || 'v23.0';

/** How long we give an alert provider before giving up on it. */
const TIMEOUT_MS = 8000;

async function postJson(url, body, headers = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...headers },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    const text = await response.text();
    if (!response.ok) {
      throw new Error(`${response.status} ${text.slice(0, 300)}`);
    }
    return text;
  } finally {
    clearTimeout(timer);
  }
}

/** The human-readable summary used by Telegram and by log lines. */
export function summarise(r, id) {
  return [
    `New journey request #${id}`,
    `Journey: ${r.journeyType}`,
    `Date: ${r.travelDate}${r.flightTime ? ` at ${r.flightTime}` : ''}`,
    r.flightNumber ? `Flight: ${r.flightNumber}` : null,
    `Airport: ${r.airport}`,
    `Route: ${r.pickupLocation} → ${r.destination}`,
    `Name: ${r.name}`,
    `Phone: ${r.phone}`,
    r.email ? `Email: ${r.email}` : null,
    r.passengers ? `Passengers: ${r.passengers}` : null,
    r.luggage ? `Luggage: ${r.luggage}` : null,
    r.notes ? `Notes: ${r.notes}` : null,
  ]
    .filter(Boolean)
    .join('\n');
}

/**
 * Telegram: free, instant, no approval, and the whole team can sit in one
 * group. This is the alert to rely on.
 */
export async function sendTelegramAlert(r, id) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return { channel: 'telegram', skipped: 'not configured' };

  await postJson(`https://api.telegram.org/bot${token}/sendMessage`, {
    chat_id: chatId,
    text: summarise(r, id),
    disable_web_page_preview: true,
  });
  return { channel: 'telegram', sent: true };
}

export async function sendWhatsappAlert(r, id) {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const template = process.env.WHATSAPP_TEMPLATE_NAME;
  const language = process.env.WHATSAPP_TEMPLATE_LANGUAGE || 'en';
  const recipients = (process.env.WHATSAPP_ALERT_RECIPIENTS || '')
    .split(',')
    .map((n) => n.replace(/\D/g, ''))
    .filter(Boolean);

  if (!token || !phoneNumberId || !template || !recipients.length) {
    return { channel: 'whatsapp', skipped: 'not configured' };
  }

  const parameters = [
    r.name,
    r.journeyType,
    `${r.travelDate}${r.flightTime ? ` ${r.flightTime}` : ''}`,
    `${r.pickupLocation} to ${r.destination}`,
    r.phone,
  ].map((text) => ({ type: 'text', text: String(text) }));

  // One template send per recipient; a failure for one must not hide the
  // others, so these settle independently too.
  const results = await Promise.allSettled(
    recipients.map((to) =>
      postJson(
        `https://graph.facebook.com/${GRAPH_VERSION}/${phoneNumberId}/messages`,
        {
          messaging_product: 'whatsapp',
          recipient_type: 'individual',
          to,
          type: 'template',
          template: { name: template, language: { code: language }, components: [{ type: 'body', parameters }] },
        },
        { Authorization: `Bearer ${token}` }
      )
    )
  );

  const failed = results.filter((x) => x.status === 'rejected');
  if (failed.length) {
    throw new Error(
      `${failed.length}/${recipients.length} template sends failed: ${failed
        .map((x) => x.reason && x.reason.message)
        .join('; ')}`
    );
  }
  return { channel: 'whatsapp', sent: recipients.length, requestId: id };
}

/**
 * Fire every configured channel. Resolves with one outcome per channel and
 * never rejects, so the caller can log problems and still return success.
 */
export async function sendAlerts(record, id) {
  const settled = await Promise.allSettled([
    sendTelegramAlert(record, id),
    sendWhatsappAlert(record, id),
  ]);
  return settled.map((s) =>
    s.status === 'fulfilled' ? s.value : { failed: String(s.reason && s.reason.message) }
  );
}
