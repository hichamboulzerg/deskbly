'use client'

import { useState } from 'react'
import { CheckCircle, Loader, AlertCircle } from 'lucide-react'

// Paste your Mailchimp form action URL here (from Audience → Signup Forms → Embedded Forms)
// Change /subscribe/post? → /subscribe/post-json? and remove the &amp; → &
const MAILCHIMP_URL = 'https://deskbly.us2.list-manage.com/subscribe/post-json?u=b99a392b0007b9ce492437365&id=ed2c7ac1dd&af_id=0081c2e1f0'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')

    try {
      // Mailchimp JSONP — works from static sites without a backend
      const url = `${MAILCHIMP_URL}&EMAIL=${encodeURIComponent(email)}&c=mailchimpCallback`

      await new Promise<void>((resolve, reject) => {
        const callbackName = 'mailchimpCallback'
        const script = document.createElement('script')

        ;(window as any)[callbackName] = (data: any) => {
          delete (window as any)[callbackName]
          document.body.removeChild(script)
          if (data.result === 'success') resolve()
          else reject(new Error(data.msg))
        }

        script.src = url
        script.onerror = () => {
          delete (window as any)[callbackName]
          document.body.removeChild(script)
          reject(new Error('Network error'))
        }
        document.body.appendChild(script)
      })

      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex items-center gap-3 px-5 py-3.5 rounded-xl bg-green-500/10 border border-green-500/20">
        <CheckCircle size={18} className="text-green-400 shrink-0" />
        <p className="text-sm text-green-300 font-medium">You're subscribed! Check your inbox to confirm.</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <form onSubmit={handleSubmit} className="flex gap-2 w-full md:w-auto">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="flex-1 md:w-52 px-4 py-3 rounded-xl text-sm bg-stone-800 text-white placeholder:text-stone-500 border border-stone-700 outline-none focus:border-orange-500 transition-colors"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-5 py-3 rounded-xl text-sm font-semibold bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white transition-colors whitespace-nowrap flex items-center gap-2"
        >
          {status === 'loading' ? <Loader size={14} className="animate-spin" /> : null}
          Subscribe
        </button>
      </form>
      {status === 'error' && (
        <div className="flex items-center gap-2 text-xs text-red-400">
          <AlertCircle size={13} className="shrink-0" />
          Something went wrong. Please try again.
        </div>
      )}
    </div>
  )
}
