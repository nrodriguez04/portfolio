import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { reduce, fine, clamp } from './env.js';
import { ambient } from './motion.js';
import { getVelocity } from './scroll.js';

// The credential hangs from a lanyard: it swings on a damped spring, tilts
// toward the pointer, catches a holographic glare, and flips on click.
export function initBadge() {
  const lanyard = document.querySelector('[data-lanyard]');
  if (!lanyard) return;
  const badge = lanyard.querySelector('[data-badge]');
  const tilt = lanyard.querySelector('[data-badge-tilt]');
  const inner = lanyard.querySelector('[data-badge-inner]');
  const flipBtn = lanyard.querySelector('[data-badge-flip]');

  let flipped = false;
  let angle = 0;
  let spin = 0;

  flipBtn.addEventListener('click', () => {
    flipped = !flipped;
    flipBtn.setAttribute('aria-pressed', String(flipped));
    if (reduce) {
      gsap.set(inner, { rotationY: flipped ? 180 : 0 });
      return;
    }
    gsap.to(inner, { rotationY: flipped ? 180 : 0, duration: 1.2, ease: 'elastic.out(1, 0.7)' });
    spin += flipped ? 60 : -60;
  });

  if (reduce) return;

  // Drop in from above on first view, already swinging.
  gsap.from(lanyard, {
    y: -260,
    opacity: 0,
    duration: 1.1,
    ease: 'power3.out',
    scrollTrigger: { trigger: badge, start: 'top 90%', once: true, onEnter: () => (spin += 120) },
  });

  // Damped pendulum around the top of the strap.
  let visible = false;
  ScrollTrigger.create({
    trigger: lanyard.parentElement,
    start: 'top bottom',
    end: 'bottom top',
    onToggle: (self) => (visible = self.isActive),
  });
  const setRot = gsap.quickSetter(lanyard, 'rotation', 'deg');
  ambient.tick((_, dt) => {
    if (!visible) return;
    const s = Math.min(dt / 1000, 1 / 30);
    const sway = clamp(getVelocity() * 0.45, -9, 9);
    const acc = -38 * (angle - sway) - 3.4 * spin;
    spin += acc * s;
    angle += spin * s;
    setRot(angle);
  });

  if (!fine) return;

  const rx = gsap.quickTo(tilt, 'rotationX', { duration: 0.6, ease: 'power3' });
  const ry = gsap.quickTo(tilt, 'rotationY', { duration: 0.6, ease: 'power3' });
  let lastX = null;

  badge.addEventListener('pointerenter', (e) => {
    badge.classList.add('is-hot');
    lastX = e.clientX;
    gsap.fromTo(badge, { '--sweep': '90%' }, { '--sweep': '0%', duration: 1.1, ease: 'power2.out' });
  });

  badge.addEventListener('pointermove', (e) => {
    const r = badge.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    rx((py - 0.5) * -18);
    ry((px - 0.5) * 24);
    badge.style.setProperty('--hx', `${(1 - px) * 100}%`);
    badge.style.setProperty('--hy', `${(1 - py) * 100}%`);
    // Brushing past the card nudges the swing.
    if (lastX !== null) spin += clamp(e.clientX - lastX, -30, 30) * 0.6;
    lastX = e.clientX;
  });

  badge.addEventListener('pointerleave', () => {
    badge.classList.remove('is-hot');
    lastX = null;
    rx(0);
    ry(0);
  });
}
