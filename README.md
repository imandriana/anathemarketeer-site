# Ana the Marketeer site

Static site (HTML/CSS/JS) hosted on GitHub Pages. No build step.

## Files
- `index.html` — homepage (order: hero, yellow scroll, brands, How can I help you, About + receipts + testimonials, How we'll work together, course, most popular videos, final CTA). The free checklist lives in the top banner and the pop-up (Kit form 8576546).
- `audit.html` — free brand audit page (short branded form, sends to Formspree `xaenzzyp`; edit the fields in this file and in the Formspree dashboard)
- `form.js` — sends the audit and contact forms without leaving the page
- `contact.html` — contact page
- `styles.css` — all styling (brand palette and fonts are defined at the top)
- `script.js` — newsletter pop-up (desktop only; shows once after 30s or 55% scroll, then stays away for 14 days)
- `logo.png`, `ana-hero.jpg`, `course-header.jpg` — images used on the site

## Still to do
- Photos: `ana-hero.jpg` (hero) and `ana-about.jpg` (About). Replace the files, keeping the names, to swap them.
- Add real client testimonials in the commented spot in the proof section of `index.html`.
- Client logo band: logos are `client-*.png` (white on dark; transparent PNGs work best): classroom-champions, calgary-flames-foundation, miya-creative-care, stay-at-home-music, boston-pizza, yoga-international, purity-woods.
- To remove a client, delete its `<li>` in the brands section.
- Most popular videos: swap the YouTube IDs in the `#videos` section (1 featured + 3 below) for your real top videos.
- Keep the stats (13K+ subscribers, etc.) accurate as they change.

## Already connected
- Course: Thinkific Branding Foundations link
- Forms: Formspree `xaenzzyp` (audit and contact pages)
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

## If a change doesn't show up
Browsers cache the stylesheet. The pages load it as `styles.css?v=20261002e` (and the same for `script.js` and `form.js`). When styles change, bump that date in every page's `<link>` and `<script>` tags so visitors get the new version straight away.

## SEO files
- `sitemap.xml` and `robots.txt` — add a new `<url>` to the sitemap whenever you add a page.
- `og-share.jpg` — 1200×630 link-preview image (used by every page).
- Each page has its own title, description, canonical URL and social tags in the `<head>`. Canonical URLs use the clean form (`/audit`, `/contact`).
- `404.html` — shown for pages that don't exist.
