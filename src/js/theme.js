import { reduce } from './env.js';

// Two-state toggle over a tri-state model: "system" (no stored value) or an
// explicit override. Toggling back to what the OS wants clears the override.
const meta = document.querySelector('meta[name="color-scheme"]');
const themeColors = [...document.querySelectorAll('meta[name="theme-color"]')];
const defaults = themeColors.map((m) => m.content);
const systemDark = matchMedia('(prefers-color-scheme: dark)');

const COLORS = { light: '#FAF6F0', dark: '#0A121E' };

export const renderedScheme = () =>
  meta.content === 'dark' || (meta.content !== 'light' && systemDark.matches) ? 'dark' : 'light';

function apply(stored) {
  meta.content = stored === 'light' || stored === 'dark' ? stored : 'light dark';
  themeColors.forEach((m, i) => {
    m.content = stored ? COLORS[stored] : defaults[i];
  });
}

export function initTheme() {
  const btn = document.querySelector('[data-theme-toggle]');
  try {
    apply(localStorage.getItem('color-scheme'));
  } catch {
    apply(null);
  }

  btn?.addEventListener('click', () => {
    const target = renderedScheme() === 'dark' ? 'light' : 'dark';
    const system = systemDark.matches ? 'dark' : 'light';
    const stored = target === system ? null : target;
    try {
      if (stored) localStorage.setItem('color-scheme', stored);
      else localStorage.removeItem('color-scheme');
    } catch {
      /* still switch for this page view */
    }

    const change = () => apply(stored);
    if (reduce || !document.startViewTransition) {
      change();
      return;
    }

    const r = btn.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const transition = document.startViewTransition(change);
    transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 750, easing: 'cubic-bezier(0.65, 0, 0.35, 1)', pseudoElement: '::view-transition-new(root)' }
      );
    });
  });

  window.addEventListener('storage', (e) => {
    if (e.key === 'color-scheme') apply(e.newValue);
  });
}
