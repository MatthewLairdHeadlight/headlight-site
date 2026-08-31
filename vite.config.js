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
        privacyPolicy: resolve(__dirname, 'privacy-policy/index.html'),
        resources: resolve(__dirname, 'resources/index.html'),
        resourcesParentingAutism: resolve(__dirname, 'resources/parenting-a-child-with-autism/index.html'),
        resourcesDeportation: resolve(__dirname, 'resources/psychological-impact-of-deportation/index.html'),
        resourcesLgbtqTrauma: resolve(__dirname, 'resources/lgbtq-trauma-and-ptsd/index.html'),
        resourcesVeterans: resolve(__dirname, 'resources/veterans-mental-health/index.html'),
        resourcesLoneliness: resolve(__dirname, 'resources/loneliness-and-isolation-portland/index.html'),
        resourcesEquity: resolve(__dirname, 'resources/mental-health-equity/index.html'),
        resourcesHolistic: resolve(__dirname, 'resources/holistic-mental-health-care-trends/index.html'),
      },
    },
  },
  server: {
    open: true,
  },
}));
