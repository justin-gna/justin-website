# juuustin.ca

Justin's personal website — a multi-page portfolio built with **Next.js (App Router)**,
React 19, TypeScript, and SCSS modules, animated with Framer Motion, and deployed to
**Cloudflare Workers** via [OpenNext](https://opennext.js.org/cloudflare).

## Commands

```bash
npm run dev      # Next.js dev server (Turbopack)
npm run build    # next build (type-check + production build)
npm run lint     # ESLint
npm run preview  # OpenNext build + local Workers (workerd) preview
npm run deploy   # OpenNext build + wrangler deploy to Cloudflare Workers
```

`npm run build` is the gate — it runs `tsc` type-checking as part of the build.

## Environment

`NEXT_PUBLIC_LETTERBOXD_API_URL` (in `.env.local`, gitignored) points the
`letterboxd-diary` widget at the companion Cloudflare Worker. It is also declared in
`wrangler.jsonc` for the deployed Worker.

## Deploy

Deploys to Cloudflare Workers under the Worker name `justin-website` (see
`wrangler.jsonc`), on the same Cloudflare account that hosts `letterboxd-diary-api`.
`npm run deploy` builds with OpenNext and publishes with `wrangler deploy`. The custom
domain `juuustin.ca` is attached to the Worker in the Cloudflare dashboard.
