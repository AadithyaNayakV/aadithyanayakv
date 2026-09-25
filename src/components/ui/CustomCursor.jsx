import { useEffect, useRef } from 'react'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { gsap } from '../../lib/gsapConfig'

const HOVERABLE = 'a, button, [data-cursor-hover]'

/**
 * A dot that tracks exactly and a ring that lags slightly behind it. The ring
 * grows over anything clickable, including the 3D centrepiece, which reports
 * hover across the canvas boundary via a `cursor:hover` event.
 *
 * Disabled entirely on coarse pointers and under reduced motion.
 */
export default function CustomCursor() {
  const dot = useRef(null)
  const ring = useRef(null)
  const reducedMotion = useReducedMotion()
  const finePointer = useMediaQuery('(pointer: fine)')
  const enabled = finePointer && !reducedMotion

  useEffect(() => {
    if (!enabled || !dot.current || !ring.current) return undefined

    const d = dot.current
    const r = ring.current
    const root = document.documentElement
    root.dataset.cursor = 'on'

    const start = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    gsap.set([d, r], { ...start, opacity: 0 })

    const dotX = gsap.quickTo(d, 'x', { duration: 0.07, ease: 'power3' })
    const dotY = gsap.quickTo(d, 'y', { duration: 0.07, ease: 'power3' })
    const ringX = gsap.quickTo(r, 'x', { duration: 0.32, ease: 'power3' })
    const ringY = gsap.quickTo(r, 'y', { duration: 0.32, ease: 'power3' })

    let shown = false
    const onMove = (e) => {
      if (!shown) {
        shown = true
        gsap.to([d, r], { opacity: 1, duration: 0.25 })
      }
      dotX(e.clientX)
      dotY(e.clientY)
      ringX(e.clientX)
      ringY(e.clientY)
    }

    const setActive = (value) => {
      r.dataset.active = String(value)
    }

    const onOver = (e) => e.target?.closest?.(HOVERABLE) && setActive(true)
    const onOut = (e) => e.target?.closest?.(HOVERABLE) && setActive(false)
    const onSceneHover = (e) => setActive(Boolean(e.detail))
    const onLeave = () => {
      shown = false
      gsap.to([d, r], { opacity: 0, duration: 0.2 })
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerover', onOver)
    document.addEventListener('pointerout', onOut)
    document.addEventListener('pointerleave', onLeave)
    window.addEventListener('cursor:hover', onSceneHover)

    return () => {
      delete root.dataset.cursor
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver)
      document.removeEventListener('pointerout', onOut)
      document.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('cursor:hover', onSceneHover)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div aria-hidden="true">
      <div ref={dot} className="cursor-dot" />
      <div ref={ring} className="cursor-ring" data-active="false" />
    </div>
  )
}
