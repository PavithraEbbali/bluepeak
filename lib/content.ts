/* =============================================================================
 * lib/content.ts - SINGLE SOURCE OF TRUTH
 * -----------------------------------------------------------------------------
 * Every price, speed, plan name, trust chip, comparison row, nav link and legal
 * disclosure on this site is derived from the data in this file. Change a price
 * here and it cascades to the hero lockup, the plan cards, the fine-print grid
 * and the legal copy automatically. No .tsx layout file needs to be touched.
 *
 * A service line with zero plans is removed from the page and from the nav
 * automatically (see `activeServiceLines`), which is how the site stays limited
 * to the services Bluepeak actually sells.
 * ========================================================================== */

export type ServiceLine =
  | 'fiber'
  | 'cable'
  | 'bundle'
  | 'tv'
  | 'mobile'
  | 'phone';

export interface PlanItem {
  id: string;
  name: string;
  serviceLine: ServiceLine;
  speedDown?: number;
  speedUp?: number;
  price?: number;
  cents?: string;
  promoQualifier?: string;
  equipmentFee?: string;
  dataPolicy?: string;
  contractTerm?: string;
  features: string[];
  isPopular?: boolean;
  /* Presentation-only extras. Optional, so the core model stays portable. */
  tagline?: string;
  bestFor?: string;
  channelCount?: string;
  priceLock?: string;
  badge?: string;
}

/* -----------------------------------------------------------------------------
 * 1. RETAILER IDENTITY
 * -------------------------------------------------------------------------- */

export const site = {
  /** The independent retailer operating this site. */
  entity: 'Bluepeak Authorized Retailer',
  brand: 'Bluepeak',
  /** TODO: replace with the retailer's tracked sales number before launch. */
  phoneDisplay: '(888) 555-0142',
  phoneHref: 'tel:+18885550142',
  disclosure: 'Independent Authorized Retailer of Bluepeak.',
  hours: 'Mon-Sat, 8am-9pm CT',
} as const;

/* -----------------------------------------------------------------------------
 * 2. PLANS - sourced from mybluepeak.com
 * -------------------------------------------------------------------------- */

const INCLUDED_HARDWARE = 'Modem and eero Wi-Fi router included';
const NO_CAPS = 'Unlimited data, no caps, no throttling';
const NO_CONTRACT = 'No annual contract';
const AUTOPAY = 'with autopay';

