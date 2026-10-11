import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { reduce, isDesktop } from './env.js';
import { scramble } from './scramble.js';
import { duration } from '../content/duration.js';

export function initTimeline() {
  const root = document.querySelector('[data-timeline]');
  if (!root) return;
  updatePresent();
  if (reduce) return;

  const fill = root.querySelector('[data-tl-fill]');
  const head = root.querySelector('[data-tl-head]');
  const line = root.querySelector('.timeline__line');
  const list = root.querySelector('.timeline__list');

  // The line draws itself as you scroll, with a glowing head at its tip.
  gsap.fromTo(fill, { scaleY: 0 }, {
    scaleY: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: list,
      start: 'top 70%',
      end: 'bottom 70%',
      scrub: 0.5,
      onUpdate: (self) => gsap.set(head, { y: self.progress * line.offsetHeight }),
      onToggle: (self) => gsap.to(head, { opacity: self.isActive ? 1 : 0, duration: 0.3 }),
    },
  });

  root.querySelectorAll('[data-tl-item]').forEach((item, i) => {
    const card = item.querySelector('.tl-card');
    const dot = item.querySelector('.tl-item__dot');
    const desktop = isDesktop();
    const side = i % 2 ? 1 : -1;
    gsap.set(card, desktop
      ? { opacity: 0, x: 70 * side, rotationY: -14 * side, transformPerspective: 900 }
      : { opacity: 0, y: 50, rotationX: -16, transformPerspective: 900, transformOrigin: '50% 0%' });
    gsap.set(dot, { scale: 0 });
    gsap
      .timeline({ scrollTrigger: { trigger: item, start: 'top 75%', once: true } })
      .to(dot, { scale: 1, duration: 0.9, ease: 'elastic.out(1, 0.45)' })
      .to(card, { opacity: 1, x: 0, y: 0, rotationX: 0, rotationY: 0, duration: 1.2, ease: 'expo.out' }, '<0.05')
      .call(() => item.querySelectorAll('[data-scramble-once]').forEach((el) => scramble(el, el.textContent, { duration: 0.9 })), null, '<0.1');
  });
}

// The "Present" role's length is computed from today's date.
function updatePresent() {
  const now = new Date();
  document.querySelectorAll('[data-duration-from]').forEach((el) => {
    const [y, m] = el.dataset.durationFrom.split('-').map(Number);
    el.textContent = duration([y, m], [now.getFullYear(), now.getMonth() + 1]);
  });
}
