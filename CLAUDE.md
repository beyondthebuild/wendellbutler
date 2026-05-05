# Wendell Butler — Claude Project Guide

## Overview
Personal website for Wendell Butler — investor, entrepreneur, and veteran.
Static HTML/CSS/JS site hosted on **GitHub Pages** (`gh-pages` branch).
Live at: **https://wendellbutler.com**

## Hosting & Deployment
- GitHub repo: `github.com/bitoosh/wendellbutler`
- Always push to **both** branches after every change:
  ```
  git push origin main && git push origin main:gh-pages
  ```
- Custom domain: `wendellbutler.com` (DNS managed via Squarespace)
- `CNAME` file in repo root contains `wendellbutler.com`

## File Structure
```
index.html       — Home page
about.html       — About Me page
ventures.html    — Business Ventures page
snapshots.html   — Wendell's Snapshots page
contact.html     — Contact page
privacy.html     — Privacy Policy
style.css        — All styles
script.js        — All JavaScript
hero-video.mp4   — Compressed hero background video (48MB, served from GitHub)
The Hive.avif    — The Hive community logo
CNAME            — Custom domain file
```

## Cache Busting
CSS and JS use version query strings to bust browser cache.
**Always bump the version number after every change.**

- CSS: `style.css?v=NNN` — currently at **v=191**
- JS: `script.js?v=NNN` — currently at **v=21**

To bump CSS across all pages at once:
```bash
sed -i '' 's/style\.css?v=191/style.css?v=192/g' index.html about.html ventures.html snapshots.html contact.html
```

## Fonts
- **Oswald** (400, 500, 600, 700) — used for all major headings
- **Playfair Display** — used for some section headings
- **Inter** — body text
- Google Fonts loaded in `<head>` of every page

## Design System
- Primary blue: `#678bc9`
- Dark background: `#04070f` / `#07090f` / `#0e1a2b`
- Text muted: `var(--text-muted)`
- Nav logo: Oswald, uppercase, `font-size:1.2rem`, `font-weight:700`, `letter-spacing:0.04em`
- Footer logo: Oswald, uppercase, `font-size:1.1rem`, `font-weight:700`, `letter-spacing:0.04em`

## Key Components

### Nav
- `.nav-logo` — "WENDELL **BUTLER**" (BUTLER in blue `#678bc9`)
- `.nav-cta` — "Schedule a Call" button, slim border, small text, transparent background
- Scrolled state: `nav.scrolled` class added via JS

### Hero (index.html)
- Background: `hero-video.mp4` (local file, replaces old Cloudinary URL)
- Handwriting animation: `.hw-word-1` and `.hw-word-2` with `write-word` keyframes
- Animation: `1.1s linear` (smooth, no easing slowdown)
- Tagline: `color:rgba(255,255,255,0.25)` (subtle)

### Contact Form (contact.html)
- Connected to **Formspree**: `https://formspree.io/f/meevvzbk`
- Uses `fetch` API with `sendContactForm()` global function
- Button: `type="button"` with `onclick="sendContactForm()"`
- Success/error divs: `id="form-success"` and `id="form-error"`
- Form is a `<div id="contact-form">` (not a `<form>` tag) to prevent native submission

### Newsletter (contact.html)
- Custom styled form that POSTs to `https://wendellbutler.beehiiv.com/subscribe`
- Submits via hidden iframe (`target="beehiiv-hidden"`) — no new tab
- Shows green "Subscribed ✓" on success

### script.js Notes
- Null guards on hamburger/mobileMenu/mobileClose — these don't exist on non-home pages
- No mailto handler — was removed to fix Formspree integration

## Third-Party Services
| Service | Purpose |
|---------|---------|
| Formspree (`meevvzbk`) | Contact form submissions |
| Beehiiv (`wendellbutler.beehiiv.com`) | Newsletter subscriptions |
| Calendly (`calendly.com/wendell-butler`) | Schedule a Call |
| GitHub Pages | Site hosting |
| Squarespace | Domain DNS management |

## Oswald Font Applied To
All major headings across all pages use `font-family:'Oswald',sans-serif`. Key ones:
- Hero "Built on Grit, Driven by Purpose." — `font-weight:500`
- All section titles (Business Ventures, Snapshots, Build Strategy, etc.) — `font-weight:500`
- Page hero h1s (About Wendell, Business Ventures, etc.) — `font-weight:700`
- `.stat-number` and `.profile-stat-num` — metrics on home and about pages
- `.community-heading`, `.contact-info-heading`, `.newsletter-block-title`

## Stats (About Page)
- `.profile-stat-num`: `font-size:2.6rem; font-weight:700`
- `.profile-stat-num span` (M+ suffix): `font-size:2.6rem` (same size as number)

## The Hive Logo
- File: `The Hive.avif`
- Used in `index.html` Join the Community section: `width:180px; height:180px; margin-top:6rem; align-self:flex-end`
- Used in `about.html` Let's Build Together section: centered with `margin:1.5rem auto`
