/**
 * Format currency in BGN
 */
export function formatCurrency(amount: number | string, currency: string = 'BGN'): string {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount

  return new Intl.NumberFormat('bg-BG', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(num)
}

/**
 * Format date in Bulgarian
 */
export function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
  const d = typeof date === 'string' ? new Date(date) : date

  return new Intl.DateTimeFormat('bg-BG', {
    dateStyle: 'medium',
    ...options,
  }).format(d)
}

/**
 * Format relative time (e.g., "2 days ago")
 */
export function formatRelativeTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const diffSecs = Math.floor(diffMs / 1000)
  const diffMins = Math.floor(diffSecs / 60)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffSecs < 60) return 'преди секунди'
  if (diffMins < 60) return `преди ${diffMins} ${diffMins === 1 ? 'минута' : 'минути'}`
  if (diffHours < 24) return `преди ${diffHours} ${diffHours === 1 ? 'час' : 'часа'}`
  if (diffDays < 7) return `преди ${diffDays} ${diffDays === 1 ? 'ден' : 'дни'}`
  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7)
    return `преди ${weeks} ${weeks === 1 ? 'седмица' : 'седмици'}`
  }
  if (diffDays < 365) {
    const months = Math.floor(diffDays / 30)
    return `преди ${months} ${months === 1 ? 'месец' : 'месеца'}`
  }

  const years = Math.floor(diffDays / 365)
  return `преди ${years} ${years === 1 ? 'година' : 'години'}`
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}

/**
 * Generate slug from title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special chars
    .replace(/[\s_-]+/g, '-') // Replace spaces/underscores with hyphens
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
    + '-' + Math.random().toString(36).substring(2, 8) // Add random suffix
}
