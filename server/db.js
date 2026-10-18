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
