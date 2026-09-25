import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { damp, easeInOutCubic, lerp, motionState, progressBetween } from '../../lib/motionState'

/**
 * Creates a high-resolution sphere texture with the profile image framed by
 * cybernetic circuit traces and monogram text so it looks stunning wrapped around a 3D sphere.
 */
function createSphereTexture(imgSrc) {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 512
  const ctx = canvas.getContext('2d')

  // Background deep cybernetic metallic slate
  const grad = ctx.createLinearGradient(0, 0, 1024, 512)
  grad.addColorStop(0, '#0f0e1a')
  grad.addColorStop(0.5, '#181628')
  grad.addColorStop(1, '#0b0a14')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, 1024, 512)

  // Circuit trace accents on sphere skin
  ctx.strokeStyle = 'rgba(139, 92, 246, 0.35)'
  ctx.lineWidth = 2
  for (let y = 60; y < 512; y += 80) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(200, y)
    ctx.lineTo(240, y + 40)
    ctx.lineTo(400, y + 40)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(1024, y)
    ctx.lineTo(824, y)
    ctx.lineTo(784, y - 40)
    ctx.lineTo(624, y - 40)
    ctx.stroke()
  }

  // Draw front portrait medallion
  const drawMedallion = (centerX, centerY, radius) => {
    // Outer neon ring
    ctx.save()
    ctx.shadowBlur = 18
    ctx.shadowColor = '#22d3ee'
    ctx.strokeStyle = '#22d3ee'
    ctx.lineWidth = 4
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius + 8, 0, Math.PI * 2)
    ctx.stroke()
    ctx.restore()

    // Inner violet accent ring
    ctx.strokeStyle = '#8b5cf6'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius + 3, 0, Math.PI * 2)
    ctx.stroke()

    // Fill base
    ctx.fillStyle = '#1e1c30'
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
    ctx.fill()
  }

  drawMedallion(256, 256, 140)
  drawMedallion(768, 256, 140)

  // Top / bottom tech labels
  ctx.font = '600 24px monospace'
  ctx.fillStyle = 'rgba(34, 211, 238, 0.85)'
  ctx.textAlign = 'center'
  ctx.fillText('AADITHYA NAYAK V', 256, 75)
  ctx.fillText('FULL-STACK & AI', 256, 445)

  ctx.fillText('AI SYSTEMS CORE', 768, 75)
  ctx.fillText('SAHYADRI • 9.52 CGPA', 768, 445)

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.ClampToEdgeWrapping
  texture.needsUpdate = true

  // Load user image onto the front medallion
  const img = new Image()
  img.crossOrigin = 'anonymous'
  img.onload = () => {
    // Clip and draw image inside front and back medallions
    const renderAvatar = (cx, cy, r) => {
      ctx.save()
      ctx.beginPath()
      ctx.arc(cx, cy, r, 0, Math.PI * 2)
      ctx.closePath()
      ctx.clip()
      ctx.drawImage(img, cx - r, cy - r, r * 2, r * 2)
      ctx.restore()
    }

    renderAvatar(256, 256, 138)
    renderAvatar(768, 256, 138)
    texture.needsUpdate = true
  }
  img.src = imgSrc

  return texture
}

