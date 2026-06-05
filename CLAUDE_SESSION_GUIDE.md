# Vortaris Project — Claude Session Guide

## Project Overview
This is the **Vortaris Intelligence** portfolio management platform. Two parallel projects:
- **Landing Page**: Static HTML/CSS marketing site (Cloudflare Pages)
- **Web App**: React portfolio dashboard (GitHub Pages + Supabase)

---

## File Locations

### Landing Page Files (Marketing Site)
**Path:** `/Users/arielgomes/Downloads/Landing Page - V (2)/`

**Key Files:**
- `Landing Page.html` — Desktop EN landing page (homepage)
- `Landing Page BR.html` — Desktop Brazilian Portuguese landing page
- `Vortaris Mobile.html` — Mobile PT landing page
- `Vortaris Mobile EN.html` — Mobile EN landing page
- `vortaris-mobile.css` — Shared stylesheet for ALL mobile pages (bump `?v=N` cache version when edited)
- `_worker.js` — Cloudflare Worker for IP-based language routing (BR → mobile PT page, EN → mobile EN page)

**Deployment:**
- Live URL: `https://vortaris.co` (root domain)
- Hosted on: Cloudflare Pages
- Auto-deploys on git push to: `https://github.com/arielfbgomes-droid/vortaris-landing`
- Deploy command: `cd '/Users/arielgomes/Downloads/Landing Page - V (2)' && git add . && git commit -m "message" && git push`

**Custom Domain Setup:**
- Root domain `vortaris.co` → Cloudflare Pages (Proxied, orange cloud)
- Subdomain `app.vortaris.co` → GitHub Pages `arielgomesdesign.github.io` (DNS only, gray cloud)

### Web App Files (Dashboard)
**Path:** `/Users/arielgomes/carteira-br/`

**Key Files:**
- `src/App.js` (~6000+ lines) — Main app component
  - TESOURO_BONDS catalog (lines ~196-215): 22 bond definitions
  - isTesouroDireto() function: checks for "TD-" or "TESOURO_" prefixes
  - getTesouroBondInfo() function: resolves bond metadata
  - fetchTesouroPriceHistory() function: generates synthetic daily series from BCB SELIC rates
  - fetchRealPriceHistory() function: PRIMARY→Edge Function, fallback to CORS proxies
  - Quant Engine section (lines ~4682+): portfolio optimizer with AI integration
- `src/Auth.js` — Authentication logic with OAuth redirect URLs pointing to `https://app.vortaris.co/`
- `public/CNAME` — Custom domain file (currently `app.vortaris.co`)

**Supabase Edge Functions:**
- `supabase/functions/fetch-prices/index.ts` — Fetches Yahoo Finance prices with dividend-adjusted close (adjclose)
- `supabase/functions/analyze-optimization/index.ts` — Claude AI analysis of portfolio rebalancing (tone varies by language)
- `supabase/functions/fetch-bcb-rates/index.ts` — Banco Central do Brasil (BCB) SELIC/IPCA/CDI rates for Tesouro Direto pricing
- `supabase/functions/analyze-correlation/index.ts` — AI correlation analysis

**Deployment:**
- Live URL: `https://app.vortaris.co` (via GitHub Pages)
- Hosted on: GitHub Pages
- Deploy command: `cd /Users/arielgomes/carteira-br && npm run deploy`

---

## Recent Changes (Last Session)

### 1. Tesouro Direto Bond Support ✅
- Added 22-bond catalog with LFT, NTN-B, NTN-F, NTN-B1 types
- BCB SELIC rate integration for deterministic bond pricing
- Synthetic daily price series generation from accumulated factors

### 2. JEPI Dividend Return Fix ✅
- Root cause: Supabase Edge Function was using unadjusted close prices
- Fix: Changed to `adjclose` (dividend-adjusted close) in fetch-prices function
- Cache invalidated via v4 version bump to force fresh data

### 3. Currency & Allocation Fixes ✅
- Fixed liveExposure calculation: apply toBaseCurrency() to both BRL/USD before comparing
- Fixed currentWeights in Quant Engine: use live portfolio values (qty × getLivePrice × FX) instead of stored weights
- Fixed assetAlloc/sectorAlloc: apply getLivePrice() + toBaseCurrency() consistently

### 4. Quant Engine UI Refinements ✅
- Removed colored left borders → switched to neutral theme.border
- Removed colored section icons → switched to theme.textMuted gray
- Removed ticker chip styling → bold text only in theme.textSecondary (lighter gray)
- Replaced music icon with checklist icon for compliance section
- Changed section 3 title: "Como implementar" → "Contexto de Alocação" (compliance)
- Added URL param support: `?signup=true` and `?signin=true` open auth modals automatically

### 5. Landing Page Mobile Header ✅
- Removed language toggle (PT/EN buttons) from mobile header
- Added "Entrar" / "Sign in" as styled button (btn btn-primary class)
- Links to `https://app.vortaris.co/?signin=true`
- Increased logo size on mobile: 37px → 40px, font-size 19px → 21px

