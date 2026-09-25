import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { damp, easeInOutCubic, lerp, motionState, progressBetween } from '../../lib/motionState'

/**
 * Creates a high-resolution sphere texture with:
 * Side A (Front, x=256): High-fidelity portrait of Aadithya Nayak V in a cybernetic neon medallion
 * Side B (Back, x=768): Inspirational engineering quote medallion with glowing typography
 */
function createSphereTexture(imgSrc) {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 512
  const ctx = canvas.getContext('2d')

  // Background deep cybernetic metallic slate
  const grad = ctx.createLinearGradient(0, 0, 1024, 512)
  grad.addColorStop(0, '#0a0914')
  grad.addColorStop(0.5, '#141224')
  grad.addColorStop(1, '#080710')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, 1024, 512)

  // Circuit trace accents on sphere skin
  ctx.strokeStyle = 'rgba(124, 58, 237, 0.28)'
  ctx.lineWidth = 2
  for (let y = 60; y < 512; y += 80) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(190, y)
    ctx.lineTo(230, y + 40)
    ctx.lineTo(390, y + 40)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(1024, y)
    ctx.lineTo(834, y)
    ctx.lineTo(794, y - 40)
    ctx.lineTo(634, y - 40)
    ctx.stroke()
  }

  // Draw cybernetic outer rings for any medallion
  const drawMedallionRing = (centerX, centerY, radius) => {
    // Outer neon ring with glow
    ctx.save()
    ctx.shadowBlur = 18
    ctx.shadowColor = '#0284c7'
    ctx.strokeStyle = '#22d3ee'
    ctx.lineWidth = 4
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius + 8, 0, Math.PI * 2)
    ctx.stroke()
    ctx.restore()

    // Inner violet accent ring
    ctx.strokeStyle = '#8b5cf6'
    ctx.lineWidth = 2.5
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius + 3, 0, Math.PI * 2)
    ctx.stroke()

    // Dark metallic fill base
    ctx.fillStyle = '#161426'
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
    ctx.fill()
  }

  // 1. Draw Front Medallion Frame (x = 256)
  drawMedallionRing(256, 256, 145)

  // Front top / bottom tech labels
  ctx.font = '700 22px monospace'
  ctx.fillStyle = '#38bdf8'
  ctx.textAlign = 'center'
  ctx.fillText('AADITHYA NAYAK V', 256, 70)

  ctx.font = '600 16px monospace'
  ctx.fillStyle = '#a78bfa'
  ctx.fillText('FULL-STACK & AI ENGINEER', 256, 450)

  // 2. Draw Back Medallion (x = 768) — The Quote Side
  drawMedallionRing(768, 256, 145)

  // Inner decorative gradient badge for the quote
  const quoteRad = ctx.createRadialGradient(768, 256, 10, 768, 256, 145)
  quoteRad.addColorStop(0, '#1f1b38')
  quoteRad.addColorStop(0.7, '#131124')
  quoteRad.addColorStop(1, '#0c0b17')
  ctx.fillStyle = quoteRad
  ctx.beginPath()
  ctx.arc(768, 256, 144, 0, Math.PI * 2)
  ctx.fill()

  // Decorative quotation mark
  ctx.font = '800 68px "Space Grotesk", sans-serif'
  ctx.fillStyle = 'rgba(34, 211, 238, 0.35)'
  ctx.textAlign = 'center'
  ctx.fillText('“', 768, 195)

  // The Developer Quote
  ctx.font = '600 19px "Space Grotesk", sans-serif'
  ctx.fillStyle = '#f8fafc'
  ctx.fillText('Turning complex algorithms', 768, 232)
  ctx.fillText('into living, scalable realities.', 768, 260)

  // Divider accent line
  ctx.strokeStyle = 'rgba(139, 92, 246, 0.6)'
  ctx.lineWidth = 1.5
  ctx.beginPath()
  ctx.moveTo(718, 282)
  ctx.lineTo(818, 282)
  ctx.stroke()

  // Dot in center of divider
  ctx.fillStyle = '#38bdf8'
  ctx.beginPath()
  ctx.arc(768, 282, 3, 0, Math.PI * 2)
  ctx.fill()

  // Author signature & tagline
  ctx.font = '500 14px monospace'
  ctx.fillStyle = '#94a3b8'
  ctx.fillText('— Aadithya Nayak V —', 768, 310)

  ctx.font = '600 12px monospace'
  ctx.fillStyle = 'rgba(34, 211, 238, 0.85)'
  ctx.fillText('CODE WITH PURPOSE', 768, 332)

  // Back top / bottom labels
  ctx.font = '700 20px monospace'
  ctx.fillStyle = '#38bdf8'
  ctx.fillText('ENGINEERING ETHOS', 768, 70)

  ctx.font = '600 16px monospace'
  ctx.fillStyle = '#a78bfa'
  ctx.fillText('ALGORITHMIC RIGOR', 768, 450)

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.ClampToEdgeWrapping
  texture.needsUpdate = true

  // 3. Load user photo perfectly on the front medallion
  const img = new Image()
  img.crossOrigin = 'anonymous'
  img.onload = () => {
    const cx = 256
    const cy = 256
    const r = 143

    // Crop image with aspect ratio preservation centered on face (upper bias)
    let sWidth, sHeight, sx, sy
    if (img.width < img.height) {
      sWidth = img.width
      sHeight = img.width
      sx = 0
      // Frame face nicely: slight offset from top
      sy = Math.floor((img.height - sHeight) * 0.12)
    } else {
      sWidth = img.height
      sHeight = img.height
      sx = Math.floor((img.width - sWidth) / 2)
      sy = 0
    }

    ctx.save()
    ctx.beginPath()
    ctx.arc(cx, cy, r, 0, Math.PI * 2)
    ctx.closePath()
    ctx.clip()

    // Render crisp, high-resolution portrait
    ctx.drawImage(img, sx, sy, sWidth, sHeight, cx - r, cy - r, r * 2, r * 2)

    // Inner vignette shadow for depth
    const vignette = ctx.createRadialGradient(cx, cy, r * 0.7, cx, cy, r)
    vignette.addColorStop(0, 'rgba(0,0,0,0)')
    vignette.addColorStop(1, 'rgba(0,0,0,0.4)')
    ctx.fillStyle = vignette
    ctx.beginPath()
    ctx.arc(cx, cy, r, 0, Math.PI * 2)
    ctx.fill()

    ctx.restore()

    // Re-draw inner neon ring over photo edge for seamless framing
    ctx.strokeStyle = '#22d3ee'
    ctx.lineWidth = 2.5
    ctx.beginPath()
    ctx.arc(cx, cy, r, 0, Math.PI * 2)
    ctx.stroke()

    texture.needsUpdate = true
  }
  img.src = imgSrc

  return texture
}

