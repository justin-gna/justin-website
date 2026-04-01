import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import styles from './Navbar.module.scss'

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [isHamburger, setIsHamburger] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [navbarHeight, setNavbarHeight] = useState(57)
  const navRef = useRef<HTMLElement>(null)
  const brandRef = useRef<HTMLAnchorElement>(null)
  const ghostRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Track navbar height for portal dropdown positioning
  useEffect(() => {
    const update = () => {
      if (navRef.current) setNavbarHeight(navRef.current.offsetHeight)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  // Detect overlap between brand and links
  useEffect(() => {
    const check = () => {
      const isMobile = window.innerWidth <= 767
      if (isMobile) {
        setIsHamburger(true)
        return
      }
      const brand = brandRef.current
      const ghost = ghostRef.current
      const nav = navRef.current
      if (!brand || !ghost || !nav) return
      const navWidth = nav.offsetWidth
      const brandWidth = brand.offsetWidth
      const linksWidth = ghost.offsetWidth
      const padding = 96
      setIsHamburger(brandWidth + linksWidth + padding + 48 > navWidth)
    }

    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Close menu when route changes
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  // Close on outside click
  useEffect(() => {
    if (!menuOpen) return
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node
      const insideNav = navRef.current?.contains(target)
      const insideDropdown = dropdownRef.current?.contains(target)
      if (!insideNav && !insideDropdown) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [menuOpen])

  // Close on Escape
  useEffect(() => {
    if (!menuOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [menuOpen])

  const handleScrollLink = (sectionId: string) => {
    setMenuOpen(false)
    if (location.pathname === '/') {
      scrollToSection(sectionId)
    } else {
      navigate('/', { state: { scrollTo: sectionId } })
    }
  }

  const navLinkItems = (
    <>
      <button className={styles.navLink} onClick={() => handleScrollLink('home')}>home</button>
      <button className={styles.navLink} onClick={() => handleScrollLink('projects')}>projects</button>
      <button className={styles.navLink} onClick={() => handleScrollLink('extra')}>extra</button>
      <span className={styles.pipe}>|</span>
      <Link to="/now" className={styles.navLink}>now</Link>
      <Link to="/blog" className={styles.navLink}>blog</Link>
      <Link to="/chat" className={styles.navLink}>chat</Link>
    </>
  )

  // Portal dropdown so it's outside the navbar stacking context — fixes backdrop-filter
  const dropdown = isHamburger && menuOpen ? createPortal(
    <div ref={dropdownRef} className={styles.dropdown} style={{ top: navbarHeight }}>
      <div className={styles.dropdownGroup}>
        <button className={styles.dropdownLink} onClick={() => handleScrollLink('home')}>home</button>
        <button className={styles.dropdownLink} onClick={() => handleScrollLink('projects')}>projects</button>
        <button className={styles.dropdownLink} onClick={() => handleScrollLink('extra')}>extra</button>
      </div>
      <div className={styles.dropdownDivider} />
      <div className={styles.dropdownGroup}>
        <Link to="/now" className={styles.dropdownLink} onClick={() => setMenuOpen(false)}>now</Link>
        <Link to="/blog" className={styles.dropdownLink} onClick={() => setMenuOpen(false)}>blog</Link>
        <Link to="/chat" className={styles.dropdownLink} onClick={() => setMenuOpen(false)}>chat</Link>
      </div>
    </div>,
    document.body
  ) : null

  return (
    <>
      <nav ref={navRef} className={styles.navbar}>
        <Link to="/" ref={brandRef} className={styles.brand}>justin g.</Link>

        {/* Ghost element for measuring link width — always rendered but invisible */}
        <div ref={ghostRef} className={styles.ghostLinks} aria-hidden="true">
          {navLinkItems}
        </div>

        {!isHamburger ? (
          <div className={styles.links}>
            {navLinkItems}
          </div>
        ) : (
          <button
            className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className={styles.hamburgerLine} />
            <span className={styles.hamburgerLine} />
            <span className={styles.hamburgerLine} />
          </button>
        )}
      </nav>
      {dropdown}
    </>
  )
}

export default Navbar
