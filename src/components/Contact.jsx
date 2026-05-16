import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import toast from 'react-hot-toast'
const CONTACT_EMAIL = 'support.kisaankrushi@gmail.com'
function validate(form, t) {
  if (!form.name.trim()) return t('contact.nameLabel') + ' is required'
  if (!form.email.trim()) return t('contact.emailLabel') + ' is required'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Invalid email format'
  if (!form.message.trim()) return t('contact.messageLabel') + ' is required'
  if (form.name.length > 100) return 'Name is too long'
  if (form.message.length > 1000) return 'Message is too long'
  return null
}

function InfoCard({ icon, labelKey, value }) {
  const { t } = useTranslation()
  return (
    <div className="flex items-start gap-3 sm:gap-4 p-3.5 sm:p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
      <div className="w-9 h-9 sm:w-10 sm:h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 text-base sm:text-lg">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs text-gray-400 dark:text-gray-500 font-medium mb-0.5">{t(labelKey)}</p>
        <p className="text-text-light dark:text-gray-200 font-semibold text-xs sm:text-sm break-words">{value}</p>
      </div>
    </div>
  )
}

export default function Contact() {
  const { t, i18n } = useTranslation()
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 })
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    const err = validate(form, t)
    if (err) { toast.error(err); return }
    setLoading(true)
    try {
      const clean = {
        name: form.name.trim().slice(0, 100),
        email: form.email.trim().slice(0, 200),
        phone: form.phone.trim().slice(0, 20),
        message: form.message.trim().slice(0, 1000),
        language: i18n.language,
      }

      const _raw = import.meta.env.VITE_API_URL || ''
      const apiBase = _raw.startsWith('https://') ? _raw : 'https://us-central1-kisaan-krushi-a9b0e.cloudfunctions.net/api'
      const response = await fetch(`${apiBase}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clean),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to send message')
      }

      toast.success(t('contact.success'))
      setForm({ name: '', email: '', phone: '', message: '' })
    } catch (err) {
      console.error('Contact submit error:', err)
      toast.error(t('contact.error'))
    } finally {
      setLoading(false)
    }
  }

  const inputClass =
    'w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-text-light dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all placeholder-gray-400 dark:placeholder-gray-500'

  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-light-bg dark:bg-gray-900">
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
            <span className="text-primary text-sm font-semibold">Contact</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl 2xl:text-6xl font-poppins font-extrabold text-text-light dark:text-gray-100 mb-3 sm:mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg max-w-xl mx-auto">{t('contact.subtitle')}</p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-12">

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-5 sm:p-7 lg:p-8 space-y-4 sm:space-y-5">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 mb-1.5">
                    {t('contact.nameLabel')} <span className="text-red-400">*</span>
                  </label>
                  <input type="text" name="name" value={form.name} onChange={handleChange}
                    placeholder={t('contact.namePlaceholder')} className={inputClass} maxLength={100} required />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 mb-1.5">
                    {t('contact.emailLabel')} <span className="text-red-400">*</span>
                  </label>
                  <input type="email" name="email" value={form.email} onChange={handleChange}
                    placeholder={t('contact.emailPlaceholder')} className={inputClass} required />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 mb-1.5">
                  {t('contact.phoneLabel')}
                </label>
                <input type="tel" name="phone" value={form.phone} onChange={handleChange}
                  placeholder={t('contact.phonePlaceholder')} className={inputClass} maxLength={20} />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 mb-1.5">
                  {t('contact.messageLabel')} <span className="text-red-400">*</span>
                </label>
                <textarea name="message" value={form.message} onChange={handleChange}
                  placeholder={t('contact.messagePlaceholder')} rows={5}
                  className={`${inputClass} resize-none`} maxLength={1000} required />
                <p className="text-right text-xs text-gray-300 mt-1">{form.message.length}/1000</p>
              </div>

              <button type="submit" disabled={loading}
                className="w-full py-3 sm:py-3.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-light transition-all
                           disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-primary/30
                           flex items-center justify-center gap-2 text-sm sm:text-base min-h-[48px]"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Sending…
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    {t('contact.submit')}
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Info cards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 flex flex-col gap-3 sm:gap-4"
          >
            <InfoCard icon="📧" labelKey="contact.infoEmailLabel" value={CONTACT_EMAIL} />
            <InfoCard icon="📍" labelKey="contact.infoLocationLabel" value={t('contact.infoLocationValue')} />
            <InfoCard icon="🌐" labelKey="contact.infoLanguageLabel" value={t('contact.infoLanguageValue')} />

            <div className="mt-1 sm:mt-2 p-4 sm:p-5 bg-primary rounded-xl text-white">
              <div className="text-xl sm:text-2xl mb-2">⚡</div>
              <h4 className="font-poppins font-bold text-sm sm:text-base mb-1">Quick Response</h4>
              <p className="text-green-200 text-xs sm:text-sm leading-relaxed">
                We typically respond within 24 hours. For urgent queries, reach out via email directly.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
