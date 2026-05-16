import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'

function scrollToSection(id) {
  const el = document.getElementById(id)
  if (!el) return
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' })
}

/* ── App screen contents ── */
function LoginScreen() {
  return (
    <div className="w-full h-full bg-gradient-to-b from-[#1B5E20] to-[#0a1f0c] flex flex-col items-center justify-center p-4 gap-3">
      <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-lg overflow-hidden">
        <img src="/logo.jpg" alt="Kisaan Krushi" className="w-full h-full object-contain" />
      </div>
      <div className="text-center">
        <p className="text-white font-bold text-xs">Kisaan Krushi</p>
        <p className="text-green-300 text-[10px] mt-0.5">AI Tech Meets Farming</p>
      </div>
      <div className="w-full space-y-1.5 mt-1">
        <div className="w-full h-7 bg-white/20 rounded-xl border border-white/10" />
        <div className="w-full h-7 bg-white/20 rounded-xl border border-white/10" />
        <div className="w-full h-7 bg-[#F9A825] rounded-xl flex items-center justify-center">
          <span className="text-[#0D1B0F] text-[10px] font-bold">Login</span>
        </div>
      </div>
      <p className="text-green-400 text-[10px]">New here? Register →</p>
    </div>
  )
}

function DashboardScreen() {
  const days = ['M', 'T', 'W', 'T', 'F']
  const emojis = ['☀️', '🌤', '⛅', '🌧', '☀️']
  const temps = [29, 27, 25, 22, 28]
  return (
    <div className="w-full h-full bg-[#0f1f0f] flex flex-col p-2.5 gap-1.5">
      <div className="flex items-center justify-between">
        <p className="text-white text-[10px] font-bold">Dashboard</p>
        <div className="w-6 h-6 bg-[#F9A825] rounded-full flex items-center justify-center overflow-hidden shadow">
          <img src="/logo.jpg" alt="KK" className="w-full h-full object-contain" />
        </div>
      </div>
      <div className="bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] rounded-xl p-2.5">
        <p className="text-green-200 text-[8px] mb-0.5">Your Farm · Hyderabad</p>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white font-bold text-xl leading-none">28°C</p>
            <p className="text-green-300 text-[8px] mt-0.5">Partly Cloudy</p>
          </div>
          <span className="text-2xl">⛅</span>
        </div>
        <p className="text-green-200 text-[8px] mt-1">Humidity: 65% · Wind: 12km/h</p>
      </div>
      <div className="flex gap-1">
        {days.map((d, i) => (
          <div key={i} className="flex-1 bg-white/10 rounded-lg py-1 flex flex-col items-center gap-0.5">
            <p className="text-white/50 text-[7px]">{d}</p>
            <span className="text-[10px]">{emojis[i]}</span>
            <p className="text-white text-[7px] font-bold">{temps[i]}°</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-1 flex-1">
        {[['👤', 'Profile'], ['🤖', 'AI Tips'], ['📍', 'Location'], ['☁️', 'Sync']].map(([icon, label], i) => (
          <div key={i} className="bg-white/10 rounded-lg flex flex-col items-center justify-center gap-0.5 py-1.5">
            <span className="text-sm">{icon}</span>
            <p className="text-white text-[7px]">{label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function ProfileScreen() {
  const fields = ['Full Name', 'Village / City', 'Crop Type', 'Land (Acres)']
  return (
    <div className="w-full h-full bg-[#FAFAF7] flex flex-col">
      <div className="bg-gradient-to-r from-[#1B5E20] to-[#2E7D32] p-3 flex flex-col items-center gap-1.5">
        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center overflow-hidden shadow">
          <img src="/logo.jpg" alt="Kisaan Krushi" className="w-full h-full object-contain" />
        </div>
        <p className="text-white text-[10px] font-bold">Farmer Profile</p>
      </div>
      <div className="p-2.5 space-y-1.5 flex-1">
        {fields.map((f, i) => (
          <div key={i}>
            <p className="text-gray-400 text-[7px] mb-0.5 font-medium">{f}</p>
            <div className="w-full h-5 bg-white rounded-lg border border-gray-200 shadow-sm" />
          </div>
        ))}
        <div className="w-full h-6 bg-[#1B5E20] rounded-full flex items-center justify-center mt-2">
          <p className="text-white text-[8px] font-bold">Save Profile</p>
        </div>
      </div>
    </div>
  )
}

/* ── Phone frame ── */
function PhoneFrame({ children }) {
  return (
    <div className="relative w-full h-full bg-gray-900 rounded-[2rem] sm:rounded-[2.5rem] p-[5px] shadow-2xl border-2 border-gray-700 ring-1 ring-white/5">
      <div className="absolute top-[8px] left-1/2 -translate-x-1/2 w-10 h-2 bg-gray-900 rounded-full z-10" />
      <div className="w-full h-full rounded-[1.6rem] sm:rounded-[2rem] overflow-hidden">
        {children}
      </div>
    </div>
  )
}

/* ── Stats ── */
const STATS = [
  { numericEnd: 100, suffix: 'M+', labelKey: 'hero.stats.farmersLabel', isCount: true },
  { value: '24/7', labelKey: 'hero.stats.weatherLabel', isCount: false },
  { value: '100%', labelKey: 'hero.stats.cloudLabel', isCount: false },
  { value: 'AI', labelKey: 'hero.stats.aiLabel', isCount: false },
]

export default function Hero() {
  const { t } = useTranslation()
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section id="hero" className="relative min-h-screen bg-primary-dark flex flex-col overflow-hidden">
      <div className="grain-overlay absolute inset-0 pointer-events-none" />

      {/* Ambient glows */}
      <div className="absolute top-0 left-1/4 w-72 sm:w-96 lg:w-[500px] h-72 sm:h-96 lg:h-[500px] bg-primary/25 rounded-full blur-[80px] lg:blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-60 sm:w-80 lg:w-[400px] h-60 sm:h-80 lg:h-[400px] bg-accent/10 rounded-full blur-[60px] lg:blur-[100px] pointer-events-none" />

      {/* Main content */}
      <div className="relative z-10 flex-1 flex items-center pt-20 sm:pt-24 pb-8 sm:pb-10">
        <div className="max-w-7xl 2xl:max-w-screen-xl mx-auto w-full px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* ── Text side ── */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="text-center lg:text-left order-2 lg:order-1 px-2 sm:px-0"
          >
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/40 border border-primary/60 mb-4 sm:mb-6">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-green-300 text-xs sm:text-sm font-medium tracking-wide">
                {t('hero.badge')}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl 2xl:text-8xl font-poppins font-extrabold text-white leading-[1.08] mb-4 sm:mb-6">
              {t('hero.headline')}
            </h1>

            <p className="text-green-200/90 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 sm:mb-8 max-w-sm sm:max-w-md lg:max-w-lg mx-auto lg:mx-0">
              {t('hero.subheadline')}
            </p>

            <div className="flex flex-col xs:flex-row sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <button
                onClick={() => scrollToSection('download')}
                className="group px-6 sm:px-8 py-3.5 sm:py-4 bg-accent text-primary-dark font-bold rounded-full text-sm sm:text-base
                           hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/30 hover:scale-105 active:scale-95
                           flex items-center justify-center gap-2 min-h-[48px]"
              >
                {t('hero.downloadApp')}
                <svg className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </button>
              <button
                onClick={() => scrollToSection('features')}
                className="px-6 sm:px-8 py-3.5 sm:py-4 border-2 border-white/30 text-white font-semibold rounded-full text-sm sm:text-base
                           hover:border-white/70 hover:bg-white/10 transition-all min-h-[48px]"
              >
                {t('hero.seeFeatures')}
              </button>
            </div>
          </motion.div>

          {/* ── Hero image — responsive ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
            className="order-1 lg:order-2 flex items-center justify-center relative"
          >
            {/* Glow effect behind image */}
            <div className="absolute inset-0 bg-primary/30 rounded-3xl blur-3xl scale-90 pointer-events-none" />

            {/* Image frame */}
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/10 ring-1 ring-white/5 animate-float-1">
              <img
                src="/hero-farmer.png"
                alt="Indian farmer using Kisaan Krushi AI app in a lush green field at sunset"
                className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl object-cover"
              />
              {/* Subtle gradient overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-primary-dark/60 to-transparent pointer-events-none" />
            </div>

            {/* Floating AI badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3 py-1.5 shadow-lg"
            >
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-white text-xs font-semibold">AI Powered</span>
            </motion.div>

            {/* Floating weather badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="absolute bottom-6 left-4 sm:left-6 flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-xl px-3 py-2 shadow-lg"
            >
              <span className="text-xl">⛅</span>
              <div>
                <p className="text-white text-xs font-bold leading-none">28°C · Hyderabad</p>
                <p className="text-green-300 text-[10px] mt-0.5">Partly Cloudy</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Stats strip */}
      <div ref={ref} className="relative z-10 border-t border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {STATS.map((s, i) => (
            <div key={i} className="text-center py-1">
              <p className="text-accent font-poppins font-extrabold text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl leading-none">
                {s.isCount
                  ? inView ? <CountUp end={s.numericEnd} duration={2.5} suffix={s.suffix} /> : '0'
                  : s.value}
              </p>
              <p className="text-green-300 text-[11px] sm:text-xs lg:text-sm mt-1 sm:mt-1.5">{t(s.labelKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
