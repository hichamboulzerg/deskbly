'use client'

import { useState, useEffect, useRef } from 'react'
import { X, CheckCircle, Loader, AlertCircle, Mail } from 'lucide-react'

const MAILCHIMP_URL = 'https://deskbly.us2.list-manage.com/subscribe/post-json?u=b99a392b0007b9ce492437365&id=ed2c7ac1dd&af_id=0081c2e1f0'
const DISMISS_KEY = 'nl_popup_dismissed'
const SUBSCRIBED_KEY = 'nl_subscribed'
const DISMISS_DAYS = 7

export default function NewsletterPopup() {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const triggered = useRef(false)

  const shouldShow = () => {
    try {
      if (localStorage.getItem(SUBSCRIBED_KEY)) return false
      const dismissed = localStorage.getItem(DISMISS_KEY)
      if (dismissed) {
        const age = Date.now() - parseInt(dismissed, 10)
        if (age < DISMISS_DAYS * 86_400_000) return false
      }
    } catch { /* ignore */ }
    return true
  }

  const show = () => {
    if (triggered.current || !shouldShow()) return
    triggered.current = true
    setOpen(true)
  }

  const dismiss = () => {
    setOpen(false)
    try { localStorage.setItem(DISMISS_KEY, Date.now().toString()) } catch { /* ignore */ }
  }

  useEffect(() => {
    // Timer trigger: 30 seconds
    const timer = setTimeout(show, 30_000)

    // Exit-intent trigger (desktop only)
    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 5) show()
    }
    document.addEventListener('mouseleave', onMouseLeave)

    return () => {
      clearTimeout(timer)
      document.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const url = `${MAILCHIMP_URL}&EMAIL=${encodeURIComponent(email)}&c=nlPopupCallback`
      await new Promise<void>((resolve, reject) => {
        const script = document.createElement('script')
        ;(window as any).nlPopupCallback = (data: any) => {
          delete (window as any).nlPopupCallback
          document.body.removeChild(script)
          data.result === 'success' ? resolve() : reject(new Error(data.msg))
        }
        script.src = url
        script.onerror = () => {
          delete (window as any).nlPopupCallback
          document.body.removeChild(script)
          reject(new Error('Network error'))
        }
        document.body.appendChild(script)
      })
      setStatus('success')
      try { localStorage.setItem(SUBSCRIBED_KEY, '1') } catch { /* ignore */ }
    } catch {
      setStatus('error')
    }
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 print:hidden"
      onClick={(e) => { if (e.target === e.currentTarget) dismiss() }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Card */}
      <div className="relative bg-white dark:bg-stone-900 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-stone-200 dark:border-stone-800">
        {/* Orange top bar */}
        <div className="h-1 bg-orange-500 w-full" />

        {/* Close */}
        <button
          onClick={dismiss}
          aria-label="Close"
          className="absolute top-4 right-4 p-1.5 rounded-lg text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
        >
          <X size={18} />
        </button>

        <div className="p-8">
          {/* Icon */}
          <div className="w-12 h-12 bg-orange-500/10 dark:bg-orange-500/20 rounded-2xl flex items-center justify-center mb-5">
            <Mail size={22} className="text-orange-500" />
          </div>

          {status === 'success' ? (
            <div className="flex flex-col items-center text-center py-4">
              <CheckCircle size={40} className="text-green-500 mb-3" />
              <p className="text-lg font-bold text-stone-900 dark:text-stone-100 mb-1">You're in!</p>
              <p className="text-sm text-stone-500 dark:text-stone-400">Check your inbox to confirm your subscription.</p>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-2 leading-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                Workspace ideas, straight to your inbox.
              </h2>
              <p className="text-sm text-stone-500 dark:text-stone-400 mb-6">
                Join 12,000+ readers getting our best articles on gear, setup, and productivity every week.
              </p>

              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 text-sm outline-none focus:border-orange-500 transition-colors"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-3 rounded-xl text-sm font-semibold bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white transition-colors flex items-center justify-center gap-2"
                >
                  {status === 'loading' && <Loader size={14} className="animate-spin" />}
                  Subscribe — it's free
                </button>
              </form>

              {status === 'error' && (
                <div className="flex items-center gap-2 text-xs text-red-500 mt-2">
                  <AlertCircle size={13} className="shrink-0" />
                  Something went wrong. Please try again.
                </div>
              )}

              <button
                onClick={dismiss}
                className="mt-4 w-full text-xs text-stone-400 hover:text-stone-500 transition-colors text-center"
              >
                No thanks, I'll browse without subscribing
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
