# Vortaris Landing — Deployment Info

## Live URL
https://vortaris-landing.pages.dev

## How it's deployed
- **Host:** Cloudflare Pages (free plan)
- **GitHub repo:** https://github.com/arielfbgomes-droid/vortaris-landing
- **Branch:** main
- **Auto-deploy:** Yes — every push to `main` deploys automatically

## How to push future changes
1. Edit files in the `Landing Page - V (2)` folder
2. Open Terminal and run:
   ```
   cd '/Users/arielgomes/Downloads/Landing Page - V (2)'
   git add .
   git commit -m "describe your change here"
   git push
   ```
3. Cloudflare deploys automatically in ~30 seconds

## Accounts needed
- **GitHub:** github.com/arielfbgomes-droid
- **Cloudflare:** dash.cloudflare.com (log in with your email)

## Next steps
- [ ] Set `Landing Page.html` as homepage (rename to `index.html`)
- [ ] Add IP-based language redirect (Cloudflare Worker)
- [ ] Connect custom domain (e.g. vortaris.co)
