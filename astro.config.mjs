import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://custodybuilder.com',
  integrations: [
    sitemap({
      filter: (page) => !page.endsWith('/404') && !page.endsWith('/500'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});