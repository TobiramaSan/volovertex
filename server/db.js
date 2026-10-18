import { neon } from '@neondatabase/serverless';

/**
 * Persistence for journey requests.
 *
 * This uses Neon's HTTP driver rather than a normal Postgres connection on
 * purpose. Serverless functions scale by starting many short-lived instances,
 * and a connection-per-instance pool exhausts a Postgres server's connection
 * limit under load — the classic serverless-plus-Postgres failure. One HTTP
 * request per query has nothing to exhaust.
 *
 * It is also the only file that knows which database this is. Moving to
 * Supabase, RDS or plain Postgres means rewriting insertJourneyRequest and
 * nothing else.
 */



let cached;

function client() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set');
  }
  // Created lazily and reused, so importing this module never throws at
  // cold start just because the env var is missing.
  if (!cached) cached = neon(process.env.DATABASE_URL);
  return cached;
}

/**
 * Insert one request and return its id.
 *
 * The tagged template parameterises every value, so nothing the traveller
 * types is ever interpolated into SQL.
 */
export async function insertJourneyRequest(r) {
  const sql = client();
  const rows = await sql`
    insert into journey_requests (
      submitted_at, journey_type, flight_number, travel_date, flight_time,
      airport, pickup_location, destination, name, phone, email,
      passengers, luggage, notes, lead_source
    ) values (
      ${r.submittedAt}, ${r.journeyType}, ${r.flightNumber}, ${r.travelDate}, ${r.flightTime},
      ${r.airport}, ${r.pickupLocation}, ${r.destination}, ${r.name}, ${r.phone}, ${r.email},
      ${r.passengers}, ${r.luggage}, ${r.notes}, ${r.leadSource}
    )
    returning id, created_at
  `;
  return rows[0];
}

/**
 * Increment the counter for one bucket in the current fixed window and return
 * the new total.
 *
 * The upsert is a single statement, so concurrent requests cannot both read a
 * stale count and both decide they are under the limit — the increment happens
 * inside the same statement that creates the row.
 */
export async function bumpRateLimit(bucket, windowSeconds) {
  const sql = client();
  const rows = await sql`
    insert into request_rate_limit (bucket, window_start, hits)
    values (
      ${bucket},
      to_timestamp(
        floor(extract(epoch from now()) / ${windowSeconds}::int) * ${windowSeconds}::int
      ),
      1
    )
    on conflict (bucket, window_start)
    do update set hits = request_rate_limit.hits + 1
    returning hits, window_start
  `;
  return rows[0];
}

/** Drop spent windows. Called occasionally so the table needs no cron job. */
export async function pruneRateLimit(olderThanSeconds) {
  const sql = client();
  await sql`
    delete from request_rate_limit
    where window_start < now() - make_interval(secs => ${olderThanSeconds}::int)
  `;
}
