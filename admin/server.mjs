import http from 'http'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import crypto from 'crypto'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const POSTS_PATH = path.join(ROOT, 'lib/posts.ts')
const UI_PATH = path.join(__dirname, 'ui.html')

const USERNAME = 'hichamblz'
const PASSWORD = 'Hicham2001@#B'
const PORT = 3001

// In-memory sessions (local use only)
const sessions = new Set()

function generateToken() {
  return crypto.randomBytes(32).toString('hex')
}

function getSession(req) {
  const cookie = req.headers.cookie || ''
  const match = cookie.match(/session=([a-f0-9]{64})/)
  return match ? sessions.has(match[1]) ? match[1] : null : null
}

// ─── posts.ts parser ───────────────────────────────────────────────────────

function findArrayBounds(content, startStr) {
  const startIdx = content.indexOf(startStr)
  if (startIdx === -1) return null
  const arrStart = startIdx + startStr.length
  let depth = 0, inString = false, stringChar = '', escaped = false, endIdx = -1
  for (let i = arrStart; i < content.length; i++) {
    const ch = content[i]
    if (escaped) { escaped = false; continue }
    if (ch === '\\' && inString) { escaped = true; continue }
    if (inString) { if (ch === stringChar) inString = false; continue }
    if (ch === '"' || ch === "'") { inString = true; stringChar = ch; continue }
    if (ch === '[') depth++
    if (ch === ']') { depth--; if (depth === 0) { endIdx = i; break } }
  }
  return endIdx === -1 ? null : { arrStart, endIdx }
}

function readPosts() {
  const content = fs.readFileSync(POSTS_PATH, 'utf8')
  const marker = 'export const posts: Post[] = '
  const bounds = findArrayBounds(content, marker)
  if (!bounds) throw new Error('Could not find posts array in lib/posts.ts')
  const arrStr = content.slice(bounds.arrStart, bounds.endIdx + 1)
  // Safe eval of our own file
  return (new Function(`return ${arrStr}`))()
}

function writePosts(posts) {
  const content = fs.readFileSync(POSTS_PATH, 'utf8')
  const marker = 'export const posts: Post[] = '
  const bounds = findArrayBounds(content, marker)
  if (!bounds) throw new Error('Could not find posts array in lib/posts.ts')
  const before = content.slice(0, bounds.arrStart)
  const after = content.slice(bounds.endIdx + 1)
  const postsJson = JSON.stringify(posts, null, 2)
  fs.writeFileSync(POSTS_PATH, before + postsJson + after, 'utf8')
}

// ─── HTTP helpers ───────────────────────────────────────────────────────────

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = ''
    req.on('data', chunk => body += chunk)
    req.on('end', () => {
      try { resolve(JSON.parse(body)) } catch { resolve({}) }
    })
    req.on('error', reject)
  })
}

function parseFormBody(req) {
  return new Promise((resolve, reject) => {
    let body = ''
    req.on('data', chunk => body += chunk)
    req.on('end', () => {
      const params = new URLSearchParams(body)
      const obj = {}
      for (const [k, v] of params) obj[k] = v
      resolve(obj)
    })
    req.on('error', reject)
  })
}

function json(res, data, status = 200) {
  res.writeHead(status, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(data))
}

function redirect(res, url) {
  res.writeHead(302, { Location: url })
  res.end()
}

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

