import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const TECHS = [
  {
    name: 'Flutter',
    descKey: 'techStack.flutterDesc',
    color: '#54C5F8',
    icon: (
      <svg viewBox="0 0 48 48" className="w-9 h-9 sm:w-10 sm:h-10">
        <polygon points="14,28 24,38 34,28 24,18" fill="#54C5F8" />
        <polygon points="14,20 24,10 34,20 24,30" fill="#54C5F8" opacity="0.7" />
      </svg>
    ),
  },
  {
    name: 'Firebase',
    descKey: 'techStack.firebaseDesc',
    color: '#FFCA28',
    icon: (
      <svg viewBox="0 0 48 48" className="w-9 h-9 sm:w-10 sm:h-10">
        <path d="M8 38L14 18L22 26Z" fill="#FFCA28" />
        <path d="M22 26L30 8L38 38Z" fill="#FFA000" />
        <path d="M8 38L22 26L38 38Z" fill="#FF6D00" opacity="0.5" />
      </svg>
    ),
  },
  {
    name: 'React.js',
    descKey: 'techStack.reactDesc',
    color: '#61DAFB',
    icon: (
      <svg viewBox="0 0 48 48" className="w-9 h-9 sm:w-10 sm:h-10">
        <circle cx="24" cy="24" r="4" fill="#61DAFB" />
        <ellipse cx="24" cy="24" rx="20" ry="8" fill="none" stroke="#61DAFB" strokeWidth="2" />
        <ellipse cx="24" cy="24" rx="20" ry="8" fill="none" stroke="#61DAFB" strokeWidth="2" transform="rotate(60 24 24)" />
        <ellipse cx="24" cy="24" rx="20" ry="8" fill="none" stroke="#61DAFB" strokeWidth="2" transform="rotate(-60 24 24)" />
      </svg>
    ),
  },
  {
    name: 'Node.js',
    descKey: 'techStack.nodejsDesc',
    color: '#83CD29',
    icon: (
      <svg viewBox="0 0 48 48" className="w-9 h-9 sm:w-10 sm:h-10">
        <polygon points="24,6 40,15 40,33 24,42 8,33 8,15" fill="#83CD29" opacity="0.15" />
        <polygon points="24,6 40,15 40,33 24,42 8,33 8,15" fill="none" stroke="#83CD29" strokeWidth="2" />
        <text x="24" y="29" textAnchor="middle" fill="#83CD29" fontSize="9" fontWeight="bold">Node</text>
      </svg>
    ),
  },
  {
    name: 'OpenWeatherMap',
    descKey: 'techStack.openweatherDesc',
    color: '#EB6E4B',
    icon: (
      <svg viewBox="0 0 48 48" className="w-9 h-9 sm:w-10 sm:h-10">
        <circle cx="18" cy="24" r="8" fill="#FFC107" opacity="0.8" />
        <path d="M28 20a8 8 0 0 1 0 16H14a6 6 0 0 1 0-12 6 6 0 0 1 10-4z" fill="#78B9FF" opacity="0.8" />
      </svg>
    ),
  },
  {
    name: 'Dart',
    descKey: 'techStack.dartDesc',
    color: '#00B4AB',
    icon: (
      <svg viewBox="0 0 48 48" className="w-9 h-9 sm:w-10 sm:h-10">
        <path d="M8 12L18 8L40 30L36 40L14 40Z" fill="#00B4AB" opacity="0.2" />
        <path d="M8 12L18 8L40 30L36 40L14 40Z" fill="none" stroke="#00B4AB" strokeWidth="2" />
        <circle cx="22" cy="22" r="4" fill="#00B4AB" />
      </svg>
    ),
  },
]

function TechCard({ tech, index }) {
  const { t } = useTranslation()
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: (index % 3) * 0.1 }}
      className="group relative bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6
                 hover:-translate-y-1.5 transition-all duration-300 cursor-default"
    >
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ boxShadow: `0 0 24px ${tech.color}40, inset 0 0 0 1px ${tech.color}40` }}
      />
      <div className="relative z-10 flex flex-col items-start gap-3 sm:gap-4">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center" style={{ backgroundColor: tech.color + '18' }}>
          {tech.icon}
        </div>
        <div>
          <h3 className="font-poppins font-bold text-base sm:text-lg text-text-dark mb-1">{tech.name}</h3>
          <p className="text-white/50 text-xs sm:text-sm leading-relaxed">{t(tech.descKey)}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function TechStack() {
  const { t } = useTranslation()
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 })

  return (
    <section id="tech-stack" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-primary-dark relative overflow-hidden">
      <div className="absolute top-0 left-1/3 w-72 sm:w-96 h-72 sm:h-96 bg-primary/15 rounded-full blur-[80px] lg:blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/3 w-60 sm:w-80 h-60 sm:h-80 bg-accent/8 rounded-full blur-[60px] lg:blur-[80px] pointer-events-none" />

      <div className="max-w-7xl 2xl:max-w-screen-xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/15 mb-4">
            <span className="w-1.5 h-1.5 bg-accent rounded-full" />
            <span className="text-accent text-sm font-semibold">Tech Stack</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl 2xl:text-6xl font-poppins font-extrabold text-text-dark mb-3 sm:mb-4">
            {t('techStack.title')}
          </h2>
          <p className="text-white/50 text-base sm:text-lg max-w-xl mx-auto">{t('techStack.subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {TECHS.map((tech, i) => <TechCard key={i} tech={tech} index={i} />)}
        </div>
      </div>
    </section>
  )
}
