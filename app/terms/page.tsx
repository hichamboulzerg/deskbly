import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'The terms and conditions governing your use of the Deskbly website.',
  alternates: { canonical: 'https://deskbly.com/terms' },
}

const sections = [
  {
    title: 'Acceptance of Terms',
    body: [
      'By accessing or using the Deskbly website (deskbly.com), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our website.',
      'We reserve the right to update these terms at any time. Continued use of the site after changes are posted constitutes your acceptance of the revised terms.',
    ],
  },
  {
    title: 'Use of Content',
    body: [
      'All content published on Deskbly — including articles, reviews, images, and guides — is the intellectual property of Deskbly and its contributors. You may not reproduce, distribute, or republish our content without prior written permission.',
      'You may share links to our articles and quote brief excerpts (up to 100 words) provided you clearly attribute Deskbly and link back to the original article.',
    ],
  },
  {
    title: 'User Conduct',
    body: [
      'When using any interactive features of the site (such as the contact form), you agree not to submit content that is unlawful, harmful, threatening, abusive, defamatory, or otherwise objectionable.',
      'You agree not to attempt to gain unauthorised access to any part of the site, or to disrupt or interfere with the site\'s normal operation.',
    ],
  },
  {
    title: 'Third-Party Links',
    body: [
      'Our site may contain links to third-party websites. These links are provided for convenience only. We have no control over those sites and accept no responsibility for their content, privacy practices, or availability.',
    ],
  },
  {
    title: 'Disclaimer of Warranties',
    body: [
      'Deskbly is provided on an "as is" and "as available" basis without any warranties of any kind, express or implied. We do not warrant that the site will be uninterrupted, error-free, or free of viruses or other harmful components.',
    ],
  },
  {
    title: 'Limitation of Liability',
    body: [
      'To the fullest extent permitted by applicable law, Deskbly and its authors shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of the site or reliance on any content published here.',
    ],
  },
  {
    title: 'Governing Law',
    body: [
      'These terms shall be governed by and construed in accordance with applicable law. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the relevant courts.',
    ],
  },
  {
    title: 'Contact',
    body: [
      'If you have any questions about these Terms of Service, please contact us at hello@deskbly.com or through our contact page.',
    ],
  },
]

export default function TermsPage() {
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
            Terms of Service
          </h1>
          <p className="text-stone-400 text-sm">Last updated: April 12, 2025</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="bg-white rounded-2xl p-6 mb-10 border border-stone-200">
          <p className="text-base text-stone-500 leading-relaxed">
            Please read these Terms of Service carefully before using Deskbly. By accessing this website you agree to these terms. These are straightforward — we just ask that you use the site respectfully and don't misuse our content.
          </p>
        </div>

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

        <div className="mt-14 pt-8 flex flex-wrap gap-4 border-t border-stone-200">
          <Link href="/privacy" className="text-sm font-medium text-orange-500 hover:text-orange-600 transition-colors">
            Privacy Policy →
          </Link>
          <Link href="/disclaimer" className="text-sm font-medium text-stone-500 hover:text-stone-700 transition-colors">
            Disclaimer
          </Link>
          <Link href="/" className="text-sm font-medium text-stone-500 hover:text-stone-700 transition-colors">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
