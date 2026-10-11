// Turns data.js into the page's static HTML at build time (and on every dev
// reload). Runtime JS only enhances this markup; it never renders content.
import {
  site,
  nav,
  hero,
  marquee,
  about,
  pipeline,
  tooling,
  projects,
  experience,
  education,
  certifications,
  highlights,
  contact,
  footer,
} from './data.js';
import { brandSvg, icon } from './icons.js';
import { visuals } from './visuals.js';
import { duration } from './duration.js';

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const fmt = ([y, m]) => `${MONTHS[m - 1]} ${y}`;
const iso = ([y, m]) => `${y}-${String(m).padStart(2, '0')}`;
const pad2 = (n) => String(n).padStart(2, '0');

const now = new Date();
const today = [now.getFullYear(), now.getMonth() + 1];

const ext = (href, text, cls = '', extra = '') =>
  `<a class="${cls}" href="${esc(href)}" target="_blank" rel="noopener noreferrer" ${extra}>${text}</a>`;

const sectionLabel = (n, text) =>
  `<p class="section-label" data-reveal><span class="section-label__num">${pad2(n)}</span><span class="section-label__rule" aria-hidden="true"></span><span>${esc(text)}</span></p>`;

// "Things I've built." -> "Things I've <em>built.</em>"
const heading = (id, lead, em) =>
  `<h2 class="h-display" id="${id}" data-heading><span class="h-display__lead">${esc(lead)}</span> <em>${esc(em)}</em></h2>`;

function socialButtons(variant = 'ghost') {
  return `
    ${ext(site.github, `${brandSvg('siGithub')}<span class="btn__label">GitHub</span>${icon('arrowUpRight', 'ico ico--sm')}`, `btn btn--${variant}`, 'data-magnetic')}
    ${ext(site.linkedin, `${brandSvg('linkedin')}<span class="btn__label">LinkedIn</span>${icon('arrowUpRight', 'ico ico--sm')}`, `btn btn--${variant}`, 'data-magnetic')}`;
}

/* ------------------------------------------------------------------ chrome */

function loader() {
  const steps = ['Resolving identity', 'Verifying credentials', 'MFA passed', 'Session issued'];
  return `
  <div class="loader" data-loader aria-hidden="true">
    <div class="loader__panel loader__panel--a"></div>
    <div class="loader__panel loader__panel--b"></div>
    <div class="loader__inner">
      <p class="loader__brand">N<em>R</em></p>
      <ul class="loader__steps">${steps.map((s) => `<li>${s}</li>`).join('')}</ul>
      <div class="loader__bar"><span></span></div>
      <p class="loader__count"><span data-loader-count>000</span><span>%</span></p>
    </div>
  </div>`;
}

function navBar() {
  const links = nav.map((n) => `<li><a href="#${n.id}" data-nav-link="${n.id}">${n.label}</a></li>`).join('');
  return `
  <header class="nav" data-nav>
    <div class="nav__bar">
      <a class="nav__logo" href="#top" aria-label="Nicolas M. Rodriguez, back to top" data-magnetic>
        <span class="nav__logo-mark" aria-hidden="true">N<em>R</em></span>
      </a>
      <nav class="nav__links" aria-label="Primary">
        <span class="nav__pill" aria-hidden="true"></span>
        <ul>${links}</ul>
      </nav>
      <div class="nav__tools">
        <button class="icon-btn motion-toggle" type="button" data-motion-toggle aria-pressed="false">
          <span class="motion-toggle__icon motion-toggle__icon--pause">${icon('pause')}</span>
          <span class="motion-toggle__icon motion-toggle__icon--play">${icon('play')}</span>
          <span class="sr-only" data-motion-label>Pause animations</span>
        </button>
        <button class="icon-btn theme-toggle" type="button" data-theme-toggle>
          <svg class="theme-toggle__svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <mask id="moon-mask"><rect width="24" height="24" fill="#fff"/><circle class="theme-toggle__bite" cx="24" cy="4" r="7" fill="#000"/></mask>
            <circle class="theme-toggle__core" cx="12" cy="12" r="5" mask="url(#moon-mask)" fill="currentColor"/>
            <g class="theme-toggle__rays" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
              <path d="M12 1.5v2.2M12 20.3v2.2M1.5 12h2.2M20.3 12h2.2M4.6 4.6l1.5 1.5M17.9 17.9l1.5 1.5M4.6 19.4l1.5-1.5M17.9 6.1l1.5-1.5"/>
            </g>
          </svg>
          <span class="sr-only theme-toggle__to-dark">Switch to dark theme</span>
          <span class="sr-only theme-toggle__to-light">Switch to light theme</span>
        </button>
        <button class="nav__burger" type="button" data-menu-toggle aria-expanded="false" aria-controls="mobile-menu">
          <span class="nav__burger-lines" aria-hidden="true"><i></i><i></i></span>
          <span class="sr-only">Menu</span>
        </button>
      </div>
    </div>
    <div class="nav__progress" aria-hidden="true"><span data-progress></span></div>
  </header>
  <div class="menu" id="mobile-menu" data-menu hidden>
    <nav aria-label="Mobile">
      <ul class="menu__links">
        ${nav
          .map(
            (n, i) =>
              `<li><a href="#${n.id}" data-menu-link><span class="menu__num">${pad2(i + 1)}</span><span class="menu__text">${n.label}</span></a></li>`
          )
          .join('')}
      </ul>
    </nav>
    <div class="menu__foot">
      ${socialButtons('ghost')}
    </div>
  </div>`;
}

