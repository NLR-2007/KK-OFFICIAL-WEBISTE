import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

// Fill in linkedin and email for each member when available
const MEMBERS = [
  {
    name: 'Nimma Lokesh Reddy',
    role: 'Founder & CEO',
    initials: 'NL',
    color: '#1B5E20',
    linkedin: '#',
    email: 'support.kisaankrushi@gmail.com',
  },
  {
    name: 'Ramagiri Rishik Rao',
    role: 'Co-Founder & CMO',
    initials: 'RR',
    color: '#2E7D32',
    linkedin: '#',
    email: 'support.kisaankrushi@gmail.com',
  },
  {
    name: 'Vadakattu Bharath Kumar',
    role: 'Manager',
    initials: 'VB',
    color: '#388E3C',
    linkedin: '#',
    email: 'support.kisaankrushi@gmail.com',
  },
  {
    name: 'Param Manasvi',
    role: 'CTO',
    initials: 'PM',
    color: '#F9A825',
    linkedin: '#',
    email: 'support.kisaankrushi@gmail.com',
  },
  {
    name: 'MVL Samhita',
    role: 'CRO',
    initials: 'MS',
    color: '#0D1B0F',
    linkedin: '#',
    email: 'support.kisaankrushi@gmail.com',
  },
  {
    name: 'Achyuth Reddy Gomaram',
    role: 'Investor & Mentor',
    initials: 'AG',
    color: '#B45309',
    linkedin: '#',
    email: 'support.kisaankrushi@gmail.com',
  },
]

function LinkedInIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  )
}

function MemberCard({ member, index }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      className="group flex flex-col items-center text-center"
    >
      {/* Avatar */}
      <div className="relative mb-4">
        <div
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl font-poppins font-extrabold text-white shadow-lg group-hover:scale-105 transition-transform duration-300"
          style={{ backgroundColor: member.color }}
        >
          {member.initials}
        </div>
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-md -z-10 scale-110"
          style={{ backgroundColor: member.color }}
        />
      </div>

      <h3 className="font-poppins font-bold text-base sm:text-lg text-text-light dark:text-gray-100 leading-snug mb-1">
        {member.name}
      </h3>

      <span
        className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white mb-3"
        style={{ backgroundColor: member.color }}
      >
        {member.role}
      </span>

      {/* Connect links */}
      <div className="flex items-center gap-2">
        <a
          href={member.linkedin}
          target={member.linkedin !== '#' ? '_blank' : undefined}
          rel="noopener noreferrer"
          aria-label={`${member.name} on LinkedIn`}
          className="w-8 h-8 rounded-lg bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-110"
        >
          <LinkedInIcon />
        </a>
        <a
          href={`mailto:${member.email}`}
          aria-label={`Email ${member.name}`}
          className="w-8 h-8 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-110"
        >
          <EmailIcon />
        </a>
      </div>
    </motion.div>
  )
}

export default function Team() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section id="team" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-light-bg dark:bg-gray-900 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04] pointer-events-none"
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
            <span className="w-1.5 h-1.5 bg-primary rounded-full" />
            <span className="text-primary text-sm font-semibold">Our Team</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl 2xl:text-6xl font-poppins font-extrabold text-text-light dark:text-gray-100 mb-3 leading-tight">
            The People Behind<br className="hidden sm:block" /> Kisaan Krushi
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg max-w-xl mx-auto">
            A passionate team building the future of Indian agriculture.
          </p>
        </motion.div>

        {/* Cards — 3 + 3 */}
        <div className="flex flex-col items-center gap-10 sm:gap-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-10 lg:gap-16 w-full max-w-3xl mx-auto">
            {MEMBERS.slice(0, 3).map((m, i) => (
              <MemberCard key={m.name} member={m} index={i} />
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-10 lg:gap-16 w-full max-w-3xl mx-auto">
            {MEMBERS.slice(3).map((m, i) => (
              <MemberCard key={m.name} member={m} index={i + 3} />
            ))}
          </div>
        </div>

        {/* Bottom badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="flex justify-center mt-12 sm:mt-14"
        >
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-primary/5 border border-primary/15 rounded-full text-sm text-primary font-semibold">
            <img src="/logo.jpg" alt="KK" className="w-5 h-5 rounded object-contain" />
            KK Team · Hyderabad, Telangana
          </div>
        </motion.div>
      </div>
    </section>
  )
}
