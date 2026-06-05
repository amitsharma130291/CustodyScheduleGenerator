# Design System

## Goal

Create a premium, minimal, dark-mode-first SaaS interface inspired by modern developer tools.

The design should feel:

* Calm
* Precise
* Trustworthy
* Beautiful
* Product-led
* High quality

The interface should look like a serious productivity product, not a legal website, blog, or generic calculator.

## Design Direction

Use a Linear-inspired visual style:

* Dark background
* Large typography
* Subtle borders
* Minimal shadows
* Lots of whitespace
* Elegant spacing
* Quiet animations
* Product preview sections
* Clean cards
* Strong hierarchy

Avoid copying any specific website exactly. Use the general aesthetic only.

## Core Principles

1. Typography over decoration.
2. Borders over shadows.
3. Whitespace over clutter.
4. Product UI over marketing fluff.
5. Subtle motion over flashy animation.
6. Dark mode should feel native, not inverted.
7. Light mode should feel clean and calm.
8. Every page must feel premium and trustworthy.

## Color System

### Dark Mode

```css
--background: #08090A;
--surface: #0E1012;
--surface-elevated: #121417;
--surface-hover: #171A1F;
--border: #20242B;
--border-subtle: #15181C;
--text-primary: #FFFFFF;
--text-secondary: #B4BAC5;
--text-muted: #7B818A;
--accent: #5E6AD2;
--accent-hover: #6F7AE6;
--success: #22C55E;
--warning: #FACC15;
--danger: #EF4444;
```

### Light Mode

```css
--background: #FFFFFF;
--surface: #FAFAFA;
--surface-elevated: #FFFFFF;
--surface-hover: #F5F5F5;
--border: #E5E7EB;
--border-subtle: #F1F5F9;
--text-primary: #111827;
--text-secondary: #4B5563;
--text-muted: #9CA3AF;
--accent: #5E6AD2;
--accent-hover: #4F5CCB;
```

## Typography

Use **Inter**.

### Hero Heading

* Size: 72px to 96px desktop
* Size: 44px to 56px mobile
* Weight: 600
* Line height: 0.95 to 1.05
* Letter spacing: -0.05em

### Section Heading

* Size: 48px to 64px desktop
* Size: 34px to 44px mobile
* Weight: 600
* Line height: 1.05
* Letter spacing: -0.04em

### Body Text

* Size: 18px to 22px
* Line height: 1.6
* Color: text-secondary

### Captions

* Size: 12px to 14px
* Letter spacing: 0.04em
* Optional uppercase
* Color: text-muted

## Layout

### Container

Use a centered container.

```css
max-width: 1280px;
padding-inline: 24px;
```

On large screens:

```css
padding-inline: 48px;
```

### Sections

Use large vertical spacing.

```css
padding-block: 120px;
```

For hero sections:

```css
padding-top: 140px;
padding-bottom: 120px;
```

## Navigation

Navigation should be simple and quiet.

Requirements:

* Height: 72px to 80px
* Transparent or dark background
* Subtle bottom border
* Logo left
* Links center or right
* CTA far right
* No heavy shadows
* Sticky only if it feels natural

Use small, muted links.

## Buttons

### Primary Button

* Pill shape
* Height: 44px to 52px
* Padding: 20px to 28px horizontal
* Background: white in dark mode
* Text: black in dark mode
* Weight: 600

### Secondary Button

* Pill shape
* Transparent background
* Subtle border
* Muted text
* Hover background: surface-hover

Avoid large colorful buttons.

## Cards

Cards should feel quiet and premium.

```css
border: 1px solid var(--border);
border-radius: 20px;
background: var(--surface);
box-shadow: none;
```

On hover:

```css
background: var(--surface-hover);
border-color: rgba(94, 106, 210, 0.35);
```

Use padding between 24px and 32px.

## Tool Panels

The tool interface should look like a modern SaaS dashboard.

Use:

* Large bordered panel
* Rounded corners
* Subtle inner sections
* Muted labels
* Clear inputs
* Live preview area

The tool page should generally use a two-column layout:

Left:

* Inputs
* Schedule selector
* Parent names
* Start date
* Actions

Right:

* Live calendar preview
* Export buttons
* Summary stats

On mobile, stack inputs above preview.

## Calendar UI

Calendar should feel clean and product-like.

Requirements:

* Rounded container
* Subtle grid lines
* Muted weekday labels
* Parent A and Parent B colors
* Today marker
* Simple legend
* No clutter

Use soft colors, not loud colors.

Example parent colors:

```css
--parent-a: #5E6AD2;
--parent-b: #22C55E;
```

In dark mode, use lower opacity backgrounds with brighter text.

## Homepage Structure

Use this structure:

1. Navbar
2. Hero
3. Live product preview
4. Schedule type cards
5. Feature grid
6. How it works
7. FAQ
8. Footer

The homepage should show the product quickly. Do not make users scroll too far before seeing the tool.

## Tool Page Structure

Use this structure:

1. Navbar
2. SEO heading
3. Short explanation
4. Generator panel
5. Calendar preview
6. PDF / print actions
7. Explanation section
8. FAQ
9. Related schedule links
10. Footer

## SEO Requirements

Every SEO page must include:

* One clear H1
* Keyword-focused title
* Short intro paragraph
* Tool above the fold
* FAQ section
* Related internal links
* Clean metadata
* Fast loading
* Mobile responsive layout

Avoid thin pages. Each schedule page should include enough helpful explanation to stand alone.

## Motion

Use subtle motion only.

Allowed:

* Fade in
* Small vertical movement
* Hover transitions
* Soft opacity changes

Avoid:

* Bouncy animations
* Large moving gradients
* Parallax overload
* Spinning elements

Timing:

```css
transition-duration: 150ms to 250ms;
transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
```

## Shadows

Use almost no shadows.

Prefer:

* Borders
* Background layering
* Low-opacity glows

If using glow:

```css
box-shadow: 0 0 120px rgba(94, 106, 210, 0.08);
```

## Footer

Footer should be quiet and structured.

Use columns:

* Product
* Tools
* Resources
* Company
* Legal

Keep text muted.

## Components To Build

Create reusable components:

* Navbar
* Footer
* Hero
* SectionHeader
* FeatureCard
* ToolCard
* ScheduleSelector
* GeneratorPanel
* CalendarPreview
* FAQAccordion
* CTASection
* RelatedLinks
* SEOContentSection

## Implementation Stack

Use:

- Astro
- TypeScript
- Tailwind CSS
- Lucide Astro
- Astro View Transitions
- Astro Content Collections
## Design Do Not List

Do not use:

* Bootstrap-looking UI
* Bright gradients
* Heavy drop shadows
* Cluttered legal website design
* Stock photos
* Cartoon illustrations
* Generic calculator layout
* Oversized colorful icons
* Too many colors
* Dense text blocks above the tool

## Cursor Instruction

When generating any UI, always follow this design system.

The final result should feel like a premium modern SaaS product with a calm, Linear-inspired dark interface and a clean light mode.

Prioritize:

1. Visual polish
2. Clear hierarchy
3. Fast SEO-friendly pages
4. Reusable components
5. Mobile-first layout
6. Accessibility
7. Performance