/* -------------------------------------------------------------------- hero */

function heroSection() {
  const lines = hero.backdrop
    .map(
      (line, li) =>
        `<span class="hero__line" data-hero-line="${li}">${[...line]
          .map((ch) =>
            ch === ' '
              ? '<span class="hero__space"> </span>'
              : `<span class="hero__char" data-c="${esc(ch)}">${esc(ch)}</span>`
          )
          .join('')}</span>`
    )
    .join('');

  const orbitLabels = hero.orbit.map((l) => `<span class="orbit__tag" data-orbit-tag>${l}</span>`).join('');

  const sealText = 'CUSTOMER IDENTITY · AI AGENTS · FRISCO, TX · ';

  return `
  <section class="hero" id="top" aria-labelledby="hero-title">
    <div class="hero__backdrop" aria-hidden="true" data-hero-backdrop>
      ${lines}
    </div>

    <div class="hero__inner container">
      <div class="hero__meta" data-hero-in>
        <span class="chip chip--quiet"><span class="dot dot--live" aria-hidden="true"></span>Portfolio · ${today[0]}</span>
        <span class="chip chip--quiet">${icon('pin', 'ico ico--sm')}${esc(site.location)} · <time data-clock>Central Time</time></span>
      </div>

      <p class="hero__eyebrow" data-hero-in>${esc(site.name)}</p>

      <h1 class="hero__title" id="hero-title">
        <span class="sr-only">${esc(site.name)}: ${hero.titles.map(esc).join(', ')}</span>
        <span class="hero__scramble" aria-hidden="true" data-scramble='${esc(JSON.stringify(hero.titles))}' data-hero-in>${esc(hero.titles[0])}</span>
      </h1>

      <p class="hero__sub" data-hero-in>${esc(hero.subline)}</p>

      <div class="hero__cta" data-hero-in>
        <a class="btn btn--primary btn--lg" href="#contact" data-magnetic>
          <span class="btn__label">Let’s talk</span>
          <span class="btn__icon">${icon('arrow')}</span>
        </a>
        <a class="btn btn--ghost btn--lg" href="#work" data-magnetic><span class="btn__label">See what I’ve built</span></a>
      </div>
    </div>

    <div class="hero__orbit" aria-hidden="true" data-orbit>
      <div class="orbit" data-orbit-tilt>
        <svg class="orbit__rings" viewBox="-200 -200 400 400">
          <ellipse class="orbit__ring" rx="180" ry="62" transform="rotate(-18)"/>
          <ellipse class="orbit__ring" rx="150" ry="52" transform="rotate(42)"/>
          <ellipse class="orbit__ring" rx="120" ry="40" transform="rotate(102)"/>
          <circle class="orbit__halo" r="70"/>
        </svg>
        <div class="orbit__core">
          <span class="orbit__pulse"></span><span class="orbit__pulse"></span>
          <span class="orbit__mono">N<em>R</em></span>
        </div>
        ${orbitLabels}
      </div>
    </div>

    <div class="hero__foot container" data-hero-in>
      <span class="hero__scroll" aria-hidden="true"><span class="hero__scroll-line"><i></i></span>Scroll</span>
      <svg class="hero__seal" viewBox="0 0 120 120" aria-hidden="true" data-seal>
        <defs><path id="seal-path" d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1-92 0"/></defs>
        <text><textPath href="#seal-path" textLength="288">${sealText}</textPath></text>
        <path class="hero__seal-star" d="M60 47 63.5 56.5 73 60 63.5 63.5 60 73 56.5 63.5 47 60 56.5 56.5z"/>
      </svg>
    </div>
  </section>`;
}

