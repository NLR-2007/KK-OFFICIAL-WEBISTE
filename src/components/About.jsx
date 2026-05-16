import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

function FarmIllustration() {
  return (
    <div className="relative w-full h-64 sm:h-80 lg:h-full min-h-[280px] lg:min-h-[380px] bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl overflow-hidden flex items-center justify-center border border-primary/20">
      <div className="absolute w-48 sm:w-64 h-48 sm:h-64 rounded-full bg-primary/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute w-32 sm:w-40 h-32 sm:h-40 rounded-full bg-accent/10 top-4 sm:top-6 right-4 sm:right-6" />

      <svg viewBox="0 0 320 280" className="w-full h-full max-w-xs sm:max-w-sm relative z-10 px-4" fill="none">
        <circle cx="260" cy="50" r="28" fill="#F9A825" opacity="0.9" />
        <circle cx="260" cy="50" r="38" fill="#F9A825" opacity="0.2" />
        <ellipse cx="80" cy="60" rx="40" ry="18" fill="white" opacity="0.5" />
        <ellipse cx="100" cy="52" rx="30" ry="16" fill="white" opacity="0.6" />
        <rect x="0" y="220" width="320" height="60" rx="4" fill="#1B5E20" opacity="0.3" />
        <rect x="0" y="230" width="320" height="50" rx="4" fill="#2E7D32" opacity="0.2" />
        {[40, 80, 120, 160, 200, 240, 280].map((x, i) => (
          <g key={i} transform={`translate(${x}, 160)`}>
            <line x1="0" y1="0" x2="0" y2="60" stroke="#2E7D32" strokeWidth="2.5" strokeLinecap="round" />
            <ellipse cx="0" cy="-4" rx="6" ry="14" fill="#4CAF50" opacity="0.8" transform="rotate(15)" />
            <line x1="0" y1="20" x2="-12" y2="10" stroke="#2E7D32" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="0" y1="20" x2="12" y2="10" stroke="#2E7D32" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        ))}
        <g transform="translate(140, 120)">
          <rect x="-12" y="20" width="24" height="34" rx="4" fill="#1B5E20" />
          <circle cx="0" cy="12" r="14" fill="#F4A261" />
          <ellipse cx="0" cy="-1" rx="18" ry="5" fill="#F9A825" />
          <rect x="-12" y="-12" width="24" height="14" rx="3" fill="#F9A825" />
          <line x1="-12" y1="30" x2="-28" y2="44" stroke="#1B5E20" strokeWidth="6" strokeLinecap="round" />
          <line x1="12" y1="30" x2="28" y2="44" stroke="#1B5E20" strokeWidth="6" strokeLinecap="round" />
          <line x1="28" y1="44" x2="36" y2="70" stroke="#8B6914" strokeWidth="3" strokeLinecap="round" />
        </g>
        <g transform="translate(220, 110)">
          <rect x="0" y="0" width="48" height="80" rx="8" fill="#0D1B0F" stroke="#1B5E20" strokeWidth="2" />
          <rect x="4" y="8" width="40" height="50" rx="4" fill="#1B5E20" opacity="0.6" />
          <text x="24" y="30" textAnchor="middle" fill="#F9A825" fontSize="10" fontWeight="bold">AI</text>
          <text x="24" y="44" textAnchor="middle" fill="white" fontSize="6" opacity="0.8">28°C ⛅</text>
          <circle cx="24" cy="72" r="4" fill="#1B5E20" />
        </g>
        {[0, 1, 2].map((i) => (
          <path key={i}
            d={`M 244 140 Q ${264 + i * 16} ${130 - i * 8} ${248 + i * 18} ${120 - i * 12}`}
            stroke="#F9A825" strokeWidth="1.5" fill="none" opacity={0.7 - i * 0.2} strokeDasharray="4 3"
          />
        ))}
      </svg>
    </div>
  )
}

export default function About() {
  const { t } = useTranslation()
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-light-bg dark:bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.018] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#1B5E20 1px, transparent 1px)', backgroundSize: '28px 28px' }}
      />

      <div ref={ref} className="max-w-7xl 2xl:max-w-screen-xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="order-2 lg:order-1"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4 sm:mb-5">
              <span className="w-1.5 h-1.5 bg-primary rounded-full" />
              <span className="text-primary text-sm font-semibold">About</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl 2xl:text-6xl font-poppins font-extrabold text-text-light dark:text-gray-100 mb-4 sm:mb-6 leading-tight">
              {t('about.title')}
            </h2>

            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed mb-4 sm:mb-5">
              {t('about.text1')}
            </p>

            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8">
              {t('about.text2')}
            </p>

            <blockquote className="relative pl-5 sm:pl-6 border-l-4 border-primary bg-primary/5 dark:bg-primary/10 rounded-r-xl py-3 sm:py-4 pr-4">
              <div className="absolute left-3 -top-2 text-3xl sm:text-4xl text-primary/20 font-poppins font-bold leading-none">"</div>
              <p className="text-primary font-semibold text-sm sm:text-base italic">{t('about.quote')}</p>
            </blockquote>

            <div className="flex flex-wrap gap-2 sm:gap-3 mt-6 sm:mt-8">
              {[['🇮🇳', '100M+ Farmers'], ['⚡', 'Real-time AI']].map(([icon, label], i) => (
                <span key={i} className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-600 shadow-sm">
                  {icon} {label}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="order-1 lg:order-2 relative"
          >
            {/* Glow */}
            <div className="absolute -inset-4 bg-primary/20 rounded-3xl blur-2xl pointer-events-none" />

            {/* Image */}
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/10 ring-1 ring-white/5">
              <img
                src="/about-farmer.png"
                alt="Indian farmer family using Kisaan Krushi app in green rice fields at sunset"
                className="w-full h-64 sm:h-80 lg:h-[420px] object-cover"
              />
              {/* Bottom gradient */}
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
            </div>

            {/* Floating badge — top left */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="absolute -top-3 -left-3 sm:top-4 sm:left-4 flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl px-3 py-2 shadow-lg"
            >
              <span className="text-lg">🌾</span>
              <div>
                <p className="text-xs font-bold text-gray-800 dark:text-gray-100 leading-none">100M+ Farmers</p>
                <p className="text-[10px] text-gray-400 mt-0.5">Across India</p>
              </div>
            </motion.div>

            {/* Floating badge — bottom right */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="absolute -bottom-3 -right-3 sm:bottom-4 sm:right-4 flex items-center gap-2 bg-primary text-white rounded-xl px-3 py-2 shadow-lg"
            >
              <span className="text-lg">🤖</span>
              <div>
                <p className="text-xs font-bold leading-none">AI Powered</p>
                <p className="text-[10px] text-green-200 mt-0.5">Real-time insights</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
