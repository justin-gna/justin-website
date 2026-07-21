'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

// Replaces the old `scrollRestoration = 'manual'`, ScrollToTop, and the
// `state.scrollTo` handoff. On navigation: if the URL carries a hash
// (e.g. `/#projects` from another page), scroll that section into view once it
// has rendered; otherwise reset to the top.
export default function ScrollManager() {
  const pathname = usePathname()

  useEffect(() => {
    window.history.scrollRestoration = 'manual'
  }, [])

  useEffect(() => {
    const id = window.location.hash.slice(1)
    if (!id) {
      window.scrollTo(0, 0)
      return
    }
    // Sections hydrate on the client, so the target may not exist yet.
    const timer = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
    return () => clearTimeout(timer)
  }, [pathname])

  return null
}