function marqueeStrip() {
  const items = (list) =>
    list
      .map((t, i) => `<span class="marquee__item${i % 2 ? ' marquee__item--alt' : ''}">${esc(t)}</span><span class="marquee__sep" aria-hidden="true">✦</span>`)
      .join('');
  const reversed = [...marquee].reverse();
  return `
  <div class="marquee" data-marquee-wrap>
    <div class="marquee__band marquee__band--back" aria-hidden="true">
      <div class="marquee__track" data-marquee="1">
        <div class="marquee__group">${items(reversed)}</div>
        <div class="marquee__group">${items(reversed)}</div>
      </div>
    </div>
    <div class="marquee__band marquee__band--front">
      <p class="sr-only">Focus areas: ${marquee.map(esc).join(', ')}</p>
      <div class="marquee__track" data-marquee="-1" aria-hidden="true">
        <div class="marquee__group">${items(marquee)}</div>
        <div class="marquee__group">${items(marquee)}</div>
      </div>
    </div>
  </div>`;
}

/* ------------------------------------------------------------------- about */

function identicon(seed) {
  // Symmetric 5x5 grid derived from the callsign, GitHub-identicon style.
  let h = 0;
  for (const c of seed) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  let cells = '';
  for (let y = 0; y < 5; y++) {
    for (let x = 0; x < 3; x++) {
      const on = (h >> (y * 3 + x)) & 1;
      if (!on) continue;
      const xs = x === 2 ? [2] : [x, 4 - x];
      for (const xx of xs) cells += `<rect x="${xx * 10 + 1}" y="${y * 10 + 1}" width="8" height="8" rx="2" style="--i:${y * 5 + xx}"/>`;
    }
  }
  return `<svg class="badge__identicon" viewBox="-2 -2 54 54" aria-hidden="true">${cells}</svg>`;
}

function barcode(seed, count = 46) {
  let s = 0;
  for (const c of seed) s = (s * 33 + c.charCodeAt(0)) >>> 0;
  let x = 0;
  let bars = '';
  for (let i = 0; i < count; i++) {
    s = (s * 1103515245 + 12345) >>> 0;
    const w = 1 + ((s >>> 16) % 3);
    const gap = 1 + ((s >>> 20) % 2);
    bars += `<rect x="${x}" width="${w}" height="40"/>`;
    x += w + gap;
  }
  return `<svg class="badge__barcode" viewBox="0 0 ${x} 40" preserveAspectRatio="none" aria-hidden="true">${bars}</svg>`;
}

