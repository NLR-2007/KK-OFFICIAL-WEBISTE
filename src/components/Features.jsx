import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const CARDS = [
  { icon: '🌤', titleKey: 'features.card1Title', descKey: 'features.card1Desc' },
  { icon: '👤', titleKey: 'features.card2Title', descKey: 'features.card2Desc' },
  { icon: '🤖', titleKey: 'features.card3Title', descKey: 'features.card3Desc' },
  { icon: '🔐', titleKey: 'features.card4Title', descKey: 'features.card4Desc' },
  { icon: '📍', titleKey: 'features.card5Title', descKey: 'features.card5Desc' },
  { icon: '☁️', titleKey: 'features.card6Title', descKey: 'features.card6Desc' },
]

function FeatureCard({ icon, title, desc, index }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: (index % 3) * 0.1 }}
      className="group relative bg-white dark:bg-gray-800 rounded-2xl p-5 sm:p-6
                 border border-gray-100 dark:border-gray-700 shadow-sm cursor-default
                 hover:-translate-y-1.5 hover:shadow-xl dark:hover:shadow-primary/10 transition-all duration-300"
    >
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300
                      bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
      <div className="absolute inset-0 rounded-2xl border border-primary/0 group-hover:border-primary/25
                      transition-colors duration-300 pointer-events-none" />
      <div className="relative z-10">
        <span className="text-3xl sm:text-4xl block mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300 origin-left">
          {icon}
        </span>
        <h3 className="font-poppins font-bold text-base sm:text-lg text-text-light dark:text-gray-100 mb-2 group-hover:text-primary dark:group-hover:text-green-400 transition-colors duration-200">
          {title}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  )
}

export default function Features() {
  const { t } = useTranslation()
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="features" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-light-bg dark:bg-gray-900">
      <div className="max-w-7xl 2xl:max-w-screen-xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <span className="w-1.5 h-1.5 bg-primary rounded-full" />
            <span className="text-primary text-sm font-semibold">Features</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl 2xl:text-6xl font-poppins font-extrabold text-text-light dark:text-gray-100 mb-3 sm:mb-4">
            {t('features.title')}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg max-w-xl mx-auto">{t('features.subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {CARDS.map((card, i) => (
            <FeatureCard key={i} index={i} icon={card.icon} title={t(card.titleKey)} desc={t(card.descKey)} />
          ))}
        </div>
      </div>
    </section>
  )
}
