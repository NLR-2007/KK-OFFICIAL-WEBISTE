import { Link } from 'react-router-dom'

function Section({ number, title, children }) {
  return (
    <div className="mb-10">
      <div className="flex items-start gap-3 mb-4">
        <span className="flex-shrink-0 w-8 h-8 bg-primary/10 text-primary rounded-lg flex items-center justify-center text-sm font-bold font-poppins">
          {number}
        </span>
        <h2 className="text-lg sm:text-xl font-poppins font-bold text-gray-800 dark:text-gray-100 leading-snug pt-0.5">{title}</h2>
      </div>
      <div className="pl-11">{children}</div>
    </div>
  )
}

function SubSection({ title, children }) {
  return (
    <div className="mb-5">
      <h3 className="font-semibold text-gray-700 mb-2 text-sm sm:text-base">{title}</h3>
      {children}
    </div>
  )
}

function P({ children }) {
  return <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed mb-3">{children}</p>
}

function BulletList({ items }) {
  return (
    <ul className="space-y-1.5 mb-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 text-gray-600 dark:text-gray-300 text-sm sm:text-base">
          <span className="flex-shrink-0 w-1.5 h-1.5 bg-primary rounded-full mt-2" />
          {item}
        </li>
      ))}
    </ul>
  )
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-light-bg dark:bg-gray-900">
      {/* Banner */}
      <div className="bg-gradient-to-br from-primary-dark via-primary to-[#2E7D32] pt-20 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-green-300 hover:text-white text-sm mb-6 transition-colors group"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 mb-4">
            <span className="w-1.5 h-1.5 bg-accent rounded-full" />
            <span className="text-green-200 text-xs font-medium">Legal Document</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-poppins font-extrabold text-white mb-3 leading-tight">
            Privacy Policy
          </h1>
          <p className="text-green-300 text-sm">Effective Date: May 16, 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 sm:p-8 lg:p-12">

          <P>
            Welcome to Kisaan Krushi. Your privacy is important to us. This Privacy Policy explains how Kisaan Krushi
            collects, uses, stores, and protects your information when you use our website, mobile application, and
            related services.
          </P>
          <P>By using Kisaan Krushi, you agree to the terms described in this Privacy Policy.</P>

          <div className="my-8 border-t border-gray-100" />

          <Section number="1" title="Information We Collect">
            <P>We may collect the following types of information:</P>

            <SubSection title="1.1 Personal Information">
              <P>When you register or use our services, we may collect:</P>
              <BulletList items={[
                'Full name',
                'Mobile number',
                'Email address',
                'Location details',
                'Profile information',
                'Government-issued agricultural details (if voluntarily provided)',
              ]} />
            </SubSection>

            <SubSection title="1.2 Agricultural Information">
              <P>To provide farming-related services, we may collect:</P>
              <BulletList items={[
                'Soil test values',
                'Crop information',
                'Land details',
                'Irrigation details',
                'Disease-related crop images',
                'Fertilizer usage data',
                'Weather-related farming preferences',
              ]} />
            </SubSection>

            <SubSection title="1.3 Device & Technical Information">
              <P>We may automatically collect:</P>
              <BulletList items={[
                'Device type',
                'Browser type',
                'IP address',
                'Operating system',
                'Usage activity',
                'Cookies and analytics data',
              ]} />
            </SubSection>
          </Section>

          <Section number="2" title="How We Use Your Information">
            <P>We use collected information to:</P>
            <BulletList items={[
              'Provide personalized agricultural recommendations',
              'Analyze soil and crop conditions',
              'Detect crop diseases',
              'Improve farming productivity',
              'Offer weather-based alerts',
              'Improve our platform and services',
              'Provide customer support',
              'Prevent fraud and misuse',
              'Send notifications and updates',
            ]} />
          </Section>

          <Section number="3" title="Crop Disease Image Processing">
            <P>When users upload crop images for disease detection:</P>
            <BulletList items={[
              'Images are processed using AI-based systems',
              'Images may be stored temporarily for analysis improvement',
              'We do not claim ownership of uploaded images',
              'Users remain responsible for uploaded content',
            ]} />
          </Section>

          <Section number="4" title="Sharing of Information">
            <P>We do not sell personal information.</P>
            <P>However, information may be shared with:</P>
            <BulletList items={[
              'Agricultural experts and consultants',
              'Government agricultural departments',
              'Technology service providers',
              'Cloud storage providers',
              'Legal authorities when required by law',
            ]} />
            <P>All third-party partners are required to maintain confidentiality and data protection standards.</P>
          </Section>

          <Section number="5" title="Data Security">
            <P>We implement industry-standard security measures including:</P>
            <BulletList items={[
              'Encrypted data transmission',
              'Secure cloud storage',
              'Access control systems',
              'Regular security monitoring',
            ]} />
            <P>
              Despite our efforts, no online system is completely secure. Users are encouraged to protect their
              login credentials.
            </P>
          </Section>

          <Section number="6" title="Cookies & Tracking Technologies">
            <P>Kisaan Krushi may use cookies and similar technologies to:</P>
            <BulletList items={[
              'Improve user experience',
              'Analyze website traffic',
              'Remember user preferences',
              'Enhance website functionality',
            ]} />
            <P>
              Users may disable cookies through browser settings, though some features may not function properly.
            </P>
          </Section>

          <Section number="7" title="User Rights">
            <P>Users may have the right to:</P>
            <BulletList items={[
              'Access their data',
              'Correct inaccurate information',
              'Delete their account',
              'Request data removal',
              'Withdraw consent for certain services',
            ]} />
            <P>Requests can be submitted through our support contact.</P>
          </Section>

          <Section number="8" title="Children's Privacy">
            <P>
              Kisaan Krushi is not intended for children under 13 years of age. We do not knowingly collect
              personal information from children.
            </P>
          </Section>

          <Section number="9" title="Third-Party Links">
            <P>
              Our platform may contain links to external websites or services. We are not responsible for the
              privacy practices or content of third-party websites.
            </P>
          </Section>

          <Section number="10" title="Data Retention">
            <P>We retain information only as long as necessary to:</P>
            <BulletList items={[
              'Provide services',
              'Meet legal obligations',
              'Improve agricultural recommendations',
              'Resolve disputes',
            ]} />
            <P>Unused or inactive data may be deleted periodically.</P>
          </Section>

          <Section number="11" title="Changes to This Privacy Policy">
            <P>
              We may update this Privacy Policy from time to time. Updated versions will be posted on this page
              with a revised effective date.
            </P>
            <P>
              Continued use of Kisaan Krushi after updates means acceptance of the revised policy.
            </P>
          </Section>

          <Section number="12" title="Contact Us">
            <P>For questions regarding this Privacy Policy, contact:</P>
            <div className="bg-primary/5 border border-primary/15 rounded-xl p-5 mt-2">
              <p className="font-semibold text-gray-800 mb-1">Kisaan Krushi Support Team</p>
              <a
                href="mailto:support.kisaankrushi@gmail.com"
                className="text-primary hover:underline text-sm block mb-1"
              >
                support.kisaankrushi@gmail.com
              </a>
            </div>
          </Section>

          <div className="mt-10 pt-8 border-t border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-xs text-gray-400 dark:text-gray-500">Last updated: May 16, 2026 · Kisaan Krushi</p>
            <Link
              to="/terms"
              className="text-primary hover:text-primary-light text-sm font-semibold flex items-center gap-1 transition-colors"
            >
              View Terms & Conditions
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
