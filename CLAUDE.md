# Project guidance for Claude — Vortaris marketing site

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
  `Landing Page.html` ⇄ `Landing Page BR.html` (desktop), `Vortaris Mobile EN.html`
  ⇄ `Vortaris Mobile.html` (mobile). If you rename/delete a page, fix every toggle,
  iframe, and preview that points to it.

## Build invariants (don't regress these)
- Theme colours `--on-ink`, `--invert-bg`, `--invert-fg` must stay defined in CSS
  `:root` (desktop pages) — not only in JS — or dark-on-dark button labels go
  invisible when the file is opened directly.
- Dark theme: mobile lives in the `[data-theme="dark"]` block of
  `vortaris-mobile.css` (covers both mobile pages); desktop lives in a
  `[data-theme="dark"]` block inside `Landing Page.html`. Dark mode is **pure CSS**
  driven by the `data-theme` attribute — never rely on cross-frame JS to paint a
  theme (it breaks under `file://`). The preview files load the real page with
  `?theme=dark`; an early inline script reads that flag and sets `data-theme`.
- Eyebrows / trust icons / step numbers use `--ink-2` (sober). The blue `--accent`
  is reserved for the functional chart line only — don't reintroduce blue text/icons.

## Don't
- Don't split into a separate "app" codebase until a real logged-in product exists.
- Don't add filler sections or content without asking first.