export const plans: PlanItem[] = [
  /* ---------------------------------- FIBER ------------------------------- */
  {
    id: 'fiber-1-gig',
    name: 'Bluepeak Fiber 1 Gig',
    serviceLine: 'fiber',
    speedDown: 1000,
    speedUp: 1000,
    price: 55,
    cents: '00',
    promoQualifier: AUTOPAY,
    equipmentFee: INCLUDED_HARDWARE,
    dataPolicy: NO_CAPS,
    contractTerm: NO_CONTRACT,
    priceLock: '1-year price lock included',
    tagline: 'Stream, work and video chat with room to spare.',
    bestFor: 'Everyday households, remote work, 4K streaming',
    features: [
      'Symmetrical 1 Gig download and upload',
      'Modem included at no extra cost',
      'eero whole-home Wi-Fi router included',
      'Free installation when you order online',
      '1-year price lock included',
      'Unlimited data with no overage fees',
    ],
  },
  {
    id: 'fiber-2-gig',
    name: 'Bluepeak Fiber 2 Gig',
    serviceLine: 'fiber',
    speedDown: 2000,
    speedUp: 2000,
    price: 75,
    cents: '00',
    promoQualifier: AUTOPAY,
    equipmentFee: INCLUDED_HARDWARE,
    dataPolicy: NO_CAPS,
    contractTerm: NO_CONTRACT,
    priceLock: '2-year price lock included',
    isPopular: true,
    badge: 'Most popular',
    tagline: 'Built for busy homes with a lot going on at once.',
    bestFor: 'Multiple users, multiple devices, heavy video calls',
    features: [
      'Symmetrical 2 Gig download and upload',
      'Modem included at no extra cost',
      'eero whole-home Wi-Fi router included',
      'Free installation when you order online',
      '2-year price lock included',
      'Unlimited data with no overage fees',
    ],
  },
  {
    id: 'fiber-5-gig',
    name: 'Bluepeak Fiber 5 Gig',
    serviceLine: 'fiber',
    speedDown: 5000,
    speedUp: 5000,
    price: 100,
    cents: '00',
    promoQualifier: AUTOPAY,
    equipmentFee: INCLUDED_HARDWARE,
    dataPolicy: NO_CAPS,
    contractTerm: NO_CONTRACT,
    priceLock: '5-year price lock included',
    tagline: 'The top of the network, for homes that push it hard.',
    bestFor: 'Competitive gaming, large file transfers, creator workflows',
    features: [
      'Symmetrical 5 Gig download and upload',
      'Modem included at no extra cost',
      'eero whole-home Wi-Fi router included',
      'Free installation when you order online',
      '5-year price lock included',
      'Unlimited data with no overage fees',
    ],
  },

  /* --------------------------------- BUNDLES ------------------------------ */
  {
    id: 'bundle-1-gig-locals',
    name: 'Fiber 1 Gig + My Locals',
    serviceLine: 'bundle',
    speedDown: 1000,
    speedUp: 1000,
    equipmentFee: INCLUDED_HARDWARE,
    dataPolicy: NO_CAPS,
    contractTerm: NO_CONTRACT,
    tagline: 'Symmetrical gig fiber plus your local channels and Bluepeak Stream.',
    bestFor: 'Households that want local news, weather and sports',
    features: [
      'Bluepeak Fiber 1 Gig symmetrical internet',
      'My Locals TV package with local broadcasters',
      'Bluepeak Stream included',
      '300+ free streaming channels',
      'One bill for internet and TV',
    ],
  },
  {
    id: 'bundle-2-gig-favorites',
    name: 'Fiber 2 Gig + My Locals + Favorites',
    serviceLine: 'bundle',
    speedDown: 2000,
    speedUp: 2000,
    equipmentFee: INCLUDED_HARDWARE,
    dataPolicy: NO_CAPS,
    contractTerm: NO_CONTRACT,
    isPopular: true,
    badge: 'Best value bundle',
    tagline: 'More speed, more channels, and every game in one place.',
    bestFor: 'Sports fans and homes replacing a legacy TV package',
    features: [
      'Bluepeak Fiber 2 Gig symmetrical internet',
      'My Locals + Favorites TV package',
      'Sports Hub, Startover and Catchup',
      'Bluepeak Stream included',
      'One bill for internet and TV',
    ],
  },

  /* ----------------------------------- TV --------------------------------- */
  {
    id: 'tv-my-locals',
    name: 'Bluepeak TV - My Locals',
    serviceLine: 'tv',
    channelCount: '14+ channels',
    tagline: 'Local broadcasters plus 300+ free streaming channels.',
    bestFor: 'Everyday viewing and local access',
    features: [
      'Includes your local broadcasters',
      'Bluepeak Stream included',
      '300+ free streaming channels',
      'Unified search across live and on-demand',
      'Personalized recommendations',
    ],
  },
  {
    id: 'tv-locals-favorites',
    name: 'Bluepeak TV - My Locals + Favorites',
    serviceLine: 'tv',
    channelCount: '78+ channels',
    isPopular: true,
    badge: 'Most popular',
    tagline: 'Adds sports and the popular cable networks.',
    bestFor: 'Households that want more variety and sports',
    features: [
      'Everything in My Locals',
      'Sports Hub keeps every game in one place',
      'Startover and Catchup on supported channels',
      'Bluepeak Stream included',
      'Watch on any device around the house',
    ],
  },
  {
    id: 'tv-locals-favorites-more',
    name: 'Bluepeak TV - My Locals + Favorites + More',
    serviceLine: 'tv',
    channelCount: '136+ channels',
    tagline: 'The full lineup, built to replace traditional TV outright.',
    bestFor: 'Replacing a traditional cable TV package',
    features: [
      'Everything in My Locals + Favorites',
      'The widest Bluepeak channel lineup',
      'MultiView shows up to four live feeds at once',
      'Bluepeak Stream included',
      'Watch on any device around the house',
    ],
  },

  /* -------------------------------------------------------------------------
   * Deliberately empty service lines.
   *
   * cable  - Bluepeak markets a fiber-to-the-home network to residential
   *          customers; there is no separately sold residential cable tier.
   * mobile - Bluepeak does not sell a mobile or wireless plan.
   * phone  - Bluepeak Hosted Voice is a business product rather than a
   *          residential one, so it is not offered on this residential page.
   *
   * Because no PlanItem carries these service lines, their sections and nav
   * links are removed from the site automatically. Add a plan here and the
   * section reappears in canonical order with no layout edits.
   * ---------------------------------------------------------------------- */
];

