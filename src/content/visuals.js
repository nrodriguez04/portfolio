// Small looping illustrations for each project card. Pure SVG; all motion is
// CSS (see styles/work.css) and only runs while the card is on screen.

function rng(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const wrap = (name, body) =>
  `<svg class="viz viz--${name}" viewBox="0 0 320 180" aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid meet">${body}</svg>`;

function lms() {
  const rows = [0, 1, 2]
    .map((i) => {
      const y = 46 + i * 40;
      return `
      <g class="lms-row" style="--i:${i}">
        <rect x="96" y="${y}" width="22" height="22" rx="6" class="v-dim-fill"/>
        <path d="M104 ${y + 6.5} l7 4.5 -7 4.5z" class="v-line-fill"/>
        <rect x="128" y="${y + 3}" width="${70 - i * 14}" height="5" rx="2.5" class="v-line-fill"/>
        <rect x="128" y="${y + 13}" width="140" height="5" rx="2.5" class="v-dim-fill"/>
        <rect x="128" y="${y + 13}" width="140" height="5" rx="2.5" class="v-accent-fill lms-bar"/>
        <g class="lms-check"><circle cx="284" cy="${y + 11}" r="8" class="v-live-fill"/><path d="m280 ${y + 11} 3 3 5-6" class="v-ink-stroke"/></g>
      </g>`;
    })
    .join('');
  return wrap(
    'lms',
    `
    <rect x="28" y="40" width="52" height="112" rx="8" class="v-dim-stroke"/>
    <rect x="36" y="50" width="36" height="26" rx="4" class="v-accent-fill lms-cover"/>
    <rect x="36" y="86" width="30" height="4" rx="2" class="v-line-fill"/>
    <rect x="36" y="96" width="22" height="4" rx="2" class="v-dim-fill"/>
    <rect x="36" y="106" width="26" height="4" rx="2" class="v-dim-fill"/>
    <path d="M36 132h36" class="v-dim-stroke"/>
    <path d="M36 132h36" class="v-accent-stroke lms-progress"/>
    ${rows}`
  );
}

function fedramp() {
  const items = [0, 1, 2, 3]
    .map((i) => {
      const y = 50 + i * 26;
      return `
      <g class="fr-item" style="--i:${i}">
        <rect x="170" y="${y}" width="14" height="14" rx="4" class="v-dim-stroke"/>
        <path d="m173.5 ${y + 7.5} 2.5 2.5 5-5.5" class="v-accent-stroke fr-tick"/>
        <rect x="194" y="${y + 4.5}" width="${92 - i * 12}" height="5" rx="2.5" class="v-dim-fill"/>
      </g>`;
    })
    .join('');
  return wrap(
    'fedramp',
    `
    <g class="fr-shield">
      <path d="M92 32 52 48v32c0 26 17 47 40 56 23-9 40-30 40-56V48z" class="v-line-stroke"/>
      <path d="M92 46 64 57v23c0 18 12 33 28 40 16-7 28-22 28-40V57z" class="v-dim-fill"/>
      <path d="m78 84 10 10 20-22" class="v-accent-stroke fr-mark"/>
    </g>
    <rect x="44" y="30" width="96" height="3" rx="1.5" class="v-accent-fill fr-scan"/>
    ${items}`
  );
}

function parlay() {
  const r = rng(329);
  const bars = Array.from({ length: 9 }, (_, i) => {
    const h = 28 + r() * 70;
    return `<rect x="${30 + i * 18}" y="${150 - h}" width="11" height="${h}" rx="3" class="${
      i === 6 ? 'v-accent-fill' : 'v-line-fill'
    } pl-bar" style="--i:${i}"/>`;
  }).join('');
  return wrap(
    'parlay',
    `
    <path d="M24 150h170" class="v-dim-stroke"/>
    <path d="M24 120h170M24 90h170M24 60h170" class="v-dim-stroke v-dash"/>
    ${bars}
    <path d="M34 128 C 70 110, 90 118, 120 92 S 170 64, 190 52" class="v-accent-stroke pl-line"/>
    <g class="pl-ticket">
      <path d="M214 34h80v112h-80z" class="v-paper-fill"/>
      <path d="M214 62h80" class="v-ink-stroke v-dash"/>
      <rect x="224" y="44" width="38" height="6" rx="3" class="v-ink-fill"/>
      ${[0, 1, 2]
        .map(
          (i) => `
        <g class="pl-leg" style="--i:${i}">
          <rect x="224" y="${76 + i * 22}" width="${44 - i * 6}" height="5" rx="2.5" class="v-ink-dim-fill"/>
          <circle cx="282" cy="${78.5 + i * 22}" r="6" class="v-live-fill"/>
          <path d="m279 ${78.5 + i * 22} 2 2 4-4.5" class="v-paper-stroke"/>
        </g>`
        )
        .join('')}
    </g>`
  );
}

function city() {
  const r = rng(2026);
  const buildings = [
    [22, 70, 36],
    [62, 44, 30],
    [96, 92, 40],
    [140, 30, 34],
    [178, 76, 30],
    [212, 54, 42],
    [258, 84, 40],
  ];
  const parts = buildings
    .map(([x, top, w], b) => {
      let windows = '';
      for (let wy = top + 12; wy < 158; wy += 11) {
        for (let wx = x + 6; wx < x + w - 6; wx += 9) {
          const lit = r() > 0.45;
          if (!lit) continue;
          const d = (r() * 6).toFixed(2);
          const dur = (2 + r() * 5).toFixed(2);
          windows += `<rect x="${wx}" y="${wy}" width="4" height="5" rx="1" class="city-win" style="--d:${d}s;--dur:${dur}s"/>`;
        }
      }
      return `
      <rect x="${x}" y="${top}" width="${w}" height="${170 - top}" class="v-dim-fill"/>
      <rect x="${x + w / 2 - 1}" y="${top - 10}" width="2" height="10" class="v-line-fill"/>
      <circle cx="${x + w / 2}" cy="${top - 12}" r="2.5" class="v-accent-fill city-beacon" style="--d:${(b * 0.37).toFixed(2)}s"/>
      ${windows}`;
    })
    .join('');
  const stars = Array.from({ length: 14 }, () => {
    const x = (r() * 300 + 10).toFixed(1);
    const y = (r() * 50 + 8).toFixed(1);
    return `<circle cx="${x}" cy="${y}" r="${(0.6 + r()).toFixed(2)}" class="v-line-fill city-star" style="--d:${(r() * 4).toFixed(2)}s"/>`;
  }).join('');
  return wrap(
    'city',
    `
    ${stars}
    <circle cx="282" cy="30" r="12" class="v-paper-fill"/>
    <circle cx="288" cy="26" r="11" class="v-card-fill"/>
    ${parts}
    <path d="M0 170h320" class="v-line-stroke"/>`
  );
}

function mission() {
  const blips = [
    [74, 70],
    [112, 104],
    [64, 118],
    [98, 58],
  ]
    .map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="3.5" class="v-accent-fill mc-blip" style="--i:${i}"/>`)
    .join('');
  return wrap(
    'mission',
    `
    <g class="mc-radar">
      <circle cx="88" cy="90" r="62" class="v-dim-stroke"/>
      <circle cx="88" cy="90" r="42" class="v-dim-stroke"/>
      <circle cx="88" cy="90" r="22" class="v-dim-stroke"/>
      <path d="M26 90h124M88 28v124" class="v-dim-stroke"/>
      <g class="mc-sweep"><path d="M88 90 L88 28 A62 62 0 0 1 141.7 59 Z" class="mc-wedge"/></g>
      ${blips}
    </g>
    <rect x="178" y="34" width="118" height="112" rx="10" class="v-dim-stroke"/>
    <rect x="190" y="46" width="40" height="5" rx="2.5" class="v-line-fill"/>
    <path d="M190 120 L206 108 L220 112 L236 92 L250 98 L266 74 L284 80" class="v-accent-stroke mc-spark"/>
    <path d="M190 132h94" class="v-dim-stroke"/>
    <rect x="190" y="60" width="26" height="12" rx="6" class="v-live-fill mc-chip"/>`
  );
}

function creator() {
  const cols = ['Inbox', 'Review', 'Scheduled'];
  const colX = [28, 122, 216];
  const frames = colX
    .map(
      (x, i) => `
      <rect x="${x}" y="30" width="78" height="122" rx="10" class="v-dim-stroke"/>
      <text x="${x + 10}" y="48" class="v-label">${cols[i]}</text>`
    )
    .join('');
  const tiles = [0, 1, 2]
    .map(
      (i) => `
      <g class="co-tile" style="--i:${i}">
        <rect x="36" y="${60 + i * 28}" width="62" height="20" rx="5" class="${i === 0 ? 'v-accent-fill' : 'v-line-fill'}"/>
        <rect x="42" y="${67 + i * 28}" width="26" height="5" rx="2.5" class="v-ink-dim-fill"/>
      </g>`
    )
    .join('');
  return wrap(
    'creator',
    `
    ${frames}
    ${tiles}
    <g class="co-gate">
      <circle cx="161" cy="130" r="9" class="v-live-fill"/>
      <path d="m157 130 3 3 5-6" class="v-ink-stroke"/>
    </g>`
  );
}

function fedops() {
  const rows = [0, 1, 2, 3, 4]
    .map(
      (i) => `
      <g class="fo-row" style="--i:${i}">
        <rect x="150" y="${36 + i * 24}" width="146" height="18" rx="5" class="v-dim-fill fo-bg"/>
        <rect x="158" y="${42.5 + i * 24}" width="${50 + ((i * 23) % 40)}" height="5" rx="2.5" class="v-line-fill"/>
        <rect x="270" y="${41 + i * 24}" width="18" height="8" rx="4" class="v-accent-fill fo-flag"/>
      </g>`
    )
    .join('');
  return wrap(
    'fedops',
    `
    <g class="fo-build">
      <path d="M30 70 84 42l54 28z" class="v-line-stroke"/>
      <path d="M34 76h100" class="v-line-stroke"/>
      ${[0, 1, 2, 3, 4]
        .map((i) => `<rect x="${40 + i * 20}" y="82" width="8" height="52" rx="2" class="v-line-fill fo-col" style="--i:${i}"/>`)
        .join('')}
      <path d="M28 140h112M24 148h120" class="v-line-stroke"/>
    </g>
    ${rows}
    <rect x="146" y="32" width="154" height="26" rx="7" class="v-accent-stroke fo-scan"/>`
  );
}

function halo() {
  const sparks = [
    [96, 54],
    [226, 70],
    [210, 40],
    [110, 92],
  ]
    .map(
      ([x, y], i) =>
        `<path d="M${x} ${y - 6}v12M${x - 6} ${y}h12" class="v-accent-stroke halo-spark" style="--i:${i}"/>`
    )
    .join('');
  return wrap(
    'halo',
    `
    <g class="halo-ring">
      <ellipse cx="160" cy="40" rx="44" ry="10" class="v-accent-stroke halo-glow"/>
      <ellipse cx="160" cy="40" rx="44" ry="10" class="v-paper-stroke halo-dash"/>
    </g>
    <path d="M110 100 160 62l50 38" class="v-line-stroke"/>
    <path d="M120 94v58h80V94" class="v-line-stroke"/>
    <rect x="148" y="116" width="24" height="36" rx="3" class="v-dim-fill"/>
    <rect x="130" y="106" width="14" height="14" rx="2" class="v-accent-fill halo-window"/>
    <rect x="176" y="106" width="14" height="14" rx="2" class="v-dim-fill"/>
    <path d="M60 152h200" class="v-line-stroke"/>
    ${sparks}`
  );
}

function otherlife() {
  const r = rng(5);
  const stars = Array.from({ length: 16 }, () => {
    return `<circle cx="${(r() * 300 + 10).toFixed(1)}" cy="${(r() * 70 + 10).toFixed(1)}" r="${(0.6 + r() * 0.9).toFixed(2)}" class="v-line-fill ol-star"/>`;
  }).join('');
  return wrap(
    'otherlife',
    `
    <rect x="0" y="0" width="320" height="180" class="ol-day"/>
    <g class="ol-stars">${stars}</g>
    <g class="ol-orbit">
      <circle cx="160" cy="40" r="11" class="v-accent-fill"/>
      <circle cx="160" cy="280" r="9" class="v-paper-fill"/>
    </g>
    <path d="M0 132 46 96l38 26 44-46 52 44 34-22 50 34 56-32v80H0z" class="v-dim-fill ol-far"/>
    <path d="M0 150 60 120l40 18 56-30 48 34 44-20 72 26v32H0z" class="v-card-fill v-line-stroke ol-near"/>
    <g class="ol-walker">
      <circle cx="0" cy="-14" r="3.5" class="v-paper-fill"/>
      <path d="M0 -10v8M0 -2l-3 6M0 -2l3 6M-3 -7h6" class="v-paper-stroke"/>
    </g>`
  );
}

export const visuals = { lms, fedramp, parlay, city, mission, creator, fedops, halo, otherlife };
