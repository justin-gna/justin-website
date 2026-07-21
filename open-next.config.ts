import { defineCloudflareConfig } from '@opennextjs/cloudflare'

// Minimal config: the site is essentially static (no ISR/dynamic cache), so no
// R2/KV incremental-cache binding is wired up. Add one here later if needed.
export default defineCloudflareConfig()
