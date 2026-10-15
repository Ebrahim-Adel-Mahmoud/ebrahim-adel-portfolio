/** Prefix public asset paths with Vite `base` (needed on GitHub Pages). */
export function asset(path: string): string {
  if (/^(https?:|data:|blob:)/.test(path)) return path
  const base = import.meta.env.BASE_URL || '/'
  return `${base}${path.replace(/^\//, '')}`
}