function badge() {
  const callsign = about.badge.find((f) => f.k === 'Callsign')?.v || 'nrodriguez04';
  const fields = about.badge
    .map((f) => `<div class="badge__field"><dt>${esc(f.k)}</dt><dd>${esc(f.v)}</dd></div>`)
    .join('');
  const stack = tooling
    .map((t) => `<li class="badge__stack-item">${brandSvg(t.icon)}<span>${esc(t.name)}</span></li>`)
    .join('');
  return `
  <div class="lanyard" data-lanyard>
    <div class="lanyard__strap" aria-hidden="true"><span>AVERAGE OUTPUT · AVERAGE OUTPUT · AVERAGE OUTPUT · AVERAGE OUTPUT ·</span></div>
    <div class="lanyard__clip" aria-hidden="true"><i></i></div>
    <div class="badge" data-badge>
      <div class="badge__tilt" data-badge-tilt>
        <div class="badge__inner" data-badge-inner>
          <div class="badge__face badge__face--front">
            <div class="badge__slot" aria-hidden="true"></div>
            <div class="badge__head">
              <p class="badge__title">Agent credential</p>
              <span class="badge__emblem" aria-hidden="true">AO</span>
            </div>
            <div class="badge__row">
              ${identicon(callsign)}
              <div class="badge__chip" aria-hidden="true"><i></i><i></i><i></i></div>
            </div>
            <dl class="badge__fields">${fields}</dl>
            <div class="badge__foot">
              ${barcode(callsign)}
              <span class="badge__hint" aria-hidden="true">${icon('flip', 'ico ico--sm')}Flip</span>
            </div>
            <span class="badge__holo" aria-hidden="true"></span>
          </div>
          <div class="badge__face badge__face--back">
            <div class="badge__slot" aria-hidden="true"></div>
            <div class="badge__head">
              <p class="badge__title">Operator stack</p>
              <span class="badge__emblem" aria-hidden="true">AO</span>
            </div>
            <ul class="badge__stack">${stack}</ul>
            <div class="badge__foot">
              <span class="badge__fine">${esc(callsign)} · Average Output</span>
              <span class="badge__hint" aria-hidden="true">${icon('flip', 'ico ico--sm')}Back</span>
            </div>
            <span class="badge__holo" aria-hidden="true"></span>
          </div>
        </div>
      </div>
      <button class="badge__flip" type="button" aria-pressed="false" data-badge-flip data-cursor="Flip">
        <span class="sr-only">Flip the agent credential to show the stack</span>
      </button>
    </div>
  </div>`;
}

function aboutSection() {
  return `
  <section class="section about" id="about" aria-labelledby="about-title" tabindex="-1">
    <div class="container about__grid">
      <div class="about__copy">
        ${sectionLabel(1, 'About')}
        <h2 class="h-display" id="about-title" data-heading><span class="h-display__lead">Hi, I’m</span> <em>Nick.</em></h2>
        ${about.paragraphs.map((p) => `<p class="about__p" data-words>${esc(p)}</p>`).join('')}
        <dl class="about__facts">
          ${about.facts.map((f) => `<div class="about__fact" data-reveal><dt>${esc(f.k)}</dt><dd>${esc(f.v)}</dd></div>`).join('')}
        </dl>
        <div class="about__actions" data-reveal>${socialButtons('primary')}</div>
      </div>
      <div class="about__badge" data-badge-wrap>
        ${badge()}
      </div>
    </div>
  </section>`;
}

/* ------------------------------------------------------------------ skills */

