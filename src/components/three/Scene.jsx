import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { gsap, ScrollTrigger } from '../../lib/gsapConfig'
import CenterpieceObject from './CenterpieceObject'
import Particles from './Particles'
import SceneLighting from './SceneLighting'

/** Geometry budget by screen size — the scene simplifies, it never disappears. */
function pointBudget() {
  const w = typeof window === 'undefined' ? 1440 : window.innerWidth
  if (w < 640) return 1500
  if (w < 1100) return 2400
  return 3400
}

/**
 * One canvas for the whole page, fixed behind the content.
 *
 * The canvas itself takes no pointer events — the sections are stacked above it
 * and would swallow every click before it reached the object. Instead R3F
 * listens on the app root and raycasts from client coordinates, so the object
 * stays clickable through whatever DOM happens to be in front of it while links
 * and buttons keep behaving normally.
 */
export default function Scene({ initials = 'AN' }) {
  const wrapper = useRef(null)
  const reducedMotion = useReducedMotion()
  const [budget] = useState(pointBudget)
  const eventSource = useMemo(() => document.getElementById('root'), [])

  // Reduced motion replaces the scrubbed dock move with a plain opacity step
  // once the hero is behind you, so the object never sits over body text.
  useEffect(() => {
    if (!reducedMotion || !wrapper.current) return undefined

    const el = wrapper.current
    const trigger = ScrollTrigger.create({
      trigger: '#hero',
      start: 'bottom 55%',
      onEnter: () => gsap.to(el, { opacity: 0.15, duration: 0.25 }),
      onLeaveBack: () => gsap.to(el, { opacity: 1, duration: 0.25 }),
    })

    return () => {
      trigger.kill()
      gsap.set(el, { opacity: 1 })
    }
  }, [reducedMotion])

  return (
    <div ref={wrapper} className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <Canvas
        dpr={[1, 1.8]}
        // Opaque, not transparent. The particle field and the object's halo are
        // additively blended, and additive draws almost no alpha — on a
        // transparent canvas the browser composites that away to nothing. The
        // clear colour matches the page background, so nothing else changes.
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 6], fov: 45, near: 0.1, far: 100 }}
        eventSource={eventSource ?? undefined}
        eventPrefix="client"
      >
        <color attach="background" args={['#0a0a0f']} />
        <SceneLighting />
        <Suspense fallback={null}>
          <Particles />
          <CenterpieceObject initials={initials} pointCount={budget} />
        </Suspense>
      </Canvas>
    </div>
  )
}
