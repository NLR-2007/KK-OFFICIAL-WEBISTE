import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const PHOTOS = [
  '/event-photos/photo_6073358591961272203_y.jpg',
  '/event-photos/photo_6073358591961272204_y.jpg',
]

function Lightbox({ src, onClose, onPrev, onNext }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev() }}
        className="absolute left-3 sm:left-6 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors text-xl"
      >
        ‹
      </button>

      {/* Image */}
      <motion.img
        key={src}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        src={src}
        alt="Event photo"
        className="max-h-[85vh] max-w-[90vw] object-contain rounded-xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext() }}
        className="absolute right-3 sm:right-6 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors text-xl"
      >
        ›
      </button>
    </motion.div>
  )
}

function PhotoCard({ src, index, onClick }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 6) * 0.08 }}
      onClick={() => onClick(index)}
      className="group relative overflow-hidden rounded-2xl cursor-pointer bg-gray-100 dark:bg-gray-800 aspect-[3/2] shadow-lg hover:shadow-2xl transition-shadow duration-300"
    >
      <img
        src={src}
        alt={`Event photo ${index + 1}`}
        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-primary-dark/0 group-hover:bg-primary-dark/30 transition-colors duration-300 flex items-center justify-center">
        <svg
          className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
        </svg>
      </div>
    </motion.div>
  )
}

export default function Milestone() {
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })

  const openLightbox = (i) => setLightboxIndex(i)
  const closeLightbox = () => setLightboxIndex(null)
  const prevPhoto = () => setLightboxIndex((i) => (i - 1 + PHOTOS.length) % PHOTOS.length)
  const nextPhoto = () => setLightboxIndex((i) => (i + 1) % PHOTOS.length)

  return (
    <>
      <section id="milestone" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 relative overflow-hidden">
        {/* Subtle dot pattern */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(#1B5E20 1px, transparent 1px)', backgroundSize: '28px 28px' }}
        />

        <div ref={ref} className="max-w-7xl 2xl:max-w-screen-xl mx-auto relative z-10">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
              <span className="text-primary text-sm font-semibold">Our Milestone</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl 2xl:text-6xl font-poppins font-extrabold text-text-light dark:text-gray-100 mb-4 leading-tight">
              A Special Day for<br className="hidden sm:block" /> Kisaan Krushi
            </h2>

            {/* Highlight card */}
            <div className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mt-2 px-5 sm:px-8 py-4 bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/15 rounded-2xl max-w-2xl mx-auto">
              <div className="flex-shrink-0 w-12 h-12 bg-white dark:bg-gray-800 rounded-xl shadow flex items-center justify-center overflow-hidden border border-primary/10">
                <img src="/logo.jpg" alt="Kisaan Krushi" className="w-full h-full object-contain" />
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed text-center sm:text-left">
                We had the honour of meeting <span className="font-bold text-primary">Sri Harish Rao Garu</span> and officially launching the{' '}
                <span className="font-bold text-primary">Kisaan Krushi logo</span> — a proud moment for our team and every farmer we serve.
              </p>
            </div>
          </motion.div>

          {/* Two large event photos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {PHOTOS.map((src, i) => (
              <PhotoCard key={i} src={src} index={i} onClick={openLightbox} />
            ))}
          </div>

          {/* Footer note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="flex justify-center mt-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 border border-primary/15 rounded-full text-xs text-primary font-medium">
              <span>🇮🇳</span>
              <span>Hyderabad, Telangana · Kisaan Krushi Logo Launch</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            src={PHOTOS[lightboxIndex]}
            onClose={closeLightbox}
            onPrev={prevPhoto}
            onNext={nextPhoto}
          />
        )}
      </AnimatePresence>
    </>
  )
}
