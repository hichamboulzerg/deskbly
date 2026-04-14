'use client'

import { useEffect, useState } from 'react'

export interface TocItem {
  id: string
  text: string
  level: 2 | 3
}

export default function TableOfContents({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string>('')

  useEffect(() => {
    const headings = items.map(({ id }) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    if (!headings.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
            break
          }
        }
      },
      { rootMargin: '0px 0px -70% 0px', threshold: 0 },
    )

    headings.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [items])

  if (!items.length) return null

  return (
    <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-200 dark:border-stone-800">
      <p className="text-xs font-semibold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-4">
        Contents
      </p>
      <nav>
        <ul className="space-y-1">
          {items.map((item) => (
            <li key={item.id} style={{ paddingLeft: item.level === 3 ? '0.75rem' : '0' }}>
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
                className={`block text-sm py-1 leading-snug transition-colors ${
                  active === item.id
                    ? 'text-orange-500 font-semibold'
                    : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
                }`}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
