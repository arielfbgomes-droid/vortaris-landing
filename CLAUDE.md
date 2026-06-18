# Project guidance for Claude — Vortaris marketing site

## How to work on this project
- No changes without showing exactly what will change and why
- No claims of certainty unless verified
- Say "I don't know" instead of guessing

This is a **static HTML/CSS marketing site** maintained by a non-developer. Keep it
fast and simple. Follow these rules unless explicitly told otherwise.

## Architecture
- Plain static HTML + CSS. **No build step, no app framework.** Do not introduce
  React/Vue/bundlers/Tailwind/etc. for the marketing pages.
- **Mobile pages share `vortaris-mobile.css`.** Desktop pages keep CSS inline.
- Colors/spacing/fonts are **design tokens** (CSS variables) at the top of the
  stylesheets. Change tokens, not hardcoded values. The dark theme is the
  `[data-theme="dark"]` block in `vortaris-mobile.css`.

## Performance rules (the point of this site is fast load)
- Keep JavaScript minimal. Don't add libraries unless truly required.
- Any new image must be compressed and served as **WebP**. Never drop in a raw
  multi-MB PNG/JPG.
- Don't duplicate CSS across pages — edit the shared stylesheet so changes
  propagate and stay consistent.
- When editing `vortaris-mobile.css`, bump the `?v=N` cache version on the
  `<link>` in each mobile page so changes show up.

## Consistency
- Match the existing visual vocabulary: monospace eyebrows, sober/monochrome
  accents, layered card surfaces, the existing button styles.
- Keep all language versions (EN / PT-BR) in sync in structure; copy can differ.
- Preserve the language toggles and cross-page links between files. Current pairing:
  `index.html` ⇄ `landing-br.html` (desktop), `Vortaris Mobile EN.html`
  ⇄ `Vortaris Mobile.html` (mobile). If you rename/delete a page, fix every toggle,
  iframe, and preview that points to it.

## Build invariants (don't regress these)
- Theme colours `--on-ink`, `--invert-bg`, `--invert-fg` must stay defined in CSS
  `:root` (desktop pages) — not only in JS — or dark-on-dark button labels go
  invisible when the file is opened directly.
- Dark theme: mobile lives in the `[data-theme="dark"]` block of
  `vortaris-mobile.css` (covers both mobile pages); desktop lives in a
  `[data-theme="dark"]` block inside `index.html`. Dark mode is **pure CSS**
  driven by the `data-theme` attribute — never rely on cross-frame JS to paint a
  theme (it breaks under `file://`). The preview files load the real page with
  `?theme=dark`; an early inline script reads that flag and sets `data-theme`.
- Eyebrows / trust icons / step numbers use `--ink-2` (sober). The blue `--accent`
  is reserved for the functional chart line only — don't reintroduce blue text/icons.

## Don't
- Don't split into a separate "app" codebase until a real logged-in product exists.
- Don't add filler sections or content without asking first.

## Hosting & deployment
- **This repo** (`arielfbgomes-droid/vortaris-landing`) is the source of truth for all landing pages.
- Deployed via **Cloudflare Pages** (project: `vortaris-landing`) → live at **vortaris.co**
- Auto-deploys on every push to `main`. No build step needed — files are served as-is.
- **Do NOT edit** files in `arielfbgomes-droid/carteira-br/public/` for landing page work — that repo serves `app.vortaris.co` (the React app), not the marketing site.

## Active landing page files (most up-to-date)
| File | URL | Notes |
|---|---|---|
| `index.html` | vortaris.co/ | English desktop — served to non-BR visitors at root |
| `en.html` | vortaris.co/en | English desktop — **EN toggle target for BR visitors**. Copy of `index.html`. |
| `landing-br.html` | vortaris.co/landing-br | Portuguese desktop — **primary PT page** |
| `Vortaris Mobile EN.html` | vortaris.co/Vortaris%20Mobile%20EN | English mobile |
| `Vortaris Mobile.html` | vortaris.co/Vortaris%20Mobile | Portuguese mobile |
| `_worker.js` | — | Routes users by country + device. Mobile hitting desktop URLs also redirected. |
| `vortaris-mobile.css` | — | Shared stylesheet for both mobile pages |

## ⚠️ index.html and en.html must always be kept in sync
`en.html` exists because Cloudflare Pages' Pretty URLs feature redirects `/index.html` → `/` which loops BR visitors back to PT. Until that Cloudflare setting is disabled, `en.html` is the EN toggle target for BR visitors. **Any structural or content change to the English desktop page must be made in BOTH `index.html` and `en.html`.**

## ⚠️ Do NOT touch these files
- `_archive/` — old unused files kept for reference only. Never edit or serve these.
- Any file in `carteira-br/public/` — wrong repo for landing page work

## Language toggle pairing (correct as of June 2026)
- `index.html` PT button → `landing-br.html`
- `en.html` PT button → `landing-br.html`
- `landing-br.html` EN button → `en.html` (NOT `index.html` — see note above)
- Mobile pages toggle between `Vortaris Mobile EN.html` ⇄ `Vortaris Mobile.html`

## Button URLs
- English page: Sign In → `https://app.vortaris.co/?signin=true&lang=en` | Start Free → `https://app.vortaris.co/?signup=true&lang=en`
- Portuguese page: Entrar → `https://app.vortaris.co/?signin=true` | Comece grátis → `https://app.vortaris.co/?signup=true`
