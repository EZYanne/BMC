# Bicutan Medical Center — Setup & Deployment Guide

The site is a static website (`index.html` + `styles.css` + `script.js` + `assets/`).
It works as-is by opening `index.html`. Below is how to enable the "live" features.

---

## 1. Hosting
Any static host works (Netlify, Vercel, GitHub Pages, cPanel, etc.).
- **Vercel** (recommended, because it also runs the chat backend): import the folder,
  deploy. The `/api/chat.js` function is detected automatically.
- Point your domain `bicutanmed.com` at the host and update the URLs in
  `sitemap.xml`, `robots.txt`, and the `og:`/`canonical` tags if the domain differs.

---

## 2. Contact / Appointment form (already wired)
The feedback & appointment form sends submissions to **infoadmittingbmci@gmail.com**
via [FormSubmit](https://formsubmit.co) — no backend or signup needed.

> ⚠️ **One-time activation:** the FIRST time the form is submitted, FormSubmit emails
> that address a confirmation link. Click it once to start receiving messages.

To change the destination email, edit `FORM_ENDPOINT` in `script.js`.

---

## 3. AI chat assistant (optional upgrade)
The chat widget works out-of-the-box with built-in rule-based answers.
To make it **Claude-powered**:

1. Deploy on Vercel (or any Node serverless host). `api/chat.js` is included.
2. Add an environment variable in your host's settings:
   ```
   ANTHROPIC_API_KEY = sk-ant-...      (from https://console.anthropic.com)
   ```
3. Done — the widget auto-detects the backend and uses real AI, with automatic
   fallback to the rule-based answers if the backend is ever unavailable.

The endpoint path is `CHAT_API` in `script.js` (default `/api/chat`).

---

## 4. Analytics (optional)
In `index.html` (head), set your GA4 Measurement ID:
```js
window.GA_ID='G-XXXXXXXXXX';
```
It stays completely inert until an ID is provided.

---

## 5. SEO (already configured)
- `robots.txt` and `sitemap.xml` are included — submit the sitemap in
  Google Search Console once live.
- Meta description, Open Graph, Twitter cards, and `Hospital` JSON-LD structured
  data are all in the `<head>`.

---

## 6. Content still to personalize (needs real data)
These currently use placeholders — give the values and they can be updated:
- **Doctor specialties:** all 38 doctors show "Consultant". Provide each
  doctor's real specialty (edit the roster in `script.js`).
- **Patient testimonials:** the 4 quotes in `script.js` are samples — replace
  with real, consented patient feedback.
- **Facility captions:** the gallery labels (Reception, Patient Room, etc.) are
  guesses — confirm what each `facility#.webp` actually shows.

---

## Files
```
index.html        – markup (head, all page sections)
styles.css        – all styling
script.js         – all interactivity
api/chat.js       – serverless Claude proxy (optional)
robots.txt        – crawler rules
sitemap.xml       – search engine sitemap
assets/img/...    – images
index.html.bak    – backup from before the CSS/JS split (safe to delete)
```
