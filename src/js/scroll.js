import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { reduce, lerp } from './env.js';

export let lenis = null;

let velocity = 0;
let lastY = window.scrollY;

export function initScroll() {
  if (!reduce) {
    lenis = new Lenis({ lerp: 0.085, smoothWheel: true, wheelMultiplier: 0.95 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  // Smoothed scroll speed in px per frame, shared by velocity-driven effects.
  gsap.ticker.add((_, deltaTime) => {
    const y = window.scrollY;
    const frames = Math.max(deltaTime / 16.67, 0.5);
    velocity = lerp(velocity, (y - lastY) / frames, 0.18);
    lastY = y;
  });
}

export const getVelocity = () => velocity;

export function scrollToTarget(target, { onDone } = {}) {
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) return;
  const focus = () => {
    if (el.matches('section, main, [tabindex]')) el.focus({ preventScroll: true });
    onDone?.();
  };
  if (lenis) {
    lenis.scrollTo(el.id === 'top' ? 0 : el, {
      duration: 1.5,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      onComplete: focus,
    });
  } else {
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    focus();
  }
}

export function lockScroll(locked) {
  if (lenis) locked ? lenis.stop() : lenis.start();
  document.documentElement.style.overflow = locked ? 'hidden' : '';
}
