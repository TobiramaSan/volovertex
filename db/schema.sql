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
