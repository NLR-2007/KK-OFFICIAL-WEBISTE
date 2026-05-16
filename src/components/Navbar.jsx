import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { id: 'features', key: 'nav.features' },
  { id: 'how-it-works', key: 'nav.howItWorks' },
  { id: 'about', key: 'nav.about' },
  { id: 'contact', key: 'nav.contact' },
]

function scrollToSection(id) {
  if (id === 'top') { window.scrollTo({ top: 0, behavior: 'smooth' }); return }
  const el = document.getElementById(id)
  if (!el) return
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' })
}

export default function Navbar({ activeSection, isDark, toggleDark }) {
  const { t, i18n } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMobileOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('menu-open', mobileOpen)
    return () => document.body.classList.remove('menu-open')
  }, [mobileOpen])

  const toggleLang = () => {
    const next = i18n.language === 'en' ? 'te' : 'en'
    i18n.changeLanguage(next)
    localStorage.setItem('lang', next)
  }

  const handleNavClick = (id) => {
    setMobileOpen(false)
    if (pathname !== '/') {
      navigate('/', { state: { scrollTo: id } })
      return
    }
    scrollToSection(id)
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/92 dark:bg-gray-900/95 backdrop-blur-md shadow-sm border-b border-gray-100 dark:border-gray-700'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl 2xl:max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 lg:h-20 flex items-center justify-between gap-4">

          {/* Logo */}
          <button
            onClick={() => pathname !== '/' ? navigate('/') : scrollToSection('top')}
            className="flex items-center gap-2 sm:gap-2.5 group flex-shrink-0 min-h-[44px]"
            aria-label="Kisaan Krushi — scroll to top"
          >
            <span className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 bg-white rounded-lg flex items-center justify-center overflow-hidden shadow-sm group-hover:scale-110 transition-transform">
              <img src="/logo.jpg" alt="Kisaan Krushi logo" className="w-full h-full object-contain" />
            </span>
            <span className={`font-poppins font-bold text-lg sm:text-xl leading-none transition-colors ${
              scrolled ? 'text-primary dark:text-green-400' : 'text-white'
            }`}>
              Kisaan Krushi
            </span>
          </button>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-7">
            {NAV_LINKS.map(({ id, key }) => {
              const isActive = activeSection === id
              return (
                <button
                  key={id}
                  onClick={() => handleNavClick(id)}
                  className={`relative text-sm font-medium pb-0.5 transition-colors duration-200 whitespace-nowrap ${
                    isActive ? 'text-primary dark:text-green-400'
                      : scrolled
                        ? 'text-text-light dark:text-gray-200 hover:text-primary dark:hover:text-green-400'
                        : 'text-white/80 hover:text-white'
                  }`}
                >
                  {t(key)}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary dark:bg-green-400 rounded-full"
                    />
                  )}
                </button>
              )
            })}
          </div>

          {/* Desktop right: theme + lang + CTA */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3 flex-shrink-0">
            <ThemeToggle isDark={isDark} onToggle={toggleDark} scrolled={scrolled} />
            <LangToggle lang={i18n.language} onToggle={toggleLang} scrolled={scrolled} />
            <button
              onClick={() => handleNavClick('download')}
              className="px-4 xl:px-5 py-2.5 bg-accent text-primary-dark font-semibold rounded-full text-sm
                         hover:bg-amber-400 transition-all shadow-md hover:shadow-lg hover:scale-105 active:scale-95 whitespace-nowrap"
            >
              {t('nav.downloadApp')}
            </button>
          </div>

          {/* Mobile right: theme + lang + hamburger */}
          <div className="lg:hidden flex items-center gap-1.5 sm:gap-2">
            <ThemeToggle isDark={isDark} onToggle={toggleDark} scrolled={scrolled} />
            <LangToggle lang={i18n.language} onToggle={toggleLang} scrolled={scrolled} />
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              className={`p-2 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center ${
                scrolled
                  ? 'text-text-light dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              {mobileOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-primary-dark dark:bg-gray-950 flex flex-col items-center justify-center gap-6 sm:gap-8 pt-16"
          >
            {NAV_LINKS.map(({ id, key }, i) => (
              <motion.button
                key={id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => handleNavClick(id)}
                className={`text-xl sm:text-2xl font-poppins font-semibold transition-colors min-h-[48px] ${
                  activeSection === id ? 'text-accent' : 'text-white hover:text-accent'
                }`}
              >
                {t(key)}
              </motion.button>
            ))}
            <motion.button
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: NAV_LINKS.length * 0.06 }}
              onClick={() => handleNavClick('download')}
              className="mt-2 sm:mt-4 px-8 sm:px-10 py-3 sm:py-3.5 bg-accent text-primary-dark font-bold rounded-full text-base sm:text-lg hover:bg-amber-400 transition-colors min-h-[52px]"
            >
              {t('nav.downloadApp')}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function ThemeToggle({ isDark, onToggle, scrolled }) {
  return (
    <button
      onClick={onToggle}
      aria-label="Toggle dark mode"
      className={`p-2 rounded-full transition-all min-h-[36px] min-w-[36px] flex items-center justify-center ${
        scrolled
          ? 'text-text-light dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
          : 'text-white hover:bg-white/10'
      }`}
    >
      {isDark ? (
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  )
}

function LangToggle({ lang, onToggle, scrolled }) {
  return (
    <button
      onClick={onToggle}
      aria-label="Toggle language"
      className={`flex items-center gap-0.5 sm:gap-1 px-2.5 sm:px-3 py-1.5 rounded-full border-2 text-xs font-bold transition-all min-h-[36px] ${
        scrolled
          ? 'border-primary dark:border-green-500 text-primary dark:text-green-400 hover:bg-primary dark:hover:bg-green-500 hover:text-white'
          : 'border-white/60 text-white hover:border-white hover:bg-white/10'
      }`}
    >
      <span className={lang === 'en' ? 'opacity-100' : 'opacity-40'}>EN</span>
      <span className="opacity-40 mx-0.5">|</span>
      <span className={lang === 'te' ? 'opacity-100' : 'opacity-40'}>తె</span>
    </button>
  )
}

function MenuIcon() {
  return (
    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}
