# Ana the Marketeer site

Static site (HTML/CSS/JS) hosted on GitHub Pages. No build step.

## Files
- `index.html` — homepage (order: hero, compact newsletter opt-in, ticker, YouTube, ways to work, course, funnel philosophy, about, proof, content, final CTA)
- `contact.html` — contact page
- `styles.css` — all styling (brand palette and fonts are defined at the top)
- `script.js` — newsletter pop-up (shows once after 30s or 55% scroll, then stays away for 14 days)
- `logo.png`, `ana-hero.jpg`, `course-header.jpg` — images used on the site

## Still to do
- `contact.html`: replace `REPLACE-ME-FORM-ID` with a Formspree form ID, or switch the contact page to the booking form only.
- The About section reuses `ana-hero.jpg`. To use a second photo, add it (e.g. `ana-about.jpg`) and change the `src` in the About section of `index.html`.
- Add real client testimonials in the commented spot in the proof section of `index.html`.
- Keep the stats (13K+ subscribers, etc.) accurate as they change.

## Already connected
- Course: Thinkific Branding Foundations link
- Booking: Google Form
- Newsletter: Kit form `8576546` (both the on-page form and the pop-up)
- YouTube and Instagram links

## Custom domain (anathemarketeer.com)
Do not add a `CNAME` file until DNS is set up, or the `github.io` address stops working.

1. At IONOS (Domains → your domain → DNS), add:
   - Four `A` records for `@` pointing to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - One `CNAME` record for `www` pointing to `imandriana.github.io`
   - Delete any default `A` or `AAAA` records for `@` that IONOS added (they point to parking pages).
2. In GitHub: Settings → Pages → Custom domain → enter `anathemarketeer.com` and save.
3. Tick "Enforce HTTPS" once it becomes available (can take up to 24 hours).

Check GitHub's current Pages docs if any of those IPs have changed.