/* -----------------------------------------------------------------------------
 * 3. SERVICE LINE PRESENTATION + CANONICAL ORDER
 * -------------------------------------------------------------------------- */

export const serviceLineOrder: ServiceLine[] = [
  'fiber',
  'cable',
  'bundle',
  'tv',
  'mobile',
  'phone',
];

/** How a service line's section is dressed: flat white, muted, or photographic. */
export type SectionTone = 'white' | 'muted' | 'photo';

export const serviceLineMeta: Record<
  ServiceLine,
  {
    id: string;
    navLabel: string;
    eyebrow: string;
    heading: string;
    intro: string;
    tone?: SectionTone;
  }
> = {
  fiber: {
    id: 'fiber',
    navLabel: 'Fiber',
    tone: 'white',
    eyebrow: 'Fiber internet',
    heading: 'Fiber internet plans and pricing',
    intro:
      'Every Bluepeak fiber plan delivers matching download and upload speeds, includes the modem and an eero Wi-Fi router, and carries a price lock for the full length of its term.',
  },
  cable: {
    id: 'cable',
    navLabel: 'Cable',
    eyebrow: 'Cable internet',
    heading: 'Cable internet',
    intro: '',
  },
  bundle: {
    id: 'bundles',
    navLabel: 'Bundles',
    tone: 'muted',
    eyebrow: 'Internet and TV',
    heading: 'Internet and TV on one monthly bill',
    intro:
      'Combine any fiber plan with a Bluepeak TV package and Bluepeak Stream. Bundle rates depend on the package and the service address, so our team will confirm your pricing by phone.',
  },
  tv: {
    id: 'tv',
    navLabel: 'TV',
    tone: 'photo',
    eyebrow: 'Bluepeak TV and Stream',
    heading: 'Live television and streaming in one experience',
    intro:
      'Bluepeak TV brings live channels, on-demand content and your streaming applications together in a single interface. Channel lineups and pricing vary by service address, so call our team to review the lineup available at your location.',
  },
  mobile: {
    id: 'mobile',
    navLabel: 'Mobile',
    eyebrow: 'Mobile',
    heading: 'Mobile',
    intro: '',
  },
  phone: {
    id: 'phone',
    navLabel: 'Phone',
    eyebrow: 'Voice',
    heading: 'Phone',
    intro: '',
  },
};

/* -----------------------------------------------------------------------------
 * 4. DERIVED SELECTORS - the cascade layer
 * -------------------------------------------------------------------------- */

export const plansByLine = (line: ServiceLine): PlanItem[] =>
  plans.filter((p) => p.serviceLine === line);

/** Service lines that actually have plans, in canonical order. */
export const activeServiceLines: ServiceLine[] = serviceLineOrder.filter((line) =>
  plans.some((p) => p.serviceLine === line),
);

/** Cheapest priced plan on the site - drives the hero price anchor. */
export const heroPlan: PlanItem =
  plans
    .filter((p) => typeof p.price === 'number')
    .sort((a, b) => (a.price as number) - (b.price as number))[0] ?? plans[0];

/** Fastest advertised speed anywhere in the lineup. */
export const topSpeedMbps: number = Math.max(
  ...plans.map((p) => p.speedDown ?? 0),
);
export const topSpeedGbps: number = topSpeedMbps / 1000;

/** The plan the hero showcases: the flagged fiber plan, else the lead plan. */
export const featuredPlan: PlanItem =
  plans.find((p) => p.serviceLine === 'fiber' && p.isPopular) ?? heroPlan;

export const startingPrice: number | undefined = heroPlan.price;

