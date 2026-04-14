'use client'

import { useEffect, useRef } from 'react'

// To get your categoryId:
// 1. Go to https://giscus.app
// 2. Enter repo: hichamboulzerg/deskbly-comment
// 3. Copy the data-category-id value from the generated script tag
const GISCUS_REPO = 'hichamboulzerg/deskbly-comment'
const GISCUS_REPO_ID = 'R_kgDOSArwKA'
const GISCUS_CATEGORY = 'General'
const GISCUS_CATEGORY_ID = 'DIC_kwDOSArwKM4C6r2C'

export default function Comments() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current || ref.current.hasChildNodes()) return
    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.setAttribute('data-repo', GISCUS_REPO)
    script.setAttribute('data-repo-id', GISCUS_REPO_ID)
    script.setAttribute('data-category', GISCUS_CATEGORY)
    script.setAttribute('data-category-id', GISCUS_CATEGORY_ID)
    script.setAttribute('data-mapping', 'pathname')
    script.setAttribute('data-strict', '0')
    script.setAttribute('data-reactions-enabled', '1')
    script.setAttribute('data-emit-metadata', '0')
    script.setAttribute('data-input-position', 'top')
    script.setAttribute('data-theme', 'light')
    script.setAttribute('data-lang', 'en')
    script.setAttribute('data-loading', 'lazy')
    script.crossOrigin = 'anonymous'
    script.async = true
    ref.current.appendChild(script)
  }, [])

  return (
    <div className="mt-12 pt-10 border-t border-stone-200">
      <h2 className="text-xl font-bold text-stone-900 mb-6"
        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
        Comments
      </h2>
      <div ref={ref} />
    </div>
  )
}
