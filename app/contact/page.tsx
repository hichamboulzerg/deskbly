import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with the Deskbly team for product reviews, press inquiries, or reader questions.',
  alternates: { canonical: 'https://deskbly.com/contact' },
  openGraph: {
    title: 'Contact | Deskbly',
    description: 'Get in touch with the Deskbly team for product reviews, press inquiries, or reader questions.',
    url: 'https://deskbly.com/contact',
  },
  twitter: {
    card: 'summary',
    title: 'Contact | Deskbly',
    description: 'Get in touch with the Deskbly team for product reviews, press inquiries, or reader questions.',
  },
}

export default function ContactPage() {
  return (
    <div className="bg-stone-50">
      {/* Hero */}
      <section className="bg-stone-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-orange-500" />
            <span className="text-xs font-semibold uppercase tracking-widest text-orange-500">Get in Touch</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-2xl mb-5"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            We&apos;d love to <span className="text-orange-500">hear from you.</span>
          </h1>
          <p className="text-lg text-stone-300 max-w-xl leading-relaxed">
            Whether you have a product to review, a story idea, or just a question about your workspace — drop us a message.
          </p>
        </div>
      </section>

      <ContactForm />
    </div>
  )
}