function skillsSection() {
  const nodes = pipeline
    .map(
      (s, i) => `
      <li class="pnode" style="--i:${i}">
        <button class="pnode__btn" type="button" id="pnode-${s.id}" aria-expanded="false" aria-controls="stage-${s.id}" data-stage="${i}" data-token="${esc(s.token)}">
          <span class="pnode__icon" data-pnode-icon>${icon(s.icon)}<span class="pnode__ring" aria-hidden="true"></span></span>
          <span class="pnode__num" aria-hidden="true">${pad2(i + 1)}</span>
          <span class="pnode__label">${esc(s.label)}</span>
          <span class="pnode__tech">${s.tech.slice(0, 2).map(esc).join(' · ')}</span>
        </button>
      </li>`
    )
    .join('');

  const panels = pipeline
    .map(
      (s, i) => `
      <div class="ppanel" id="stage-${s.id}" role="region" aria-labelledby="pnode-${s.id}" data-panel="${i}" hidden>
        <div class="ppanel__main">
          <p class="ppanel__step">Stage ${pad2(i + 1)} / ${pad2(pipeline.length)}</p>
          <h3 class="ppanel__title">${esc(s.label)}</h3>
          <p class="ppanel__body">${esc(s.body)}</p>
        </div>
        <div class="ppanel__side">
          <ul class="ppanel__tech">${s.tech.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
          <p class="ppanel__trace" aria-hidden="true"><span class="ppanel__prompt">&gt;</span> <span data-trace>${esc(`${s.id}.check(${s.tech[0].toLowerCase().replace(/[^a-z0-9.]+/g, '_')}) → ok`)}</span></p>
        </div>
      </div>`
    )
    .join('');

  const chips = tooling
    .map((t) => `<li class="tool" data-tool>${brandSvg(t.icon)}<span>${esc(t.name)}</span></li>`)
    .join('');

  return `
  <section class="section skills" id="skills" aria-labelledby="skills-title" tabindex="-1">
    <div class="container">
      ${sectionLabel(2, 'Skills')}
      <div class="section-head">
        ${heading('skills-title', 'The anatomy of a', 'login.')}
        <p class="section-intro" data-reveal>Every sign-in is a pipeline. These are the stages I work in every day. Pick one to see where I’ve had my hands in it.</p>
      </div>

      <div class="pipeline" data-pipeline>
        <div class="pipeline__track" aria-hidden="true">
          <svg class="pipeline__svg" data-pipeline-svg><path class="pipeline__base" d=""/><path class="pipeline__flow" d=""/><path class="pipeline__lit" d=""/></svg>
          <span class="pipeline__token" data-token-el><span class="pipeline__token-glow"></span><span class="pipeline__token-text" data-token-text>${esc(pipeline[0].token)}</span></span>
        </div>
        <ol class="pipeline__nodes">${nodes}</ol>
        <div class="pipeline__panels" data-panels>
          <p class="pipeline__hint" data-panel-hint>${icon('arrowUp', 'ico ico--sm')}Select a stage to open its notes.</p>
          ${panels}
        </div>
      </div>

      <div class="tooling">
        <h3 class="tooling__title" data-reveal>Languages &amp; tooling</h3>
        <ul class="tooling__list" data-tools>${chips}</ul>
      </div>
    </div>
  </section>`;
}

/* -------------------------------------------------------------------- work */

function workSection() {
  const counts = {
    all: projects.length,
    descope: projects.filter((p) => p.group === 'descope').length,
    side: projects.filter((p) => p.group === 'side').length,
  };
  const filters = [
    ['all', 'All'],
    ['descope', 'At Descope'],
    ['side', 'Side projects'],
  ]
    .map(
      ([k, label], i) =>
        `<button class="filter" type="button" data-filter="${k}" aria-pressed="${i === 0}">${label}<span class="filter__count">${pad2(counts[k])}</span></button>`
    )
    .join('');

  const cards = projects
    .map((p, i) => {
      const linkHost = p.link.href.includes('github.com') ? 'GitHub' : new URL(p.link.href).host;
      return `
      <li class="card${p.span === 2 ? ' card--wide' : ''}" data-card data-group="${p.group}">
        <article class="card__inner" data-card-inner>
          <div class="card__viz">${visuals[p.visual]()}</div>
          <div class="card__body">
            <div class="card__top">
              <span class="card__num" aria-hidden="true">${pad2(i + 1)}</span>
              <span class="status status--${p.status}"><span class="status__dot" aria-hidden="true"></span>${esc(p.statusLabel)}</span>
            </div>
            <h3 class="card__title">
              <a class="card__link" href="${esc(p.link.href)}" target="_blank" rel="noopener noreferrer" data-cursor="Open">${esc(p.name)}<span class="sr-only">: ${esc(p.link.label)} on ${esc(linkHost)}, opens in a new tab</span></a>
            </h3>
            <p class="card__blurb">${esc(p.blurb)}</p>
            <ul class="card__tags">${p.tags.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
            <span class="card__cta" aria-hidden="true"><span>${esc(p.link.label)}</span>${icon('arrowUpRight', 'ico ico--sm')}</span>
          </div>
          <span class="card__spot" aria-hidden="true"></span>
          <span class="card__shine" aria-hidden="true"></span>
        </article>
      </li>`;
    })
    .join('');

  return `
  <section class="section work" id="work" aria-labelledby="work-title" tabindex="-1">
    <div class="container">
      ${sectionLabel(3, 'Work')}
      <div class="section-head">
        ${heading('work-title', 'Things I’ve', 'built.')}
        <p class="section-intro" data-reveal>Agent-built products under the Average Output umbrella, plus identity tooling from the day job.</p>
      </div>
      <div class="filters" role="group" aria-label="Filter projects" data-reveal>
        <span class="filters__pill" aria-hidden="true"></span>
        ${filters}
      </div>
      <p class="sr-only" role="status" data-filter-status></p>
      <ul class="cards" data-cards>${cards}</ul>
    </div>
  </section>`;
}

