'use client'

import { useEffect, useRef } from 'react'
import styles from './GradientBackground.module.scss'

export function GradientBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const interactiveRef = useRef<HTMLDivElement>(null)

  // The interactive blob eases toward the cursor: each frame it steps 1/20th of
  // the remaining distance, producing a smooth trailing follow.
  useEffect(() => {
    const container = containerRef.current
    const bubble = interactiveRef.current
    if (!container || !bubble) return

    let curX = 0
    let curY = 0
    let tgX = 0
    let tgY = 0
    let raf = 0

    const move = () => {
      curX += (tgX - curX) / 20
      curY += (tgY - curY) / 20
      bubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`
      raf = requestAnimationFrame(move)
    }

    const onMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      tgX = event.clientX - rect.left
      tgY = event.clientY - rect.top
    }

    window.addEventListener('mousemove', onMouseMove)
    move()

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div ref={containerRef} className={styles.gradientBg} aria-hidden="true">
      {/* "Goo" SVG filter: blur + alpha color-matrix + blend, gives the blobs their merging metaball look */}
      <svg xmlns="http://www.w3.org/2000/svg" className={styles.svgFilter}>
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <div className={styles.gradientsContainer}>
        <div className={styles.g1} />
        <div className={styles.g2} />
        <div className={styles.g3} />
        <div className={styles.g4} />
        <div className={styles.g5} />
        <div ref={interactiveRef} className={styles.interactive} />
      </div>
    </div>
  )
}
