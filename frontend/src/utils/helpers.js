/**
 * Generate a random UUID v4
 */
export function generateUUID() {
  return crypto.randomUUID()
}

/**
 * Format a Date object to HH:MM string
 */
export function formatTime(date) {
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${hours}:${minutes}`
}

/**
 * Format bytes to human-readable file size
 */
export function formatFileSize(bytes) {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}

/**
 * Truncate text to a maximum length
 */
export function truncateText(text, maxLength = 200) {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

/**
 * Get CSS color variable for confidence level
 */
export function getConfidenceColor(confidence) {
  switch (confidence) {
    case 'very_high':
      return 'var(--accent-success)'
    case 'high':
      return 'var(--accent-primary)'
    case 'medium':
      return 'var(--accent-warning)'
    case 'low':
      return 'var(--accent-danger)'
    default:
      return 'var(--text-secondary)'
  }
}

/**
 * Get color for similarity score
 */
export function getScoreColor(score) {
  if (score < 1.0) return 'var(--accent-success)'
  if (score < 1.5) return 'var(--accent-warning)'
  return 'var(--accent-danger)'
}

/**
 * Format confidence text
 */
export function formatConfidenceText(confidence) {
  const map = {
    'very_high': 'Very High',
    'high': 'High',
    'medium': 'Medium',
    'low': 'Low',
    'blocked': 'Blocked'
  }
  return map[confidence] || confidence
}
