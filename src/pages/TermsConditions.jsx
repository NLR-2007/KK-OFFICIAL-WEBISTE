import { Link } from 'react-router-dom'

function Section({ number, title, children }) {
  return (
    <div className="mb-10">
      <div className="flex items-start gap-3 mb-4">
        <span className="flex-shrink-0 w-8 h-8 bg-accent/20 text-amber-700 dark:text-amber-400 rounded-lg flex items-center justify-center text-sm font-bold font-poppins">
          {number}
        </span>
        <h2 className="text-lg sm:text-xl font-poppins font-bold text-gray-800 dark:text-gray-100 leading-snug pt-0.5">{title}</h2>
      </div>
      <div className="pl-11">{children}</div>
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
          <span className="flex-shrink-0 w-1.5 h-1.5 bg-accent rounded-full mt-2" />
          {item}
        </li>
      ))}
    </ul>
  )
}

function Disclaimer({ children }) {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 my-4">
      <div className="flex items-start gap-2">
        <span className="text-amber-500 text-lg flex-shrink-0">⚠️</span>
        <p className="text-amber-800 text-sm leading-relaxed">{children}</p>
      </div>
    </div>
  )
}

export default function TermsConditions() {
  return (
    <div className="min-h-screen bg-light-bg dark:bg-gray-900">
      {/* Banner */}
      <div className="bg-gradient-to-br from-amber-700 via-amber-600 to-amber-500 pt-20 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-amber-200 hover:text-white text-sm mb-6 transition-colors group"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 mb-4">
            <span className="w-1.5 h-1.5 bg-white rounded-full" />
            <span className="text-amber-100 text-xs font-medium">Legal Document</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-poppins font-extrabold text-white mb-3 leading-tight">
            Terms &amp; Conditions
          </h1>
          <p className="text-amber-200 text-sm">Effective Date: May 16, 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 sm:p-8 lg:p-12">

          <P>
            Welcome to Kisaan Krushi. By accessing or using our platform, you agree to comply with the following
            Terms &amp; Conditions.
          </P>
          <P>If you do not agree with these terms, please do not use our services.</P>

          <div className="my-8 border-t border-gray-100" />

          <Section number="1" title="About Kisaan Krushi">
            <P>Kisaan Krushi is an agricultural assistance platform designed to help farmers with:</P>
            <BulletList items={[
              'Soil analysis',
              'Crop recommendations',
              'Disease identification',
              'Fertilizer guidance',
              'Weather information',
              'Agricultural education and awareness',
            ]} />
          </Section>

          <Section number="2" title="User Responsibilities">
            <P>By using Kisaan Krushi, users agree:</P>
            <BulletList items={[
              'To provide accurate information',
              'Not to misuse the platform',
              'Not to upload illegal, harmful, or misleading content',
              'Not to attempt unauthorized access to systems',
              'Not to use the platform for fraudulent purposes',
            ]} />
            <P>Users are solely responsible for their farming decisions and activities.</P>
          </Section>

          <Section number="3" title="Agricultural Recommendations Disclaimer">
            <P>Kisaan Krushi provides AI-assisted and research-based recommendations.</P>
            <Disclaimer>
              Results may vary depending on local conditions. Weather changes may affect crop outcomes. Disease
              detection may not always be 100% accurate. Users should consult agricultural experts when
              necessary. Kisaan Krushi is not liable for crop loss, financial loss, or farming damages.
            </Disclaimer>
          </Section>

          <Section number="4" title="User Accounts">
            <P>Users may need to create an account to access certain services.</P>
            <P>Users are responsible for:</P>
            <BulletList items={[
              'Maintaining password confidentiality',
              'Protecting account access',
              'All activities under their account',
            ]} />
            <P>
              We reserve the right to suspend accounts involved in suspicious or abusive activities.
            </P>
          </Section>

          <Section number="5" title="Intellectual Property">
            <P>All platform content including:</P>
            <BulletList items={[
              'Logos',
              'Text',
              'Graphics',
              'Software',
              'AI models',
              'Designs',
            ]} />
            <P>
              are owned by Kisaan Krushi unless otherwise stated. Unauthorized copying or distribution is
              prohibited.
            </P>
          </Section>

          <Section number="6" title="Uploaded Content">
            <P>Users retain ownership of uploaded images and farming data.</P>
            <P>By uploading content, users grant Kisaan Krushi permission to:</P>
            <BulletList items={[
              'Process uploaded data',
              'Improve agricultural AI systems',
              'Analyze farming patterns',
              'Enhance platform services',
            ]} />
            <P>Illegal or harmful content may be removed without notice.</P>
          </Section>

          <Section number="7" title="Service Availability">
            <P>We aim to provide uninterrupted services, but we do not guarantee:</P>
            <BulletList items={[
              'Continuous availability',
              'Error-free operation',
              'Complete system accuracy',
            ]} />
            <P>
              Services may be temporarily unavailable during maintenance or technical issues.
            </P>
          </Section>

          <Section number="8" title="Limitation of Liability">
            <Disclaimer>
              Kisaan Krushi shall not be responsible for: crop damage, financial losses, data loss,
              weather-related farming failures, incorrect farming decisions, or third-party service failures.
              Users use the platform at their own risk.
            </Disclaimer>
          </Section>

          <Section number="9" title="Termination of Access">
            <P>We reserve the right to suspend or terminate user access if:</P>
            <BulletList items={[
              'Terms are violated',
              'Fraudulent activity is detected',
              'Platform misuse occurs',
              'Harmful activities are identified',
            ]} />
          </Section>

          <Section number="10" title="Third-Party Services">
            <P>Some services may rely on third-party providers including:</P>
            <BulletList items={[
              'Weather APIs',
              'Cloud hosting services',
              'Analytics tools',
              'Mapping services',
            ]} />
            <P>We are not responsible for failures caused by third-party services.</P>
          </Section>

          <Section number="11" title="Governing Law">
            <P>
              These Terms shall be governed by the laws of India. Any disputes shall fall under the
              jurisdiction of the appropriate courts in India.
            </P>
          </Section>

          <Section number="12" title="Changes to Terms">
            <P>
              Kisaan Krushi may modify these Terms at any time. Updated versions will be posted on this page.
              Continued use of the platform indicates acceptance of updated terms.
            </P>
          </Section>

          <Section number="13" title="Contact Information">
            <P>For support or legal inquiries:</P>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mt-2">
              <p className="font-semibold text-gray-800 mb-1">Kisaan Krushi Team</p>
              <a
                href="mailto:support.kisaankrushi@gmail.com"
                className="text-amber-700 hover:underline text-sm block mb-1"
              >
                support.kisaankrushi@gmail.com
              </a>
            </div>
          </Section>

          <div className="mt-10 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-xs text-gray-400">Last updated: May 16, 2026 · Kisaan Krushi</p>
            <Link
              to="/privacy"
              className="text-primary hover:text-primary-light text-sm font-semibold flex items-center gap-1 transition-colors"
            >
              View Privacy Policy
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
