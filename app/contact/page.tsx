'use client'

import { useState } from 'react'
import { Mail, MessageSquare, Send, CheckCircle, MapPin, Clock, AlertCircle, Loader } from 'lucide-react'

// Replace with your Formspree form ID after creating it at formspree.io
const FORMSPREE_ID = 'mnjgblqw'

const reasons = [
  { icon: MessageSquare, title: 'Product Reviews', desc: 'Want us to review your desk gear, chair, or workspace product?' },
  { icon: Mail, title: 'Press & Media', desc: 'Interviews, features, or media collaboration requests.' },
  { icon: Send, title: 'Reader Questions', desc: 'Have a workspace question? We try to answer everything.' },
]

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

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
            We'd love to <span className="text-orange-500">hear from you.</span>
          </h1>
          <p className="text-lg text-stone-300 max-w-xl leading-relaxed">
            Whether you have a product to review, a story idea, or just a question about your workspace — drop us a message.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-5 gap-10">

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl p-8 sm:p-10 border border-stone-200 shadow-sm">
              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center text-center py-10">
                  <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-4">
                    <CheckCircle size={32} className="text-green-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-stone-900 mb-2"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                    Message received!
                  </h2>
                  <p className="text-stone-500">
                    Thanks for reaching out. We'll get back to you within 2 business days.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-6 text-sm font-semibold px-5 py-2.5 rounded-xl bg-orange-50 text-orange-600 hover:bg-orange-100 transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-stone-900 mb-1"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                    Send a message
                  </h2>
                  <p className="text-sm text-stone-400 mb-8">We usually reply within 2 business days.</p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide text-stone-700">
                          Your Name
                        </label>
                        <input
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="Jane Smith"
                          className="w-full px-4 py-3 rounded-xl text-sm bg-stone-50 border border-stone-200 text-stone-900 placeholder:text-stone-400 outline-none focus:border-orange-500 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide text-stone-700">
                          Email Address
                        </label>
                        <input
                          required
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="jane@example.com"
                          className="w-full px-4 py-3 rounded-xl text-sm bg-stone-50 border border-stone-200 text-stone-900 placeholder:text-stone-400 outline-none focus:border-orange-500 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide text-stone-700">
                        Subject
                      </label>
                      <select
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl text-sm bg-stone-50 border border-stone-200 text-stone-900 outline-none focus:border-orange-500 transition-colors"
                      >
                        <option value="" disabled>Select a topic…</option>
                        <option>Product Review Request</option>
                        <option>Press & Media</option>
                        <option>Reader Question</option>
                        <option>Partnership</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide text-stone-700">
                        Message
                      </label>
                      <textarea
                        required
                        rows={6}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Tell us what's on your mind…"
                        className="w-full px-4 py-3 rounded-xl text-sm bg-stone-50 border border-stone-200 text-stone-900 placeholder:text-stone-400 outline-none focus:border-orange-500 transition-colors resize-none"
                      />
                    </div>

                    {status === 'error' && (
                      <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                        <AlertCircle size={16} className="shrink-0" />
                        Something went wrong. Please try again or email us directly at hello@deskbly.com
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-white bg-orange-500 hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                    >
                      {status === 'loading' ? (
                        <><Loader size={16} className="animate-spin" /> Sending…</>
                      ) : (
                        <><Send size={16} /> Send Message</>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-5">
            {/* Contact info */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200">
              <h3 className="font-bold text-lg text-stone-900 mb-5"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                Contact info
              </h3>
              <div className="space-y-4">
                {[
                  { icon: Mail, label: 'Email', value: 'hello@deskbly.com' },
                  { icon: Clock, label: 'Response time', value: 'Within 2 business days' },
                  { icon: MapPin, label: 'Based in', value: 'Remote — worldwide team' },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
                      <Icon size={16} className="text-orange-500" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-stone-400 mb-0.5">{label}</p>
                      <p className="text-sm font-medium text-stone-700">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reasons to contact */}
            {reasons.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-4 p-5 bg-white rounded-2xl border border-stone-200">
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-orange-500" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-stone-900 mb-1">{title}</p>
                  <p className="text-xs text-stone-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}

            {/* Dark card */}
            <div className="bg-stone-950 rounded-2xl p-6">
              <p className="font-bold text-white text-lg mb-2"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                Before you reach out…
              </p>
              <p className="text-xs text-stone-400 leading-relaxed">
                Check our articles first — we may have already answered your question. We publish in-depth guides on workspace setup, gear, and productivity every week.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
