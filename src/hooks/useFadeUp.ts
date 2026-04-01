import { useEffect, useLayoutEffect, useRef, useState } from 'react'

type FadeState = 'below' | 'animate' | 'visible'

export function useFadeUp<T extends HTMLElement = HTMLElement>(threshold = 0.1) {
  const ref = useRef<T>(null)
  const [state, setState] = useState<FadeState>('below')
  const prevScrollY = useRef(typeof window !== 'undefined' ? window.scrollY : 0)

  // Set initial state synchronously before paint to avoid flash
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    // Already in viewport or above it → show immediately, no animation
    if (rect.top < window.innerHeight) {
      setState('visible')
    }
    // else stays 'below' (hidden, waiting to scroll into view from below)
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const currentScrollY = window.scrollY
        const scrollingDown = currentScrollY >= prevScrollY.current
        prevScrollY.current = currentScrollY

        if (entry.isIntersecting) {
          // Entering from below (scroll down) → animate; entering from above (scroll up) → instant
          setState(scrollingDown ? 'animate' : 'visible')
        } else {
          // Always reset on exit so re-entry from below re-triggers the animation
          setState('below')
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return {
    ref,
    initial: { opacity: 0, y: 20 },
    animate: state === 'below' ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 },
    transition: state === 'animate'
      ? { duration: 0.5, ease: 'easeOut' }
      : { duration: 0 },
  }
}
