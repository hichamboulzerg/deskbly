'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, Search } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

const links = [
  { label: 'Home', href: '/' },
  { label: 'Articles', href: '/blog' },
  { label: 'Workspace', href: '/blog?category=Workspace' },
  { label: 'Gear', href: '/blog?category=Gear' },
  { label: 'Productivity', href: '/blog?category=Productivity' },
  { label: 'About', href: '/about' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 print:hidden ${scrolled ? 'bg-white/95 dark:bg-stone-950/95 backdrop-blur-md shadow-sm' : 'bg-stone-50 dark:bg-stone-950'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">D</span>
            </div>
            <span className="text-lg font-bold text-stone-900 dark:text-white tracking-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Deskbly
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="px-3 py-2 text-sm font-medium text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/search"
              aria-label="Search"
              className="ml-1 p-2 rounded-lg text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            >
              <Search size={18} />
            </Link>
            <ThemeToggle />
            <Link
              href="/contact"
              className="ml-1 px-4 py-2 text-sm font-semibold rounded-lg bg-orange-500 hover:bg-orange-600 text-white transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Mobile right side */}
          <div className="md:hidden flex items-center gap-1">
            <ThemeToggle />
            <button
              onClick={() => setOpen(!open)}
              className="p-2 rounded-lg text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              aria-label="Toggle menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-white dark:bg-stone-950 border-t border-stone-100 dark:border-stone-800 px-4 py-3 space-y-1">
          {[...links, { label: 'Search', href: '/search' }, { label: 'Contact', href: '/contact' }].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block px-3 py-2.5 text-sm font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-900 rounded-lg transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
