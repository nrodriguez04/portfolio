import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { reduce, motionPref } from './env.js';

// "Ambient" motion is anything that loops on its own (marquee, token flow,
// orbit...). The nav toggle pauses all of it; scroll-driven reveals stay.
const animations = new Set();
const tickers = new Set();
// Animations tied to an element only run while that element is on screen.
const triggers = new Map(); // element -> { visible, anims }
const owner = new WeakMap(); // animation -> element
let paused = reduce || motionPref === 'paused';

function sync(anim) {
  const el = owner.get(anim);
  const onScreen = el ? triggers.get(el).visible : true;
  if (paused || !onScreen) anim.pause();
  else anim.resume();
}

function watch(el) {
  if (triggers.has(el)) return;
  const entry = { visible: false, anims: new Set() };
  triggers.set(el, entry);
  ScrollTrigger.create({
    trigger: el,
    start: 'top bottom',
    end: 'bottom top',
    onToggle: (self) => {
      entry.visible = self.isActive;
      entry.anims.forEach(sync);
    },
  });
}

export const ambient = {
  get paused() {
    return paused;
  },
  add(anim, trigger) {
    animations.add(anim);
    if (trigger) {
      watch(trigger);
      owner.set(anim, trigger);
      triggers.get(trigger).anims.add(anim);
    }
    sync(anim);
    return anim;
  },
  remove(anim) {
    animations.delete(anim);
    const el = owner.get(anim);
    if (el) triggers.get(el).anims.delete(anim);
  },
  tick(fn) {
    tickers.add(fn);
    return () => tickers.delete(fn);
  },
};

gsap.ticker.add((time, deltaTime) => {
  if (paused) return;
  for (const fn of tickers) fn(time, deltaTime);
});

function setPaused(value) {
  paused = value;
  const root = document.documentElement;
  if (value) root.dataset.motion = 'paused';
  else if (motionPref === 'on') root.dataset.motion = 'on';
  else delete root.dataset.motion;
  animations.forEach(sync);
}

export function initMotionToggle() {
  const btn = document.querySelector('[data-motion-toggle]');
  if (!btn) return;
  const render = () => btn.setAttribute('aria-pressed', String(paused));
  render();
  btn.addEventListener('click', () => {
    if (reduce) {
      // Opting in from reduced motion needs the full motion setup: reload.
      try {
        localStorage.setItem('motion', 'on');
      } catch {}
      location.reload();
      return;
    }
    const next = !paused;
    try {
      if (next) localStorage.setItem('motion', 'paused');
      else if (motionPref === 'on') localStorage.setItem('motion', 'on');
      else localStorage.removeItem('motion');
    } catch {}
    setPaused(next);
    render();
  });
}
