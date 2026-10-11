import gsap from 'gsap';
import { reduce, fine, clamp } from './env.js';
import { ambient } from './motion.js';
import { getVelocity } from './scroll.js';

// Two crossing tapes. Scrolling speeds them up, scrolling up reverses them,
// and fast scrolls shear the type a little.
export function initMarquee() {
  const wrap = document.querySelector('[data-marquee-wrap]');
  if (!wrap || reduce) return;

  const tracks = gsap.utils.toArray('[data-marquee]', wrap).map((track) => {
    const dir = Number(track.dataset.marquee);
    const back = track.closest('.marquee__band--back');
    const tween = gsap.fromTo(
      track,
      { xPercent: dir < 0 ? 0 : -50 },
      { xPercent: dir < 0 ? -50 : 0, duration: back ? 46 : 34, ease: 'none', repeat: -1 }
    );
    ambient.add(tween, wrap);
    return { track, tween, skew: gsap.quickSetter(track, 'skewX', 'deg') };
  });

  let direction = 1;
  let speed = 1;
  let skew = 0;
  let hover = 1;

  if (fine) {
    wrap.addEventListener('pointerenter', () => (hover = 0.25));
    wrap.addEventListener('pointerleave', () => (hover = 1));
  }

  ambient.tick(() => {
    const v = getVelocity();
    if (v > 0.8) direction = 1;
    else if (v < -0.8) direction = -1;
    const target = (1 + Math.min(Math.abs(v) * 0.35, 6)) * hover;
    speed += (target - speed) * 0.08;
    skew += (clamp(-v * 0.5, -10, 10) - skew) * 0.12;
    for (const t of tracks) {
      t.tween.timeScale(speed * direction);
      t.skew(skew);
    }
  });
}
