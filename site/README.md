# ACS site (Vercel prototype)

Quick prototype of a Next.js site intended for deployment to Vercel.

Local development

```bash
cd site
npm install
npm run dev
```

Deployment notes

- Create a new project in Vercel and link this repository.
- Set the Project Root to `site/` (in Vercel Project Settings) so Vercel builds the Next app.
- Build command: `npm run build`, Output Directory: (leave default). Vercel will detect Next.js automatically.
- Enable Vercel Analytics in the project dashboard to collect analytics; the site already includes `@vercel/analytics` and renders `<Analytics />` in `_app.js`.

Optional: Environment-specific settings can be configured in the Vercel dashboard.