/* -------------------------------------------------------------- experience */

function experienceSection() {
  const items = experience
    .map((e, i) => {
      const end = e.end || today;
      return `
      <li class="tl-item${e.end ? '' : ' tl-item--now'}" data-tl-item>
        <span class="tl-item__dot" aria-hidden="true"><i></i></span>
        <article class="tl-card">
          <p class="tl-card__date">
            <time datetime="${iso(e.start)}" data-scramble-once>${fmt(e.start)}</time>
            <span aria-hidden="true">–</span><span class="sr-only">to</span>
            ${e.end ? `<time datetime="${iso(e.end)}" data-scramble-once>${fmt(e.end)}</time>` : '<span class="tl-card__present">Present</span>'}
          </p>
          <h3 class="tl-card__role">${esc(e.role)}</h3>
          <p class="tl-card__org">${esc(e.org)}${e.end ? '' : '<span class="tl-card__now"><span class="dot dot--live" aria-hidden="true"></span>Now</span>'}</p>
          <ul class="tl-card__meta">
            <li class="tl-card__dur" ${e.end ? '' : `data-duration-from="${iso(e.start)}"`}>${duration(e.start, end)}</li>
            ${e.meta.map((m) => `<li>${esc(m)}</li>`).join('')}
          </ul>
          <span class="tl-card__index" aria-hidden="true">${pad2(i + 1)}</span>
        </article>
      </li>`;
    })
    .join('');

  const edu = education
    .map(
      (e) => `
      <article class="edu-card" data-reveal>
        <p class="edu-card__date"><time datetime="${iso(e.start)}">${fmt(e.start)}</time> – <time datetime="${iso(e.end)}">${fmt(e.end)}</time></p>
        <h4 class="edu-card__school">${esc(e.school)}</h4>
        <p class="edu-card__degree">${esc(e.degree)}</p>
        <p class="edu-card__gpa"><span>GPA</span> ${esc(e.gpa)}</p>
        ${
          e.activities.length
            ? `<ul class="edu-card__acts" aria-label="Activities and societies">${e.activities.map((a) => `<li>${esc(a)}</li>`).join('')}</ul>`
            : ''
        }
      </article>`
    )
    .join('');

  const certs = certifications
    .map(
      (c) => `
      <li class="cert" data-reveal>
        <span class="cert__seal" aria-hidden="true">${icon('check', 'ico ico--sm')}</span>
        <span class="cert__name">${esc(c.name)}</span>
        <span class="cert__meta">${esc(c.issuer)} · <time datetime="${iso(c.date)}">${fmt(c.date)}</time></span>
      </li>`
    )
    .join('');

  return `
  <section class="section experience" id="experience" aria-labelledby="experience-title" tabindex="-1">
    <div class="container">
      ${sectionLabel(4, 'Experience')}
      <div class="section-head">
        ${heading('experience-title', 'Where I’ve', 'been.')}
        <p class="section-intro" data-reveal>From marketing automation consulting to customer identity: the roles, classes, and programs that got me here.</p>
      </div>
      <div class="timeline" data-timeline>
        <div class="timeline__line" aria-hidden="true"><span class="timeline__fill" data-tl-fill></span><span class="timeline__head" data-tl-head></span></div>
        <ol class="timeline__list">${items}</ol>
      </div>

      <div class="edu">
        <div class="edu__col">
          <h3 class="subhead" data-reveal>Education</h3>
          <div class="edu__cards">${edu}</div>
        </div>
        <div class="edu__col">
          <h3 class="subhead" data-reveal>Certifications</h3>
          <ul class="certs">${certs}</ul>
        </div>
      </div>
    </div>
  </section>`;
}

/* -------------------------------------------------------------- highlights */

