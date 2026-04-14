import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

const compiled = readFileSync(
  path.join(root, '.next/server/chunks/lib_posts_ts_0_anflz._.js'),
  'utf8'
)

// Find the start of the posts array: "let t=["
const startMarker = 'let t=['
const startIdx = compiled.indexOf(startMarker)
if (startIdx === -1) { console.error('No posts array found'); process.exit(1) }

// Find the end by counting brackets from the opening [
let depth = 0
let inString = false
let stringChar = ''
let escaped = false
let inTemplateLiteral = false
let templateDepth = 0
let endIdx = -1

const arrStart = startIdx + 'let t='.length // points to [

for (let i = arrStart; i < compiled.length; i++) {
  const ch = compiled[i]

  if (escaped) { escaped = false; continue }
  if (ch === '\\' && inString) { escaped = true; continue }

  if (inTemplateLiteral) {
    if (ch === '`') { inTemplateLiteral = false }
    continue
  }

  if (inString) {
    if (ch === stringChar) inString = false
    continue
  }

  if (ch === '`') { inTemplateLiteral = true; continue }
  if (ch === '"' || ch === "'") { inString = true; stringChar = ch; continue }

  if (ch === '[') depth++
  if (ch === ']') {
    depth--
    if (depth === 0) { endIdx = i; break }
  }
}

if (endIdx === -1) { console.error('Could not find end of posts array'); process.exit(1) }

const postsArrayJs = compiled.slice(arrStart, endIdx + 1)
console.log('Extracted posts array, length:', postsArrayJs.length, 'chars')

// Extract date map to fix future dates
const dateFixes = {
  "'2026-04-25'": "'2026-04-08'",
  "'2026-05-05'": "'2026-04-02'",
  "'2026-05-20'": "'2026-03-28'",
  "'2026-06-01'": "'2026-03-21'",
  "'2026-06-15'": "'2026-03-14'",
  "'2026-07-10'": "'2026-03-07'",
  "'2026-07-25'": "'2026-02-28'",
  "'2026-08-08'": "'2026-02-21'",
  "'2026-08-20'": "'2026-02-14'",
  "'2026-09-05'": "'2026-02-07'",
  "'2026-09-20'": "'2026-01-31'",
  "'2026-10-05'": "'2026-01-24'",
  "'2026-10-20'": "'2026-01-17'",
  "'2026-11-05'": "'2026-01-10'",
  "'2026-11-20'": "'2026-01-03'",
  "'2026-12-01'": "'2025-12-27'",
  "'2026-12-15'": "'2025-12-20'",
  "'2027-01-05'": "'2025-12-13'",
  "'2027-01-20'": "'2025-12-06'",
  "'2027-02-05'": "'2025-11-29'",
  "'2027-02-20'": "'2025-12-15'",
  "'2027-03-05'": "'2026-01-12'",
  "'2027-03-20'": "'2026-01-19'",
  "'2027-04-05'": "'2026-02-03'",
  "'2027-04-20'": "'2026-02-17'",
  "'2027-05-05'": "'2026-03-03'",
  "'2027-05-20'": "'2026-03-10'",
  "'2027-06-05'": "'2026-03-17'",
  "'2027-06-20'": "'2026-03-24'",
  "'2027-07-05'": "'2026-03-31'",
  "'2027-07-20'": "'2026-04-05'",
  "'2027-08-05'": "'2026-04-09'",
}

// Also handle the "date:" prefix format found in the compiled JS (with double quotes)
const dateFixesDouble = {}
for (const [k, v] of Object.entries(dateFixes)) {
  const kd = k.replace(/'/g, '"')
  const vd = v.replace(/'/g, '"')
  dateFixesDouble[kd] = vd
}

let fixed = postsArrayJs
for (const [old, next] of Object.entries(dateFixes)) {
  fixed = fixed.split(old).join(next)
}
for (const [old, next] of Object.entries(dateFixesDouble)) {
  fixed = fixed.split(old).join(next)
}

// Also extract the helper functions from the compiled file
const helperFunctions = `
export function getAllPosts(): Post[] {
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getFeaturedPosts(): Post[] {
  return posts.filter((p) => p.featured)
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug)
}

export function getPostsByCategory(category: string): Post[] {
  return posts.filter((p) => p.category === category)
}

export function getAllCategories(): string[] {
  return [...new Set(posts.map((p) => p.category))]
}

export function getAllTags(): string[] {
  return [...new Set(posts.flatMap((p) => p.tags))].sort()
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter((p) => p.tags.includes(tag))
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}
`

const ts = `export interface Post {
  slug: string
  title: string
  excerpt: string
  content: string
  category: string
  author: string
  authorRole: string
  date: string
  readTime: string
  featured: boolean
  coverColor: string
  image: string
  tags: string[]
}

export const posts: Post[] = ${fixed}
${helperFunctions}`

writeFileSync(path.join(root, 'lib/posts.ts'), ts)
console.log('posts.ts restored and dates fixed!')
