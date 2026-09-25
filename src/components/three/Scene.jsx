import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { gsap, ScrollTrigger } from '../../lib/gsapConfig'
import { useTheme } from '../../context/ThemeContext'
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

export default function Scene({ initials = 'AN' }) {
  const wrapper = useRef(null)
  const reducedMotion = useReducedMotion()
  const { theme } = useTheme()
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

  const bgColor = theme === 'light' ? '#f6f7fb' : '#0a0a0f'

  return (
    <div ref={wrapper} className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <Canvas
        dpr={[1, 1.8]}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 6], fov: 45, near: 0.1, far: 100 }}
        eventSource={eventSource ?? undefined}
        eventPrefix="client"
      >
        <color attach="background" args={[bgColor]} />
        <SceneLighting />
        <Suspense fallback={null}>
          <Particles />
          <CenterpieceObject initials={initials} pointCount={budget} />
        </Suspense>
      </Canvas>
    </div>
  )
}
