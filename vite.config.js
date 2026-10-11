import { defineConfig } from 'vite';

// Renders src/content/* into index.html so the shipped page is plain static
// HTML. In dev the content modules are loaded through Vite so edits reload.
function portfolioContent() {
  let server;
  return {
    name: 'portfolio-content',
    configureServer(s) {
      server = s;
    },
    async transformIndexHtml(html) {
      const mod = server
        ? await server.ssrLoadModule('/src/content/render.js')
        : await import('./src/content/render.js');
      const { meta } = mod;
      return html
        .replace('<!--app-->', mod.renderApp())
        .replaceAll('%SITE_DESCRIPTION%', meta.description)
        .replaceAll('%SITE_NAME%', meta.name);
    },
    handleHotUpdate({ file, server: s }) {
      if (file.includes('/src/content/')) {
        s.ws.send({ type: 'full-reload' });
        return [];
      }
    },
  };
}

export default defineConfig({
  base: './',
  plugins: [portfolioContent()],
  build: {
    target: 'es2022',
    cssTarget: ['chrome111', 'safari16.4', 'firefox113'],
  },
});
