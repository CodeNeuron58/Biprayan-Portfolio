# Biprayan Choudhuri - Portfolio

A static, recruiter-facing portfolio. Vite + TypeScript + SCSS. No
animation libraries, no terminal aesthetic, no build step beyond bundling.

## Run

```bash
npm install
npm run dev      # dev server on http://127.0.0.1:3000
npm run build    # production build into ./docs (GitHub Pages output)
```

## Structure

```
.
+- index.html                Single HTML entrypoint.
+- src/
|  +- components/            HTML partials, fetched at runtime.
|  +- data/                  JSON data (profile, projects, skills).
|  +- scripts/               TypeScript entrypoints.
|  +- styles/main.scss       Design system + section styles.
+- public/                   Static assets (favicons, resume, CNAME).
+- docs/                     Build output (GitHub Pages).
+- .github/workflows/        CI/CD.
```

## Editing content

- **Profile, contact links, stats** -> `src/data/profile.json`
- **Projects** -> `src/data/projects.json`
- **Skills** -> `src/data/skills.json`
- **Resume** -> replace `public/Biprayan_Choudhuri_Resume_v4.pdf`

Copy in `src/components/*.html` reads as a draft. Treat them as Markdown:
write paragraphs, mark `<em>` for emphasis, keep the lede short.
