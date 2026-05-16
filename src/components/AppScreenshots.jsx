import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const SCREENS = {
  en: [
    { src: '/app-screenshots/login-en.jpg',          label: 'Login Screen' },
    { src: '/app-screenshots/home-en.jpg',           label: 'Dashboard' },
    { src: '/app-screenshots/mandi-en.jpg',          label: 'Mandi Prices' },
    { src: '/app-screenshots/disease-result-en.jpg', label: 'Disease Detection' },
  ],
  te: [
    { src: '/app-screenshots/login-te.jpg',          label: 'లాగిన్ స్క్రీన్' },
    { src: '/app-screenshots/home-te.jpg',           label: 'డ్యాష్‌బోర్డ్' },
    { src: '/app-screenshots/mandi-te.jpg',          label: 'మండి ధరలు' },
    { src: '/app-screenshots/disease-result-te.jpg', label: 'వ్యాధి గుర్తింపు' },
  ],
}

function PhoneMockup({ src, label, isActive, onClick }) {
  return (
    <motion.div
      onClick={onClick}
      animate={{
        scale: isActive ? 1 : 0.82,
        opacity: isActive ? 1 : 0.5,
        y: isActive ? 0 : 14,
      }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="flex-shrink-0 cursor-pointer flex flex-col items-center gap-3"
    >
      <div
        className={`w-44 md:w-48 lg:w-52 xl:w-56
          h-[380px] md:h-[400px] lg:h-[430px] xl:h-[460px]
          bg-gray-900 rounded-[2.5rem] p-[6px] shadow-2xl border-2 transition-colors duration-300
          ${isActive ? 'border-primary ring-4 ring-primary/20' : 'border-gray-700'}`}
      >
        <div className="w-full h-full rounded-[2rem] overflow-hidden">
          <img
            src={src}
            alt={label}
            className="w-full h-full object-cover object-top"
            loading="lazy"
          />
        </div>
      </div>
      <p className={`text-sm font-semibold transition-colors duration-300 ${isActive ? 'text-primary' : 'text-gray-400'}`}>
        {label}
      </p>
    </motion.div>
  )
}

export default function AppScreenshots() {
  const { t, i18n } = useTranslation()
  const [active, setActive] = useState(1)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const timerRef = useRef(null)

  const lang = i18n.language === 'te' ? 'te' : 'en'
  const screens = SCREENS[lang]

  useEffect(() => { setActive(1) }, [lang])

  const startAutoPlay = () => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(
      () => setActive((v) => (v + 1) % screens.length),
      3500
    )
  }

  useEffect(() => {
    if (inView) startAutoPlay()
    return () => clearInterval(timerRef.current)
  }, [inView, lang])

  const goTo = (i) => { setActive(i); startAutoPlay() }

  return (
    <section
      id="screenshots"
      className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-light-bg to-white dark:from-gray-900 dark:to-gray-900 overflow-hidden"
    >
      <div ref={ref} className="max-w-7xl 2xl:max-w-screen-xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <span className="w-1.5 h-1.5 bg-primary rounded-full" />
            <span className="text-primary text-sm font-semibold">App Screens</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl 2xl:text-6xl font-poppins font-extrabold text-text-light dark:text-gray-100">
            {t('screenshots.title')}
          </h2>
          <p className="text-gray-400 dark:text-gray-500 mt-3 text-sm sm:text-base max-w-lg mx-auto">
            {i18n.language === 'te'
              ? 'మీ భాషలో యాప్ స్క్రీన్‌లు చూడండి'
              : 'Real screenshots from the Kisaan Krushi app'}
          </p>
          <p className="text-gray-400 mt-1 text-sm sm:hidden">{t('screenshots.swipe')}</p>
        </motion.div>

        {/* Mobile: single active phone with prev/next */}
        <div className="sm:hidden flex flex-col items-center gap-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${lang}-${active}`}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
              className="w-[200px] h-[420px] bg-gray-900 rounded-[2.5rem] p-[6px] shadow-2xl border-2 border-primary ring-4 ring-primary/20"
            >
              <div className="w-full h-full rounded-[2rem] overflow-hidden">
                <img
                  src={screens[active].src}
                  alt={screens[active].label}
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center gap-4">
            <button
              onClick={() => goTo((active - 1 + screens.length) % screens.length)}
              className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all text-xl"
            >
              ‹
            </button>
            <div className="flex gap-2">
              {screens.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`rounded-full transition-all duration-300 ${i === active ? 'w-6 h-2.5 bg-primary' : 'w-2.5 h-2.5 bg-gray-300'}`}
                />
              ))}
            </div>
            <button
              onClick={() => goTo((active + 1) % screens.length)}
              className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all text-xl"
            >
              ›
            </button>
          </div>
          <p className="text-sm font-semibold text-primary">{screens[active].label}</p>
        </div>

        {/* Tablet & Desktop: all phones visible */}
        <div className="hidden sm:flex flex-col items-center gap-6 lg:gap-8">
          <div className="flex items-center justify-center gap-3 md:gap-5 lg:gap-6 xl:gap-8">
            {screens.map(({ src, label }, i) => (
              <PhoneMockup
                key={`${lang}-${i}`}
                src={src}
                label={label}
                isActive={i === active}
                onClick={() => goTo(i)}
              />
            ))}
          </div>

          <div className="flex gap-2.5">
            {screens.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to screen ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${i === active ? 'w-7 h-2.5 bg-primary' : 'w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400'}`}
              />
            ))}
          </div>
        </div>

        {/* Language badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="flex justify-center mt-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 border border-primary/15 rounded-full text-xs text-primary font-medium">
            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
            {i18n.language === 'te'
              ? 'తెలుగు భాషలో చూపబడుతోంది — భాష మార్చడానికి Navbar లోని EN బటన్ నొక్కండి'
              : 'Showing in English — switch to తె in navbar to see Telugu version'}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