export default function PhotoSphere({ imageSrc = '/profile.png' }) {
  const group = useRef()
  const sphereMesh = useRef()
  const ring1 = useRef()
  const ring2 = useRef()

  // Drag rotation physics state
  const isDragging = useRef(false)
  const previousPointer = useRef({ x: 0, y: 0 })
  const velocity = useRef({ x: 0, y: 0.006 }) // Initial gentle spin
  const [hovered, setHovered] = useState(false)

  const sphereTexture = useMemo(() => createSphereTexture(imageSrc), [imageSrc])

  // Mouse / Touch drag handlers for full 3D rotation
  const onPointerDown = (e) => {
    e.stopPropagation()
    isDragging.current = true
    previousPointer.current = { x: e.clientX ?? e.touches?.[0]?.clientX ?? 0, y: e.clientY ?? e.touches?.[0]?.clientY ?? 0 }
    velocity.current = { x: 0, y: 0 }
    window.document.body.style.cursor = 'grabbing'
  }

  useEffect(() => {
    const onPointerMove = (e) => {
      if (!isDragging.current) return
      const currentX = e.clientX ?? e.touches?.[0]?.clientX ?? 0
      const currentY = e.clientY ?? e.touches?.[0]?.clientY ?? 0

      const deltaX = currentX - previousPointer.current.x
      const deltaY = currentY - previousPointer.current.y

      previousPointer.current = { x: currentX, y: currentY }

      if (sphereMesh.current) {
        sphereMesh.current.rotation.y += deltaX * 0.008
        sphereMesh.current.rotation.x += deltaY * 0.008
      }

      velocity.current = {
        x: deltaY * 0.006,
        y: deltaX * 0.006,
      }
    }

    const onPointerUp = () => {
      if (isDragging.current) {
        isDragging.current = false
        window.document.body.style.cursor = ''
      }
    }

    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
    }
  }, [])

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05)
    const g = group.current
    const mesh = sphereMesh.current
    if (!g || !mesh) return

    const { viewport } = state
    const reduced = motionState.reducedMotion

    // Continuous active auto-rotation + inertia drag
    if (!isDragging.current) {
      mesh.rotation.y += dt * 0.38 + velocity.current.y
      mesh.rotation.x += dt * 0.10 + velocity.current.x

      velocity.current.y *= 0.94
      velocity.current.x *= 0.94
    }

    // Spin outer gyroscope rings
    if (ring1.current) {
      ring1.current.rotation.z += dt * 0.45
      ring1.current.rotation.x += dt * 0.25
    }
    if (ring2.current) {
      ring2.current.rotation.y += dt * 0.4
      ring2.current.rotation.z -= dt * 0.3
    }

    /* ---- layout positioning ---- */
    const narrow = viewport.aspect < 1.05
    const heroScale = narrow ? 0.65 : Math.min(0.85, viewport.width / 11)

    const heroX = narrow ? 0 : viewport.width / 2 - 2.0
    const heroY = narrow ? 1.3 : 0.08

    const dockX = viewport.width / 2 - (narrow ? 0.65 : 1.15)
    const dockY = viewport.height / 2 - (narrow ? 1.1 : 1.4)
    const dockScale = heroScale * 0.42

    let x = heroX
    let y = heroY
    let scale = heroScale

    if (!reduced) {
      const dockT = easeInOutCubic(progressBetween(motionState.scroll, 0.1, 0.28))
      x = lerp(heroX, dockX, dockT)
      y = lerp(heroY, dockY, dockT)
      scale = lerp(heroScale, dockScale, dockT)
    }

    g.position.x = damp(g.position.x, x, 6, dt)
    g.position.y = damp(g.position.y, y, 6, dt)
    g.scale.setScalar(damp(g.scale.x, scale, 7, dt))
  })

  return (
    <group ref={group}>
      {/* Solid 3D Interactive Photo Ball - Reduced Sleek Size */}
      <mesh
        ref={sphereMesh}
        onPointerDown={onPointerDown}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        cursor={hovered ? 'grab' : 'auto'}
      >
        <sphereGeometry args={[0.88, 64, 64]} />
        <meshStandardMaterial
          map={sphereTexture}
          roughness={0.22}
          metalness={0.2}
          envMapIntensity={1.2}
        />
      </mesh>

      {/* Cybernetic Gyroscope Ring 1 */}
      <mesh ref={ring1} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.14, 0.012, 16, 100]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Cybernetic Gyroscope Ring 2 */}
      <mesh ref={ring2} rotation={[-Math.PI / 3, Math.PI / 6, 0]}>
        <torusGeometry args={[1.24, 0.010, 16, 100]} />
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#8b5cf6"
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Outer Soft Light Halo */}
      <mesh scale={1.35}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#22d3ee"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  )
}
