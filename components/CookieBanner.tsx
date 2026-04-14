'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Cookie } from 'lucide-react'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent')
    if (!consent) setVisible(true)
  }, [])

  const accept = () => {
    localStorage.setItem('cookie_consent', 'accepted')
    setVisible(false)
  }

  const decline = () => {
    localStorage.setItem('cookie_consent', 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 print:hidden">
      <div className="max-w-3xl mx-auto bg-stone-950 border border-stone-800 rounded-2xl p-5 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="w-10 h-10 bg-orange-500/15 rounded-xl flex items-center justify-center shrink-0">
          <Cookie size={18} className="text-orange-500" />
        </div>
        <p className="text-sm text-stone-300 leading-relaxed flex-1">
          We use cookies to analyse traffic and improve your experience. Read our{' '}
          <Link href="/privacy" className="text-orange-400 hover:text-orange-300 underline underline-offset-2">
            Privacy Policy
          </Link>{' '}
          to learn more.
        </p>
        <div className="flex gap-2 shrink-0 w-full sm:w-auto">
          <button
            onClick={decline}
            className="flex-1 sm:flex-none px-4 py-2 rounded-xl text-sm font-semibold text-stone-400 border border-stone-700 hover:border-stone-500 hover:text-stone-200 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="flex-1 sm:flex-none px-4 py-2 rounded-xl text-sm font-semibold text-white bg-orange-500 hover:bg-orange-600 transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
