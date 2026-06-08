import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://custodybuilder.com',
  integrations: [
    sitemap({
      filter: (page) => !page.endsWith('/404') && !page.endsWith('/500'),
      serialize: (item) => {
        const normalizedUrl = item.url.replace(/\/$/, '');

        if (normalizedUrl === 'https://custodybuilder.com/texas-child-support-calculator') {
          return {
            ...item,
            changefreq: 'weekly',
            priority: 0.8,
          };
        }

        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});