// ─── Server ─────────────────────────────────────────────────────────────────

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`)
  const pathname = url.pathname
  const method = req.method

  // Serve UI
  if (method === 'GET' && pathname === '/') {
    const session = getSession(req)
    if (!session) {
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.end(fs.readFileSync(UI_PATH, 'utf8').replace(/__AUTH__/g, 'false'))
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.end(fs.readFileSync(UI_PATH, 'utf8').replace(/__AUTH__/g, 'true'))
    }
    return
  }

  // Login
  if (method === 'POST' && pathname === '/login') {
    const body = await parseFormBody(req)
    if (body.username === USERNAME && body.password === PASSWORD) {
      const token = generateToken()
      sessions.add(token)
      res.writeHead(302, {
        'Set-Cookie': `session=${token}; HttpOnly; Path=/; SameSite=Strict`,
        Location: '/'
      })
      res.end()
    } else {
      res.writeHead(302, { Location: '/?error=1' })
      res.end()
    }
    return
  }

  // Logout
  if (method === 'POST' && pathname === '/logout') {
    const session = getSession(req)
    if (session) sessions.delete(session)
    res.writeHead(302, {
      'Set-Cookie': 'session=; HttpOnly; Path=/; Max-Age=0',
      Location: '/'
    })
    res.end()
    return
  }

  // ── API (requires session) ──────────────────────────────────────────────

  if (!getSession(req)) {
    json(res, { error: 'Unauthorized' }, 401)
    return
  }

  // GET /api/posts
  if (method === 'GET' && pathname === '/api/posts') {
    try {
      const posts = readPosts()
      json(res, posts)
    } catch (e) {
      json(res, { error: e.message }, 500)
    }
    return
  }

  // POST /api/posts — create
  if (method === 'POST' && pathname === '/api/posts') {
    try {
      const body = await parseBody(req)
      const posts = readPosts()

      if (!body.title || !body.content) {
        json(res, { error: 'Title and content are required' }, 400)
        return
      }

      const slug = body.slug || slugify(body.title)
      if (posts.find(p => p.slug === slug)) {
        json(res, { error: `Slug "${slug}" already exists` }, 400)
        return
      }

      const post = {
        slug,
        title: body.title,
        excerpt: body.excerpt || '',
        content: body.content,
        category: body.category || 'workspace',
        author: body.author || 'Mia Collins',
        authorRole: body.authorRole || 'Workspace Designer',
        date: body.date || new Date().toISOString().split('T')[0],
        readTime: body.readTime || '5 min read',
        featured: body.featured === true || body.featured === 'true',
        coverColor: body.coverColor || '#f97316',
        image: body.image || '',
        tags: Array.isArray(body.tags) ? body.tags : (body.tags || '').split(',').map(t => t.trim()).filter(Boolean),
      }

      posts.unshift(post)
      writePosts(posts)
      json(res, post, 201)
    } catch (e) {
      json(res, { error: e.message }, 500)
    }
    return
  }

  // PUT /api/posts/:slug — update
  const putMatch = pathname.match(/^\/api\/posts\/(.+)$/)
  if (method === 'PUT' && putMatch) {
    try {
      const slug = decodeURIComponent(putMatch[1])
      const body = await parseBody(req)
      const posts = readPosts()
      const idx = posts.findIndex(p => p.slug === slug)
      if (idx === -1) { json(res, { error: 'Post not found' }, 404); return }

      posts[idx] = {
        ...posts[idx],
        ...body,
        slug: body.slug || slug,
        tags: Array.isArray(body.tags) ? body.tags : (body.tags || '').split(',').map(t => t.trim()).filter(Boolean),
        featured: body.featured === true || body.featured === 'true',
      }
      writePosts(posts)
      json(res, posts[idx])
    } catch (e) {
      json(res, { error: e.message }, 500)
    }
    return
  }

  // DELETE /api/posts/:slug
  const deleteMatch = pathname.match(/^\/api\/posts\/(.+)$/)
  if (method === 'DELETE' && deleteMatch) {
    try {
      const slug = decodeURIComponent(deleteMatch[1])
      const posts = readPosts()
      const idx = posts.findIndex(p => p.slug === slug)
      if (idx === -1) { json(res, { error: 'Post not found' }, 404); return }
      posts.splice(idx, 1)
      writePosts(posts)
      json(res, { ok: true })
    } catch (e) {
      json(res, { error: e.message }, 500)
    }
    return
  }

  res.writeHead(404)
  res.end('Not found')
})

server.listen(PORT, () => {
  console.log(`\n  Deskbly Admin running at http://localhost:${PORT}\n`)
})
