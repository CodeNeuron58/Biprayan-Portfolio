import { defineConfig, type Plugin } from 'vite';

// The stylesheet is small, so inline it into index.html: first paint then needs
// no extra round trip for render-blocking CSS.
function inlineCss(): Plugin {
  return {
    name: 'inline-css',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        if (!ctx.bundle) return html;
        for (const [name, file] of Object.entries(ctx.bundle)) {
          if (file.type !== 'asset' || !name.endsWith('.css')) continue;
          const tag = new RegExp(`<link rel="stylesheet"[^>]*?href="/${name.replace(/\./g, '\\.')}"[^>]*?>`);
          if (!tag.test(html)) continue;
          html = html.replace(tag, () => `<style>${String(file.source)}</style>`);
          delete ctx.bundle[name];
        }
        return html;
      },
    },
  };
}

export default defineConfig({
  base: '/',
  publicDir: 'public',
  plugins: [inlineCss()],
  build: {
    outDir: 'docs',
    emptyOutDir: true,
    target: 'es2019',
    modulePreload: { polyfill: false },
    assetsDir: 'assets',
  },
  server: { port: 3000, open: true },
});
