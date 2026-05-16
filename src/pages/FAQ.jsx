import { useState } from 'react'
import { Link } from 'react-router-dom'

const FAQS = [
  {
    q: 'What is Kisaan Krushi?',
    a: (
      <>
        <p>Kisaan Krushi is an agriculture support platform designed to help farmers with:</p>
        <ul>
          {['Crop recommendations', 'Soil analysis', 'Disease detection', 'Fertilizer suggestions', 'Weather updates', 'Farming guidance'].map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p>The platform uses AI technology and agricultural knowledge to support better farming decisions.</p>
      </>
    ),
  },
  {
    q: 'Is Kisaan Krushi free to use?',
    a: 'Yes, many features of Kisaan Krushi are free for farmers. Some advanced services or premium expert consultations may require payment in the future.',
  },
  {
    q: 'How does crop disease detection work?',
    a: 'Users can upload crop images through the platform. Our AI system analyzes the images and identifies possible diseases along with recommended treatments and prevention methods.',
  },
  {
    q: 'Is disease detection 100% accurate?',
    a: 'No. While Kisaan Krushi uses advanced AI models and agricultural data, results may vary depending on image quality, crop conditions, and environmental factors. Farmers are encouraged to consult local agricultural experts when necessary.',
  },
  {
    q: 'What crops are supported?',
    a: (
      <>
        <p>Kisaan Krushi supports multiple crops including:</p>
        <ul>
          {['Rice', 'Tomato', 'Cotton', 'Maize', 'Chili', 'Wheat', 'Groundnut', 'Vegetables and fruits'].map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p>More crops are continuously being added.</p>
      </>
    ),
  },
  {
    q: 'Can Kisaan Krushi recommend fertilizers?',
    a: 'Yes. Based on soil values, crop type, and detected diseases, the platform can suggest suitable fertilizers and farming practices.',
  },
  {
    q: 'Does Kisaan Krushi provide weather updates?',
    a: 'Yes. The platform provides weather forecasts, rainfall predictions, and farming alerts to help farmers plan agricultural activities.',
  },
  {
    q: 'Is my personal data secure?',
    a: 'Yes. Kisaan Krushi uses security measures such as encrypted data transmission and protected cloud storage to safeguard user information.',
  },
  {
    q: 'Does Kisaan Krushi sell user data?',
    a: 'No. We do not sell personal information to third parties.',
  },
  {
    q: 'Can I use Kisaan Krushi on mobile devices?',
    a: 'Yes. Kisaan Krushi is designed to work on smartphones, tablets, and desktop devices.',
  },
  {
    q: 'What languages are supported?',
    a: 'Kisaan Krushi currently supports English and Telugu, with plans to add more regional languages for better accessibility to farmers across India.',
  },
  {
    q: 'What should I do if the app shows incorrect results?',
    a: (
      <ul>
        {['Re-upload a clearer image', 'Verify soil values carefully', 'Contact support', 'Consult agricultural experts for confirmation'].map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    ),
  },
  {
    q: 'How can I contact support?',
    a: (
      <>
        <p>You can reach the Kisaan Krushi support team through:</p>
        <p>
          Email:{' '}
          <a href="mailto:support.kisaankrushi@gmail.com" className="text-primary hover:underline font-medium">
            support.kisaankrushi@gmail.com
          </a>
        </p>
      </>
    ),
  },
  {
    q: 'Do I need an account to use the platform?',
    a: 'Some features may work without registration, but creating an account provides access to personalized recommendations and saved reports.',
  },
  {
    q: 'Can I upload multiple crop images?',
    a: 'Yes. Users can upload multiple crop images for analysis and monitoring.',
  },
  {
    q: 'Will Kisaan Krushi work without internet?',
    a: 'Some features require an internet connection, especially AI analysis and weather updates. Limited offline functionality may be available in future versions.',
  },
  {
    q: 'Is Kisaan Krushi officially connected to the government?',
    a: 'No. Kisaan Krushi is an independent agricultural technology platform unless officially stated otherwise.',
  },
  {
    q: 'Can Kisaan Krushi help beginner farmers?',
    a: 'Yes. The platform is designed for both experienced and beginner farmers by providing simple guidance and educational support.',
  },
  {
    q: 'How often is agricultural information updated?',
    a: 'Our platform regularly updates disease data, crop recommendations, and farming insights based on new agricultural research and expert knowledge.',
  },
  {
    q: 'How can I report bugs or technical issues?',
    a: (
      <>
        You can report technical problems by contacting the support team at{' '}
        <a href="mailto:support.kisaankrushi@gmail.com" className="text-primary hover:underline font-medium">
          support.kisaankrushi@gmail.com
        </a>{' '}
        or through the website contact form.
      </>
    ),
  },
]

function FAQItem({ item, index, isOpen, onToggle }) {
  return (
    <div className={`border rounded-xl overflow-hidden transition-all duration-200 ${isOpen ? 'border-primary/30 shadow-sm dark:border-primary/40' : 'border-gray-100 dark:border-gray-700'}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 p-5 sm:p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
      >
        <div className="flex items-start gap-3 min-w-0">
          <span className="flex-shrink-0 w-7 h-7 bg-primary/10 text-primary rounded-lg flex items-center justify-center text-xs font-bold font-poppins mt-0.5">
            {index + 1}
          </span>
          <span className="font-semibold text-gray-800 dark:text-gray-100 text-sm sm:text-base leading-snug">{item.q}</span>
        </div>
        <span className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${isOpen ? 'border-primary bg-primary text-white rotate-45' : 'border-gray-300 text-gray-400'}`}>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 5v14M5 12h14" />
          </svg>
        </span>
      </button>

      {isOpen && (
        <div className="px-5 sm:px-6 pb-5 sm:pb-6 pl-14 sm:pl-[3.75rem]">
          <div className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed space-y-2 faq-answer">
            {typeof item.a === 'string' ? <p>{item.a}</p> : item.a}
          </div>
        </div>
      )}
    </div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (i) => setOpenIndex((prev) => (prev === i ? null : i))

  return (
    <div className="min-h-screen bg-light-bg dark:bg-gray-900">
      {/* Banner */}
      <div className="bg-gradient-to-br from-primary-dark via-[#1a4a1a] to-primary pt-20 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
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
            <span className="text-green-200 text-xs font-medium">{FAQS.length} Questions</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-poppins font-extrabold text-white mb-3 leading-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-green-300 text-sm sm:text-base max-w-lg">
            Everything you need to know about Kisaan Krushi. Can't find an answer?{' '}
            <a href="mailto:support.kisaankrushi@gmail.com" className="text-accent hover:underline">
              Contact us.
            </a>
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="space-y-3">
          {FAQS.map((item, i) => (
            <FAQItem
              key={i}
              item={item}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-6 sm:p-8 text-center">
          <div className="text-3xl mb-3">🌱</div>
          <h3 className="font-poppins font-bold text-gray-800 dark:text-gray-100 text-lg mb-2">Still have questions?</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-5">
            Our support team is happy to help you with anything not covered here.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="mailto:support.kisaankrushi@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-white font-semibold rounded-full text-sm hover:bg-primary-light transition-all hover:shadow-md"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email Support
            </a>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-2.5 border border-gray-200 text-gray-600 font-semibold rounded-full text-sm hover:border-primary hover:text-primary transition-all"
            >
              Use Contact Form
            </Link>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
          <Link to="/privacy" className="text-gray-400 hover:text-primary transition-colors">Privacy Policy</Link>
          <span className="hidden sm:block text-gray-200">·</span>
          <Link to="/terms" className="text-gray-400 hover:text-primary transition-colors">Terms &amp; Conditions</Link>
        </div>
      </div>

      {/* FAQ answer list/p styling */}
      <style>{`
        .faq-answer ul { padding-left: 0; list-style: none; }
        .faq-answer ul li { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 6px; }
        .faq-answer ul li::before { content: ''; flex-shrink: 0; width: 6px; height: 6px; background: #1B5E20; border-radius: 50%; margin-top: 8px; }
        .faq-answer p { margin-bottom: 6px; }
      `}</style>
    </div>
  )
}