export const formatSpeed = (mbps?: number): string => {
  if (!mbps) return '-';
  return mbps >= 1000 ? `${mbps / 1000} Gig` : `${mbps} Mbps`;
};

/**
 * The one rule that decides what every plan CTA says. A plan with a published
 * price reads "Call to order"; a plan without one reads "Call for pricing".
 * Delete a `price` above and the relevant buttons relabel themselves.
 */
export const ctaLabelFor = (plan: PlanItem): string =>
  typeof plan.price === 'number' ? 'Call to order' : 'Call for pricing';

/** Anchor nav is generated from the lines that survived the filter above. */
export const navLinks: { href: string; label: string }[] = [
  ...activeServiceLines.map((line) => ({
    href: `#${serviceLineMeta[line].id}`,
    label: serviceLineMeta[line].navLabel,
  })),
  { href: '#details', label: 'What it costs' },
  { href: '#why', label: 'Why fiber' },
  { href: '#faq', label: 'FAQ' },
];

/* -----------------------------------------------------------------------------
 * 5. HERO + TRUST
 * -------------------------------------------------------------------------- */

export const hero = {
  eyebrow: 'Authorized Retailer',
  headline: 'High-speed fiber internet for the modern home.',
  /** Phrase picked out in Bluepeak gold inside the headline. */
  headlineHighlight: 'fiber internet',
  subline: `Bluepeak operates a fiber-to-the-home network with matching upload and download speeds up to ${topSpeedGbps} Gig, unlimited data and no annual contract. Check availability at your address, then call to complete your order.`,
  trustChips: ['No Credit Checks', 'No Data Caps', 'Transparent Pricing'],
} as const;

export const marqueeItems: string[] = [
  'Symmetrical upload and download',
  'eero whole-home Wi-Fi included',
  'Unlimited data',
  'No annual contract',
  'Free installation when you order online',
  'Price lock on every fiber plan',
  'Modem included',
  'Local installation crews',
];

/* -----------------------------------------------------------------------------
 * 5b. IMAGERY
 *
 * Alt text lives beside the file path so a swapped photo can never keep a
 * description that no longer matches it.
 * -------------------------------------------------------------------------- */

export interface SiteImage {
  src: string;
  alt: string;
  /** object-position for the crop, since every source is 1408x768. */
  position?: string;
}

export const images: Record<string, SiteImage> = {
  hero: {
    src: '/images/hero-connected-home.jpg',
    alt: 'A parent and child sitting together on a sofa at home, the child watching something on a tablet while afternoon light comes through the window.',
    /* Full-bleed behind the hero: hold the sofa to the right of the copy. */
    position: '62% 45%',
  },
  bundle: {
    src: '/images/bundle-internet-and-tv.jpg',
    alt: 'A father and his teenage son watching a match on the television, with a laptop open on the coffee table beside them.',
    position: '50% 45%',
  },
  tv: {
    src: '/images/tv-evening-viewing.jpg',
    alt: 'A family of four on a sofa in a darkened living room, watching television together in the evening.',
    position: '50% 40%',
  },
  install: {
    src: '/images/install-technician.jpg',
    alt: 'A field technician kneeling beside a house, wiring the network box on the exterior wall.',
    position: '45% 50%',
  },
  equipment: {
    src: '/images/wifi-equipment.jpg',
    alt: 'A plain white mesh Wi-Fi unit on a wooden shelf in a hallway, beside a stack of books and a houseplant.',
    /* Nudged right after the watermark crop took 150px off this edge, which
       shifted the router from roughly 66% of the frame to 74%. */
    position: '70% 50%',
  },
  coverage: {
    src: '/images/coverage-neighborhood.jpg',
    alt: 'A quiet residential street of single-storey homes, with overhead lines running along the roadside.',
    position: '50% 55%',
  },
  og: {
    src: '/images/og-share.jpg',
    alt: 'Bluepeak fiber internet, ordered through an independent authorized retailer.',
  },
};

/** Photos that sit beside a service line's section heading. */
export const sectionImages: Partial<Record<ServiceLine, SiteImage>> = {
  bundle: images.bundle,
  tv: images.tv,
};

