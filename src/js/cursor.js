import gsap from 'gsap';

const INTERACTIVE = 'a, button, label, input, textarea, [data-cursor]';

export function initCursor() {
  const root = document.querySelector('.cursor');
  if (!root) return;
  const dot = root.querySelector('.cursor__dot');
  const ring = root.querySelector('.cursor__ring');
  const label = root.querySelector('.cursor__label');

  document.documentElement.classList.add('has-cursor');
  root.classList.add('is-hidden');

  const dotX = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3' });
  const dotY = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3' });
  const ringX = gsap.quickTo(ring, 'x', { duration: 0.55, ease: 'power3' });
  const ringY = gsap.quickTo(ring, 'y', { duration: 0.55, ease: 'power3' });

  let seen = false;
  window.addEventListener(
    'pointermove',
    (e) => {
      if (e.pointerType !== 'mouse') return;
      if (!seen) {
        gsap.set([dot, ring], { x: e.clientX, y: e.clientY });
        seen = true;
      }
      root.classList.remove('is-hidden');
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    },
    { passive: true }
  );

  document.addEventListener('pointerover', (e) => {
    const target = e.target.closest?.(INTERACTIVE);
    root.classList.remove('is-hover', 'has-label', 'is-text');
    if (!target) return;
    if (target.matches('input, textarea')) {
      root.classList.add('is-text');
    } else if (target.dataset.cursor) {
      label.textContent = target.dataset.cursor;
      root.classList.add('has-label');
    } else {
      root.classList.add('is-hover');
    }
  });

  document.addEventListener('pointerdown', () => root.classList.add('is-down'));
  document.addEventListener('pointerup', () => root.classList.remove('is-down'));
  document.documentElement.addEventListener('pointerleave', () => root.classList.add('is-hidden'));
  window.addEventListener('blur', () => root.classList.add('is-hidden'));
}
