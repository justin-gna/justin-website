import { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { LetterboxdDiary } from 'letterboxd-diary'
import Landing from '../components/Landing'
import AboutMe from '../components/AboutMe'
import Projects from '../components/Projects'
import MathPapers from '../components/MathPapers'

interface HomePageProps {
  isLoaded: boolean
  onLandingVisibilityChange: (visible: boolean) => void
}

function HomePage({ isLoaded, onLandingVisibilityChange }: HomePageProps) {
  const landingRef = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => onLandingVisibilityChange(entry.isIntersecting),
      { threshold: 0 }
    )
    if (landingRef.current) observer.observe(landingRef.current)
    return () => observer.disconnect()
  }, [onLandingVisibilityChange])

  // Handle state-based scroll navigation from other pages
  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null
    const id = state?.scrollTo
    if (!id) return
    const timer = setTimeout(() => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
      navigate('/', { replace: true, state: {} })
    }, 100)
    return () => clearTimeout(timer)
  }, [location.state, navigate])

  return (
    <>
      <div ref={landingRef}>
        <Landing isLoaded={isLoaded} />
      </div>
      <AboutMe />
      <Projects />
      <MathPapers />
      <section id="extra" style={{ backgroundColor: '#121212', padding: '90px 0 120px' }}>
        <h2 style={{ textAlign: 'center', maxWidth: '56rem', margin: '0 auto 64px', padding: '0 3rem' }}>extra</h2>
        <div style={{ maxWidth: '56rem', margin: '0 auto', padding: '0 48px' }}>
          <LetterboxdDiary
            apiUrl={import.meta.env.VITE_LETTERBOXD_API_URL}
            name="justin"
            count={6}
            layout="list"
            showReviews={true}
          />
        </div>
        <div style={{ maxWidth: '56rem', margin: '64px auto 0', padding: '0 3rem' }}>
          <h3>blog</h3>
          <p style={{ marginTop: '16px', color: 'rgba(255, 255, 255, 0.6)' }}>coming soon</p>
        </div>
      </section>
    </>
  )
}

export default HomePage
