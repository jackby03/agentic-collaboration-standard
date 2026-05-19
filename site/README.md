# ACS site

Next.js implementation of the ACS landing page migrated from `website/index.html`.

Local development

```bash
cd site
npm install
npm run dev
```

Development notes

- Run `npm install` once in `site/`.
- Run `npm run dev` for local development.
- Run `npm run build` to verify the production build.

Deployment notes

- Set the project root to `site/` in Vercel so the Next.js app is built from the migrated site.
- Vercel can detect the framework automatically; keep the default output settings.
- The app already includes `@vercel/analytics` in `_app.js`.

Optional: Environment-specific settings can be configured in the Vercel dashboard.
