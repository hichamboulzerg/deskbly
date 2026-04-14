import Link from 'next/link'
import { ArrowRight, FileQuestion } from 'lucide-react'

export const metadata = {
  title: '404 — Page Not Found',
  description: 'The page you are looking for does not exist.',
}

export default function NotFound() {
  return (
    <div className="bg-stone-50 min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        {/* Icon */}
        <div className="w-20 h-20 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <FileQuestion size={36} className="text-orange-500" />
        </div>

        {/* Number */}
        <p className="text-8xl font-bold text-stone-200 leading-none mb-2"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
          404
        </p>

        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-3"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
          Page not found
        </h1>

        <p className="text-stone-500 leading-relaxed mb-8">
          The page you are looking for does not exist or has been moved.
          Try browsing our articles instead.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-orange-500 hover:bg-orange-600 transition-colors">
            Back to Home <ArrowRight size={16} />
          </Link>
          <Link href="/blog"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-stone-700 bg-white border border-stone-200 hover:bg-stone-50 transition-colors">
            Browse Articles
          </Link>
        </div>
      </div>
    </div>
  )
}
