# Vortaris — Marketing Site

Static landing pages for Vortaris. Built as plain HTML/CSS — no app framework, no
build step. That's deliberate: it keeps the site **fast to load** and **simple to
maintain** by a non-developer working with Claude's help.

---

## What's in here

### Pages (each is a complete page you can open in a browser)

| File | What it is |
|------|------------|
| `Landing Page.html` | Desktop landing — **English** |
| `Landing Page BR.html` | Desktop landing — Portuguese (Brazil) |
| `Vortaris Mobile EN.html` | Mobile landing — English |
| `Vortaris Mobile.html` | Mobile landing — Portuguese |
| `Landing Page PT - Mobile.html` | Mobile landing — Portuguese (alt) |

### Shared + supporting files

| File | What it is |
|------|------------|
| `vortaris-mobile.css` | **Shared stylesheet** for ALL mobile pages. Contains the colors, fonts, spacing, and the dark theme. Edit colors here once and every mobile page updates. |
| `Dark Mode Preview.html` | Preview of the desktop landing in dark mode |
| `Vortaris Mobile Dark Preview.html` | Preview of the mobile landing in dark mode |

> Note: the **desktop** pages keep their CSS inside each file (self-contained).
> The **mobile** pages share `vortaris-mobile.css`. If you move a mobile page,
> bring `vortaris-mobile.css` with it or it will look unstyled.

---

## Keeping it fast & sustainable

These are the rules that keep load times low and the site easy to maintain over
time. In priority order:

### 1. Host it on a static / CDN host
This is the **biggest speed win** and it's free. Static HTML served from a CDN
loads almost instantly for visitors anywhere. Good options:
- **Cloudflare Pages**, **Netlify**, or **Vercel**

Ask Claude Code to "help me deploy this folder to Cloudflare Pages" and follow the
steps. No server to run = nothing to maintain.

### 2. Always optimize images before adding them
The site is fast today because the product mockups are **drawn in code** (no photos).
The moment you add real images/screenshots, they become the #1 thing that can slow
the page down.
- Compress every image, and use **WebP** format.
- Prompt: *"optimize this image and convert it to WebP for web."*

### 3. Keep ONE shared stylesheet (don't copy-paste styles)
All mobile pages share `vortaris-mobile.css`, and the colors are defined once as
**design tokens** (CSS variables like `--accent`, `--ink`, `--bg`) at the top.
- Change a color there → it updates on every page **and** in dark mode.
- Don't let individual pages drift into their own hardcoded colors.

### 4. Keep JavaScript minimal
The pages use only tiny scripts (scroll effects, language toggle). **Resist adding
frameworks** (React, etc.) unless the product genuinely needs them. Less JS = faster.

### 5. Don't split into "marketing vs app" yet
A separate fast-loading landing page + heavier app is a real pattern — but it only
pays off once you actually have a logged-in product. You don't yet. Ship the static
marketing site now; build the app as its own separate thing later.

---

## Dark mode

The site ships with a full **dark theme**.

- **Mobile dark theme** lives in `vortaris-mobile.css` under the
  `[data-theme="dark"]` block. Because every mobile page shares that stylesheet,
  dark mode works for **both** the English (`Vortaris Mobile EN.html`) and
  Portuguese (`Vortaris Mobile.html`) mobile pages automatically.
- **Desktop dark theme** is driven from each desktop page (the `[data-theme="dark"]`
  rules + colour palette inside `Landing Page.html`).
- It's turned on by setting `data-theme="dark"` on the page's root element.

**Preview files** (open these to see dark mode without changing the live pages):

| File | Shows |
|------|-------|
| `Dark Mode Preview.html` | Desktop landing in dark |
| `Vortaris Mobile Dark Preview.html` | Mobile landing (Portuguese) in dark |

These previews load the real page with `?theme=dark` in the URL. An early inline
script on each page reads that flag and sets `data-theme="dark"`, and the dark
palette is **pure CSS** — so the preview renders correctly even when opened
directly from disk (`file://`), with no dependency on cross-frame JavaScript.

To let visitors switch themes themselves later, ask Claude to *"add a dark/light
toggle that sets `data-theme` and remembers the choice,"* and/or *"make it follow
the phone's system dark-mode setting."*

---

## Build notes (verified)

Last reviewed and confirmed consistent:
- Every language toggle and preview frame points to a file that exists.
- Both mobile pages load `vortaris-mobile.css?v=7` (bump the `?v=` number whenever
  you edit the shared stylesheet so changes show up).
- Theme colours (`--on-ink`, `--invert-bg`, `--invert-fg`) are defined in CSS on the
  desktop pages, so button labels render correctly even before any JavaScript runs.
- Eyebrows, trust icons, and step numbers use the neutral `--ink-2` (sober, not
  blue); the blue accent is reserved for the functional chart line.

---

## When in doubt

Tell Claude what you want in plain language. The guardrails above also live in
`CLAUDE.md`, so Claude will follow them automatically when helping you with this
project.
