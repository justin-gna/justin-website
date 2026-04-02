import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation, HashRouter } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import { ShaderGradient, ShaderGradientCanvas } from '@shadergradient/react'
import LoadingScreen from './components/LoadingScreen'
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
  const [isLoaded, setIsLoaded] = useState(false)
  const [landingVisible, setLandingVisible] = useState(true)
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  return (
    <MotionConfig reducedMotion="user">
      <LoadingScreen onHidden={() => setIsLoaded(true)} />
      <ShaderGradientCanvas style={{ position: "fixed", pointerEvents: "none", zIndex: 1, inset: 0 }}>
        <ShaderGradient
          animate={isHomePage && landingVisible ? "on" : "off"}
          brightness={1}
          cAzimuthAngle={180}
          cDistance={3.5}
          cPolarAngle={115}
          cameraZoom={1}
          color1="#ffaf8a"
          color2="#ec2651"
          color3="#000000"
          envPreset="city"
          grain="on"
          lightType="3d"
          positionX={-0.7}
          positionY={-0.1}
          positionZ={0}
          range="disabled"
          rangeEnd={40}
          rangeStart={0}
          reflection={0.1}
          rotationX={0}
          rotationY={0}
          rotationZ={235}
          shader="defaults"
          type="waterPlane"
          uAmplitude={0}
          uDensity={2.2}
          uFrequency={5.5}
          uSpeed={0.1}
          uStrength={1.2}
          uTime={0.2}
          wireframe={false}
        />
      </ShaderGradientCanvas>
      <ScrollToTop />
      <Navbar />
      <div style={{
        position: "relative",
        zIndex: 2,
        background: isHomePage
          ? 'linear-gradient(to bottom, transparent calc(100vh + 24px), #121212 calc(100vh + 24px))'
          : '#121212',
        overflow: 'hidden',
      }}>
        <Routes>
          <Route path="/" element={
            <HomePage
              isLoaded={isLoaded}
              onLandingVisibilityChange={setLandingVisible}
            />
          } />
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
