import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { reduce } from './env.js';

export function initReveals() {
  if (reduce) return;
  headings();
  blocks();
  words();
  labels();
}

/* Section headings: each line rises through a clip-path window. */
function headings() {
  document.querySelectorAll('[data-heading]').forEach((h) => {
    SplitText.create(h, {
      type: 'lines',
      linesClass: 'h-line',
      autoSplit: true,
      onSplit(self) {
        return gsap.fromTo(
          self.lines,
          { yPercent: 70, clipPath: 'inset(0% 0% 100% 0%)', rotate: 2 },
          {
            yPercent: 0,
            clipPath: 'inset(-20% -10% -30% -10%)',
            rotate: 0,
            duration: 1.25,
            ease: 'expo.out',
            stagger: 0.12,
            scrollTrigger: { trigger: h, start: 'top 86%', once: true },
          }
        );
      },
    });
  });
}

/* Generic fade-and-rise, batched so neighbours stagger together. */
function blocks() {
  const items = gsap.utils.toArray('[data-reveal]');
  gsap.set(items, { opacity: 0, y: 44 });
  ScrollTrigger.batch(items, {
    start: 'top 90%',
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, { opacity: 1, y: 0, duration: 1.1, ease: 'expo.out', stagger: 0.09, overwrite: true }),
  });
}

/* About copy lights up word by word as it scrolls through. */
function words() {
  document.querySelectorAll('[data-words]').forEach((p) => {
    SplitText.create(p, {
      type: 'words',
      wordsClass: 'word',
      autoSplit: true,
      onSplit(self) {
        return gsap.fromTo(
          self.words,
          { opacity: 0.16, y: 6 },
          {
            opacity: 1,
            y: 0,
            ease: 'none',
            stagger: 0.05,
            scrollTrigger: { trigger: p, start: 'top 82%', end: 'bottom 52%', scrub: 0.6 },
          }
        );
      },
    });
  });
}

/* The little rule in each section label draws in. */
function labels() {
  document.querySelectorAll('.section-label__rule').forEach((rule) => {
    gsap.fromTo(
      rule,
      { scaleX: 0 },
      { scaleX: 1, duration: 1.2, ease: 'expo.inOut', scrollTrigger: { trigger: rule, start: 'top 92%', once: true } }
    );
  });
}
