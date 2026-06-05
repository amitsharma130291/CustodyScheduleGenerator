# Architecture

## Stack

- Astro
- TypeScript
- Tailwind CSS
- date-fns
- pdf-lib
- lucide-astro

## Core Principle

This is an SEO-first static tool website.

Default to static Astro pages. Only add client-side JavaScript where the schedule generator, calendar preview, theme toggle, or PDF export needs interaction.

## Folder Structure

src/
  components/
    layout/
    marketing/
    tool/
  layouts/
  lib/
    schedules/
    seo/
    pdf/
  pages/
  styles/

## Rules

- Static pages by default.
- Use Astro components for layout and content.
- Use islands only for interactive tools.
- Keep JavaScript minimal.
- No database.
- No auth.
- No backend.
- No payments.
- No APIs.
- Reuse components across future SEO tools.
- Keep schedule logic in `src/lib/schedules`.
- Keep SEO helpers in `src/lib/seo`.
- Keep PDF helpers in `src/lib/pdf`.

## Performance

- Avoid large dependencies.
- Avoid unnecessary hydration.
- Use semantic HTML.
- Optimize images.
- Keep Lighthouse Performance and SEO above 95.