function statViz(h) {
  if (h.viz === 'dots') {
    // 329 = 47 x 7: one dot per touchdown.
    let dots = '';
    for (let i = 0; i < h.value; i++) {
      const x = (i % 47) * 6 + 3;
      const y = Math.floor(i / 47) * 6 + 3;
      dots += `<circle cx="${x}" cy="${y}" r="2" data-unit/>`;
    }
    return `<svg class="stat__viz stat__viz--dots" viewBox="0 0 282 42" aria-hidden="true">${dots}</svg>`;
  }
  if (h.viz === 'tiles') {
    const tiles = Array.from(
      { length: h.value },
      (_, i) => `<g data-unit style="--i:${i}"><rect x="${i * 46}" y="0" width="38" height="38" rx="10"/><path d="M${i * 46 + 11} 24h16M${i * 46 + 11} 16h9"/></g>`
    ).join('');
    return `<svg class="stat__viz stat__viz--tiles" viewBox="0 0 176 38" aria-hidden="true">${tiles}</svg>`;
  }
  if (h.viz === 'tiers') {
    const tiers = Array.from({ length: h.value }, (_, i) => {
      const hgt = 22 + i * 14;
      return `<g data-unit style="--i:${i}"><rect x="${i * 54}" y="${44 - hgt}" width="46" height="${hgt}" rx="7"/><path d="M${i * 54 + 10} ${52 - hgt}h${16 + i * 8}"/></g>`;
    }).join('');
    return `<svg class="stat__viz stat__viz--tiers" viewBox="0 0 102 44" aria-hidden="true">${tiers}</svg>`;
  }
  // ring: one arc segment per domain
  const n = h.value;
  const r = 19;
  const segs = Array.from({ length: n }, (_, i) => {
    const a0 = (i / n) * Math.PI * 2 - Math.PI / 2 + 0.2;
    const a1 = ((i + 1) / n) * Math.PI * 2 - Math.PI / 2 - 0.2;
    const p = (a) => `${(22 + r * Math.cos(a)).toFixed(2)} ${(22 + r * Math.sin(a)).toFixed(2)}`;
    return `<path d="M${p(a0)} A${r} ${r} 0 0 1 ${p(a1)}" data-unit/>`;
  }).join('');
  return `<svg class="stat__viz stat__viz--ring" viewBox="0 0 44 44" aria-hidden="true">${segs}</svg>`;
}

function highlightsSection() {
  const stats = highlights
    .map(
      (h, i) => `
      <li class="stat" data-stat>
        <div class="stat__top"><span class="stat__index" aria-hidden="true">${pad2(i + 1)}</span>${statViz(h)}</div>
        <p class="stat__num"><span data-count="${h.value}">${h.value}</span></p>
        <p class="stat__label">${esc(h.label)}</p>
      </li>`
    )
    .join('');
  return `
  <section class="section highlights" id="highlights" aria-labelledby="highlights-title" tabindex="-1">
    <div class="container">
      ${sectionLabel(5, 'Highlights')}
      <div class="section-head">
        ${heading('highlights-title', 'Proud', 'moments.')}
        <p class="section-intro" data-reveal>A few numbers I’m happy to put my name next to.</p>
      </div>
      <ul class="stats">${stats}</ul>
    </div>
  </section>`;
}

/* ----------------------------------------------------------------- contact */

