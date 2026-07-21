import { useEffect, useLayoutEffect, useRef } from 'react'
import { useAnimationControls } from 'framer-motion'

const HIDDEN = { opacity: 0, y: 20 }
const SHOWN = { opacity: 1, y: 0 }

export function useFadeUp<T extends HTMLElement = HTMLElement>(threshold = 0.1) {
  const ref = useRef<T>(null)
  const controls = useAnimationControls()
  const prevScrollY = useRef(typeof window !== 'undefined' ? window.scrollY : 0)

  // Set initial state synchronously before paint to avoid flash.
  // controls.set() writes straight to the element, so no re-render.
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    // Already in viewport or above it → show immediately, no animation
    if (el.getBoundingClientRect().top < window.innerHeight) {
      controls.set(SHOWN)
    }
    // else stays hidden, waiting to scroll into view from below
  }, [controls])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const currentScrollY = window.scrollY
        const scrollingDown = currentScrollY >= prevScrollY.current
        prevScrollY.current = currentScrollY

        if (entry.isIntersecting) {
          // Entering from below (scroll down) → animate; from above (scroll up) → instant
          controls.start(SHOWN, {
            duration: scrollingDown ? 0.5 : 0,
            ease: 'easeOut',
          })
        } else {
          // Always reset on exit so re-entry from below re-triggers the animation
          controls.set(HIDDEN)
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, controls])

  return { ref, initial: HIDDEN, animate: controls }
}
