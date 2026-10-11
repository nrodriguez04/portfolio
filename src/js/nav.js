import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { reduce } from './env.js';
import { scrollToTarget, lockScroll } from './scroll.js';

export function initNav() {
  const nav = document.querySelector('[data-nav]');
  const pill = nav.querySelector('.nav__pill');
  const links = [...nav.querySelectorAll('[data-nav-link]')];
  const progress = nav.querySelector('[data-progress]');

  // Every in-page link scrolls smoothly and moves focus to its target.
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey) return;
    const id = a.getAttribute('href');
    const target = id === '#' ? null : document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    if (menuOpen) closeMenu({ restoreFocus: false }).then(() => scrollToTarget(target));
    else scrollToTarget(target);
  });

  // Sliding pill behind the active section link.
  let active = null;
  const movePill = (link, instant = false) => {
    if (!link) {
      gsap.to(pill, { opacity: 0, duration: 0.3 });
      return;
    }
    const vars = { x: link.offsetLeft + 5, width: link.offsetWidth, opacity: 1 };
    if (instant || reduce) gsap.set(pill, vars);
    else gsap.to(pill, { ...vars, duration: 0.6, ease: 'expo.out' });
  };
  const setActive = (id) => {
    if (active === id) return;
    active = id;
    links.forEach((l) => (l.dataset.navLink === id ? l.setAttribute('aria-current', 'true') : l.removeAttribute('aria-current')));
    movePill(links.find((l) => l.dataset.navLink === id));
  };

  links.forEach((link) => {
    const section = document.getElementById(link.dataset.navLink);
    if (!section) return;
    ScrollTrigger.create({
      trigger: section,
      start: 'top 45%',
      end: 'bottom 45%',
      onToggle: (self) => {
        if (self.isActive) setActive(link.dataset.navLink);
        else if (active === link.dataset.navLink) setActive(null);
      },
    });
  });

  window.addEventListener('resize', () => movePill(links.find((l) => l.dataset.navLink === active), true));

  ScrollTrigger.create({
    start: 40,
    end: 'max',
    onToggle: (self) => nav.classList.toggle('is-scrolled', self.isActive),
  });

  if (progress) {
    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => gsap.set(progress, { scaleX: self.progress }),
    });
  }

  initMenu();
}

/* ------------------------------------------------------------- mobile menu */

let menuOpen = false;
let closeMenu = async () => {};

function initMenu() {
  const btn = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-menu]');
  if (!btn || !menu) return;
  const items = [...menu.querySelectorAll('.menu__links li, .menu__foot')];
  const outside = [document.querySelector('main'), document.querySelector('footer')];

  const circle = (r) => {
    const b = btn.getBoundingClientRect();
    return `circle(${r} at ${b.left + b.width / 2}px ${b.top + b.height / 2}px)`;
  };

  const open = () => {
    menuOpen = true;
    menu.hidden = false;
    btn.setAttribute('aria-expanded', 'true');
    outside.forEach((el) => el && (el.inert = true));
    lockScroll(true);
    if (reduce) {
      gsap.set(menu, { clipPath: 'none' });
    } else {
      gsap.fromTo(menu, { clipPath: circle('0px') }, { clipPath: circle('150vmax'), duration: 0.9, ease: 'expo.inOut' });
      gsap.fromTo(
        items,
        { yPercent: 120, opacity: 0, rotate: 4 },
        { yPercent: 0, opacity: 1, rotate: 0, duration: 0.9, ease: 'expo.out', stagger: 0.05, delay: 0.25 }
      );
    }
    menu.querySelector('a')?.focus({ preventScroll: true });
  };

  closeMenu = ({ restoreFocus = true } = {}) =>
    new Promise((resolve) => {
      if (!menuOpen) return resolve();
      menuOpen = false;
      btn.setAttribute('aria-expanded', 'false');
      outside.forEach((el) => el && (el.inert = false));
      lockScroll(false);
      const done = () => {
        menu.hidden = true;
        if (restoreFocus) btn.focus({ preventScroll: true });
        resolve();
      };
      if (reduce) return done();
      gsap.to(menu, { clipPath: circle('0px'), duration: 0.6, ease: 'expo.inOut', onComplete: done });
    });

  btn.addEventListener('click', () => (menuOpen ? closeMenu() : open()));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuOpen) closeMenu();
  });
  matchMedia('(min-width: 960px)').addEventListener('change', (e) => {
    if (e.matches && menuOpen) closeMenu({ restoreFocus: false });
  });
}
