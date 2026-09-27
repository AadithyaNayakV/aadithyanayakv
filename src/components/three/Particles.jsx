import { PointMaterial, Points } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'

/**
 * Ambient star field with subtle, calm drift.
 * Rotation speed is strictly frame-rate independent via delta time.
 */
export default function Particles() {
  const group = useRef()
  const count = 280

  const positions = useMemo(() => {
    const array = new Float32Array(count * 3)
    let seed = 99
    const random = () => {
      seed = (seed * 16807) % 2147483647
      return (seed - 1) / 2147483646
    }
    for (let i = 0; i < count; i++) {
      array[i * 3] = (random() - 0.5) * 44
      array[i * 3 + 1] = (random() - 0.5) * 28
      array[i * 3 + 2] = -random() * 30 + 2
    }
    return array
  }, [])

  useFrame((_, delta) => {
    if (!group.current) return
    const dt = Math.min(delta, 0.05)
    group.current.rotation.y += dt * 0.008
  })

  return (
    <group ref={group}>
      <Points positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#c9c9d4"
          size={0.03}
          sizeAttenuation
          depthWrite={false}
          opacity={0.35}
        />
      </Points>
    </group>
  )
}
