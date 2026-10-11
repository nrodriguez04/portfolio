import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { reduce } from './env.js';

// Numbers count up on arrival, and each stat's units light as they're counted:
// one dot per touchdown, one tile per app, one segment per domain.
export function initStats() {
  const stats = gsap.utils.toArray('[data-stat]');
  stats.forEach((stat) => {
    const num = stat.querySelector('[data-count]');
    const target = Number(num.dataset.count);
    const units = [...stat.querySelectorAll('[data-unit]')];
    let lit = 0;
    const light = (n) => {
      const want = Math.round((n / target) * units.length);
      while (lit < want) units[lit++].classList.add('on');
    };

    if (reduce) {
      light(target);
      return;
    }

    num.textContent = '0';
    const counter = { v: 0 };
    ScrollTrigger.create({
      trigger: stat,
      start: 'top 82%',
      once: true,
      onEnter: () =>
        gsap.to(counter, {
          v: target,
          duration: target > 50 ? 2.6 : 1.6,
          ease: target > 50 ? 'power2.out' : 'power3.out',
          onUpdate: () => {
            const n = Math.round(counter.v);
            num.textContent = String(n);
            light(n);
          },
        }),
    });
  });

  if (reduce) return;
  gsap.set(stats, { opacity: 0, y: 70, rotate: (i) => (i % 2 ? 2.5 : -2.5) });
  ScrollTrigger.batch(stats, {
    start: 'top 90%',
    once: true,
    onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, rotate: 0, duration: 1.2, ease: 'expo.out', stagger: 0.1 }),
  });
}
