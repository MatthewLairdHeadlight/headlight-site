import { defineConfig } from 'vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig(() => ({
  base: process.env.BASE_PATH ?? '/',
  root: '.',
  publicDir: 'assets',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about/index.html'),
        services: resolve(__dirname, 'services/index.html'),
        contact: resolve(__dirname, 'contact/index.html'),
        faqs: resolve(__dirname, 'faqs/index.html'),
        genesight: resolve(__dirname, 'genesight/index.html'),
      },
    },
  },
  server: {
    open: true,
  },
}));
