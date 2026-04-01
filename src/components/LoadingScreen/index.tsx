import { useState, useEffect } from 'react'
import styles from './LoadingScreen.module.scss'

interface LoadingScreenProps {
  onHidden?: () => void
}

function LoadingScreen({ onHidden }: LoadingScreenProps) {
  const [fading, setFading] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 1000)
    const hideTimer = setTimeout(() => {
      setHidden(true)
      onHidden?.()
    }, 1500)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(hideTimer)
    }
  }, [onHidden])

  if (hidden) return null

  return (
    <div className={`${styles.overlay} ${fading ? styles.fadeOut : ''}`}>
      <span className={styles.text}>
        loading
        <span className={styles.dots}>
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
        </span>
      </span>
    </div>
  )
}

export default LoadingScreen