### 6. AI Analysis Tone (Portuguese) ✅
- Changed system prompt to use analytical/research tone (not instructional)
- Avoided imperative verbs: use "a análise aponta para", "observa-se que" instead of "implemente", "compre"
- Labeled sections as "Análise do Perfil" instead of "Por que estas mudanças"

---

## Key Technical Concepts

### Bond Pricing
- **LFT** (Letras Financeiras do Tesouro): Tied to SELIC accumulated factor; price = SELIC factor × unit price (~R$14,507)
- **NTN-B / NTN-B1** (Notas do Tesouro Nacional): Inflation-indexed (IPCA); price = principal × (1 + IPCA) ^ years
- **NTN-F** (Notas do Tesouro Nacional Série F): Fixed-rate; price = PV of coupon + principal discounted at SELIC

### Price Fetching (Live)
1. **Primary**: Supabase Edge Function (server-side, no CORS)
2. **Fallback**: CORS proxies (if Edge Function fails)
3. **Cache**: localStorage with version key (v4 currently)
4. Dividend-adjusted close (adjclose) used for accurate equity returns

### Quant Engine
- **Input**: Current portfolio, risk profile (Fortess, Strategic Income, Growth, Global Investor, Home Bias)
- **Output**: Claude AI-powered rebalancing suggestions with tone tailored by language
- **UI**: 3 sections with icons — Profile Analysis, Expected Impact, Allocation Context
- **Auto-trigger**: Runs when profile changes; uses cached Claude responses

### Currency Handling
- All portfolio calculations: `quantity × getLivePrice() × toBaseCurrency(BRL→USD)`
- FX conversions applied consistently in liveExposure, currentWeights, assetAlloc

---

## Critical Settings & Constants

### Price Cache Version
**File:** `/Users/arielgomes/carteira-br/src/App.js` line ~160
```javascript
const PRICE_CACHE_VERSION = 'v4';
```
**When to bump:** After any change to price-fetching logic (e.g., fixing adjclose, adding new data source)

### Supabase Project
- **Project ID:** `rfiwtiytqhwywzqveqob`
- **URL:** `https://rfiwtiytqhwywzqveqob.supabase.co`
- **Dashboard:** `https://supabase.com/dashboard/project/rfiwtiytqhwywzqveqob`

### Authentication
- **OAuth Redirect URL:** `https://app.vortaris.co/?signin=true` or `?signup=true`
- **Supabase URL Config:** Must include `https://app.vortaris.co/**` in allowed redirect URLs

### Claude API
- **Model:** Claude Haiku (faster, cheaper for rebalancing analysis)
- **Caching:** Enabled for system prompt; updates on tone/language change
- **Auto-trigger:** Runs when risk profile changes (no manual click needed)

---

## How to Deploy

### Landing Page
```bash
cd '/Users/arielgomes/Downloads/Landing Page - V (2)'
git add .
git commit -m "describe changes"
git push
# Auto-deploys to https://vortaris.co in ~30 seconds
```

### Web App (Carteira BR)
```bash
cd /Users/arielgomes/carteira-br
npm run deploy
# Deploys to https://app.vortaris.co via GitHub Pages
```

### Supabase Edge Functions
```bash
cd /Users/arielgomes/carteira-br
npx supabase functions deploy [function-name] --project-ref rfiwtiytqhwywzqveqob
```

---

## Testing Before Deploy

### Localhost Preview
```bash
# Landing page
open 'http://localhost:8082/Vortaris%20Mobile.html'

# Web app
npm start  # runs on localhost:3000
```

### Verification Checklist
- ✅ All changes tested on localhost (desktop + mobile)
- ✅ No broken links or console errors
- ✅ Price cache version bumped (if applicable)
- ✅ OAuth redirect URLs match current domain
- ✅ Edge Function deployment successful
- ✅ No data integrity issues

---

## Known Limitations & Notes

1. **Bond Unit Price:** Using approximate ~R$14,507 for Selic bonds; exact unit price would need user input
2. **Tesouro Pricing:** Synthetic daily series from BCB rates; not real-time market prices
3. **Mobile Language Toggle:** Removed from header; language determined by IP (Worker) or URL param
4. **AI Analysis:** Claude Haiku only (not GPT-4); trades speed for comprehensive analysis
5. **Dividend Yields:** Holdings section uses dividend yield from Yahoo Finance adjclose calculation

---

## Quick Links

- **Landing Page Git:** https://github.com/arielfbgomes-droid/vortaris-landing
- **App Git:** https://github.com/arielfbgomes-droid/carteira-br
- **Supabase Dashboard:** https://supabase.com/dashboard
- **Cloudflare Dashboard:** https://dash.cloudflare.com
- **Live Landing:** https://vortaris.co
- **Live App:** https://app.vortaris.co

---

## Session Entry Points

**If working on landing page:** Start in `/Users/arielgomes/Downloads/Landing Page - V (2)`
**If working on app:** Start in `/Users/arielgomes/carteira-br`
**If working on Edge Functions:** Edit in `supabase/functions/` then deploy via `supabase functions deploy`
