// All site copy lives here. The page is rendered from this file at build time
// (see vite.config.js), so editing content never means touching markup.

export const site = {
  name: 'Nicolas M. Rodriguez',
  short: 'Nick',
  role: 'Customer Success Engineer',
  location: 'Frisco, TX',
  timeZone: 'America/Chicago',
  email: 'nicolasmrodriguez3@gmail.com',
  github: 'https://github.com/nrodriguez04',
  linkedin: 'https://www.linkedin.com/in/nicolasmrodriguez',
  description:
    'Nicolas M. Rodriguez is a Customer Success Engineer at Descope working in customer identity and access management, and builds AI-agent software on the side.',
};

export const nav = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'highlights', label: 'Highlights' },
  { id: 'contact', label: 'Contact' },
];

export const hero = {
  backdrop: ['NICOLAS M.', 'RODRIGUEZ'],
  titles: ['Customer Success Engineer', 'Identity Nerd', 'AI Agent Builder'],
  subline: 'I help customers ship identity that works, and I build AI-run software on the side.',
  orbit: ['OIDC', 'SAML', 'SCIM', 'MFA', 'FGA', 'SDKs'],
};

export const marquee = [
  'Customer Identity',
  'AI Agents',
  'OAuth 2.0',
  'Fine-Grained Auth',
  'SSO',
  'MFA',
  'SCIM',
  'WebAuthn',
  'SAML',
  'OIDC',
  'Outbound Apps',
  'SDKs & APIs',
];

export const about = {
  paragraphs: [
    'I’m a Customer Success Engineer at Descope, working as a technical leader across Customer Success, Product, and Engineering for customer identity: authentication, authorization, SSO, MFA, fine-grained authorization (FGA), connectors, APIs, outbound apps, and SDKs.',
    'Outside of work, I build AI-agent software under the Average Output umbrella: products where agents do the running and I do the operating.',
  ],
  facts: [
    { k: 'Based in', v: 'Frisco, TX' },
    { k: 'Day job', v: 'Descope' },
    { k: 'Side quest', v: 'Average Output' },
  ],
  badge: [
    { k: 'Operator', v: 'Nicolas M. Rodriguez' },
    { k: 'Callsign', v: 'nrodriguez04' },
    { k: 'Division', v: 'Average Output' },
    { k: 'Clearance', v: 'Operator' },
    { k: 'Issued', v: '2026' },
  ],
};

// The seven stages of the login pipeline in the Skills section.
export const pipeline = [
  {
    id: 'credentials',
    label: 'User credentials',
    short: 'Credentials',
    tech: ['Passwords', 'Magic links', 'OTP', 'Passkeys'],
    token: 'creds',
    icon: 'key',
    body:
      'Every journey starts with someone proving who they are. I help customers pick sign-in methods that fit their users, wire them into real apps, and chase down the edge cases when a login doesn’t behave the way the docs promised.',
  },
  {
    id: 'idp',
    label: 'Identity provider',
    short: 'IdP',
    tech: ['OAuth 2.0', 'OIDC', 'SAML', 'SSO'],
    token: 'id_token',
    icon: 'id',
    body:
      'Federation is where integrations get interesting. I work through OAuth 2.0 and OIDC flows, SAML assertions, and SSO rollouts alongside customer engineering and IT teams, from metadata exchange to attribute mapping.',
  },
  {
    id: 'mfa',
    label: 'MFA',
    short: 'MFA',
    tech: ['WebAuthn', 'TOTP', 'Step-up'],
    token: 'mfa ✓',
    icon: 'shield',
    body:
      'Second factors done right: WebAuthn and passkeys, TOTP authenticator apps, and step-up checks. A lot of the work is helping customers decide where to require MFA without wrecking sign-up conversion.',
  },
  {
    id: 'scim',
    label: 'Directory sync',
    short: 'SCIM',
    tech: ['SCIM', 'Provisioning', 'Groups'],
    token: 'scim',
    icon: 'sync',
    body:
      'Keeping users and groups in lockstep between enterprise directories and the app with SCIM provisioning, and untangling what happens when the attribute mappings on each side don’t line up.',
  },
  {
    id: 'authz',
    label: 'Authorization',
    short: 'AuthZ',
    tech: ['FGA', 'RBAC', 'Policies'],
    token: 'permit',
    icon: 'lock',
    body:
      'Who can do what. I translate a customer’s business rules into roles, permissions, and fine-grained authorization (FGA) relationship models, then pressure-test them against the weird cases.',
  },
  {
    id: 'apis',
    label: 'APIs & SDKs',
    short: 'APIs',
    tech: ['Management APIs', 'SDKs', 'Connectors', 'Outbound apps'],
    token: 'api 200',
    icon: 'code',
    body:
      'The glue that gets identity into a customer’s stack: management APIs, SDKs, connectors, and outbound apps. I read, write, and review integration code in JavaScript, TypeScript, and Python.',
  },
  {
    id: 'audit',
    label: 'Audit',
    short: 'Audit',
    tech: ['Audit logs', 'Datadog'],
    token: 'logged',
    icon: 'pulse',
    body:
      'When something breaks, the logs tell the story. I dig through audit trails and Datadog to trace a failed login back to a root cause, then close the loop with Product and Engineering.',
  },
];

