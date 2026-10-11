import gsap from 'gsap';
import { reduce } from './env.js';
import { lockScroll } from './scroll.js';

// The loader plays a tiny "login": resolve, verify, MFA, session issued.
// Then the panels wipe away and the hero assembles itself.
export function runIntro() {
  const loader = document.querySelector('[data-loader]');
  const chars = gsap.utils.toArray('.hero__char');
  const ins = gsap.utils.toArray('[data-hero-in]');
  const orbit = document.querySelector('[data-orbit]');
  const navItems = gsap.utils.toArray('.nav__bar > *');

  if (reduce || !loader || getComputedStyle(loader).display === 'none') {
    loader?.remove();
    return Promise.resolve();
  }

  lockScroll(true);
  gsap.set(chars, {
    yPercent: 120,
    rotationX: -85,
    rotate: () => gsap.utils.random(-24, 24),
    scale: 0.7,
    opacity: 0,
    '--fill': 1,
    transformOrigin: '50% 100%',
  });
  gsap.set(ins, { y: 48, opacity: 0 });
  if (orbit) gsap.set(orbit, { scale: 0.5, opacity: 0, rotate: -40 });
  gsap.set(navItems, { y: -30, opacity: 0 });

  const steps = loader.querySelectorAll('.loader__steps li');
  const count = loader.querySelector('[data-loader-count]');
  const bar = loader.querySelector('.loader__bar span');
  const counter = { v: 0 };
  const LOAD = 1.3;

  const tl = gsap.timeline();
  tl.to(counter, {
    v: 100,
    duration: LOAD,
    ease: 'power2.inOut',
    onUpdate: () => (count.textContent = String(Math.round(counter.v)).padStart(3, '0')),
  }, 0);
  tl.to(bar, { scaleX: 1, duration: LOAD, ease: 'power2.inOut' }, 0);
  tl.from('.loader__brand', { yPercent: 60, opacity: 0, duration: 0.6, ease: 'expo.out' }, 0);

  steps.forEach((step, i) => {
    if (!i) return;
    const at = i * (LOAD / steps.length);
    tl.to(steps[i - 1], { yPercent: -100, opacity: 0, duration: 0.25, ease: 'power2.in' }, at);
    tl.fromTo(step, { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }, at + 0.05);
  });

  tl.to('.loader__inner', { y: -24, opacity: 0, duration: 0.35, ease: 'power2.in' }, LOAD + 0.15);
  tl.to('.loader__panel--a', { yPercent: -100, duration: 0.95, ease: 'expo.inOut' }, LOAD + 0.3);
  tl.to('.loader__panel--b', { yPercent: -100, duration: 0.95, ease: 'expo.inOut' }, LOAD + 0.42);
  tl.add('hero', LOAD + 0.6);

  tl.to(chars, {
    yPercent: 0,
    rotationX: 0,
    rotate: 0,
    scale: 1,
    opacity: 1,
    duration: 1.5,
    ease: 'elastic.out(1, 0.55)',
    stagger: { each: 0.045, from: 'center' },
  }, 'hero');
  // The letters land solid, then drain to outlines from the outside in.
  tl.to(chars, { '--fill': 0, duration: 1.1, ease: 'power2.inOut', stagger: { each: 0.035, from: 'edges' } }, 'hero+=0.85');
  tl.to(ins, { y: 0, opacity: 1, duration: 1.2, ease: 'expo.out', stagger: 0.08 }, 'hero+=0.2');
  if (orbit) tl.to(orbit, { scale: 1, opacity: 1, rotate: 0, duration: 1.8, ease: 'elastic.out(1, 0.7)' }, 'hero+=0.3');
  tl.to(navItems, { y: 0, opacity: 1, duration: 1, ease: 'expo.out', stagger: 0.07 }, 'hero+=0.35');
  tl.call(() => {
    loader.remove();
    lockScroll(false);
  }, null, 'hero+=0.1');

  return new Promise((resolve) => {
    tl.eventCallback('onComplete', () => {
      gsap.set(chars, { clearProps: 'rotationX,rotate,scale,opacity,transformOrigin' });
      resolve();
    });
  });
}
