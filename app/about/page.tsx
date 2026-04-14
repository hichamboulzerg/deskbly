import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Target, Eye, Heart, Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Meet the Deskbly team — writers and researchers passionate about better workspaces.',
  alternates: { canonical: 'https://deskbly.com/about' },
  openGraph: {
    title: 'About Us | Deskbly',
    description: 'Meet the Deskbly team — writers and researchers passionate about better workspaces.',
    url: 'https://deskbly.com/about',
  },
}

const team = [
  { name: 'Mia Collins', role: 'Workspace Designer', bio: 'A decade designing ergonomic workspaces for remote teams. She believes environment is the most underrated productivity tool.', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&auto=format&q=80' },
  { name: 'James Park', role: 'Tech Reviewer', bio: "Tested hundreds of keyboards, monitors, and desk accessories. If it goes on a desk, he has a strong opinion about it.", photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&auto=format&q=80' },
  { name: 'Sara Osei', role: 'Productivity Researcher', bio: 'Studies how physical and digital environments affect focus and output. Her writing bridges neuroscience and practical advice.', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&auto=format&q=80' },
  { name: 'Tom Hadley', role: 'Ergonomics Specialist', bio: 'Certified ergonomist who left corporate consulting to write about desks, chairs, and the science of sitting — and standing.', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&auto=format&q=80' },
]

const values = [
  { icon: Target, title: 'Honest', desc: 'We call out bad products. We admit when we are wrong. No affiliate-driven fluff.' },
  { icon: Eye,    title: 'Practical', desc: 'Every article comes with real recommendations you can act on today, not hypothetical advice.' },
  { icon: Heart,  title: 'Opinionated', desc: "We have strong views on what makes a great workspace. We'll tell you exactly what we think." },
  { icon: Zap,    title: 'Independent', desc: 'No corporate backing, no paid placements. Just people who care deeply about where they work.' },
]

export default function AboutPage() {
  return (
    <div className="bg-stone-50">
      {/* Hero */}
      <section className="bg-stone-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-orange-500" />
            <span className="text-xs font-semibold uppercase tracking-widest text-orange-500">Our Story</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-2xl"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            We believe in <span className="text-orange-500">better workspaces.</span>
          </h1>
          <p className="text-lg text-stone-300 mt-6 max-w-xl leading-relaxed">
            Deskbly was born from a simple frustration: most workspace advice is either too vague to be useful or too expensive to be realistic.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1 h-6 bg-orange-500 rounded-full" />
              <span className="text-xs font-semibold uppercase tracking-widest text-orange-500">Mission</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-5 leading-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Where you work shapes how well you work.
            </h2>
            <p className="text-stone-500 leading-relaxed mb-4">
              Most people spend eight hours a day at their desk yet give almost no thought to the environment they work in. A good chair, the right monitor height, decent lighting — these are not luxuries. They are infrastructure.
            </p>
            <p className="text-stone-500 leading-relaxed mb-8">
              Our mission is to make high-quality workspace advice accessible to everyone — whether you are setting up your first home office on a tight budget or building a professional-grade studio.
            </p>
            <Link href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-orange-500 hover:bg-orange-600 transition-colors">
              Read our articles <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { num: '50+', label: 'In-depth articles', sub: 'and counting' },
              { num: '3', label: 'Expert topics', sub: 'Workspace · Gear · Productivity' },
              { num: '12k', label: 'Monthly readers', sub: 'and growing' },
              { num: '100%', label: 'Independent', sub: 'No sponsors, no bias' },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-2xl p-6 border border-stone-200">
                <p className="text-4xl font-bold text-orange-500 mb-1" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{s.num}</p>
                <p className="font-semibold text-sm text-stone-900 mb-0.5">{s.label}</p>
                <p className="text-xs text-stone-400">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white border-y border-stone-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-1 h-6 bg-orange-500 rounded-full" />
              <span className="text-xs font-semibold uppercase tracking-widest text-orange-500">Values</span>
              <div className="w-1 h-6 bg-orange-500 rounded-full" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              What we stand for
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-stone-50 rounded-2xl p-6 border border-stone-200">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                  <Icon size={18} className="text-orange-600" />
                </div>
                <h3 className="font-bold text-lg text-stone-900 mb-2">{title}</h3>
                <p className="text-sm text-stone-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-1 h-6 bg-orange-500 rounded-full" />
            <span className="text-xs font-semibold uppercase tracking-widest text-orange-500">Team</span>
            <div className="w-1 h-6 bg-orange-500 rounded-full" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Meet the writers
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((m) => (
            <div key={m.name} className="bg-white rounded-2xl overflow-hidden border border-stone-200 hover:shadow-lg transition-shadow">
              <div className="h-52 overflow-hidden">
                <img src={m.photo} alt={m.name} className="w-full h-full object-cover object-top" />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg text-stone-900 mb-0.5" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  {m.name}
                </h3>
                <p className="text-xs font-semibold text-orange-500 mb-3">{m.role}</p>
                <p className="text-sm text-stone-500 leading-relaxed">{m.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-orange-500 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Want to work with us?
          </h2>
          <p className="text-orange-100 mb-8">Have a product to review or a story idea? We would love to hear from you.</p>
          <Link href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-orange-600 bg-white hover:bg-orange-50 transition-colors">
            Get in touch <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  )
}
