import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Default image optimizer isn't available on Cloudflare Workers; the hero is
  // CSS, and project/profile images are small static assets.
  images: { unoptimized: true },
  // Both juuustin.ca and the *.workers.dev URL hit the same Worker. Send the
  // workers.dev host to the canonical domain so it's the single indexable URL
  // (and the origin the Letterboxd API's CORS allowlist expects).
  async redirects() {
    const host = 'justin-website.justinedward8.workers.dev'
    const has = [{ type: 'host' as const, value: host }]
    return [
      // Root: :path* leaves the placeholder unsubstituted on an absolute
      // destination, so redirect / explicitly.
      { source: '/', has, destination: 'https://juuustin.ca', permanent: true },
      // Everything else: :path+ requires ≥1 segment and interpolates correctly.
      { source: '/:path+', has, destination: 'https://juuustin.ca/:path+', permanent: true },
    ]
  },
}

export default nextConfig
