import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import AppScreenshots from './components/AppScreenshots'
import AppGallery from './components/AppGallery'
import About from './components/About'
import Milestone from './components/Milestone'
import Team from './components/Team'
import Download from './components/Download'
import Contact from './components/Contact'
import Footer from './components/Footer'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsConditions from './pages/TermsConditions'
import FAQ from './pages/FAQ'

const SECTIONS = ['hero', 'features', 'how-it-works', 'screenshots', 'about', 'download', 'contact']

function scrollToSection(id) {
  if (id === 'top') { window.scrollTo({ top: 0, behavior: 'smooth' }); return }
  const el = document.getElementById(id)
  if (!el) return
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' })
}

function AppContent() {
  const { i18n } = useTranslation()
  const [activeSection, setActiveSection] = useState('hero')
  const [isDark, setIsDark] = useState(
    () => document.documentElement.classList.contains('dark')
  )
  const location = useLocation()
  const isHome = location.pathname === '/'

  const toggleDark = () => {
    const next = !document.documentElement.classList.contains('dark')
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
    setIsDark(next)
  }

  // Scroll to top on route change
  useEffect(() => { window.scrollTo(0, 0) }, [location.pathname])

  // Handle scroll-to-section state passed via navigate()
  useEffect(() => {
    if (location.state?.scrollTo) {
      const id = location.state.scrollTo
      const timer = setTimeout(() => scrollToSection(id), 120)
      return () => clearTimeout(timer)
    }
  }, [location.pathname, location.state])

  // Apply Telugu font class and lang attribute
  useEffect(() => {
    if (i18n.language === 'te') {
      document.body.classList.add('lang-te')
    } else {
      document.body.classList.remove('lang-te')
    }
    document.documentElement.lang = i18n.language
  }, [i18n.language])

  // Section IntersectionObserver (home only)
  useEffect(() => {
    if (!isHome) return
    const observers = []
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { threshold: 0.35, rootMargin: '-80px 0px 0px 0px' }
      )
      observer.observe(el)
      observers.push(observer)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [isHome])

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: { fontFamily: i18n.language === 'te' ? '"Noto Sans Telugu", sans-serif' : 'inherit' },
        }}
      />
      <Navbar activeSection={isHome ? activeSection : ''} isDark={isDark} toggleDark={toggleDark} />
      <main>
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Features />
              <HowItWorks />
              <AppScreenshots />
              <AppGallery />
              <About />
              <Team />
              <Milestone />
              <Download />
              <Contact />
            </>
          } />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsConditions />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}
