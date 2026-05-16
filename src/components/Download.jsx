import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'


const APK_URL = '#'

const _raw = import.meta.env.VITE_API_URL || ''
const API_BASE = _raw.startsWith('https://') ? _raw : 'https://us-central1-kisaan-krushi-a9b0e.cloudfunctions.net/api'

async function getDownloadCount() {
  try {
    const response = await fetch(`${API_BASE}/stats`)
    if (!response.ok) return 0
    const data = await response.json()
    return data.downloadCount ?? 0
  } catch { return 0 }
}

async function incrementDownloadCount() {
  try {
    await fetch(`${API_BASE}/download`, { method: 'POST' })
  } catch { /* non-critical */ }
}


export default function Download() {
  const { t } = useTranslation()
  const [count, setCount] = useState(null)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  useEffect(() => { getDownloadCount().then(setCount) }, [])

  const handleDownload = async () => {
    await incrementDownloadCount()
    setCount((prev) => (prev !== null ? prev + 1 : 1))
    if (APK_URL !== '#') window.open(APK_URL, '_blank', 'noopener noreferrer')
  }

  return (
    <section id="download" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500 via-yellow-400 to-amber-600" />
      <div className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#7B4200 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }}
      />
      <div className="absolute -top-24 sm:-top-32 -right-24 sm:-right-32 w-64 sm:w-80 h-64 sm:h-80 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-16 sm:-bottom-20 -left-16 sm:-left-20 w-56 sm:w-64 h-56 sm:h-64 bg-primary/20 rounded-full blur-2xl pointer-events-none" />

      <div ref={ref} className="max-w-3xl 2xl:max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-2xl shadow-primary/30 overflow-hidden">
            <img src="/logo.jpg" alt="Kisaan Krushi" className="w-full h-full object-contain" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl 2xl:text-6xl font-poppins font-extrabold text-primary-dark mb-3 sm:mb-4 leading-tight px-2">
            {t('download.title')}
          </h2>

          <p className="text-amber-900/80 text-base sm:text-lg mb-8 sm:mb-10 max-w-lg mx-auto px-2">
            {t('download.subtitle')}
          </p>

          <div className="flex justify-center mb-8 sm:mb-10">
            <button
              onClick={handleDownload}
              className="group flex items-center justify-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 bg-primary text-white font-bold rounded-full text-sm sm:text-base
                         hover:bg-primary-light transition-all shadow-xl shadow-primary/40 hover:scale-105 active:scale-95 min-h-[52px]"
            >
              <svg className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              {t('download.downloadApk')}
            </button>
          </div>

          {count !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-primary/15 rounded-full mb-8 sm:mb-10 border border-primary/20"
            >
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-primary-dark font-semibold text-xs sm:text-sm">
                {t('download.downloadedBy', { count: count.toLocaleString('en-IN') })}
              </span>
            </motion.div>
          )}

        </motion.div>
      </div>
    </section>
  )
}
