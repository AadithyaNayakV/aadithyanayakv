import { site } from '../data/site'

export const GMAIL_COMPOSE_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(site.contact.email)}`
export const MAILTO_URL = `mailto:${site.contact.email}`

/**
 * Handles email link clicks:
 * - On mobile devices (iOS/Android), invokes native system mail client via mailto:
 * - On desktop, allows the native <a href="https://mail.google.com/..." target="_blank"> to
 *   directly open Gmail compose in a new tab without popup blocker interference.
 */
export function handleEmailClick(e) {
  if (typeof window === 'undefined') return

  const isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
    navigator.userAgent,
  )

  if (isMobile) {
    e?.preventDefault?.()
    window.location.href = MAILTO_URL
  }
}
