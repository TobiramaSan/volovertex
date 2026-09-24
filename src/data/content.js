// ============================================================================
// VoloVertex — all site copy and contact details live here.
// Wording follows the VoloVertex Commercial Website Sitemap & Developer Brief.
// Edit this file to change the site's text; no layout code needs touching.
// ============================================================================

export const brand = {
  name: 'VoloVertex',
  category: 'Global Mobility & Concierge',
  promise: 'Your world, seamlessly navigated.',
  launchMarket: 'Lagos & Abuja, Nigeria',
};

// --- Contact -----------------------------------------------------------------
// Put the real numbers here. `whatsappNumber` is digits only, in international
// format with no plus sign or spaces (e.g. '2348012345678').
export const contact = {
  whatsappNumber: '[WHATSAPP NUMBER]',
  phoneDisplay: '[PHONE NUMBER]',
  phoneDial: '[PHONE NUMBER]',
  email: '[EMAIL ADDRESS]',
  partnershipsEmail: '[PARTNERSHIPS EMAIL]',
};

// Pre-filled WhatsApp messages (section 23 of the brief).
export const whatsappMessages = {
  default: "Hello VoloVertex, I’d like assistance with my journey.",
  earlyFlight: 'Hello VoloVertex, I have an early flight and need airport transportation.',
  arrival: "Hello VoloVertex, I’m arriving in Lagos/Abuja and need airport transfer assistance.",
  corporate: 'Hello VoloVertex, I would like to discuss a corporate account.',
};

// --- Photography -------------------------------------------------------------
// Drop images into /public/images and reference them here.
// Leave a value as null to show the built-in illustration instead.
export const photos = {
  hero: null, // e.g. '/images/hero-departure.jpg'
  earlyFlight: null,
  arrival: null,
  business: null,
};