export const tooling = [
  { name: 'JavaScript', icon: 'siJavascript' },
  { name: 'TypeScript', icon: 'siTypescript' },
  { name: 'Python', icon: 'siPython' },
  { name: 'PostgreSQL', icon: 'siPostgresql' },
  { name: 'Unreal Engine', icon: 'siUnrealengine' },
  { name: 'GitHub', icon: 'siGithub' },
  { name: 'Slack', icon: 'slack' },
  { name: 'Datadog', icon: 'siDatadog' },
  { name: 'Airtable', icon: 'siAirtable' },
  { name: 'Google Sheets', icon: 'siGooglesheets' },
  { name: 'Claude Code', icon: 'siClaude' },
];

// group: 'descope' | 'side' (drives the Work filter)
// status: 'live' | 'progress' | 'concept' | 'descope'
export const projects = [
  {
    name: 'Descope Learning Management System',
    group: 'descope',
    status: 'descope',
    statusLabel: 'At Descope',
    blurb:
      'The learning hub at learn.descope.io, built for the people learning to ship customer identity with Descope.',
    tags: ['LMS', 'Developer education', 'Identity'],
    link: { href: 'https://learn.descope.io/', label: 'Visit site' },
    visual: 'lms',
    span: 2,
  },
  {
    name: 'Descope FedRAMP Guru',
    group: 'descope',
    status: 'descope',
    statusLabel: 'At Descope',
    blurb:
      'A FedRAMP knowledge tool built at Descope to help teams find their way through federal compliance questions around customer identity.',
    tags: ['FedRAMP', 'Compliance', 'Identity'],
    link: { href: 'https://github.com/nrodriguez04', label: 'GitHub profile' },
    visual: 'fedramp',
  },
  {
    name: 'ParlayLab',
    group: 'side',
    status: 'live',
    statusLabel: 'Live',
    blurb:
      'An agentic sports-betting ticket and parlay builder SaaS. Touchdown models trained on a 329-touchdown NFL dataset, with Stripe subscription billing live.',
    tags: ['Python', 'ML models', 'Stripe'],
    link: { href: 'https://github.com/nrodriguez04', label: 'GitHub profile' },
    visual: 'parlay',
    span: 2,
  },
  {
    name: 'Average Output City',
    group: 'side',
    status: 'progress',
    statusLabel: 'In progress',
    blurb:
      'A private 3D night-city mission control built in Three.js. One building per division, lit up with live agent activity.',
    tags: ['Three.js', 'Agent ops'],
    link: { href: 'https://github.com/nrodriguez04', label: 'GitHub profile' },
    visual: 'city',
  },
  {
    name: 'Mission Control',
    group: 'side',
    status: 'progress',
    statusLabel: 'In progress',
    blurb: 'A model probability dashboard with ticket export and a backtester.',
    tags: ['Data viz', 'JavaScript'],
    link: { href: 'https://github.com/nrodriguez04', label: 'GitHub profile' },
    visual: 'mission',
  },
  {
    name: 'Creator OS',
    group: 'side',
    status: 'progress',
    statusLabel: 'In progress',
    blurb:
      'An operating system for a personal media company: content inbox, library lineage, an approval-gated review queue, and scheduled publishing.',
    tags: ['Content ops', 'Agents'],
    link: { href: 'https://github.com/nrodriguez04', label: 'GitHub profile' },
    visual: 'creator',
  },
  {
    name: 'FedOps',
    group: 'side',
    status: 'progress',
    statusLabel: 'In progress',
    blurb: 'A federal contracting operations platform.',
    tags: ['Python', 'Gov contracting'],
    link: { href: 'https://github.com/nrodriguez04/fedops', label: 'View repo' },
    visual: 'fedops',
  },
  {
    name: 'Hålo',
    group: 'side',
    status: 'concept',
    statusLabel: 'Concept',
    blurb: 'Real estate wholesaling software.',
    tags: ['Proptech'],
    link: { href: 'https://github.com/nrodriguez04', label: 'GitHub profile' },
    visual: 'halo',
  },
  {
    name: 'OTHERLIFE',
    group: 'side',
    status: 'concept',
    statusLabel: 'Concept',
    blurb: 'A persistent open-world life sim built in Unreal Engine 5.',
    tags: ['Unreal Engine 5'],
    link: { href: 'https://github.com/nrodriguez04', label: 'GitHub profile' },
    visual: 'otherlife',
    span: 2,
  },
];

