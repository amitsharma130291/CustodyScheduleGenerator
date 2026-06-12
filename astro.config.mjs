import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://custodybuilder.com',
  trailingSlash: 'always',
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
        const url = new URL(item.url);
        url.pathname = url.pathname === '/' ? '/' : `${url.pathname.replace(/\/+$/, '')}/`;
        item.url = url.toString();

        if (item.url === 'https://custodybuilder.com/custody-schedule-generator/') {
          return {
            ...item,
            changefreq: 'weekly',
            priority: 1.0,
          };
        }

        if (item.url === 'https://custodybuilder.com/texas-child-support-calculator/') {
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