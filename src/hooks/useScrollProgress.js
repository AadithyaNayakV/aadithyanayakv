import { useEffect, useState } from 'react'
import { ScrollTrigger } from '../lib/gsapConfig'
import { motionState } from '../lib/motionState'

/**
 * Mounts the single ScrollTrigger that tracks overall page progress and writes
 * it into motionState. Mount this once, high in the tree.
 *
 * One trigger for the whole document — not one per section — so the 3D object
 * follows a continuous, reversible timeline rather than snapping between
 * per-section states.
 */
export function useScrollProgressDriver() {
  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        motionState.scroll = self.progress
      },
      onRefresh: (self) => {
        motionState.scroll = self.progress
      },
    })

    return () => trigger.kill()
  }, [])
}

/**
 * Reactive view of the same value, for the rare component that genuinely needs
 * to re-render on scroll. Samples in rAF and only sets state when the value has
 * moved by `precision`, so it cannot cause a render per frame.
 */
export function useScrollProgress(precision = 0.01) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame
    let last = -1

    const tick = () => {
      const next = motionState.scroll
      if (Math.abs(next - last) >= precision) {
        last = next
        setProgress(next)
      }
      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [precision])

  return progress
}
