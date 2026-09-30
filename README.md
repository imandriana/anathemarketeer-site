# Ana the Marketeer site

Static site (HTML/CSS/JS) hosted on GitHub Pages. No build step.

## Files
- `index.html` — homepage (order: hero, yellow ticker, newsletter opt-in, brands I've worked with, How can I help you, course, Hi I am Ana with receipts and testimonials, My process, most popular videos, final CTA)
- `audit.html` — free brand audit page (Google Form embedded; edit questions in Google Forms and it updates here)
- `contact.html` — contact page
- `styles.css` — all styling (brand palette and fonts are defined at the top)
- `script.js` — newsletter pop-up (desktop only; shows once after 30s or 55% scroll, then stays away for 14 days)
- `logo.png`, `ana-hero.jpg`, `course-header.jpg` — images used on the site

## Still to do
- `contact.html`: replace `REPLACE-ME-FORM-ID` with a Formspree form ID, or switch the contact page to the booking form only.
- The About section reuses `ana-hero.jpg`. To use a second photo, add it (e.g. `ana-about.jpg`) and change the `src` in the About section of `index.html`.
- Add real client testimonials in the commented spot in the proof section of `index.html`.
- Client logo band (static, shown white on dark): upload logos (PNG, transparent background) to the top level of the repo with these exact names. Until a file exists, the client name shows as text.
  `client-classroom-champions.png`, `client-csec.png`, `client-miya-creative-care.png`, `client-stay-at-home-music.png`, `client-cineplex.png`, `client-revlon.png`, `client-boston-pizza.png`, `client-yoga-international.png`
- To remove a client, delete its `<li>` in the brands section.
- Most popular videos: swap the YouTube IDs in the `#videos` section (1 featured + 3 below) for your real top videos.
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
