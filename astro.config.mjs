import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://custodybuilder.com',
  integrations: [
    sitemap({
      filter: (page) => {
        const url = new URL(page);
        const pathname = url.pathname.replace(/\/$/, '') || '/';
        const excludedPaths = new Set([
          '/404',
          '/500',
          '/privacy',
          '/disclaimer',
          '/terms',
        ]);

        return !excludedPaths.has(pathname) && !pathname.startsWith('/schedules/');
      },
      serialize: (item) => {
        const normalizedUrl = item.url.replace(/\/$/, '');

        if (normalizedUrl === 'https://custodybuilder.com/custody-schedule-generator') {
          return {
            ...item,
            changefreq: 'weekly',
            priority: 1.0,
          };
        }

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