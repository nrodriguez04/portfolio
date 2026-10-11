import gsap from 'gsap';

// Buttons lean toward the pointer; their label leans a little further.
export function initMagnetic() {
  document.querySelectorAll('[data-magnetic]').forEach((el) => {
    const strength = Number(el.dataset.magnetic) || 0.32;
    const inner = el.querySelector('.btn__label, .nav__logo-mark');
    const ease = 'elastic.out(1, 0.35)';
    const xTo = gsap.quickTo(el, 'x', { duration: 0.9, ease });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.9, ease });
    const ixTo = inner && gsap.quickTo(inner, 'x', { duration: 0.9, ease });
    const iyTo = inner && gsap.quickTo(inner, 'y', { duration: 0.9, ease });

    el.addEventListener('pointermove', (e) => {
      if (e.pointerType !== 'mouse') return;
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      xTo(dx * strength);
      yTo(dy * strength);
      if (inner) {
        ixTo(dx * strength * 0.45);
        iyTo(dy * strength * 0.45);
      }
    });

    el.addEventListener('pointerleave', () => {
      xTo(0);
      yTo(0);
      if (inner) {
        ixTo(0);
        iyTo(0);
      }
    });
  });
}