// --- Navigation --------------------------------------------------------------
export const navLinks = [
  { href: '#services', label: 'Services' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#destinations', label: 'Destinations' },
  { href: '#business', label: 'Business & Partners' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

// --- Hero (sections 3 and 34) ------------------------------------------------
export const hero = {
  headline: ['Your Flight Is Booked.', "Your Journey Isn’t."],
  copy:
    'VoloVertex coordinates airport transportation and traveller assistance around your flight — helping you move from home to airport, airport to destination, and everywhere in between.',
  market: 'Starting in Lagos & Abuja.',
  primaryCta: 'Plan my journey',
  secondaryCta: 'Flying early?',
  microcopy: ['Airport Transfers', 'Early Flight Assist', 'Arrival Assistance', 'Concierge'],
};

// --- Hero quick actions (section 3) ------------------------------------------
export const quickActions = [
  {
    id: 'to-airport',
    icon: 'takeoff',
    title: 'To the airport',
    body: 'I need to get to the airport.',
    cta: 'Get me to the airport',
    href: '#request-assistance',
    journeyType: 'To the airport',
  },
  {
    id: 'from-airport',
    icon: 'landing',
    title: 'From the airport',
    body: "I’m arriving in Lagos or Abuja.",
    cta: 'Arrange my arrival',
    href: '#request-assistance',
    journeyType: 'From the airport',
  },
  {
    id: 'early-flight',
    icon: 'sunrise',
    title: 'Flying early',
    body: 'My flight is before sunrise.',
    cta: 'Plan my early flight',
    href: '#request-assistance',
    journeyType: 'Early flight',
  },
  {
    id: 'something-else',
    icon: 'concierge',
    title: 'Need something else?',
    body: 'Tell us what you need.',
    cta: 'Request assistance',
    href: '#request-assistance',
    journeyType: 'Other',
  },
];

// --- Core commercial message (section 4) -------------------------------------
export const coreMessage = {
  headline: ["We Don’t Just Ask Where You’re Going.", 'We Ask About Your Flight.'],
  paragraphs: [
    'Your journey starts long before you reach the airport.',
    'VoloVertex coordinates the logistics around your flight so you can travel with less stress and greater confidence.',
    'From early-morning airport pickups to arrival transfers and personalised assistance, we take care of the details that make travelling easier.',
  ],
  cta: 'Plan my journey',
};

// --- Launch services (section 5) ---------------------------------------------
export const launchServices = [
  {
    id: 'airport-transfer',
    icon: 'car',
    title: 'Airport Transfer',
    headline: 'Home. Airport. Sorted.',
    body: 'Reliable, pre-arranged transportation to the airport, planned around your departure time.',
    suitableLabel: 'Suitable for',
    suitableFor: [
      'International travellers',
      'Domestic travellers',
      'Families',
      'Business travellers',
      'Individuals and groups',
    ],
    cta: 'Book airport transfer',
    journeyType: 'To the airport',
  },
  {
    id: 'early-flight-assist',
    icon: 'sunrise',
    title: 'Early Flight Assist',
    headline: 'Flying Before Sunrise? We’ve Got You.',
    body:
      'Early flights shouldn’t mean uncertainty. Tell us your flight time and pickup location. We’ll coordinate your airport journey around the time you need to arrive.',
    cta: 'Plan my early flight',
    journeyType: 'Early flight',
  },
  {
    id: 'arrival-assist',
    icon: 'landing',
    title: 'Arrival Assist',
    headline: 'Land. We’ve Got It From Here.',
    body:
      'Arriving in Lagos or Abuja? Arrange your airport pickup before you land and have your onward journey coordinated in advance.',
    cta: 'Arrange my arrival',
    journeyType: 'From the airport',
  },
  {
    id: 'airport-concierge',
    icon: 'concierge',
    title: 'Airport Concierge',
    headline: 'More Than a Transfer.',
    body:
      'Need more than transportation? Combine airport transfer with personalised travel assistance and additional services tailored to your journey.',
    cta: 'Request concierge assistance',
    journeyType: 'Airport + concierge',
  },
];

// --- Premium services (section 6) --------------------------------------------
export const premiumServices = {
  headline: 'Need More? We’ve Got You.',
  items: [
    {
      id: 'executive-assist',
      icon: 'executive',
      title: 'Executive Assist',
      body:
        'Premium transportation and personalised airport assistance for executives, VIP travellers and business guests.',
      cta: 'Request Executive Assist',
      journeyType: 'Executive travel',
    },
    {
      id: 'family-assist',
      icon: 'family',
      title: 'Family Assist',
      body:
        'Thoughtful travel coordination for families, children, elderly travellers and those who need additional support.',
      cta: 'Plan family travel',
      journeyType: 'Family travel',
    },
    {
      id: 'group-mobility',
      icon: 'group',
      title: 'Group Mobility',
      body:
        'Coordinated airport transportation and logistics for groups, organisations, events and delegations.',
      cta: 'Plan group travel',
      journeyType: 'Group travel',
    },
  ],
};

// --- Early Flight feature block (section 9) ----------------------------------
export const earlyFlight = {
  eyebrow: 'Early Flight Assist',
  headline: ['Flying Early?', 'We’ve Got You.'],
  copy: [
    'Your flight may leave at 6:00 AM. Your journey starts much earlier.',
    'VoloVertex coordinates your early-morning airport transportation so you can leave home on time and arrive at the airport with less stress.',
  ],
  problemHeadline: 'The Earlier the Flight, the Harder the Logistics.',
  problemIntro: 'Early flights can mean:',
  problems: [
    'Very early pickup times',
    'Limited transportation options',
    'Uncertainty around availability',
    'Traffic and route planning',
    'Heavy luggage',
    'Travelling with children',
    'Anxiety about missing the flight',
  ],
  response: 'You plan the flight. We plan the journey around it.',
  cta: 'Plan my early flight',
  secondaryCta: 'WhatsApp VoloVertex',
};

// --- Arrival feature block (section 10) --------------------------------------
export const arrival = {
  eyebrow: 'Arrival Assist',
  headline: 'Landing in Lagos or Abuja?',
  copy: [
    'Don’t land without a plan for getting where you’re going.',
    'Arrange your airport transfer before you arrive and have your onward journey coordinated by VoloVertex.',
  ],
  cta: 'Arrange my arrival',
  secondaryCta: 'WhatsApp us',
};

// --- The VoloVertex difference (section 7) -----------------------------------
export const difference = {
  headline: 'Your Journey. Coordinated.',
  items: [
    {
      icon: 'flight',
      title: 'Flight-Centred Planning',
      body: 'We plan around your flight — not simply your pickup location.',
    },
    {
      icon: 'calendar',
      title: 'Pre-Arranged',
      body: 'Know your transportation before the journey begins.',
    },
    {
      icon: 'route',
      title: 'Professional Coordination',
      body: 'A dedicated VoloVertex process keeps the moving parts connected.',
    },
    {
      icon: 'sunrise',
      title: 'Early-Morning Ready',
      body: 'Designed for travellers with early departures and tight airport schedules.',
    },
    {
      icon: 'landing',
      title: 'Arrival Confidence',
      body: 'Land knowing your onward transportation has already been arranged.',
    },
    {
      icon: 'support',
      title: 'Human Assistance',
      body: 'When plans change or you need something extra, there is a person to help.',
    },
  ],
};

// --- How it works (section 8) ------------------------------------------------
export const howItWorks = {
  headline: ['Tell Us Your Flight.', 'We’ll Handle the Journey.'],
  steps: [
    {
      title: 'Tell Us Your Flight',
      body: 'Enter your flight number, date, departure/arrival location and travel details.',
    },
    {
      title: 'Tell Us What You Need',
      body: 'Airport transfer, early-flight assistance, arrival support, concierge or something more specific.',
    },
    {
      title: 'We Plan Your Journey',
      body: 'Our team coordinates the appropriate vehicle, timing and service requirements.',
    },
    { title: 'Confirm & Pay', body: 'Review your journey details, confirm and make payment.' },
    {
      title: 'We Coordinate',
      body: 'Your journey is monitored and coordinated according to the agreed plan.',
    },
    {
      title: 'Travel With Confidence',
      body: 'Move from home to airport or airport to destination with greater ease.',
    },
  ],
  cta: 'Start my journey',
};

// --- Destinations (section 15) -----------------------------------------------
export const destinations = {
  headline: ['Starting in Lagos & Abuja.', 'Going Further.'],
  live: [
    {
      city: 'Lagos',
      body: 'Airport transportation and traveller assistance across key areas of Lagos.',
      cta: 'Explore Lagos services',
    },
    {
      city: 'Abuja',
      body: 'Airport transportation and traveller assistance across Abuja and surrounding service areas.',
      cta: 'Explore Abuja services',
    },
  ],
  futureLabel: 'Coming soon',
  future: ['Accra', 'Nairobi', 'Johannesburg', 'London', 'Amsterdam', 'Dubai'],
  futureNote: 'And other Africa–Europe corridors.',
  futureCta: 'Tell us where you travel',
};

// --- About (section 16) ------------------------------------------------------
export const about = {
  headline: 'We Make the World Easier to Navigate.',
  copy: [
    'VoloVertex is a global mobility and concierge company designed around a simple idea: international movement should feel easier.',
    'We coordinate the practical details around travel so individuals, families, professionals and organisations can move with greater confidence.',
  ],
  mission: {
    label: 'Mission',
    body: 'To make movement simpler, more connected and more human.',
  },
  vision: {
    label: 'Vision',
    body:
      'To become a trusted global mobility and concierge platform connecting people to places, opportunities and experiences.',
  },
  // Section 32 — strategic brand architecture
  architecture: [
    { stage: 'Today', body: 'Airport & Traveller Assistance' },
    { stage: 'Next', body: 'Travel & Mobility Concierge' },
    { stage: 'Future', body: 'Global Mobility Platform' },
  ],
};

// --- Business & partners (sections 13 and 14) --------------------------------
export const business = {
  headline: 'Make Travel Easier for Your People.',
  copy:
    'VoloVertex helps organisations coordinate airport transportation and traveller logistics for employees, executives, guests, students, delegates and international visitors.',
  cta: 'Open a corporate account',
  secondaryCta: 'Talk to our partnership team',
  partnersLabel: 'Who we work with',
  partners: [
    { title: 'Corporate Organisations', body: 'Employee and executive travel.' },
    { title: 'Hotels', body: 'Airport pickup and guest transportation.' },
    { title: 'Travel Agencies', body: 'Reliable local fulfilment for their clients.' },
    { title: 'Universities', body: 'Student and international visitor transportation.' },
    { title: 'NGOs & Development Organisations', body: 'Staff, consultants and delegate mobility.' },
    { title: 'Event Organisers', body: 'Conference, event and group transportation.' },
    { title: 'Relocation Companies', body: 'Airport arrival and onward journey support.' },
  ],
  account: {
    headline: ['One Journey Is a Booking.', 'Regular Travel Is a Relationship.'],
    copy:
      'For organisations with recurring traveller needs, VoloVertex can provide a structured mobility coordination service.',
    benefitsLabel: 'Potential benefits',
    benefits: [
      'Centralised requests',
      'Dedicated account support',
      'Pre-arranged transportation',
      'Traveller coordination',
      'Recurring bookings',
      'Group logistics',
      'Consolidated billing options',
      'Service reporting',
    ],
    cta: 'Request corporate access',
  },
};

// --- Trust (section 17) ------------------------------------------------------
export const trust = {
  headline: 'Travel With Confidence.',
  items: [
    {
      icon: 'verified',
      title: 'Verified Service Partners',
      body: 'We work with selected service providers who meet VoloVertex standards.',
    },
    {
      icon: 'route',
      title: 'Journey Coordination',
      body: 'Your journey details are confirmed before service delivery.',
    },
    {
      icon: 'message',
      title: 'Clear Communication',
      body: 'You know what has been arranged and what happens next.',
    },
    {
      icon: 'support',
      title: 'Customer Support',
      body: 'When you need assistance, VoloVertex remains your point of contact.',
    },
    {
      icon: 'standard',
      title: 'Service Standards',
      body:
        'Every journey is expected to meet defined standards for punctuality, professionalism and communication.',
    },
  ],
};

// --- FAQ (section 18) --------------------------------------------------------
export const faq = {
  headline: 'Questions, Answered.',
  items: [
    {
      q: 'Can I book a transfer for an early-morning flight?',
      a: 'Yes. Early Flight Assist is specifically designed for early departures.',
    },
    {
      q: 'How early should I book?',
      a: 'We recommend booking as far ahead as you can. Urgent requests are handled subject to availability.',
    },
    { q: 'Can I book for someone else?', a: 'Yes.' },
    { q: 'Can I book for my family?', a: 'Yes.' },
    { q: 'Can I arrange pickup for someone arriving in Lagos or Abuja?', a: 'Yes.' },
    { q: 'Can I book a return transfer?', a: 'Yes.' },
    {
      q: 'Do you provide airport assistance?',
      a: 'Selected airport assistance services can be arranged depending on the journey and airport requirements.',
    },
    {
      q: 'Can businesses use VoloVertex?',
      a: 'Yes. Corporate and institutional travel coordination is available.',
    },
    {
      q: 'What happens if my flight changes?',
      a: 'Contact VoloVertex as soon as possible. The operations team will assess and coordinate adjustments according to the applicable service terms.',
    },
    {
      q: 'Do I need an account?',
      a: 'No. You can make an enquiry or a booking without creating an account.',
    },
  ],
};

// --- Request assistance flow (section 20) ------------------------------------
export const requestFlow = {
  headline: 'Where Are You Going?',
  journeyTypes: [
    'To the airport',
    'From the airport',
    'Airport + concierge',
    'Early flight',
    'Executive travel',
    'Family travel',
    'Group travel',
    'Other',
  ],
  airports: [
    'Murtala Muhammed International — Lagos (LOS)',
    'Murtala Muhammed Domestic — Lagos',
    'Nnamdi Azikiwe International — Abuja (ABV)',
    'Nnamdi Azikiwe Domestic — Abuja',
  ],
  luggageOptions: ['Hand luggage only', '1–2 checked bags', '3–4 checked bags', '5 or more / oversized'],
  submitCta: 'Get my journey plan',
};

// --- Final homepage CTA (section 25) -----------------------------------------
export const finalCta = {
  headline: 'Your Journey Starts Here.',
  copy:
    'Whether you’re catching an early flight, arriving in Lagos or Abuja, travelling with family, or coordinating travel for others, VoloVertex is here to make the journey easier.',
  primaryCta: 'Plan my journey',
  secondaryCta: 'WhatsApp VoloVertex',
};

// --- Footer (section 26) -----------------------------------------------------
export const footer = {
  columns: [
    {
      title: 'Explore',
      links: [
        { label: 'Home', href: '#top' },
        { label: 'Services', href: '#services' },
        { label: 'How It Works', href: '#how-it-works' },
        { label: 'Destinations', href: '#destinations' },
        { label: 'Business & Partners', href: '#business' },
        { label: 'About', href: '#about' },
        { label: 'FAQ', href: '#faq' },
        { label: 'Contact', href: '#contact' },
      ],
    },
    {
      title: 'Services',
      links: [
        { label: 'Airport Transfers', href: '#services' },
        { label: 'Early Flight Assist', href: '#early-flight' },
        { label: 'Arrival Assist', href: '#arrival' },
        { label: 'Airport Concierge', href: '#services' },
        { label: 'Executive Assist', href: '#premium' },
        { label: 'Family Assist', href: '#premium' },
        { label: 'Group Mobility', href: '#premium' },
      ],
    },
  ],
  legal: [
    { label: 'Terms & Conditions', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Cancellation Policy', href: '#' },
    { label: 'Service Terms', href: '#' },
  ],
};
