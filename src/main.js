import './styles/main.css';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { Flip } from 'gsap/Flip';

import { reduce, fine } from './js/env.js';
import { initMotionToggle } from './js/motion.js';
import { initTheme } from './js/theme.js';
import { initScroll } from './js/scroll.js';
import { initNav } from './js/nav.js';
import { initClock } from './js/clock.js';
import { initCursor } from './js/cursor.js';
import { initMagnetic } from './js/magnetic.js';
import { runIntro } from './js/intro.js';
import { initHero, startHeroLoops } from './js/hero.js';
import { initMarquee } from './js/marquee.js';
import { initReveals } from './js/reveals.js';
import { initBadge } from './js/badge.js';
import { initPipeline } from './js/pipeline.js';
import { initWork } from './js/work.js';
import { initTimeline } from './js/timeline.js';
import { initStats } from './js/stats.js';
import { initContact } from './js/contact.js';

gsap.registerPlugin(ScrollTrigger, SplitText, Flip);
ScrollTrigger.config({ ignoreMobileResize: true });

// Wiring that doesn't depend on layout.
initTheme();
initMotionToggle();
initScroll();
initNav();
initClock();
initContact();
if (fine && !reduce) {
  initCursor();
  initMagnetic();
}

// Layout-dependent motion waits for fonts (capped so a slow font never
// holds the page hostage).
const fontsReady = Promise.race([document.fonts?.ready, new Promise((r) => setTimeout(r, 2500))]);

fontsReady.then(async () => {
  initReveals();
  initHero();
  initMarquee();
  initBadge();
  initPipeline();
  initWork();
  initTimeline();
  initStats();
  ScrollTrigger.refresh();

  await runIntro();
  startHeroLoops();
  ScrollTrigger.refresh();
});
