create table if not exists journey_requests (
  id              bigserial     primary key,
  created_at      timestamptz   not null default now(),
  submitted_at    timestamptz,

  journey_type    text          not null,
  flight_number   text,
  travel_date     date          not null,
  flight_time     time,
  airport         text          not null,
  pickup_location text          not null,
  destination     text          not null,

  name            text          not null,
  phone           text          not null,
  email           text,
  passengers      integer,
  luggage         text,
  notes           text,

  lead_source     text,

  handled_at      timestamptz,
  handled_note    text
);

create index if not exists journey_requests_created_at_idx
  on journey_requests (created_at desc);

create index if not exists journey_requests_unhandled_idx
  on journey_requests (created_at desc)
  where handled_at is null;


-- Rate limiting state for the public request endpoint.
--
-- A fixed-window counter: one row per (bucket, window), incremented by an
-- atomic upsert. Fixed windows allow a burst across a boundary, which is fine
-- for abuse prevention and much simpler than a sliding log.
--
-- This lives in Postgres rather than Redis deliberately: the database is
-- already here, so there is no second service to provision, no extra secret,
-- and nothing host-specific. At this site's volume the extra upsert per
-- request is irrelevant.
create table if not exists request_rate_limit (
  bucket       text        not null,
  window_start timestamptz not null,
  hits         integer     not null default 0,
  primary key (bucket, window_start)
);

-- Supports the opportunistic prune that stops the table growing without a cron.
create index if not exists request_rate_limit_window_idx
  on request_rate_limit (window_start);