function contactSection() {
  return `
  <section class="section contact" id="contact" aria-labelledby="contact-title" tabindex="-1">
    <div class="contact__glow" aria-hidden="true"></div>
    <div class="container contact__grid">
      <div class="contact__copy">
        ${sectionLabel(6, 'Contact')}
        <h2 class="h-display" id="contact-title" data-heading><span class="h-display__lead">${esc(contact.heading[0])}</span> <em>${esc(contact.heading[1])}</em></h2>
        <p class="contact__intro" data-reveal>${esc(contact.intro)}</p>
        <div class="contact__email" data-reveal>
          <a class="contact__mail" href="mailto:${esc(site.email)}">${icon('mail')}<span>${esc(site.email)}</span></a>
          <button class="icon-btn contact__copybtn" type="button" data-copy="${esc(site.email)}">
            <span class="contact__copy-ico">${icon('copy')}</span><span class="contact__copy-ok">${icon('check')}</span>
            <span class="sr-only" data-copy-label>Copy email address</span>
          </button>
        </div>
        <div class="contact__socials" data-reveal>${socialButtons('ghost')}</div>
      </div>

      <form class="form" action="${esc(contact.fallbackAction)}" method="POST" data-contact-form data-endpoint="${esc(contact.endpoint)}" data-reveal>
        <input type="hidden" name="_subject" value="Portfolio message for Nick">
        <input type="hidden" name="_template" value="table">
        <div class="form__honey" aria-hidden="true"><label>Leave this empty<input type="text" name="_honey" tabindex="-1" autocomplete="off"></label></div>

        <div class="field">
          <label for="f-name">Your name <span aria-hidden="true">*</span></label>
          <input id="f-name" name="name" type="text" autocomplete="name" required aria-errormessage="f-name-err">
          <span class="field__bar" aria-hidden="true"></span>
          <p class="field__err" id="f-name-err"><span aria-hidden="true">!</span> Tell me who you are.</p>
        </div>
        <div class="field">
          <label for="f-email">Email <span aria-hidden="true">*</span></label>
          <input id="f-email" name="email" type="email" autocomplete="email" required aria-errormessage="f-email-err">
          <span class="field__bar" aria-hidden="true"></span>
          <p class="field__err" id="f-email-err"><span aria-hidden="true">!</span> I need a valid email to reply to.</p>
        </div>
        <div class="field">
          <label for="f-message">Message <span aria-hidden="true">*</span></label>
          <textarea id="f-message" name="message" rows="5" required minlength="10" aria-errormessage="f-message-err"></textarea>
          <span class="field__bar" aria-hidden="true"></span>
          <p class="field__err" id="f-message-err"><span aria-hidden="true">!</span> A sentence or two, at least 10 characters.</p>
        </div>

        <div class="form__actions">
          <button class="btn btn--primary btn--lg form__submit" type="submit" data-magnetic>
            <span class="btn__label" data-submit-label>Send message</span>
            <span class="btn__icon form__plane">${icon('send')}</span>
          </button>
          <p class="form__note">Goes straight to ${esc(site.email)}</p>
        </div>
        <p class="form__status" role="status" aria-live="polite" data-form-status></p>
      </form>
    </div>
  </section>`;
}

/* ------------------------------------------------------------------ footer */

function footerSection() {
  return `
  <footer class="footer" data-footer>
    <div class="container footer__inner">
      <p class="footer__line">${esc(footer.line.replace(/naturally\.$/, ''))}<em>naturally.</em></p>
      <div class="footer__grid">
        <nav aria-label="Footer">
          <ul class="footer__links">${nav.map((n) => `<li><a href="#${n.id}">${n.label}</a></li>`).join('')}</ul>
        </nav>
        <div class="footer__social">
          ${ext(site.github, 'GitHub', 'footer__ext')}
          ${ext(site.linkedin, 'LinkedIn', 'footer__ext')}
          <a class="footer__ext" href="mailto:${esc(site.email)}">Email</a>
        </div>
        <a class="btn btn--ghost footer__top" href="#top" data-magnetic><span class="btn__label">Back to top</span>${icon('arrowUp', 'ico ico--sm')}</a>
      </div>
      <div class="footer__bottom">
        <span>© ${today[0]} ${esc(site.name)}</span>
        <span>${esc(site.location)} · <time data-clock>Central Time</time></span>
      </div>
    </div>
    <p class="footer__word" aria-hidden="true">${[...'NICK'].map((c) => `<span>${c}</span>`).join('')}</p>
  </footer>`;
}

export function renderApp() {
  return `
  ${loader()}
  <a class="skip-link" href="#main">Skip to content</a>
  <div class="cursor" aria-hidden="true"><span class="cursor__ring"><span class="cursor__label"></span></span><span class="cursor__dot"></span></div>
  <div class="grain" aria-hidden="true"></div>
  ${navBar()}
  <main id="main" class="main">
    ${heroSection()}
    ${marqueeStrip()}
    ${aboutSection()}
    ${skillsSection()}
    ${workSection()}
    ${experienceSection()}
    ${highlightsSection()}
    ${contactSection()}
  </main>
  ${footerSection()}`;
}

export const meta = site;
