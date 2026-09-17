# Bluepeak Authorized Retailer

A single-page marketing and ordering site for an independent authorized retailer
of Bluepeak fiber internet and Bluepeak TV. Front end only — there is no backend,
no database and no API routes.

Built with Next.js 15 (App Router), React 19, TypeScript and Tailwind CSS.
The page is fully static and prerendered at build time.

---

## Getting started

```bash
npm install
npm run dev
```

| Script | What it does |
|---|---|
| `npm run dev` | Development server on http://localhost:3000 |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run typecheck` | `tsc --noEmit` |

> If you replace an image in `public/images/` without renaming it, delete `.next`
> first. The image optimizer caches by URL, so the previous file keeps being
> served otherwise.

---

## Editing content

**`lib/content.ts` is the single source of truth.** Prices, speeds, plan names,
trust chips, FAQ entries, coverage, imagery and legal disclosures all live there,
and every component reads from it. Changing a price in that one file updates the
hero anchor, the plan cards, the comparison table and the footer legal text
together — no `.tsx` file needs to be touched.

A few things worth knowing before editing it:

- **Service lines appear only if they have plans.** `activeServiceLines` filters
  the canonical order down to lines that actually carry a `PlanItem`, which is
  why there is no Cable, Mobile or Phone section: Bluepeak does not sell those
  to residential customers. Add a plan with that `serviceLine` and the section
  and its nav link appear in the right position automatically.
- **CTA wording is a rule, not a string.** `ctaLabelFor()` gives priced plans
  "Call to order" and unpriced plans "Call for pricing". Remove a `price` and the
  relevant buttons relabel themselves.
- **Every `tel:` link carries `data-call-cta`** for call tracking, because they
  all route through the `CallButton` component.

### Before launch

1. **Replace the placeholder phone number.** `site.phoneDisplay` and
   `site.phoneHref` are set to `(888) 555-0142`, a reserved fictional number.
2. **Set `NEXT_PUBLIC_SITE_URL`** to the production domain so Open Graph URLs
   resolve (see Deployment below).
3. **Point the footer legal links** at real policy pages. They currently anchor
   to the on-page disclosure block.
4. **Re-check pricing** against mybluepeak.com. Rates and promotions change.

---

## Deployment (Vercel)

Import the repository in Vercel. The framework is detected automatically and no
`vercel.json` is required.

| Setting | Value |
|---|---|
| Framework preset | Next.js |
| Build command | `next build` (default) |
| Output directory | default |
| Install command | `npm install` (default) |

### Environment variables

| Name | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Recommended | Absolute base for Open Graph and Twitter card URLs, e.g. `https://example.com`. Falls back to Vercel's `VERCEL_URL` on preview deployments, so previews work untouched. |

---

## Project structure

```
app/                     layout, page, global styles, favicon
lib/content.ts           single source of truth for all content
components/
  primitives/            PriceLockup, CallButton, Figure, PhotoBackdrop,
                         Reveal, TiltCard, Marquee, Parallax, SiteMotion
  sections/              one file per page section, in canonical order
  visuals/               Logo, SpeedGauge, HeroBackdrop, AmbientShades
public/images/           photography (JPEG, optimised)
ai.wing                  build log: every structural decision and why
```

`ai.wing` is the running record of what changed and the reasoning behind it,
including the mistakes and how they were found. Read it before making
significant changes.

---

## Accessibility and performance notes

- The page is prerendered as static content; no JavaScript is required to read it.
- Photographs are served through `next/image` as AVIF/WebP at the requested size.
- All motion is disabled under `prefers-reduced-motion`.
- Text over photography sits on measured contrast, not eyeballed — see the hero
  notes in `ai.wing`.
- Verified at 320px with zero horizontal overflow.
