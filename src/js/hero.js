import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { reduce, fine, isDesktop, clamp } from './env.js';
import { ambient } from './motion.js';
import { getVelocity } from './scroll.js';
import { scramble } from './scramble.js';

export function initHero() {
  orbit();
  if (reduce) return;
  parallax();
  seal();
}

// Called once the intro has finished so nothing fights the entrance.
export function startHeroLoops() {
  if (reduce) return;
  titleCycle();
  if (fine) proximity();
}

/* Title cycles through roles, decoding each one into place. */
function titleCycle() {
  const el = document.querySelector('[data-scramble]');
  if (!el) return;
  const titles = JSON.parse(el.dataset.scramble);
  let i = 0;
  const next = async () => {
    if (!ambient.paused && document.visibilityState === 'visible') {
      i = (i + 1) % titles.length;
      await scramble(el, titles[i], { duration: 1.2 });
    }
    setTimeout(next, 3200);
  };
  setTimeout(next, 2600);
}

/* Giant name: letters near the pointer get heavier, lift, and fill in. */
function proximity() {
  const hero = document.querySelector('.hero');
  const chars = gsap.utils.toArray('.hero__char');
  const tweens = chars.map((c) => ({
    el: c,
    w: gsap.quickTo(c, '--w', { duration: 0.7, ease: 'power3' }),
    f: gsap.quickTo(c, '--fill', { duration: 0.7, ease: 'power3' }),
    y: gsap.quickTo(c, 'y', { duration: 0.9, ease: 'elastic.out(1, 0.5)' }),
  }));
  let centers = [];
  const measure = () => {
    centers = chars.map((c) => {
      const r = c.getBoundingClientRect();
      return [r.left + r.width / 2, r.top + r.height / 2];
    });
  };

  hero.addEventListener('pointerenter', measure);
  window.addEventListener('resize', measure);
  hero.addEventListener('pointermove', (e) => {
    if (ambient.paused) return;
    // The pointer may already be inside the hero when this starts.
    if (!centers.length) measure();
    const radius = Math.max(window.innerWidth * 0.16, 180);
    tweens.forEach((t, i) => {
      const [cx, cy] = centers[i];
      const d = Math.hypot(e.clientX - cx, e.clientY - cy);
      const k = clamp(1 - d / radius, 0, 1);
      const eased = k * k * (3 - 2 * k);
      t.w(600 + 300 * eased);
      t.f(eased * 0.85);
      t.y(-eased * 22);
    });
  });
  hero.addEventListener('pointerleave', () => {
    tweens.forEach((t) => {
      t.w(600);
      t.f(0);
      t.y(0);
    });
  });
  // Lines move with scroll parallax; refresh positions as that happens.
  ScrollTrigger.create({ trigger: hero, start: 'top top', end: 'bottom top', onUpdate: measure });
}

/* Backdrop name and foreground drift at different speeds. */
function parallax() {
  const hero = document.querySelector('.hero');
  const lines = gsap.utils.toArray('[data-hero-line]');
  const desktop = isDesktop();
  const drift = desktop ? 14 : 8;
  const st = { trigger: hero, start: 'top top', end: 'bottom top', scrub: true };

  gsap.to('[data-hero-backdrop]', { yPercent: 55, ease: 'none', scrollTrigger: st });
  if (lines[0]) gsap.to(lines[0], { xPercent: -drift, ease: 'none', scrollTrigger: st });
  if (lines[1]) gsap.to(lines[1], { xPercent: drift, ease: 'none', scrollTrigger: st });
  gsap.to('.hero__inner', { y: -90, opacity: 0.2, ease: 'none', scrollTrigger: { ...st, start: 'top+=10% top' } });
  gsap.to('[data-orbit]', { y: desktop ? -160 : -40, ease: 'none', scrollTrigger: st });
  gsap.to('.orbit__rings', { rotate: 50, ease: 'none', scrollTrigger: st });
}

/* Six protocol tags ride three tilted orbits around the monogram. */
function orbit() {
  const wrap = document.querySelector('[data-orbit]');
  const tilt = document.querySelector('[data-orbit-tilt]');
  if (!wrap || !tilt) return;
  const tags = gsap.utils.toArray('[data-orbit-tag]', tilt);
  const rings = [
    { rx: 180, ry: 62, rot: -18, speed: 0.26 },
    { rx: 150, ry: 52, rot: 42, speed: -0.2 },
    { rx: 120, ry: 40, rot: 102, speed: 0.34 },
  ];
  const bodies = tags.map((el, i) => ({
    el,
    ring: rings[i % 3],
    phase: (i < 3 ? 0 : Math.PI) + i * 0.7,
    set: gsap.quickSetter(el, 'css'),
  }));
  let size = wrap.offsetWidth;
  new ResizeObserver(() => (size = wrap.offsetWidth)).observe(wrap);

  let t = 0;
  const render = (_, dt = 16) => {
    t += dt / 1000;
    const s = size / 400;
    for (const b of bodies) {
      const a = b.phase + t * b.ring.speed;
      const ex = Math.cos(a) * b.ring.rx;
      const ey = Math.sin(a) * b.ring.ry;
      const r = (b.ring.rot * Math.PI) / 180;
      const x = (ex * Math.cos(r) - ey * Math.sin(r)) * s;
      const y = (ex * Math.sin(r) + ey * Math.cos(r)) * s;
      const depth = Math.sin(a); // >0 in front of the core
      b.set({
        x,
        y,
        scale: 0.78 + (depth + 1) * 0.16,
        opacity: 0.45 + (depth + 1) * 0.275,
        zIndex: depth > 0 ? 3 : 0,
      });
    }
  };
  render(0, 0);
  if (reduce) return;
  ambient.tick(render);

  if (fine) {
    const rx = gsap.quickTo(tilt, 'rotationX', { duration: 1, ease: 'power3' });
    const ry = gsap.quickTo(tilt, 'rotationY', { duration: 1, ease: 'power3' });
    window.addEventListener('pointermove', (e) => {
      if (window.scrollY > window.innerHeight) return;
      rx(((e.clientY / innerHeight) - 0.5) * -18);
      ry(((e.clientX / innerWidth) - 0.5) * 22);
    }, { passive: true });
  }
}

/* The seal spins, faster while you scroll. */
function seal() {
  const el = document.querySelector('[data-seal]');
  if (!el) return;
  const text = el.querySelector('text');
  const star = el.querySelector('.hero__seal-star');
  let rot = 0;
  let boost = 0;
  ambient.tick((_, dt) => {
    boost += (Math.abs(getVelocity()) * 0.6 - boost) * 0.08;
    rot += (dt / 1000) * (18 + boost * 18);
    gsap.set(text, { rotation: rot, svgOrigin: '60 60' });
    gsap.set(star, { rotation: -rot * 1.5, svgOrigin: '60 60' });
  });
}
