import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import styles from './ProjectModal.module.scss'
import type { Project } from '..'
import { ProjectCard } from '../ProjectCard'

const SLIDE_DURATION = 0.4
const SLIDE_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]
const FLIP_DURATION_MS = 550

interface ProjectModalProps {
  project: Project
  isActive: boolean
  rect: DOMRect | null
  onExited: () => void
}

function ProjectModal({ project, isActive, rect, onExited }: ProjectModalProps) {
  const [visible, setVisible] = useState(false)
  const [flipped, setFlipped] = useState(false)
  const [cardDims, setCardDims] = useState({ width: 0, height: 0 })
  const closingRef = useRef(false)
  const savedRectRef = useRef<DOMRect | null>(null)
  const onExitedRef = useRef(onExited)
  onExitedRef.current = onExited

  const cardControls = useAnimation()
  const backdropControls = useAnimation()

  // When this card becomes active, snap it to the grid card's position and animate
  useEffect(() => {
    if (!isActive || !rect) return

    savedRectRef.current = rect
    closingRef.current = false

    const targetX = Math.round((window.innerWidth - rect.width) / 2)
    const targetY = Math.round((window.innerHeight - rect.height) / 2)

    cardControls.set({ x: rect.left, y: rect.top })
    setCardDims({ width: rect.width, height: rect.height })
    setFlipped(false)
    setVisible(true)

    document.body.style.overflow = 'hidden'
    backdropControls.set({ opacity: 0 })
    backdropControls.start({ opacity: 1, transition: { duration: 0.25 } })
    cardControls.start({
      x: targetX,
      y: targetY,
      transition: { duration: SLIDE_DURATION, ease: SLIDE_EASE },
    }).then(() => {
      if (!closingRef.current) setFlipped(true)
    })
  }, [isActive, rect])

  const handleClose = useCallback(async () => {
    if (closingRef.current) return
    closingRef.current = true
    const r = savedRectRef.current
    if (!r) return

    setFlipped(false)
    await new Promise<void>(resolve => setTimeout(resolve, FLIP_DURATION_MS))
    await Promise.all([
      backdropControls.start({ opacity: 0, transition: { duration: 0.25 } }),
      cardControls.start({
        x: r.left,
        y: r.top,
        transition: { duration: SLIDE_DURATION, ease: SLIDE_EASE },
      }),
    ])

    document.body.style.overflow = ''
    setVisible(false)
    onExitedRef.current()
  }, [backdropControls, cardControls])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [handleClose])

  useEffect(() => () => { document.body.style.overflow = '' }, [])

  return (
    <>
      <motion.div
        className={styles.backdrop}
        style={{
          visibility: visible ? 'visible' : 'hidden',
          pointerEvents: visible ? 'auto' : 'none',
        }}
        initial={false}
        animate={backdropControls}
        onClick={handleClose}
      />
      <motion.div
        className={styles.card}
        style={{
          width: cardDims.width || undefined,
          height: cardDims.height || undefined,
          visibility: visible ? 'visible' : 'hidden',
          pointerEvents: visible ? 'auto' : 'none',
        }}
        initial={false}
        animate={cardControls}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`${styles.flipCard} ${flipped ? styles.flipped : ''}`}>
          <div className={styles.flipCardInner}>
            <div className={styles.front}>
              <ProjectCard project={project} />
            </div>
            <div className={styles.back}>
              <button className={styles.closeButton} onClick={handleClose} aria-label="Close">✕</button>
              <h3 className={styles.backTitle}>{project.title}</h3>
              <p className={styles.description}>{project.description}</p>
              <div className={styles.techStack}>
                {project.techStack.map(tech => (
                  <span key={tech} className={styles.techTag}>{tech}</span>
                ))}
              </div>
              <div className={styles.linksSection}>
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={styles.link}>
                    view on github →
                  </a>
                )}
                {project.youtubeUrl && (
                  <a href={project.youtubeUrl} target="_blank" rel="noopener noreferrer" className={styles.link}>
                    watch on youtube →
                  </a>
                )}
                {project.externalUrl && (
                  <a href={project.externalUrl} target="_blank" rel="noopener noreferrer" className={styles.link}>
                    visit project →
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default ProjectModal
