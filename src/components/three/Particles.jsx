import { PointMaterial, Points } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import { damp, motionState, progressBetween } from '../../lib/motionState'

/**
 * Ambient star field.
 *
 * Not reactive to scroll by design — it drifts slowly and parallaxes a few
 * pixels against the pointer, and that is all. The one exception is the very
 * end of the page, where it brightens slightly as the contact section arrives.
 *
 * Density scales down on small screens rather than the field being hidden.
 */
export default function Particles() {
  const group = useRef()
  const material = useRef()
  const { size } = useThree()

  const count = size.width < 640 ? 700 : size.width < 1100 ? 1300 : 2200

  const positions = useMemo(() => {
    const array = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      // Hollow-ish box around the camera; nothing spawns right on the lens.
      array[i * 3] = (Math.random() - 0.5) * 46
      array[i * 3 + 1] = (Math.random() - 0.5) * 30
      array[i * 3 + 2] = -Math.random() * 32 + 2
    }
    return array
  }, [count])

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05)
    if (!group.current || !material.current) return

    if (!motionState.reducedMotion) {
      group.current.rotation.y += dt * 0.011
      group.current.rotation.x = Math.sin(performance.now() * 0.00004) * 0.03

      // Parallax tracking pointer and touch drag
      const px = motionState.pointer.x * 0.22
      const py = motionState.pointer.y * 0.16
      group.current.position.x = damp(group.current.position.x, px, 1.8, dt)
      group.current.position.y = damp(group.current.position.y, py, 1.8, dt)
    }

    // Arrival cue: the field gains a little presence behind the contact block.
    const arrival = progressBetween(motionState.scroll, 0.88, 1)
    const intro = motionState.reducedMotion ? 1 : motionState.intro.particles

    material.current.opacity = intro * (0.42 + arrival * 0.33)
    material.current.size = 0.032 + arrival * 0.014
  })

  return (
    <group ref={group}>
      <Points positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          ref={material}
          transparent
          color="#c9c9d4"
          size={0.032}
          sizeAttenuation
          depthWrite={false}
          opacity={0}
        />
      </Points>
    </group>
  )
}
