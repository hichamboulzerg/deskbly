import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Deskbly collects, uses, and protects your personal information.',
  alternates: { canonical: 'https://deskbly.com/privacy' },
}

const sections = [
  {
    title: 'Information We Collect',
    body: [
      'When you subscribe to our newsletter, we collect your email address. When you submit the contact form, we collect your name, email address, and the content of your message. We do not collect any other personal data unless you voluntarily provide it.',
      'We may also automatically collect non-personal information such as browser type, operating system, and pages visited via analytics tools. This data is aggregated and cannot be used to identify you personally.',
    ],
  },
  {
    title: 'How We Use Your Information',
    body: [
      'Your email address is used solely to send you the Deskbly newsletter and updates you have opted into. We will never sell, trade, or share your email with third parties for marketing purposes.',
      'Contact form submissions are used only to respond to your inquiry. We retain this information for as long as necessary to address your request.',
      'Aggregated analytics data is used to understand how readers use the site so we can improve our content and user experience.',
    ],
  },
  {
    title: 'Cookies',
    body: [
      'Deskbly may use essential cookies to ensure the site functions correctly. We do not use tracking cookies or advertising cookies.',
      'You can disable cookies in your browser settings at any time. Doing so will not affect your ability to read our content.',
    ],
  },
  {
    title: 'Third-Party Services',
    body: [
      'We may use third-party services such as analytics providers to understand site traffic. These services may collect information sent by your browser as part of a web page request, such as cookies or your IP address.',
      'Images on this site are served via Unsplash. Their use is governed by the Unsplash License. We do not share any personal data with Unsplash.',
    ],
  },
  {
    title: 'Data Retention',
    body: [
      'We retain newsletter subscriber email addresses until you unsubscribe. You may unsubscribe at any time by clicking the unsubscribe link in any newsletter email or by contacting us directly.',
      'Contact form data is retained for up to 12 months and then deleted.',
    ],
  },
  {
    title: 'Your Rights',
    body: [
      'Depending on your location, you may have rights regarding your personal data, including the right to access, correct, or delete the data we hold about you. To exercise any of these rights, please contact us at hello@deskbly.com.',
      'If you are located in the European Economic Area (EEA), you have the right to lodge a complaint with your local data protection authority.',
    ],
  },
  {
    title: 'Changes to This Policy',
    body: [
      'We may update this Privacy Policy from time to time. When we do, we will revise the "Last updated" date at the top of this page. We encourage you to review this policy periodically.',
    ],
  },
  {
    title: 'Contact',
    body: [
      'If you have any questions about this Privacy Policy or how we handle your data, please reach out to us at hello@deskbly.com or through our contact page.',
    ],
  },
]

export default function PrivacyPage() {
  return (
    <div className="bg-stone-50">
      {/* Header */}
      <div className="bg-stone-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-orange-500" />
            <span className="text-xs font-semibold uppercase tracking-widest text-orange-500">Legal</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Privacy Policy
          </h1>
          <p className="text-stone-400 text-sm">Last updated: April 11, 2025</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Intro */}
        <div className="bg-white rounded-2xl p-6 mb-10 border border-stone-200">
          <p className="text-base text-stone-500 leading-relaxed">
            At Deskbly, your privacy matters to us. This policy explains what information we collect, how we use it, and the choices you have. We keep things simple — we are a small editorial team and we have no interest in harvesting your data.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-10">
          {sections.map((s, i) => (
            <section key={s.title}>
              <div className="flex items-start gap-4 mb-4">
                <span className="shrink-0 w-7 h-7 rounded-lg bg-orange-500 flex items-center justify-center text-xs font-bold text-white mt-0.5">
                  {i + 1}
                </span>
                <h2 className="text-xl font-bold text-stone-900"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  {s.title}
                </h2>
              </div>
              <div className="pl-11 space-y-4">
                {s.body.map((para, j) => (
                  <p key={j} className="text-base text-stone-500 leading-relaxed">{para}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Footer nav */}
        <div className="mt-14 pt-8 flex flex-wrap gap-4 border-t border-stone-200">
          <Link href="/disclaimer" className="text-sm font-medium text-orange-500 hover:text-orange-600 transition-colors">
            Read our Disclaimer →
          </Link>
          <Link href="/contact" className="text-sm font-medium text-stone-500 hover:text-stone-700 transition-colors">
            Contact us
          </Link>
          <Link href="/" className="text-sm font-medium text-stone-500 hover:text-stone-700 transition-colors">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
