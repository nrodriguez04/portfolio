import gsap from 'gsap';
import { reduce } from './env.js';

export function initContact() {
  copyButton();
  form();
}

function copyButton() {
  const btn = document.querySelector('[data-copy]');
  if (!btn) return;
  const label = btn.querySelector('[data-copy-label]');
  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(btn.dataset.copy);
      btn.classList.add('is-done');
      label.textContent = 'Email address copied';
      setTimeout(() => {
        btn.classList.remove('is-done');
        label.textContent = 'Copy email address';
      }, 1800);
    } catch {
      label.textContent = 'Copy failed. The address is ' + btn.dataset.copy;
    }
  });
}

function form() {
  const el = document.querySelector('[data-contact-form]');
  if (!el) return;
  const submit = el.querySelector('[type="submit"]');
  const submitLabel = el.querySelector('[data-submit-label]');
  const status = el.querySelector('[data-form-status]');
  const fields = [...el.querySelectorAll('input[required], textarea[required]')];

  // :user-invalid is visual only; mirror it into aria-invalid for AT.
  const syncAria = (f) => {
    if (f.matches(':user-invalid')) f.setAttribute('aria-invalid', 'true');
    else f.removeAttribute('aria-invalid');
  };
  fields.forEach((f) => {
    f.addEventListener('blur', () => syncAria(f));
    f.addEventListener('input', () => f.hasAttribute('aria-invalid') && syncAria(f));
  });
  el.addEventListener('invalid', () => requestAnimationFrame(() => fields.forEach(syncAria)), true);

  el.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(el));
    if (data._honey) return; // bots fill hidden fields

    status.textContent = '';
    status.className = 'form__status';
    submit.setAttribute('aria-busy', 'true');
    submitLabel.textContent = 'Sending…';

    try {
      const res = await fetch(el.dataset.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok || !(body.success === true || body.success === 'true')) {
        throw new Error(body.message || `Request failed (${res.status})`);
      }
      sent(el, data);
    } catch {
      status.classList.add('is-error');
      const mailto = `mailto:${el.querySelector('.form__note')?.textContent.replace('Goes straight to ', '') || ''}?subject=${encodeURIComponent('Portfolio message from ' + (data.name || ''))}&body=${encodeURIComponent(data.message || '')}`;
      status.innerHTML = '';
      status.append('That didn’t go through. ');
      const a = document.createElement('a');
      a.href = mailto;
      a.textContent = 'Email me directly instead';
      status.append(a, '.');
    } finally {
      submit.removeAttribute('aria-busy');
      submitLabel.textContent = 'Send message';
    }
  });
}

function sent(formEl, data) {
  const plane = formEl.querySelector('.form__plane');
  const overlay = document.createElement('div');
  overlay.className = 'form__sent';
  overlay.setAttribute('role', 'status');
  overlay.innerHTML = `
    <svg viewBox="0 0 72 72" aria-hidden="true"><circle cx="36" cy="36" r="33"/><path d="m22 37 9 9 19-20"/></svg>
    <h3>Message sent.</h3>
    <p></p>
    <button type="button">Send another</button>`;
  overlay.querySelector('p').textContent = `Thanks${data.name ? `, ${data.name}` : ''}. I’ll reply to ${data.email}.`;

  const show = () => {
    formEl.append(overlay);
    overlay.querySelector('button').focus({ preventScroll: true });
    if (reduce) return;
    const circle = overlay.querySelector('circle');
    const tick = overlay.querySelector('path');
    gsap.set([circle, tick], { strokeDasharray: (_, t) => t.getTotalLength(), strokeDashoffset: (_, t) => t.getTotalLength() });
    gsap
      .timeline()
      .fromTo(overlay, { clipPath: 'circle(0% at 50% 100%)' }, { clipPath: 'circle(150% at 50% 100%)', duration: 0.9, ease: 'expo.inOut' })
      .to(circle, { strokeDashoffset: 0, duration: 0.8, ease: 'power2.out' }, '-=0.3')
      .to(tick, { strokeDashoffset: 0, duration: 0.5, ease: 'power2.out' }, '-=0.35')
      .from(overlay.querySelectorAll('h3, p, button'), { y: 20, opacity: 0, stagger: 0.08, duration: 0.6, ease: 'expo.out' }, '-=0.4');
  };

  overlay.querySelector('button').addEventListener('click', () => {
    formEl.reset();
    overlay.remove();
    formEl.querySelector('input:not([type="hidden"])')?.focus();
  });

  if (reduce || !plane) return show();
  gsap
    .timeline({ onComplete: show })
    .to(plane, { x: 160, y: -120, rotate: 20, opacity: 0, duration: 0.7, ease: 'power3.in' })
    .set(plane, { x: 0, y: 0, rotate: 0, opacity: 1 });
}
