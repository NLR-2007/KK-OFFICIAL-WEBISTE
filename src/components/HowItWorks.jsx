import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const STEPS = [
  { num: '01', icon: '📲', titleKey: 'howItWorks.step1Title', descKey: 'howItWorks.step1Desc', color: '#1B5E20' },
  { num: '02', icon: '📝', titleKey: 'howItWorks.step2Title', descKey: 'howItWorks.step2Desc', color: '#2E7D32' },
  { num: '03', icon: '🤖', titleKey: 'howItWorks.step3Title', descKey: 'howItWorks.step3Desc', color: '#F9A825' },
]

function StepCard({ step, index, total }) {
  const { t } = useTranslation()
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 })
  const isLast = index === total - 1

  return (
    <div ref={ref} className="flex flex-col items-center relative w-full">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.15 }}
        className="flex flex-col items-center text-center w-full px-2 sm:px-4 lg:px-6"
      >
        <div className="relative mb-4 sm:mb-5">
          <div
            className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full flex items-center justify-center text-2xl sm:text-3xl lg:text-4xl shadow-lg ring-4 ring-white dark:ring-gray-800"
            style={{ background: `linear-gradient(135deg, ${step.color}22, ${step.color}44)` }}
          >
            {step.icon}
          </div>
          <span
            className="absolute -top-1 -right-1 text-[10px] sm:text-xs font-poppins font-extrabold px-1.5 sm:px-2 py-0.5 rounded-full text-white shadow-sm"
            style={{ backgroundColor: step.color }}
          >
            {step.num}
          </span>
        </div>

        <h3 className="font-poppins font-bold text-base sm:text-lg lg:text-xl text-text-light dark:text-gray-100 mb-2 sm:mb-3">
          {t(step.titleKey)}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-[260px] sm:max-w-xs mx-auto">
          {t(step.descKey)}
        </p>
      </motion.div>

      {!isLast && (
        <motion.div
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.15 + 0.35 }}
          className="lg:hidden w-0.5 h-8 sm:h-10 bg-gradient-to-b from-primary/30 to-primary/10 my-3 sm:my-4 rounded-full origin-top"
        />
      )}
    </div>
  )
}

export default function HowItWorks() {
  const { t } = useTranslation()
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 })

  return (
    <section id="how-it-works" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#1B5E20 1px, transparent 1px)', backgroundSize: '28px 28px' }}
      />

      <div className="max-w-7xl 2xl:max-w-screen-xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14 lg:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <span className="w-1.5 h-1.5 bg-primary rounded-full" />
            <span className="text-primary text-sm font-semibold">How It Works</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl 2xl:text-6xl font-poppins font-extrabold text-text-light dark:text-gray-100">
            {t('howItWorks.title')}
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-center gap-0 lg:gap-0">
          {STEPS.map((step, i) => (
            <div key={i} className="flex flex-col lg:flex-row items-center w-full lg:w-auto lg:flex-1">
              <StepCard step={step} index={i} total={STEPS.length} />
              {i < STEPS.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={inView ? { opacity: 1, scaleX: 1 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.15 + 0.4 }}
                  className="hidden lg:flex items-center justify-center flex-shrink-0 w-12 xl:w-16 origin-left mt-0 -mt-8"
                >
                  <svg className="w-8 h-8 xl:w-10 xl:h-10 text-primary/30 dark:text-primary/50" fill="none" viewBox="0 0 40 40">
                    <path stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                      d="M8 20h24M26 12l8 8-8 8" />
                  </svg>
                </motion.div>
              )}
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-10 sm:mt-14"
        >
          <button
            onClick={() => {
              const el = document.getElementById('download')
              if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' })
            }}
            className="inline-flex items-center gap-2 px-7 sm:px-8 py-3 sm:py-3.5 bg-primary text-white font-semibold rounded-full
                       hover:bg-primary-light transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/30 min-h-[48px]"
          >
            <span>Get Started</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  )
}
