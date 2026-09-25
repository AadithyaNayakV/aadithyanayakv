import Lenis from '@studio-freight/lenis'
import { useEffect } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { gsap, ScrollTrigger } from '../../lib/gsapConfig'
import { setLenis } from '../../lib/lenis'

/**
 * Lenis drives the page and GSAP drives Lenis.
 *
 * ScrollTrigger is updated from Lenis's scroll event rather than the native
 * one — without this every scrubbed animation lags a frame behind the content
 * it is pinned to.
 */
export default function SmoothScroll({ children }) {
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) return undefined

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    })

    setLenis(lenis)
    lenis.on('scroll', ScrollTrigger.update)

    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    ScrollTrigger.refresh()

    return () => {
      gsap.ticker.remove(raf)
      gsap.ticker.lagSmoothing(500, 33)
      lenis.destroy()
      setLenis(null)
    }
  }, [reducedMotion])

  return children
}
