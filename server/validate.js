/**
 * Server-side validation for a journey request.
 *
 * The browser validates too, but that is a courtesy to the traveller, not a
 * control: this endpoint is public and anyone can POST whatever they like to
 * it. So the rules are re-applied here, unknown keys are dropped rather than
 * forwarded to the database, and every string is length-capped.
 */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const TIME = /^\d{2}:\d{2}(:\d{2})?$/;

/**
 * The only keys that reach the database, with their caps. Anything else in the
 * body is ignored. `required` mirrors what the form enforces client-side.
 */
const FIELDS = {
  journeyType: { max: 60, required: true },
  flightNumber: { max: 24 },
  travelDate: { max: 10, required: true },
  flightTime: { max: 8 },
  airport: { max: 160, required: true },
  pickupLocation: { max: 240, required: true },
  destination: { max: 240, required: true },
  name: { max: 120, required: true },
  phone: { max: 40, required: true },
  email: { max: 160 },
  passengers: { max: 4 },
  luggage: { max: 60 },
  notes: { max: 2000 },
  leadSource: { max: 300 },
  submittedAt: { max: 40 },
};

/** Empty strings become null so Postgres accepts them in date/time columns. */
const orNull = (value) => (value === '' || value === undefined ? null : value);

export function validateJourneyRequest(body) {
  const errors = {};

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return { ok: false, errors: { _: 'Expected a JSON object.' }, value: null };
  }

  const value = {};
  for (const [field, rule] of Object.entries(FIELDS)) {
    const raw = body[field];

    // Anything that is not a string or number is treated as absent rather than
    // coerced — an object or array here is a client bug or an attack, not data.
    const str = typeof raw === 'string' || typeof raw === 'number' ? String(raw).trim() : '';

    if (rule.required && !str) {
      errors[field] = 'Required.';
      continue;
    }
    if (str.length > rule.max) {
      errors[field] = `Must be ${rule.max} characters or fewer.`;
      continue;
    }
    value[field] = orNull(str);
  }

  if (value.travelDate && !DATE.test(value.travelDate)) {
    errors.travelDate = 'Expected YYYY-MM-DD.';
  }
  if (value.flightTime && !TIME.test(value.flightTime)) {
    errors.flightTime = 'Expected HH:MM.';
  }
  if (value.email && !EMAIL.test(value.email)) {
    errors.email = 'Not a valid email address.';
  }

  // Passengers arrives as a string from a number input; the column is integer.
  if (value.passengers !== null && value.passengers !== undefined) {
    const n = Number(value.passengers);
    if (!Number.isInteger(n) || n < 1 || n > 60) {
      errors.passengers = 'Must be a whole number between 1 and 60.';
    } else {
      value.passengers = n;
    }
  }

  // submittedAt is supplied by the browser, so it is a hint and not a fact. An
  // unparseable or absurd value is dropped rather than rejected — the database
  // records its own created_at regardless.
  if (value.submittedAt) {
    const when = Date.parse(value.submittedAt);
    const year = 1000 * 60 * 60 * 24 * 365;
    if (Number.isNaN(when) || Math.abs(when - Date.now()) > year) {
      value.submittedAt = null;
    }
  }

  return { ok: Object.keys(errors).length === 0, errors, value };
}
