# Six Sigma AI — Website

I built this as the marketing site for Six Sigma Applied Intelligence. It explains our agentic AI work for operational excellence—what we offer, how we approach projects, and how to reach us. Visually it uses a dark background (`#080810`), cyan-to-violet gradients, Plus Jakarta Sans, and motion on scroll and hover. Everything is responsive.

Repo: https://github.com/PhycxsV/6Sigma

## What is on the site

### Home (`/`)

- Hero with headline, short value proposition, and links to schedule a discovery session or explore solutions
- Measurable impact stats (cost, turnaround, quality, productivity, control, scalability) with count-up animation when they enter the viewport
- Where we apply agentic AI: document processing, workflow automation, knowledge agents, operations tower, custom systems
- Why Six Sigma AI: process-first, agentic AI, custom-built, impact focus
- Closing call to action to book a discovery session

### Solutions (`/solutions`)

- Overview of five solution areas with descriptions and feature tags
- On desktop: left-hand selector list and a detail panel for the active solution
- On mobile: accordion so you can expand one solution at a time

### Approach (`/approach`)

- Methodology headline and intro
- Five steps in a horizontal flow on large screens (Discover, Redesign, Design, Build, Stabilize), stacked on small screens
- Human-led / AI-assisted positioning
- Engagement models: assessment, pilot, full implementation, managed enhancement

### About (`/about`)

- Company positioning and four value pillars
- Contact details (email, phone, address) and industries served

### Contact (`/contact`)

- Discovery session form (name, company, email, phone, message)
- Contact cards for email, phone, address, and LinkedIn

Shared across pages: fixed navbar (frosted glass on scroll), footer with explore links, connect links, newsletter field, and legal links.

## Tech stack

- React 19 with Vite 7
- Tailwind CSS 4
- Framer Motion for page transitions, scroll reveals, and UI motion
- React Router for client-side routing
- Lucide React for icons

## Requirements

- Node.js 18 or newer (22 recommended)
- npm

## Setup

Clone the repository and install dependencies:

```bash
git clone https://github.com/PhycxsV/6Sigma.git
cd 6Sigma
npm install
```

If npm fails on SSL in your environment, you may need to adjust local npm settings. On a normal network, `npm install` is enough.

## Run locally

Start the development server:

```bash
npm run dev
```

Vite prints the local URL (usually `http://localhost:5173`). Open it in your browser. The dev server supports hot reload when you edit files.

## Production build

Build static files for deployment:

```bash
npm run build
```

Output goes to the `dist` folder. Preview the production build locally:

```bash
npm run preview
```

Deploy the contents of `dist` to any static host (Netlify, Vercel, GitHub Pages, S3, etc.).

## Lint

```bash
npm run lint
```

## Project structure

```
6Sigma/
├── public/              Static assets (favicon, etc.)
├── src/
│   ├── components/      Page sections (Navbar, Hero, Footer, …)
│   ├── hooks/           useScrollPosition, useCountUp
│   ├── pages/           Route-level pages (Home, Solutions, …)
│   ├── App.jsx          Router and layout shell
│   ├── main.jsx         Entry point
│   └── index.css        Global styles and Tailwind theme
├── index.html
├── vite.config.js
└── package.json
```

Each major section on the home page lives in its own component file under `src/components/`. Inner pages are single files under `src/pages/`.

## Notes

- The contact form does not submit anywhere yet—I still need to hook it up to a backend or a form provider before production.
- Contact info and copy live in the page files under `src/pages/` and `src/components/`; change them there when details update.

## License

Private project unless I say otherwise.
