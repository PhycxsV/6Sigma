# EmailJS + hCaptcha setup

## Flow

1. User fills the contact form and clicks **Send message**
2. **hCaptcha modal** opens (full-page blur) — same as before
3. After captcha passes → **EmailJS** sends email using your dashboard template
4. Success modal appears

hCaptcha is **not** removed. It still blocks bots before EmailJS runs.

## EmailJS dashboard (one-time)

1. Sign up at [emailjs.com](https://www.emailjs.com/)
2. **Email Services** → connect Gmail/Outlook/etc.
3. **Email Templates** → create a template.

   **Branded HTML (matches the site):** open `email-templates/contact-inquiry.html` in this repo, copy the full file, and paste it into the EmailJS template **HTML / Code** editor.

   Template settings in EmailJS:

   | Field | Value |
   |-------|--------|
   | Subject | `{{subject}}` |
   | Reply To | `{{email}}` |
   | Content | pasted HTML from `contact-inquiry.html` |

   Variables used in the HTML (must match the contact form):

   | Variable | Description |
   |----------|-------------|
   | `{{name}}` | Sender name |
   | `{{company}}` | Company |
   | `{{email}}` | Sender email |
   | `{{phone}}` | Phone |
   | `{{message}}` | Message body |
   | `{{subject}}` | Subject line |

   Design uses site colors: background `#080810`, card `#10101c`, blue `#2563eb`, orange `#f59e0b`, gradient header.

4. **Account** → copy **Public Key**
5. Copy **Service ID** and **Template ID** from the template page

## Local dev

Create `.env.local` from `.env.example` and fill in the three `VITE_EMAILJS_*` values.

```bash
npm run dev
```

## GitHub Pages production

Add repository secrets (used at build time):

- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`
- `VITE_EMAILJS_PRIVATE_KEY` (if strict mode is on)

In EmailJS → **Account** → **Security**, allow your site origin (e.g. `https://youruser.github.io`).

## hCaptcha

- **Site key** (public): already in `Contact.jsx`
- No server secret required for this EmailJS-only setup; captcha is checked in the browser before send

For stricter captcha verification, you would need a small backend (optional, not included).

## Strict mode (private key cannot be turned off)

Some accounts **require** a private key. The `@emailjs/browser` SDK does **not** send private keys (EmailJS docs: private key is Node/server only).

This project uses the **REST API** with `accessToken` via `src/utils/sendEmailJS.js`.

You need **four** env values locally and on GitHub:

| Variable | Where to get it |
|----------|-----------------|
| `VITE_EMAILJS_SERVICE_ID` | Email Services |
| `VITE_EMAILJS_TEMPLATE_ID` | Email Templates |
| `VITE_EMAILJS_PUBLIC_KEY` | Account → API Keys |
| `VITE_EMAILJS_PRIVATE_KEY` | Account → Security → **Private Key** |

Add `VITE_EMAILJS_PRIVATE_KEY` to `.env.local` and GitHub secret `VITE_EMAILJS_PRIVATE_KEY`, then re-run the deploy workflow.

**Note:** On a static GitHub Pages site, the private key is still embedded in the built JavaScript (visible to advanced users). hCaptcha limits abuse. For maximum security, use a serverless function instead of client-side EmailJS.

## Troubleshooting: "The Public Key is invalid" (live site)

### 1. EmailJS Security

Go to [Account → Security](https://dashboard.emailjs.com/admin/account/security):

- If you **can** turn OFF “Use Private Key”, you may remove `VITE_EMAILJS_PRIVATE_KEY` from code/env (optional legacy path).
- If private key is **required**, copy it into `VITE_EMAILJS_PRIVATE_KEY` as above.

### 2. GitHub secret must match the key **right now**

If you **regenerated** the public key in EmailJS, the old key is dead.

1. Copy the **current** Public Key from EmailJS → Account.
2. Update GitHub secret `VITE_EMAILJS_PUBLIC_KEY` (no spaces).
3. Update `.env.local` on your PC with the same value.
4. **Actions** → **Deploy to GitHub Pages** → **Re-run all jobs**.
5. Hard refresh the live site (Ctrl+Shift+R).

### 3. Confirm the deploy picked up secrets

After a green workflow run, on the live contact page open DevTools → **Network** → submit the form → click the `email` request. If env vars were missing at build time, the request will still fail.

Secret names must be exactly: `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`.

### 4. Domain allowlist

Optional. If you cannot add domains on the free plan, the form can still work without them.
