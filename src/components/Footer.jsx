import { useTranslation } from 'react-i18next'
import { Link, useNavigate, useLocation } from 'react-router-dom'

function scrollToId(id) {
  if (id === 'top') { window.scrollTo({ top: 0, behavior: 'smooth' }); return }
  const el = document.getElementById(id)
  if (!el) return
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' })
}

const QUICK_LINKS = [
  { id: 'features', key: 'footer.features' },
  { id: 'how-it-works', key: 'footer.howItWorks' },
  { id: 'about', key: 'footer.about' },
  { id: 'download', key: 'footer.download' },
]

const SUPPORT_LINKS = [
  { id: 'contact', key: 'footer.contact', type: 'scroll' },
  { to: '/privacy', key: 'footer.privacy', type: 'route' },
  { to: '/terms', key: 'footer.terms', type: 'route' },
  { to: '/faq', key: 'footer.faq', type: 'route' },
]

function LangToggle({ lang, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-1 px-3 py-1.5 rounded-full border-2 border-white/20 text-xs font-bold text-white/70 hover:border-accent hover:text-accent transition-all"
    >
      <span className={lang === 'en' ? 'opacity-100' : 'opacity-40'}>EN</span>
      <span className="opacity-40">|</span>
      <span className={lang === 'te' ? 'opacity-100' : 'opacity-40'}>తె</span>
    </button>
  )
}

const SOCIAL = [
  {
    label: 'LinkedIn',
    href: '#',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:support.kisaankrushi@gmail.com',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
]

export default function Footer() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const toggleLang = () => {
    const next = i18n.language === 'en' ? 'te' : 'en'
    i18n.changeLanguage(next)
    localStorage.setItem('lang', next)
  }

  const handleScrollTo = (id) => {
    if (pathname !== '/') {
      navigate('/', { state: { scrollTo: id } })
      return
    }
    scrollToId(id)
  }

  return (
    <footer className="bg-primary-dark text-white">
      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Col 1: Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <button onClick={() => handleScrollTo('top')} className="flex items-center gap-2.5 mb-4 group">
              <span className="flex-shrink-0 w-9 h-9 bg-white rounded-lg flex items-center justify-center overflow-hidden shadow group-hover:scale-110 transition-transform">
                <img src="/logo.jpg" alt="Kisaan Krushi logo" className="w-full h-full object-contain" />
              </span>
              <span className="font-poppins font-bold text-xl text-white">Kisaan Krushi</span>
            </button>
            <p className="text-green-400 text-sm italic mb-4">AI Tech Meets Farming</p>
            <p className="text-white/50 text-sm leading-relaxed">{t('footer.tagline')}</p>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-poppins font-bold text-sm uppercase tracking-wider text-white/70 mb-5">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map(({ id, key }) => (
                <li key={id}>
                  <button
                    onClick={() => handleScrollTo(id)}
                    className="text-white/60 hover:text-accent text-sm transition-colors"
                  >
                    {t(key)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Support */}
          <div>
            <h4 className="font-poppins font-bold text-sm uppercase tracking-wider text-white/70 mb-5">
              {t('footer.support')}
            </h4>
            <ul className="space-y-3">
              {SUPPORT_LINKS.map(({ id, to, key, type }) => (
                <li key={key}>
                  {type === 'scroll' ? (
                    <button
                      onClick={() => handleScrollTo(id)}
                      className="text-white/60 hover:text-accent text-sm transition-colors"
                    >
                      {t(key)}
                    </button>
                  ) : (
                    <Link to={to} className="text-white/60 hover:text-accent text-sm transition-colors">
                      {t(key)}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Connect */}
          <div>
            <h4 className="font-poppins font-bold text-sm uppercase tracking-wider text-white/70 mb-5">
              {t('footer.connect')}
            </h4>
            <div className="flex gap-3 flex-wrap">
              {SOCIAL.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 bg-white/10 hover:bg-accent hover:text-primary-dark text-white/70
                             rounded-xl flex items-center justify-center transition-all hover:scale-110"
                >
                  {icon}
                </a>
              ))}
            </div>

            {/* Made in India badge */}
            <div className="mt-6 inline-flex items-center gap-2 px-3 py-2 bg-white/5 rounded-xl border border-white/10">
              <span className="text-lg">🇮🇳</span>
              <span className="text-xs font-semibold text-white/70">{t('footer.madeInIndia')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs">{t('footer.copyright')}</p>
          <LangToggle lang={i18n.language} onToggle={toggleLang} />
        </div>
      </div>
    </footer>
  )
}
