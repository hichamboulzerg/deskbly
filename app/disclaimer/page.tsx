import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: 'Important information about the nature of content published on Deskbly.',
  alternates: { canonical: 'https://deskbly.com/disclaimer' },
}

const sections = [
  {
    title: 'General Information Only',
    body: [
      'The content published on Deskbly — including articles, reviews, guides, and recommendations — is provided for general informational and educational purposes only. Nothing on this site should be construed as professional advice of any kind, including medical, ergonomic, legal, or financial advice.',
      'Always consult a qualified professional before making decisions based on information you read on this site, particularly if those decisions relate to your physical health or workplace safety.',
    ],
  },
  {
    title: 'Product Reviews and Recommendations',
    body: [
      'Deskbly publishes honest, independent reviews of workspace products and gear. Our opinions are our own and are not influenced by manufacturers or retailers. We strive to keep all product information accurate and up to date, but specifications, pricing, and availability change frequently.',
      'Always verify current pricing and product details directly with the retailer or manufacturer before making a purchase. We cannot be held responsible for purchases made based on information that has since changed.',
    ],
  },
  {
    title: 'No Affiliate Relationship',
    body: [
      'At this time, Deskbly does not participate in affiliate marketing programs. We do not earn commissions from product links. If that ever changes, we will clearly disclose it in accordance with applicable advertising guidelines.',
    ],
  },
  {
    title: 'Accuracy of Information',
    body: [
      'We make every effort to ensure the information published on Deskbly is accurate, complete, and current. However, we make no warranties or representations of any kind, express or implied, about the completeness, accuracy, reliability, or suitability of any information on this site.',
      'Any reliance you place on information from Deskbly is strictly at your own risk. We reserve the right to update, correct, or remove content at any time without notice.',
    ],
  },
  {
    title: 'External Links',
    body: [
      'This site may contain links to external websites. These links are provided for your convenience. We have no control over the content of those sites and accept no responsibility for them or for any loss or damage that may arise from your use of them.',
      'The inclusion of a link does not imply our endorsement of the linked site or its content.',
    ],
  },
  {
    title: 'Ergonomics and Health',
    body: [
      "Some of our content covers ergonomics, posture, and workspace health. This content is based on general published research and our writers' experience — it is not a substitute for professional ergonomic assessment or medical advice.",
      'If you experience pain, discomfort, or injury related to your workspace, please consult a qualified healthcare professional.',
    ],
  },
  {
    title: 'Limitation of Liability',
    body: [
      'To the fullest extent permitted by law, Deskbly and its authors shall not be liable for any direct, indirect, incidental, consequential, or special damages arising out of or in connection with your use of this website or reliance on any information published here.',
    ],
  },
  {
    title: 'Changes to This Disclaimer',
    body: [
      'We may update this Disclaimer from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. Updates will be reflected in the "Last updated" date below.',
    ],
  },
]

export default function DisclaimerPage() {
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
            Disclaimer
          </h1>
          <p className="text-stone-400 text-sm">Last updated: April 11, 2025</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Intro */}
        <div className="bg-white rounded-2xl p-6 mb-10 border border-stone-200">
          <p className="text-base text-stone-500 leading-relaxed">
            Please read this disclaimer carefully before using Deskbly. By accessing or using this website, you acknowledge that you have read and understood the following terms. If you disagree with any part of this disclaimer, please discontinue use of the site.
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
          <Link href="/privacy" className="text-sm font-medium text-orange-500 hover:text-orange-600 transition-colors">
            Read our Privacy Policy →
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
