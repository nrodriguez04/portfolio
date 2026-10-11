import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import { reduce, fine } from './env.js';

export function initWork() {
  const list = document.querySelector('[data-cards]');
  if (!list) return;
  const cards = [...list.querySelectorAll('[data-card]')];

  playWhenVisible(cards);
  filters(cards);
  if (reduce) return;
  reveal(cards);
  if (fine) cards.forEach(tilt);
}

/* Project illustrations only animate while their card is on screen. */
function playWhenVisible(cards) {
  if (reduce) return;
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.target.classList.toggle('is-playing', e.isIntersecting)),
    { rootMargin: '80px 0px' }
  );
  cards.forEach((c) => io.observe(c));
}

/* Cards tip up out of the page as they arrive. */
function reveal(cards) {
  const inners = cards.map((c) => c.querySelector('[data-card-inner]'));
  gsap.set(inners, { opacity: 0, y: 90, rotationX: -18, transformOrigin: '50% 0%' });
  ScrollTrigger.batch(inners, {
    start: 'top 92%',
    once: true,
    onEnter: (batch) => {
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 1.3,
        ease: 'expo.out',
        stagger: 0.1,
        clearProps: 'transformOrigin',
      });
      if (!fine) batch.forEach((inner, i) => sweep(inner, 0.5 + i * 0.1));
    },
  });
}

function sweep(inner, delay = 0) {
  const shine = inner.querySelector('.card__shine');
  gsap.fromTo(shine, { xPercent: 0 }, { xPercent: 200, duration: 1.2, ease: 'power2.inOut', delay });
}

/* Desktop: lift and tilt toward the pointer, spotlight follows, shine sweeps. */
function tilt(card) {
  const inner = card.querySelector('[data-card-inner]');
  const rx = gsap.quickTo(inner, 'rotationX', { duration: 0.7, ease: 'power3' });
  const ry = gsap.quickTo(inner, 'rotationY', { duration: 0.7, ease: 'power3' });
  const lift = gsap.quickTo(inner, 'y', { duration: 0.7, ease: 'power3' });

  inner.addEventListener('pointerenter', () => {
    sweep(inner);
    lift(-12);
  });
  inner.addEventListener('pointermove', (e) => {
    const r = inner.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    rx((py - 0.5) * -10);
    ry((px - 0.5) * (card.classList.contains('card--wide') ? 7 : 12));
    inner.style.setProperty('--mx', `${px * 100}%`);
    inner.style.setProperty('--my', `${py * 100}%`);
  });
  inner.addEventListener('pointerleave', () => {
    rx(0);
    ry(0);
    lift(0);
  });
}

/* Filter tabs reflow the grid with Flip. */
function filters(cards) {
  const group = document.querySelector('.filters');
  if (!group) return;
  const buttons = [...group.querySelectorAll('[data-filter]')];
  const pill = group.querySelector('.filters__pill');
  const status = document.querySelector('[data-filter-status]');

  const movePill = (btn, instant) => {
    const vars = { x: btn.offsetLeft, y: btn.offsetTop, width: btn.offsetWidth, height: btn.offsetHeight };
    if (instant || reduce) gsap.set(pill, vars);
    else gsap.to(pill, { ...vars, duration: 0.6, ease: 'expo.out' });
  };
  const current = () => buttons.find((b) => b.getAttribute('aria-pressed') === 'true');
  movePill(current(), true);
  group.classList.add('is-ready');
  window.addEventListener('resize', () => movePill(current(), true));

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (btn === current()) return;
      buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      movePill(btn);
      const key = btn.dataset.filter;
      const state = Flip.getState(cards);
      let shown = 0;
      cards.forEach((c) => {
        const match = key === 'all' || c.dataset.group === key;
        c.hidden = !match;
        if (match) shown++;
      });
      status.textContent = `Showing ${shown} project${shown === 1 ? '' : 's'}`;
      if (reduce) return ScrollTrigger.refresh();
      Flip.from(state, {
        duration: 0.85,
        ease: 'expo.inOut',
        absolute: true,
        stagger: 0.03,
        onEnter: (els) =>
          gsap.fromTo(els, { opacity: 0, scale: 0.85, y: 40 }, { opacity: 1, scale: 1, y: 0, duration: 0.7, delay: 0.25, ease: 'expo.out' }),
        onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.85, duration: 0.45, ease: 'power2.in' }),
        onComplete: () => ScrollTrigger.refresh(),
      });
    });
  });
}
