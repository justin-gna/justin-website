import { useEffect } from 'react'
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import NowPage from './pages/NowPage'
import BlogPage from './pages/BlogPage'
import ChatPage from './pages/ChatPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function AppContent() {
  return (
    <MotionConfig reducedMotion="user">
      <ScrollToTop />
      <Navbar />
      <div style={{ background: '#121212', overflow: 'hidden' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/now" element={<NowPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
        <Footer />
      </div>
    </MotionConfig>
  )
}

function App() {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  )
}

export default App