/* -----------------------------------------------------------------------------
 * 6. ADD-ONS
 * -------------------------------------------------------------------------- */

export interface AddOn {
  id: string;
  name: string;
  price: string;
  description: string;
  points: string[];
}

export const addOns: AddOn[] = [
  {
    id: 'service-protection',
    name: 'Service Protection',
    price: '+$3/mo',
    description:
      'Covers the wiring inside your walls and the surprises that come with it.',
    points: [
      'Covers eligible inside wiring',
      'Helps with unexpected service fees',
      'Faster support and onsite help',
    ],
  },
  {
    id: 'eero-plus',
    name: 'eero Plus',
    price: '+$9/mo',
    description: 'Security and privacy tooling layered on top of eero Secure.',
    points: [
      'Builds on eero Secure protection',
      'Includes VPN and 1Password',
      'Adds Malwarebytes and DDNS',
    ],
  },
  {
    id: 'advanced-wifi',
    name: 'Advanced Wi-Fi',
    price: '+$15/mo',
    description: 'For larger floor plans that need signal in every corner.',
    points: [
      'Two additional eero devices',
      'Professional white-glove setup',
      'Up to 10 devices connected',
    ],
  },
];

/* -----------------------------------------------------------------------------
 * 7. FINE-PRINT GRID - derived from the plan data above
 * -------------------------------------------------------------------------- */

export interface FinePrintRow {
  label: string;
  values: string[];
  note?: string;
}

const fiberPlans = plansByLine('fiber');

/** Section copy lives here too, so no heading is stranded in a layout file. */
export const finePrintCopy = {
  eyebrow: 'Pricing detail',
  heading: 'Complete pricing and inclusions',
  intro:
    'Equipment, monthly service and everything included with each plan, set out in full. Taxes, fees and surcharges are additional on every plan.',
};

export const addOnsCopy = {
  eyebrow: 'Optional services',
  heading: 'Optional service add-ons',
  intro:
    'Each add-on is optional and billed separately from your monthly plan rate. None are enabled by default.',
};

export const finePrint = {
  columns: fiberPlans.map((p) => p.name.replace('Bluepeak Fiber ', '')),
  rows: [
    {
      label: 'Monthly price',
      values: fiberPlans.map((p) =>
        typeof p.price === 'number'
          ? `$${p.price}.${p.cents ?? '00'}/mo`
          : 'Call for pricing',
      ),
      note: 'With autopay enrollment.',
    },
    {
      label: 'Download / upload',
      values: fiberPlans.map(
        (p) => `${formatSpeed(p.speedDown)} / ${formatSpeed(p.speedUp)}`,
      ),
      note: 'Fiber runs the same speed in both directions.',
    },
    {
      label: 'Modem',
      values: fiberPlans.map(() => 'Included, $0'),
    },
    {
      label: 'eero Wi-Fi router',
      values: fiberPlans.map(() => 'Included, $0'),
      note: 'eero model varies by speed tier.',
    },
    {
      label: 'Professional installation',
      values: fiberPlans.map(() => 'Free when you order online'),
      note: 'Installation price applies in certain markets.',
    },
    {
      label: 'Data cap',
      values: fiberPlans.map(() => 'None'),
    },
    {
      label: 'Annual contract',
      values: fiberPlans.map(() => 'None'),
    },
    {
      label: 'Price lock',
      values: fiberPlans.map((p) => p.priceLock?.replace(' included', '') ?? '-'),
    },
    {
      label: 'Autopay discount',
      values: fiberPlans.map(() => '$10/mo bank, $5/mo card'),
      note: 'Discounts are already reflected in the prices shown.',
    },
    {
      label: 'Taxes, fees and surcharges',
      values: fiberPlans.map(() => 'Additional'),
      note: 'Not included in the monthly price above.',
    },
  ] as FinePrintRow[],
};

/* -----------------------------------------------------------------------------
 * 8. WHY US
 * -------------------------------------------------------------------------- */

