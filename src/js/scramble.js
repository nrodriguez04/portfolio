// Decodes text into place: each character flickers through glyphs before
// settling, left to right with a little randomness.
const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+=<>/\\[]{}';

const randomGlyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

export function scramble(el, to, { duration = 1.1, from = el.textContent } = {}) {
  cancelAnimationFrame(el._scrambleRaf);
  const frames = Math.round(duration * 60);
  const length = Math.max(from.length, to.length);
  const queue = Array.from({ length }, (_, i) => {
    const start = Math.floor(Math.random() * frames * 0.35 + (i / length) * frames * 0.25);
    const end = start + Math.floor(Math.random() * frames * 0.4 + frames * 0.12);
    return { from: from[i] || '', to: to[i] || '', start, end, glyph: '' };
  });

  return new Promise((resolve) => {
    let frame = 0;
    const step = () => {
      let out = '';
      let done = 0;
      for (const q of queue) {
        if (frame >= q.end) {
          done++;
          out += escape(q.to);
        } else if (frame >= q.start) {
          if (!q.glyph || Math.random() < 0.28) q.glyph = randomGlyph();
          out += q.to === ' ' ? ' ' : `<span class="scr">${escape(q.glyph)}</span>`;
        } else {
          out += escape(q.from);
        }
      }
      el.innerHTML = out;
      if (done === queue.length) {
        el.textContent = to;
        resolve();
        return;
      }
      frame++;
      el._scrambleRaf = requestAnimationFrame(step);
    };
    step();
  });
}

function escape(s) {
  return s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c]);
}
