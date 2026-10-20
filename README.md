# Biprayan Choudhuri - Portfolio

A single-page, scroll-driven portfolio at [biprayan.is-a.dev](https://biprayan.is-a.dev).
Static HTML + one small TypeScript file + plain CSS, bundled with Vite. No
frameworks, no animation libraries, no runtime dependencies.

## Run

```bash
npm install
npm run dev      # dev server on http://localhost:3000
npm run build    # type-check + production build into ./docs
npm run preview  # serve the production build
```

Pushing to `main` deploys to GitHub Pages (`.github/workflows/deploy.yml`).

## How it works

The page has two layouts, chosen before first paint by a tiny inline script in
`index.html`:

- **Stage mode** (screens at least 900x560, motion allowed): one sticky
  full-screen stage. Every section is a layer whose opacity and transforms are a
  pure function of scroll position, computed in `src/main.ts`. The timeline
  numbers (`STARTS`, `TARGETS`, `STOPS`) mark where each section begins and
  where nav clicks and arrow keys land.
- **Flow mode** (phones, small windows, `prefers-reduced-motion`, no JS): the
  same sections stacked as a normal document. This is also what search engines
  render, so all content stays visible and indexable.

## Structure

```
index.html          All content, SEO meta, structured data.
src/main.ts         Scroll engine, nav, arrow keys, IST clock.
src/style.css       Styles for both layouts (inlined into the HTML at build).
public/fonts/       Self-hosted Archivo (variable) + IBM Plex Mono.
public/images/      Project images (WebP).
public/             Favicons, OG image, robots.txt, sitemap.xml, 404, CNAME.
```

## Editing content

Everything is plain HTML in `index.html`; each section is commented
(`<!-- 03 Award -->`, `<!-- 04 Work -->`, ...).

- **Project images** go in `public/images/` (WebP, ~1200px wide). Point the
  project's `<img src>` at the new file.
- **Adding or removing a project** changes the timeline length: update the
  timings in `src/main.ts` and the stage height in `src/style.css`
  (`.stage-mode .scroller { height }` = `(END + 1) * 100vh`).
- After changing content, bump `<lastmod>` in `public/sitemap.xml`.
