import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

function removeTrailingSlash(url) {
  if (!url) return url;

  try {
    const parsed = new URL(url);

    if (parsed.pathname !== '/') {
      parsed.pathname = parsed.pathname.replace(/\/+$/, '');
    }

    return parsed.toString();
  } catch {
    if (url === '/') return '/';
    return url.replace(/\/+$/, '');
  }
}

export default defineConfig({
  site: 'https://custodybuilder.com',
  trailingSlash: 'never',
  integrations: [
    sitemap({
      filter: (page) => {
        const url = new URL(page);
        const pathname = url.pathname.replace(/\/$/, '') || '/';
        if (pathname === '/') return false;

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
        item.url = removeTrailingSlash(item.url);

        if (item.url === 'https://custodybuilder.com/custody-schedule-generator') {
          return {
            ...item,
            changefreq: 'weekly',
            priority: 1.0,
          };
        }

        if (item.url === 'https://custodybuilder.com/texas-child-support-calculator') {
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