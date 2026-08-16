import { defineConfig } from 'vite';

export default defineConfig({
  base: '/',
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        about: 'about.html',
        services: 'services.html',
        appointments: 'appointments.html',
        contact: 'contact.html',
        blog: 'blog.html',
      },
    },
  },
});
