// Amazon Associates configuration.
// Associates Store ID — US marketplace tag format.
export const AMAZON_TAG = 'deskbly-20'

// Adds/overrides the ?tag= parameter on Amazon URLs.
// Leaves non-Amazon URLs untouched.
export function tagAmazonUrl(url: string): string {
  try {
    const u = new URL(url)
    if (!/(^|\.)amazon\.(com|ca|co\.uk|de|fr|it|es|co\.jp|com\.au|in)$/.test(u.hostname)) {
      return url
    }
    u.searchParams.set('tag', AMAZON_TAG)
    return u.toString()
  } catch {
    return url
  }
}

// Heuristic: is this URL an Amazon product link that should be treated
// as an affiliate link (rel="sponsored nofollow", target="_blank")?
export function isAmazonUrl(url: string): boolean {
  try {
    return /(^|\.)amazon\.(com|ca|co\.uk|de|fr|it|es|co\.jp|com\.au|in)$/.test(
      new URL(url).hostname
    )
  } catch {
    return false
  }
}
