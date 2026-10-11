import { reduce } from './env.js';

// Local time in Frisco, ticking.
export function initClock() {
  const els = document.querySelectorAll('[data-clock]');
  if (!els.length) return;
  const fmt = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Chicago',
    hour: 'numeric',
    minute: '2-digit',
    ...(reduce ? {} : { second: '2-digit' }),
    timeZoneName: 'short',
  });
  const tick = () => {
    const now = new Date();
    const text = fmt.format(now);
    els.forEach((el) => {
      el.textContent = text;
      el.dateTime = now.toISOString();
    });
  };
  tick();
  setInterval(tick, reduce ? 30000 : 1000);
}