export const whyUs = {
  eyebrow: 'How it works',
  heading: 'Three steps to installation',
  benefitsEyebrow: 'Why Bluepeak fiber',
  benefitsHeading: 'A fiber network built for consistent performance',
  benefitsIntro:
    'The network is fiber to the home, the equipment is included, and the rate shown on each plan is the rate we quote.',
  steps: [
    {
      n: '01',
      title: 'Check your address',
      body: 'Enter your ZIP to see whether Bluepeak fiber has reached your street yet. The network is still expanding, so this changes month to month.',
    },
    {
      n: '02',
      title: 'Call and pick a plan',
      body: 'Tell us how many people and devices share the house. We will match you to 1, 2 or 5 Gig and confirm the exact monthly rate for your address.',
    },
    {
      n: '03',
      title: 'Get installed',
      body: 'A local technician runs the fiber, sets up your eero, and confirms speed on your devices before leaving.',
    },
  ],
  benefits: [
    {
      title: 'Fiber the whole way',
      body: 'Light through glass rather than electricity through copper, so distance and weather have far less effect on what you actually receive.',
    },
    {
      title: 'Uploads that match downloads',
      body: 'Every fiber plan is symmetrical. Backups, video calls and large uploads move at the same rate as your downloads.',
    },
    {
      title: 'eero whole-home Wi-Fi',
      body: 'An eero router is included with every fiber plan, and Advanced Wi-Fi adds two more eero units for larger floor plans.',
    },
    {
      title: 'Pricing you can read',
      body: 'One monthly rate, a price lock on every fiber tier, no data caps and no annual contract. Taxes and fees are additional.',
    },
    {
      title: 'A price lock as standard',
      body: '1 Gig locks for a year, 2 Gig for two years and 5 Gig for five, so the rate you sign up on is the rate you keep.',
    },
    {
      title: 'Installed by local crews',
      body: 'Bluepeak builds and maintains its own network across the Midwest and Plains, and the technician who shows up works in your area.',
    },
  ],
};

/* -----------------------------------------------------------------------------
 * 9. FAQ
 * -------------------------------------------------------------------------- */

export const faqs: { q: string; a: string }[] = [
  {
    q: 'What equipment comes with a Bluepeak fiber plan?',
    a: 'Every fiber plan includes the modem and an eero whole-home Wi-Fi router at no additional monthly cost. The eero model varies by speed tier, so the 5 Gig plan ships with a unit capable of carrying that throughput. If your home is large or oddly shaped, Advanced Wi-Fi adds two more eero devices and professional setup for $15 a month.',
  },
  {
    q: 'How does installation work, and what does it cost?',
    a: 'Installation is free when you order online. A local Bluepeak technician brings the fiber line to your home, installs the wall terminal and modem, sets up your eero, and confirms real speeds on your own devices before leaving. Most appointments run one to three hours. Installation price applies in certain markets.',
  },
  {
    q: 'Are the advertised speeds the same up and down?',
    a: 'Yes. Bluepeak fiber is symmetrical, so the 1 Gig plan uploads at 1 Gig and the 5 Gig plan uploads at 5 Gig. That matters for video calls, cloud backups, game uploads and anything else that sends data out of the house.',
  },
  {
    q: 'Will I hit a data cap or get throttled?',
    a: 'No. All Bluepeak fiber plans include unlimited data with no caps, no overage charges and no speed throttling once you cross a threshold.',
  },
  {
    q: 'Do I have to sign an annual contract?',
    a: 'No. Bluepeak fiber plans are month-to-month with no annual contract and no early termination fee. Separately, each tier includes a price lock, one year on 1 Gig, two on 2 Gig and five on 5 Gig, which holds your rate without obligating you to stay.',
  },
  {
    q: 'How do I get the advertised monthly price?',
    a: 'Advertised prices require autopay enrollment. Paying from a bank account earns a $10 per month discount and paying by credit card earns $5 per month. Set autopay up before your first bill to keep the discount on the account.',
  },
  {
    q: 'What speed should I actually pick?',
    a: '1 Gig comfortably covers a household streaming in 4K, working from home and gaming. 2 Gig suits homes with several heavy users at once, such as multiple video calls, several 4K streams and large downloads in parallel. 5 Gig is for competitive gaming, large media workflows and homes that move very large files regularly.',
  },
  {
    q: 'Can I get Bluepeak TV without Bluepeak internet?',
    a: 'Bluepeak TV is designed to run over the Bluepeak network, and Bluepeak Stream is also available to internet-only customers. Channel lineups and TV pricing vary by location, so call and we will confirm exactly what is carried at your address.',
  },
  {
    q: 'Where is Bluepeak fiber available?',
    a: 'Bluepeak serves communities across North Dakota, South Dakota, Minnesota, Oklahoma, Texas and Wyoming, and the build is ongoing. Availability is street by street rather than city-wide, so the fastest way to know is to check your ZIP and call.',
  },
];

