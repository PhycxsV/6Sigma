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

In EmailJS → **Account** → **Security**, allow your site origin (e.g. `https://youruser.github.io`).

## hCaptcha

- **Site key** (public): already in `Contact.jsx`
- No server secret required for this EmailJS-only setup; captcha is checked in the browser before send

For stricter captcha verification, you would need a small backend (optional, not included).