export default function PhotoSphere({ imageSrc = '/prof.jpeg' }) {
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
    previousPointer.current = {
      x: e.clientX ?? e.touches?.[0]?.clientX ?? 0,
      y: e.clientY ?? e.touches?.[0]?.clientY ?? 0,
    }
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
      mesh.rotation.y += dt * 0.35 + velocity.current.y
      mesh.rotation.x += dt * 0.08 + velocity.current.x

      velocity.current.y *= 0.94
      velocity.current.x *= 0.94
    }

    // Spin outer gyroscope rings
    if (ring1.current) {
      ring1.current.rotation.z += dt * 0.42
      ring1.current.rotation.x += dt * 0.22
    }
    if (ring2.current) {
      ring2.current.rotation.y += dt * 0.38
      ring2.current.rotation.z -= dt * 0.28
    }

    /* ---- layout positioning ---- */
    const narrow = viewport.aspect < 1.05
    // Generously sized ball as requested
    const heroScale = narrow ? 0.78 : Math.min(1.02, viewport.width / 9.8)

    const heroX = narrow ? 0 : viewport.width / 2 - 2.05
    const heroY = narrow ? 1.25 : 0.08

    const dockX = viewport.width / 2 - (narrow ? 0.65 : 1.15)
    const dockY = viewport.height / 2 - (narrow ? 1.1 : 1.4)
    const dockScale = heroScale * 0.45

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
      {/* Solid 3D Interactive Photo & Quote Ball — Generous Size */}
      <mesh
        ref={sphereMesh}
        onPointerDown={onPointerDown}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        cursor={hovered ? 'grab' : 'auto'}
      >
        <sphereGeometry args={[1.12, 64, 64]} />
        <meshStandardMaterial
          map={sphereTexture}
          roughness={0.22}
          metalness={0.25}
          envMapIntensity={1.3}
        />
      </mesh>

      {/* Cybernetic Gyroscope Ring 1 */}
      <mesh ref={ring1} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.44, 0.013, 16, 100]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={0.65}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Cybernetic Gyroscope Ring 2 */}
      <mesh ref={ring2} rotation={[-Math.PI / 3, Math.PI / 6, 0]}>
        <torusGeometry args={[1.56, 0.011, 16, 100]} />
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#8b5cf6"
          emissiveIntensity={0.55}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Outer Soft Light Halo */}
      <mesh scale={1.68}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#22d3ee"
          transparent
          opacity={0.07}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  )
}