/* -----------------------------------------------------------------------------
 * 10. COVERAGE + LEGAL - disclosures derived from the plan data
 * -------------------------------------------------------------------------- */

export const coverage = {
  eyebrow: 'Availability',
  heading: 'See what is available at your address',
  intro:
    'Bluepeak builds street by street, so two homes on the same road can be on different timelines. Checking takes a few seconds and puts you under no obligation.',
  note: 'Free to check. No obligation.',
  states: [
    { state: 'North Dakota', cities: ['Grand Forks'] },
    { state: 'South Dakota', cities: ['Sioux Falls', 'Rapid City', 'Vermillion'] },
    { state: 'Minnesota', cities: ['East Grand Forks'] },
    {
      state: 'Oklahoma',
      cities: [
        'Altus',
        'Alva',
        'Bartlesville',
        'Blackwell',
        'Clinton',
        'Cushing',
        'Elk City',
        'Enid',
        'Lawton',
        'Midwest City',
        'Muskogee',
        'Okmulgee',
        'Pawhuska',
        'Perry',
        'Pryor Creek',
        'Shawnee',
        'Stillwater',
        'Tonkawa',
        'Yukon',
      ],
    },
    { state: 'Texas', cities: ['Denison'] },
    {
      state: 'Wyoming',
      cities: ['Buffalo', 'Casper', 'Cheyenne', 'Laramie', 'Mills', 'Sheridan'],
    },
  ],
};

const pricedPlans = plans.filter((p) => typeof p.price === 'number');
const priceList = pricedPlans
  .map((p) => `${p.name.replace('Bluepeak Fiber ', '')} at $${p.price}.${p.cents ?? '00'}/mo`)
  .join(', ');

export const legal = {
  reseller: `${site.entity}. Bluepeak and the Bluepeak logo are trademarks of their respective owner and are used here to describe the services offered.`,
  disclosures: [
    `Advertised fiber pricing (${priceList}) reflects enrollment in autopay. Paying from a bank account earns a $10 per month discount; paying by credit card earns $5 per month. If autopay is not active by your first bill, the discount is removed.`,
    'Offers are available to U.S. residents aged 18 or older who are new residential Bluepeak customers in Bluepeak service areas. Some offers and plans are unavailable in certain areas.',
    'Free installation applies to online orders. Installation price applies in certain markets.',
    'Taxes, fees and surcharges are additional and are not included in the monthly prices shown.',
    'TV channel lineups and TV pricing vary by location. Channel counts shown are minimums and change by market.',
    'Speeds shown are the maximum wired speeds of the plan. Actual speeds vary with in-home wiring, Wi-Fi conditions and the capability of the connected device.',
  ],
};

export const footerColumns = [
  {
    title: 'Plans',
    links: activeServiceLines.map((line) => ({
      href: `#${serviceLineMeta[line].id}`,
      label: serviceLineMeta[line].navLabel,
    })),
  },
  {
    title: 'Details',
    links: [
      { href: '#details', label: 'What it costs' },
      { href: '#addons', label: 'Add-ons' },
      { href: '#why', label: 'Why fiber' },
      { href: '#coverage', label: 'Service area' },
    ],
  },
  {
    title: 'Help',
    links: [
      { href: '#faq', label: 'Common questions' },
      { href: '#hero', label: 'Check availability' },
      { href: site.phoneHref, label: site.phoneDisplay },
    ],
  },
];

export const legalLinks = [
  { href: '#legal', label: 'Terms & Conditions' },
  { href: '#legal', label: 'Privacy Policy' },
  { href: '#legal', label: 'Accessibility' },
  { href: '#legal', label: 'Do Not Sell My Info' },
];
