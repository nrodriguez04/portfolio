# Nicolas M. Rodriguez · Portfolio

A single-page, motion-heavy portfolio. It uses an editorial cream and navy look, a serif display face, and something moving in every section.

**Stack:** [Vite](https://vite.dev) · vanilla JS modules · [GSAP](https://gsap.com) (ScrollTrigger, SplitText, Flip) · [Lenis](https://lenis.darkroom.engineering) smooth scroll · self-hosted Fraunces, Geist, and Geist Mono.

## Scripts

```bash
npm install
npm run dev       # local dev server with reload
npm run build     # static site in dist/
npm run preview   # serve the production build
```

The build is fully static, and `base: './'` means it works from any host or subpath: GitHub Pages, Netlify, Vercel, S3, and so on. Upload `dist/`.

## Editing content

All copy lives in **`src/content/data.js`**: hero titles, marquee terms, about paragraphs, the seven login-pipeline stages, projects, experience, education, certifications, highlights, and contact settings.

At build time, `src/content/render.js` turns that data into plain HTML (see the plugin in `vite.config.js`). The shipped page is readable without JavaScript. Runtime JS only adds motion and interactivity.

## Project layout

```
src/
  content/   data.js (copy), render.js (HTML templates), icons.js, visuals.js (project card illustrations)
  js/        one module per behaviour: intro, hero, marquee, badge, pipeline, work, timeline, stats, contact, nav, theme, cursor, magnetic…
  styles/    tokens.css (design tokens, light/dark), base.css, chrome.css (loader/nav/menu), and one file per section
```

## Contact form

The form posts to [FormSubmit](https://formsubmit.co), which forwards messages to the address in `contact.endpoint` in `data.js`.

**One-time setup:** the first submission sends an activation email to that inbox. Click the link in it and later messages are delivered normally. Until then, the form shows an "Email me directly instead" fallback link. Without JS, the form posts to FormSubmit's regular endpoint.

## Motion and accessibility

- `prefers-reduced-motion` is respected. The loader, smooth scroll, parallax, cursor, and looping animations are skipped, and counters show their final values.
- The pause button in the nav stops every looping animation. Visitors who prefer reduced motion can use the same button to opt back in.
- The theme toggle follows the system setting by default. An override is stored only when it differs from the system, and the switch animates with a View Transition.
- The custom cursor and magnetic and tilt effects run only on fine-pointer, hover-capable devices. Touch devices get simpler scroll-driven versions.
