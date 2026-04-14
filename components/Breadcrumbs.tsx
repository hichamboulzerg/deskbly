import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export interface BreadcrumbItem {
  label: string
  href?: string
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-stone-400">
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <li key={i} className="flex items-center gap-1">
              {i > 0 && <ChevronRight size={13} className="text-stone-300 shrink-0" />}
              {!isLast && item.href ? (
                <Link href={item.href} className="hover:text-orange-500 transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? 'text-stone-600 font-medium line-clamp-1' : ''}>
                  {item.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
