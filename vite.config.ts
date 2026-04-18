import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  root: '.',
  base: '/Biprayan-Portfolio/',
  publicDir: 'public',
  build: {
    outDir: 'docs',
    emptyOutDir: true,
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo: any) => {
          let extType = assetInfo.name?.split('.').pop() || '';
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'images';
          } else if (/woff|woff2|ttf|eot/i.test(extType)) {
            extType = 'fonts';
          }
          return `assets/${extType}/[name].[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name].[hash].js',
        entryFileNames: 'assets/js/[name].[hash].js',
      },
    },
    target: 'es2015',
    minify: 'terser',
    sourcemap: true,
  },
  server: {
    port: 3000,
    open: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(fileURLToPath(new URL('.', import.meta.url)), 'src'),
    },
  },
});
