import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const SCREENS = {
  en: [
    { src: '/app-screenshots/login-en.jpg',          label: 'Login Screen' },
    { src: '/app-screenshots/register-en.jpg',       label: 'Register' },
    { src: '/app-screenshots/home-en.jpg',           label: 'Dashboard' },
    { src: '/app-screenshots/home2-en.jpg',          label: 'Farm Tools' },
    { src: '/app-screenshots/mandi-en.jpg',          label: 'Mandi Prices' },
    { src: '/app-screenshots/disease-result-en.jpg', label: 'Disease Detection' },
    { src: '/app-screenshots/disease-detail-en.jpg', label: 'Treatment Guide' },
  ],
  te: [
    { src: '/app-screenshots/login-te.jpg',          label: 'లాగిన్ స్క్రీన్' },
    { src: '/app-screenshots/register-te.jpg',       label: 'నమోదు' },
    { src: '/app-screenshots/home-te.jpg',           label: 'డ్యాష్‌బోర్డ్' },
    { src: '/app-screenshots/home2-te.jpg',          label: 'వ్యవసాయ సాధనాలు' },
    { src: '/app-screenshots/mandi-te.jpg',          label: 'మండి ధరలు' },
    { src: '/app-screenshots/disease-result-te.jpg', label: 'వ్యాధి గుర్తింపు' },
    { src: '/app-screenshots/disease-detail-te.jpg', label: 'చికిత్స మార్గదర్శి' },
  ],
}

export default function AppGallery() {
  const { i18n } = useTranslation()
  const [active, setActive] = useState(2)
  const [direction, setDirection] = useState(1)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const timerRef = useRef(null)

  const lang = i18n.language === 'te' ? 'te' : 'en'
  const screens = SCREENS[lang]

  useEffect(() => { setActive(2) }, [lang])

  const startAutoPlay = () => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setDirection(1)
      setActive((v) => (v + 1) % screens.length)
    }, 3500)
  }

  useEffect(() => {
    if (inView) startAutoPlay()
    return () => clearInterval(timerRef.current)
  }, [inView, lang])

  const goTo = (i) => {
    setDirection(i > active ? 1 : -1)
    setActive(i)
    startAutoPlay()
  }

  const prev = () => goTo((active - 1 + screens.length) % screens.length)
  const next = () => goTo((active + 1) % screens.length)

  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-primary-dark relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-accent/10 rounded-full blur-[80px] pointer-events-none" />

      <div ref={ref} className="max-w-7xl 2xl:max-w-screen-xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/15 mb-4">
            <span className="w-1.5 h-1.5 bg-accent rounded-full" />
            <span className="text-accent text-sm font-semibold">App Gallery</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl 2xl:text-6xl font-poppins font-extrabold text-white">
            {lang === 'te' ? 'యాప్ లో చూడండి' : 'Every Feature at a Glance'}
          </h2>
          <p className="text-white/50 mt-3 text-sm sm:text-base max-w-lg mx-auto">
            {lang === 'te'
              ? 'Kisaan Krushi యాప్ లోని అన్ని స్క్రీన్‌లు'
              : 'Real screens from the Kisaan Krushi app — designed for every Indian farmer.'}
          </p>
        </motion.div>

        {/* Main carousel */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">

          {/* Phone */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Prev arrow */}
            <button
              onClick={prev}
              className="w-11 h-11 sm:w-12 sm:h-12 bg-white/10 hover:bg-accent hover:text-primary-dark text-white rounded-full flex items-center justify-center transition-all hover:scale-110 text-xl flex-shrink-0"
            >
              ‹
            </button>

            {/* Phone mockup */}
            <div className="relative w-[220px] sm:w-[240px] lg:w-[260px] h-[440px] sm:h-[480px] lg:h-[520px] flex-shrink-0">
              <div className="w-full h-full bg-gray-900 rounded-[2.5rem] p-[7px] shadow-2xl border-2 border-accent ring-4 ring-accent/20">
                <div className="w-full h-full rounded-[2rem] overflow-hidden relative">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.img
                      key={`${lang}-${active}`}
                      custom={direction}
                      variants={{
                        enter: (d) => ({ opacity: 0, x: d * 60 }),
                        center: { opacity: 1, x: 0 },
                        exit: (d) => ({ opacity: 0, x: d * -60 }),
                      }}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      src={screens[active].src}
                      alt={screens[active].label}
                      className="w-full h-full object-cover object-top absolute inset-0"
                    />
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Next arrow */}
            <button
              onClick={next}
              className="w-11 h-11 sm:w-12 sm:h-12 bg-white/10 hover:bg-accent hover:text-primary-dark text-white rounded-full flex items-center justify-center transition-all hover:scale-110 text-xl flex-shrink-0"
            >
              ›
            </button>
          </div>

          {/* Thumbnail strip */}
          <div className="flex lg:flex-col gap-2.5 sm:gap-3 flex-wrap justify-center lg:justify-start">
            {screens.map((s, i) => (
              <button
                key={`${lang}-${i}`}
                onClick={() => goTo(i)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all duration-200 text-left ${
                  i === active
                    ? 'bg-accent/20 border border-accent/50'
                    : 'bg-white/5 border border-white/10 hover:bg-white/10'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg overflow-hidden flex-shrink-0 border ${i === active ? 'border-accent' : 'border-white/20'}`}>
                  <img src={s.src} alt={s.label} className="w-full h-full object-cover object-top" loading="lazy" />
                </div>
                <span className={`text-xs font-semibold whitespace-nowrap ${i === active ? 'text-accent' : 'text-white/50'}`}>
                  {s.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {screens.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-300 ${i === active ? 'w-7 h-2.5 bg-accent' : 'w-2.5 h-2.5 bg-white/25 hover:bg-white/40'}`}
            />
          ))}
        </div>

        {/* Language badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="flex justify-center mt-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-xs text-accent font-medium">
            <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
            {lang === 'te'
              ? 'భాష మార్చడానికి Navbar లో EN నొక్కండి'
              : 'Switch to తె in the navbar to see Telugu screenshots'}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
