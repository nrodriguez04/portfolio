// Read once at startup. A stored "motion: on" lets people who prefer reduced
// motion opt back in from the nav toggle.
let pref = null;
try {
  pref = localStorage.getItem('motion');
} catch {
  /* storage blocked: fall back to the OS setting */
}

export const motionPref = pref;
export const osReduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
export const reduce = osReduce && pref !== 'on';
export const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
export const isDesktop = () => matchMedia('(min-width: 960px)').matches;

export const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
export const lerp = (a, b, t) => a + (b - a) * t;