// Dates are [year, month] with month 1-12; end: null means present.
export const experience = [
  {
    role: 'Customer Success Engineer',
    org: 'Descope',
    start: [2025, 6],
    end: null,
    meta: ['Full-time', 'Hybrid'],
  },
  {
    role: 'Consultant, Marketing & Automation Strategy',
    org: 'Koral Digital',
    start: [2019, 11],
    end: [2025, 6],
    meta: ['Freelance', 'Remote', 'Dallas, TX'],
  },
  {
    role: 'Customer Success Manager',
    org: 'Mining Syndicate',
    start: [2023, 6],
    end: [2024, 11],
    meta: ['Full-time', 'Hybrid', 'DFW'],
  },
  {
    role: 'Solutions Engineer Intern',
    org: 'Circle',
    start: [2024, 5],
    end: [2024, 8],
    meta: ['Internship', 'Remote'],
  },
  {
    role: 'College Pathways Participant',
    org: 'AI4ALL',
    start: [2022, 9],
    end: [2023, 5],
    meta: [],
  },
];

export const education = [
  {
    school: 'Florida International University',
    degree: 'BA, Computer Science',
    start: [2022, 3],
    end: [2025, 12],
    gpa: '3.2',
    activities: ['Upsilon Pi Epsilon', 'AI4ALL', 'FIU Crypto Club', 'FIU Social'],
  },
  {
    school: 'Trinity Valley Community College',
    degree: 'AA, Computer Science',
    start: [2021, 1],
    end: [2022, 6],
    gpa: '3.2',
    activities: [],
  },
];

export const certifications = [
  { name: 'Thinking and Communicating with Data', issuer: 'FIU', date: [2023, 5] },
  { name: 'Fundamentals of Written Communication', issuer: 'FIU', date: [2023, 5] },
];

// viz: how the number is drawn as discrete units while it counts up.
export const highlights = [
  { value: 4, label: 'AI-built apps shipped in 2026', viz: 'tiles' },
  { value: 329, label: 'touchdowns in the NFL training dataset', viz: 'dots' },
  { value: 2, label: 'Stripe billing tiers live', viz: 'tiers' },
  { value: 8, label: 'identity domains covered', viz: 'ring' },
];

export const contact = {
  heading: ['Let’s build something', 'together.'],
  intro:
    'Working on customer identity, curious about agent-run software, or just want to compare notes? Send a message and it lands straight in my inbox.',
  // FormSubmit relays posts to the inbox. The very first submission sends a
  // one-time activation email to this address; after that it delivers normally.
  endpoint: 'https://formsubmit.co/ajax/nicolasmrodriguez3@gmail.com',
  fallbackAction: 'https://formsubmit.co/nicolasmrodriguez3@gmail.com',
};

export const footer = {
  line: 'Built with AI agents, naturally.',
};
