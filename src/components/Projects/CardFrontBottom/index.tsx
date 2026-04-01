import { useEffect, useRef, useState } from 'react'
import styles from './CardFrontBottom.module.scss'

const TAGS_GAP = 4
const TITLE_TAGS_GAP = 8

interface CardFrontBottomProps {
  title: string
  techStack: string[]
}

export function CardFrontBottom({ title, techStack }: CardFrontBottomProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const ghostTagRefs = useRef<(HTMLSpanElement | null)[]>([])
  const ghostMoreRef = useRef<HTMLSpanElement | null>(null)
  const [visibleCount, setVisibleCount] = useState(techStack.length)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const recalc = () => {
      const titleEl = titleRef.current
      if (!titleEl) return

      const style = getComputedStyle(container)
      const innerWidth = container.clientWidth
        - parseFloat(style.paddingLeft)
        - parseFloat(style.paddingRight)

      const titleNaturalW = titleEl.scrollWidth
      const availableForTags = innerWidth - titleNaturalW - TITLE_TAGS_GAP

      if (availableForTags <= 0) {
        setVisibleCount(0)
        return
      }

      const tagWidths = ghostTagRefs.current.map(el => el?.offsetWidth ?? 0)
      const moreW = ghostMoreRef.current?.offsetWidth ?? 0

      let used = 0
      let count = 0

      for (let i = 0; i < techStack.length; i++) {
        const tagW = tagWidths[i] + (count > 0 ? TAGS_GAP : 0)
        const hiddenAfter = techStack.length - (count + 1)
        const moreSpace = hiddenAfter > 0 ? moreW + TAGS_GAP : 0

        if (used + tagW + moreSpace <= availableForTags) {
          used += tagW
          count++
        } else {
          break
        }
      }

      setVisibleCount(count)
    }

    const ro = new ResizeObserver(recalc)
    ro.observe(container)
    recalc()
    return () => ro.disconnect()
  }, [techStack])

  const hiddenCount = techStack.length - visibleCount

  return (
    <div ref={containerRef} className={styles.container}>
      <h4 ref={titleRef} className={styles.title}>{title}</h4>
      <div className={styles.ghost} aria-hidden="true">
        {techStack.map((tech, i) => (
          <span
            key={tech}
            ref={el => { ghostTagRefs.current[i] = el }}
            className={styles.tag}
          >
            {tech}
          </span>
        ))}
        <span ref={ghostMoreRef} className={styles.tagMore}>
          +{techStack.length}
        </span>
      </div>
      <div className={styles.tags}>
        {techStack.slice(0, visibleCount).map(tech => (
          <span key={tech} className={styles.tag}>{tech}</span>
        ))}
        {hiddenCount > 0 && (
          <span className={styles.tagMore}>+{hiddenCount}</span>
        )}
      </div>
    </div>
  )
}
