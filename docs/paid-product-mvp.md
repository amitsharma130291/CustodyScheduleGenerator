# Paid Product — MVP Specification (v1, FROZEN)

Day 1 of the 14-day build plan. This is the frozen scope for launch. Do not
add features to Days 2–14 without coming back and editing this file first.

## Customer journey

```
Google search
  -> schedule/tool page (existing free SEO page)
  -> free 1-month calendar preview
  -> "See your full year" offer
  -> $14.99 checkout (no account)
  -> automated email + PDF download
  -> optional $7 Two-Home upsell
  -> done, never needs to contact us
```

## Free tier

- Choose schedule pattern
- Choose start date
- Choose Parent A / Parent B labels
- 1-month calendar preview
- Basic overnight/percentage breakdown
- Monthly PDF export (one month at a time)

**Decision history on the full-year PDF:** the free generator originally
shipped an unrestricted "Download yearly PDF" button (bare 12-page export,
no cover/summary/child view) — a real conflict with this spec's free-tier
scope, flagged on Day 3. Initial call was "leave it, differentiate on
quality." Reversed after Day 5: the free "Download yearly PDF" button was
removed and replaced with a "Build your full 12-month calendar" link to
`/my-custody-calendar/`, carrying the customer's schedule/dates/parent
labels via query params so the handoff doesn't lose their work. Free tier
is now monthly-PDF-only, matching the spec above. Site copy that referenced
a free yearly PDF (`custody-calendar-template`, `ourfamilywizard-alternative`,
`custody-x-change-alternative`) was updated to match.

## Paid product 1 — "My Custody Calendar" — $14.99 one-time

**Inputs**
- Schedule pattern (see Supported schedules below)
- Start date
- Parent A/B labels (custom text, e.g. Mom/Dad, Home A/Home B)
- Child first name or nickname — optional, never required
- Up to 10 important dates (birthday, school start/end, vacation, custom)
- Holiday home assignment — user picks, product never implies a legal answer

**Output — one PDF**
- Cover page
- Year-at-a-glance
- 12 monthly calendar pages (print-optimized, US Letter)
- Important dates page
- Schedule summary (overnights/percentage per parent)
- Child-friendly calendar version

Fridge-format and phone-optimized outputs are explicitly **not** in v1 — see
Phase 2 in the 14-day plan. Don't build them until the core PDF sells.

## Paid product 2 — "Two-Home Transition Pack" — $7 upsell

Offered once, immediately after the $14.99 purchase completes.

**Inputs (8–12 questions, <3 minutes)**
- Child age range
- School days
- School uniform? (y/n)
- School device (e.g. Chromebook, none)
- Activities/sports (free text, capped)
- Frequently transported electronics
- Glasses? (y/n)
- Comfort/favorite item? (y/n)
- Clothing already stocked at both homes? (some/none/most)

**Output — one PDF**
- Keep at both homes
- Travel between homes
- Activity bag(s)
- Duplicate vs. move-it guidance (buy two / keep one and move it / activity-specific)
- Transition checklist (per switch day)
- Kid-friendly checklist

## Supported schedules at launch

Reuse the site's existing free-tool logic where it's already reliable:

- 2-2-3
- 2-2-5-5
- 3-4-4-3 *(repo's existing naming — the outside spec calls this "3-3-4-4";
  keep the site's existing route/name, don't rename)*
- Week-on/week-off
- Every-other-weekend

Percentage patterns (50/50, 60/40, 70/30, 80/20, 90/10) carry into the paid
product only if Day 2's engine work confirms the existing calculators are
solid. Otherwise they stay free-only until Phase 2.

## Delivery model — no accounts

```
Pay -> generate -> immediate download -> confirmation email w/ secure link
```

Lost download recovery: "Resend my purchase" page — enter email, get link.
No password, no login.

## Explicit exclusions (v1)

Messaging, co-parent chat, accounts (unless technically unavoidable),
subscriptions, legal recommendations/document generation, child-support
recommendations, payments between parents, expense splitting/tracking,
court evidence or incident records, file storage, real-time collaboration,
GPS, push notifications, SMS, live calendar sync (`.ics` export is fine
later — export, not sync), native mobile apps, AI chatbot.

## Infra decision (resolved Day 7)

- Site is static Astro on **Cloudflare Pages**, already using **Pages
  Functions** for backend work (`functions/api/contact.ts` sends email via
  raw SMTP over `cloudflare:sockets` — no external email service). Reuse
  that pattern for delivery emails instead of adding a transactional-email
  vendor.
- [docs/architecture.md](architecture.md) currently states "No database. No
  auth. No backend. No payments. No APIs." Those rules describe the free
  SEO layer and still apply to it. Architecture.md should get an addendum
  reflecting the paid layer — not done yet.
- **Payment processor: Dodo Payments**, using the same no-database,
  self-verifying-license-key architecture as qrworkbench/barcodeflow (see
  memory), ported from Astro API routes to Cloudflare Pages Functions to
  match this site's existing pattern:
  - `functions/api/checkout/create.ts` — starts a Dodo hosted checkout
    session for the $14.99 product (`checkoutSessions.create`).
  - `functions/api/checkout/verify.ts` — confirms a session's payment
    actually succeeded (`checkoutSessions.retrieve`), returns a license key
    `CB-CAL-<dodo_payment_id>` — idempotent, callable any number of times.
  - No database, no Cloudflare KV: the browser is the source of truth. The
    calendar config (schedule/dates/names/important dates) rides through
    the Dodo redirect in `sessionStorage`; proof of purchase persists across
    visits as an entitlement in `localStorage`. Dodo checkout-session
    metadata carries a lightweight copy of the core fields server-side too,
    as a fallback for the Day 8 "resend my purchase" flow.
  - Env vars (Cloudflare Pages dashboard, never in source):
    `DODO_PAYMENTS_API_KEY`, `DODO_ENVIRONMENT` (`test_mode`/`live_mode`),
    `DODO_PRODUCT_ID_CALENDAR`. Webhook key (`DODO_PAYMENTS_WEBHOOK_KEY`)
    deferred to Day 8, when the webhook backstop + email delivery get built.
  - User has a Dodo account but has not created the $14.99 product yet —
    code is written and its error paths verified locally (via
    `wrangler pages dev` against fake credentials, confirming the SDK works
    on Workers and 401s cleanly), but no real checkout has been completed
    end-to-end. That's the remaining step before Day 7 can be called
    fully proven.

## Success metric

First 10 paying strangers (not friends/family), full funnel instrumented
per the spreadsheet in the 14-day plan (visitors, offer views, buy clicks,
checkout starts, sales, upsells, revenue, refunds).
