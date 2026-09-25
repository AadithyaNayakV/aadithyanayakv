/**
 * Holds the live Lenis instance so nav and footer can drive the scroll without
 * importing the component that owns it.
 */

let instance = null

export const getLenis = () => instance

export const setLenis = (next) => {
  instance = next
}

/**
 * Jump to a section — through Lenis when it is running, so ScrollTrigger stays
 * in sync, and natively when it is not (reduced motion).
 */
export function scrollToSection(id) {
  const target = document.getElementById(id)
  if (!target) return

  if (instance) {
    instance.scrollTo(target, { duration: 1.1 })
  } else {
    target.scrollIntoView({ behavior: 'auto', block: 'start' })
  }
}
