import gsap from 'gsap';
import { reduce } from './env.js';
import { ambient } from './motion.js';
import { scramble } from './scramble.js';

const TRAIL = 140;

// A token flows through the seven stages of a login. Each node pulses as it
// passes and the token's label changes to what that stage produced.
export function initPipeline() {
  const root = document.querySelector('[data-pipeline]');
  if (!root) return;
  const svg = root.querySelector('[data-pipeline-svg]');
  const [base, flow, lit] = svg.querySelectorAll('path');
  const token = root.querySelector('[data-token-el]');
  const tokenText = root.querySelector('[data-token-text]');
  const items = [...root.querySelectorAll('.pnode')];
  const buttons = items.map((li) => li.querySelector('.pnode__btn'));
  const icons = items.map((li) => li.querySelector('[data-pnode-icon]'));
  const rings = items.map((li) => li.querySelector('.pnode__ring'));
  const wrap = root.querySelector('[data-panels]');
  const hint = root.querySelector('[data-panel-hint]');
  const panels = [...root.querySelectorAll('[data-panel]')];

  /* ---------------------------------------------------------- selection */

  let active = -1;

  const setPanel = (i) => {
    const h0 = wrap.offsetHeight;
    panels.forEach((p, j) => (p.hidden = j !== i));
    hint.hidden = i !== -1;
    buttons.forEach((b, j) => b.setAttribute('aria-expanded', String(j === i)));
    active = i;
    if (reduce) return;
    const h1 = wrap.offsetHeight;
    gsap.fromTo(wrap, { height: h0 }, { height: h1, duration: 0.8, ease: 'expo.out', clearProps: 'height' });
    const shown = i === -1 ? hint : panels[i];
    const parts = shown.querySelectorAll('.ppanel__step, .ppanel__title, .ppanel__body, .ppanel__tech li, .ppanel__trace');
    gsap.fromTo(
      parts.length ? parts : shown,
      { y: 28, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out', stagger: 0.04 }
    );
    gsap.fromTo(shown, { clipPath: 'inset(0% 0% 100% 0% round 28px)' }, { clipPath: 'inset(0% 0% 0% 0% round 28px)', duration: 0.9, ease: 'expo.out', clearProps: 'clipPath' });
    const trace = shown.querySelector('[data-trace]');
    if (trace) scramble(trace, trace.dataset.text || (trace.dataset.text = trace.textContent), { duration: 0.9, from: '' });
  };

  buttons.forEach((btn, i) => {
    btn.addEventListener('click', () => setPanel(active === i ? -1 : i));
    btn.addEventListener('keydown', (e) => {
      const keys = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
      if (e.key in keys) {
        e.preventDefault();
        buttons[(i + keys[e.key] + buttons.length) % buttons.length].focus();
      } else if (e.key === 'Home' || e.key === 'End') {
        e.preventDefault();
        buttons[e.key === 'Home' ? 0 : buttons.length - 1].focus();
      }
    });
  });

  /* --------------------------------------------------------------- flow */

  if (reduce) {
    token.hidden = true;
    lit.style.display = 'none';
    return;
  }

  let total = 0;
  let stops = [];
  let tl;

  const place = (p) => {
    const pt = base.getPointAtLength(p * total);
    gsap.set(token, { x: pt.x, y: pt.y });
    lit.style.strokeDashoffset = String(TRAIL - p * total);
  };

  const hit = (i) => {
    const label = buttons[i].dataset.token;
    scramble(tokenText, label, { duration: 0.45 });
    items[i].classList.add('is-hit');
    setTimeout(() => items[i].classList.remove('is-hit'), 700);
    gsap.fromTo(rings[i], { scale: 1, opacity: 1 }, { scale: 1.9, opacity: 0, duration: 1, ease: 'expo.out' });
    gsap.fromTo(icons[i], { scale: 1.16 }, { scale: 1, duration: 0.9, ease: 'elastic.out(1, 0.4)' });
  };

  const build = () => {
    const box = root.getBoundingClientRect();
    const pts = icons.map((ic) => {
      const r = ic.getBoundingClientRect();
      return [r.left - box.left + r.width / 2, r.top - box.top + r.height / 2];
    });
    const d = `M ${pts.map((p) => p.map((n) => n.toFixed(1)).join(' ')).join(' L ')}`;
    [base, flow, lit].forEach((p) => p.setAttribute('d', d));
    total = base.getTotalLength();
    let acc = 0;
    stops = pts.map((p, i) => {
      if (i) acc += Math.hypot(p[0] - pts[i - 1][0], p[1] - pts[i - 1][1]);
      return total ? acc / total : 0;
    });
    lit.style.strokeDasharray = `${TRAIL} ${total + TRAIL}`;

    const progress = tl ? tl.progress() : 0;
    if (tl) {
      ambient.remove(tl);
      tl.kill();
    }
    const state = { p: 0 };
    tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });
    tl.call(() => place(0));
    tl.fromTo(token, { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.35, ease: 'back.out(2)' });
    stops.forEach((stop, i) => {
      if (i) {
        tl.to(state, {
          p: stop,
          duration: 0.75,
          ease: 'power2.inOut',
          onUpdate: () => place(state.p),
        });
      }
      tl.call(hit, [i]);
      tl.to({}, { duration: 0.5 });
    });
    tl.to(token, { opacity: 0, scale: 0.4, duration: 0.3, ease: 'power2.in' });
    tl.set(state, { p: 0 });
    tl.progress(progress, true);
    ambient.add(tl, root);
  };

  build();
  let raf;
  new ResizeObserver(() => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(build);
  }).observe(root.querySelector('.pipeline__nodes'));
}
