import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import styles from './Landing.module.scss'

interface LandingProps {
  isLoaded: boolean
}

function Landing({ isLoaded }: LandingProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [isInView, setIsInView] = useState(true)
  const [loopStarted, setLoopStarted] = useState(false)
  const [waveKey, setWaveKey] = useState(0)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Start loop after initial animation finishes (0.9s delay + 0.8s wave)
  useEffect(() => {
    if (!isLoaded) return
    const timeout = setTimeout(() => setLoopStarted(true), 1700)
    return () => clearTimeout(timeout)
  }, [isLoaded])

  // Loop every 2.5s only when in view
  useEffect(() => {
    if (!loopStarted || !isInView) return
    const interval = setInterval(() => setWaveKey(k => k + 1), 2500)
    return () => clearInterval(interval)
  }, [loopStarted, isInView])

  const waveClass = !isLoaded
    ? ''
    : loopStarted
      ? styles.waveRepeat
      : styles.wave

  return (
    <section id="home" ref={sectionRef} className={styles.landing}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h1>
          <span key={waveKey} className={waveClass}>👋</span>
          {' '}hello, i&apos;m justin
        </h1>
      </motion.div>
    </section>
  )
}

export default Landing
