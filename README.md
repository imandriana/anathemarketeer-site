# Ana the Marketeer site

Static site (HTML/CSS/JS) for GitHub Pages. No build step.

## Files
- `index.html` — homepage
- `contact.html` — contact page
- `styles.css`, `script.js` — shared styling and the newsletter pop-up

## Placeholders to replace before launch
Search each file for `REPLACE-ME` and swap in the real value:

| Placeholder | What goes there |
|---|---|
| `REPLACE-ME-THINKIFIC-URL` | Branding Foundations course link |
| `REPLACE-ME-BOOKING-URL` | Your booking page (Calendly, Cal.com, etc.) |
| `REPLACE-ME-KIT-FORM-ID` | Kit form ID (Kit → Grow → Landing Pages & Forms → your form → the number in the form's embed code) |
| `REPLACE-ME-FORM-ID` | Formspree form ID for the contact form |
| `REPLACE-ME-CHANNEL` / `REPLACE-ME-HANDLE` | YouTube and Instagram handles |

Also: add a headshot (`ana.jpg`) and update the proof strip numbers on the homepage.

## Kit setup
In Kit, create one form and add an automation: when someone subscribes to that form, send the Authentic Branding Checklist.

## Publish
1. Create a public GitHub repo and upload these files at the top level.
2. Settings → Pages → Deploy from a branch → `main` / root.
3. Upload the `CNAME` file too (it already contains `anathemarketeer.com`). Then enter the domain in Settings → Pages.
4. At IONOS (Domains → your domain → DNS), add:
   - Four `A` records for `@` pointing to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - One `CNAME` record for `www` pointing to `YOUR-GITHUB-USERNAME.github.io`
   - Delete any existing `A` or `AAAA` records for `@` that IONOS added by default (they point to IONOS parking pages).
5. Back in Settings → Pages, tick "Enforce HTTPS" once it becomes available (can take up to 24 hours).

Check GitHub's current Pages docs if any of those IPs have changed.
