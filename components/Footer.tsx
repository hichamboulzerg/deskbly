import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import NewsletterForm from './NewsletterForm'

const nav = {
  Topics: [
    { label: 'Workspace', href: '/blog?category=Workspace' },
    { label: 'Gear', href: '/blog?category=Gear' },
    { label: 'Productivity', href: '/blog?category=Productivity' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'All Articles', href: '/blog' },
    { label: 'Archive', href: '/blog/archive' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-300 print:hidden">
      {/* Newsletter strip */}
      <div className="border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-orange-500 mb-2">Newsletter</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Ideas for a better workspace,<br />
              <span className="text-orange-500">straight to your inbox.</span>
            </h2>
          </div>
          <NewsletterForm />
        </div>
      </div>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">D</span>
              </div>
              <span className="text-lg font-bold text-white" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                Deskbly
              </span>
            </div>
            <p className="text-sm text-stone-400 leading-relaxed">
              Honest reviews, practical guides, and workspace ideas for people who care about where they work.
            </p>
          </div>

          {/* Nav columns */}
          {Object.entries(nav).map(([section, links]) => (
            <div key={section}>
              <p className="text-xs font-semibold uppercase tracking-widest text-stone-500 mb-4">{section}</p>
              <ul className="space-y-2.5">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href}
                      className="text-sm text-stone-400 hover:text-white transition-colors inline-flex items-center gap-1 group">
                      {l.label}
                      <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-stone-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
          <span>&copy; {new Date().getFullYear()} Deskbly. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span className="text-stone-700">·</span>
            <Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
            <span className="text-stone-700">·</span>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
