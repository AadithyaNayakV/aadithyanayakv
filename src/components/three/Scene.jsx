import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect, useMemo, useRef } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { gsap, ScrollTrigger } from '../../lib/gsapConfig'
import { useTheme } from '../../context/ThemeContext'
import Particles from './Particles'
import PhotoSphere from './PhotoSphere'
import SceneLighting from './SceneLighting'

export default function Scene() {
  const wrapper = useRef(null)
  const reducedMotion = useReducedMotion()
  const { theme } = useTheme()
  const eventSource = useMemo(() => document.getElementById('root'), [])

  useEffect(() => {
    if (!reducedMotion || !wrapper.current) return undefined

    const el = wrapper.current
    const trigger = ScrollTrigger.create({
      trigger: '#hero',
      start: 'bottom 55%',
      onEnter: () => gsap.to(el, { opacity: 0.2, duration: 0.25 }),
      onLeaveBack: () => gsap.to(el, { opacity: 1, duration: 0.25 }),
    })

    return () => {
      trigger.kill()
      gsap.set(el, { opacity: 1 })
    }
  }, [reducedMotion])

  const bgColor = theme === 'light' ? '#f6f7fb' : '#0a0a0f'

  return (
    <div
      ref={wrapper}
      className="hidden lg:block fixed inset-0 z-0 pointer-events-none [&_canvas]:pointer-events-auto"
      aria-hidden="true"
    >
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
          <PhotoSphere imageSrc="/profile.png" />
        </Suspense>
      </Canvas>
    </div>
  )
}
