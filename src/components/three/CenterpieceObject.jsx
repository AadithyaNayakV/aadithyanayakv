import { useFrame } from '@react-three/fiber'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { gsap } from '../../lib/gsapConfig'
import {
  damp,
  easeInOutCubic,
  lerp,
  motionState,
  progressBetween,
} from '../../lib/motionState'

const VIOLET = new THREE.Color('#8b5cf6')
const CYAN = new THREE.Color('#22d3ee')

/** Radius of the wireframe shell, in world units. Drives the layout maths. */
const SHELL_RADIUS = 1.34

/**
 * How far the page has to travel while the click animation is playing before
 * the scroll timeline takes priority and the animation bows out — about 1.5%
 * of the document.
 *
 * Measured as distance from where the click happened, not as a velocity:
 * ScrollTrigger's getVelocity holds its last reading after scrolling stops, so
 * a velocity test cancels every interaction that follows the first flick.
 */
const SCROLL_INTERRUPT = 0.015

/* ---------------------------------------------------------------- shaders */

const pointsVertex = /* glsl */ `
  uniform float uMorph;
  uniform float uTime;
  uniform float uSize;
  uniform float uScale;
  uniform float uPixelRatio;

  attribute vec3 aTarget;
  attribute float aSeed;

  varying float vMorph;
  varying float vSeed;

  void main() {
    vec3 base = position;
    vec3 dir = normalize(base);

    // Straight-line travel between the shell and the letterforms...
    vec3 p = mix(base, aTarget, uMorph);

    // ...bowed outward at the midpoint, so the swarm visibly disperses before
    // it reassembles rather than sliding from one shape to the other.
    float burst = sin(uMorph * 3.14159265);
    p += dir * burst * (0.45 + aSeed * 0.95);

    // Idle shimmer. Small enough to read as "alive", not as motion.
    p += dir * sin(uTime * 1.5 + aSeed * 21.0) * 0.014;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * uPixelRatio * uScale * (0.5 + aSeed * 0.8) / max(-mv.z, 0.001);

    vMorph = uMorph;
    vSeed = aSeed;
  }
`

const pointsFragment = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uOpacity;

  varying float vMorph;
  varying float vSeed;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;

    // Smooth Gaussian-like dreamy blur so it never feels harsh or distracting
    float alpha = smoothstep(0.5, 0.02, d);
    alpha = pow(alpha, 1.8);

    vec3 col = mix(uColorA, uColorB, smoothstep(0.0, 0.45, vMorph));

    // Soft blur opacity in background so it won't disturb reading
    float blurIntensity = mix(0.42, 0.85, vMorph);
    gl_FragColor = vec4(col, alpha * uOpacity * blurIntensity * (0.35 + vSeed * 0.65));
  }
`

const haloVertex = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;

  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`

const haloFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform float uIntensity;

  varying vec3 vNormal;
  varying vec3 vView;

  void main() {
    float f = 1.0 - abs(dot(normalize(vNormal), normalize(vView)));
    f = pow(f, 4.5);
    gl_FragColor = vec4(uColor, f * uIntensity * 0.25);
  }
`

/* ------------------------------------------------------------- geometry */

/** Even distribution over a sphere — no clumping at the poles. */
function buildShell(count) {
  const positions = new Float32Array(count * 3)
  const seeds = new Float32Array(count)
  const golden = Math.PI * (3 - Math.sqrt(5))

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / Math.max(count - 1, 1)) * 2
    const ring = Math.sqrt(Math.max(1 - y * y, 0))
    const theta = golden * i
    const radius = 1.12 + (Math.random() - 0.5) * 0.14

    positions[i * 3] = Math.cos(theta) * ring * radius
    positions[i * 3 + 1] = y * radius
    positions[i * 3 + 2] = Math.sin(theta) * ring * radius
    seeds[i] = Math.random()
  }

  return { positions, seeds }
}

/**
 * Rasterises the initials to an offscreen canvas and samples the opaque pixels,
 * giving one 3D position per particle.
 */
function sampleTextPoints(text, count) {
  const W = 640
  const H = 256

  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H

  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  if (!ctx) return null

  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, W, H)
  ctx.fillStyle = '#fff'
  ctx.font = '700 148px "Space Grotesk", ui-sans-serif, system-ui, sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, W / 2, H / 2)

  const { data } = ctx.getImageData(0, 0, W, H)
  const hits = []
  for (let y = 0; y < H; y += 2) {
    for (let x = 0; x < W; x += 2) {
      if (data[(y * W + x) * 4] > 128) hits.push(x, y)
    }
  }

  const hitCount = hits.length / 2
  if (hitCount < 32) return null

  const out = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const j = (Math.random() * hitCount) | 0
    const x = hits[j * 2] + (Math.random() - 0.5) * 2
    const y = hits[j * 2 + 1] + (Math.random() - 0.5) * 2

    out[i * 3] = (x / W - 0.5) * 3.4
    out[i * 3 + 1] = -(y / H - 0.5) * 1.5
    out[i * 3 + 2] = (Math.random() - 0.5) * 0.22
  }

  return out
}

/* ------------------------------------------------------------ component */

/**
 * The persistent 3D object:
 * Now renders ANV with dreamy particle blur and automatic periodic pulse.
 */
export default function CenterpieceObject({ initials = 'ANV', pointCount = 3400 }) {
  const group = useRef()
  const shell = useRef()
  const core = useRef()
  const halo = useRef()
  const targetAttr = useRef()
  const morphTl = useRef(null)
  // Written through the material, never through the object passed to the JSX —
  // whatever the renderer ends up holding is the thing that has to change.
  const pointsMat = useRef()
  const haloMat = useRef()
  const scrollAtActivate = useRef(0)

  const { positions, seeds } = useMemo(() => buildShell(pointCount), [pointCount])

  const targets = useMemo(
    () => sampleTextPoints(initials, pointCount) ?? positions.slice(),
    [initials, pointCount, positions],
  )

  const uniforms = useMemo(
    () => ({
      uMorph: { value: 0 },
      uTime: { value: 0 },
      uSize: { value: 26 },
      uScale: { value: 0 },
      uOpacity: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio || 1, 2) },
      uColorA: { value: VIOLET.clone() },
      uColorB: { value: CYAN.clone() },
    }),
    [],
  )

  const haloUniforms = useMemo(
    () => ({
      uColor: { value: VIOLET.clone() },
      uIntensity: { value: 0 },
    }),
    [],
  )

  // The webfont may not have arrived when the first sample runs; resample once
  // it has so the letterforms are the display face rather than a fallback.
  useEffect(() => {
    let cancelled = false
    if (!document.fonts?.ready) return undefined

    document.fonts.ready.then(() => {
      if (cancelled || !targetAttr.current) return
      const next = sampleTextPoints(initials, pointCount)
      if (!next) return
      targetAttr.current.array.set(next)
      targetAttr.current.needsUpdate = true
    })

    return () => {
      cancelled = true
    }
  }, [initials, pointCount])

  const activate = useCallback(() => {
    if (morphTl.current) morphTl.current.kill()
    scrollAtActivate.current = motionState.scroll

    const reduced = motionState.reducedMotion
    const out = reduced ? 0.2 : 0.55
    const hold = reduced ? 0.2 : 0.8

    morphTl.current = gsap
      .timeline({ onComplete: () => (morphTl.current = null) })
      .to(motionState, { morph: 1, duration: out, ease: 'power2.inOut' })
      .to(motionState, { morph: 0, duration: out * 1.4, ease: 'power2.inOut' }, `+=${hold}`)
  }, [])

  // Auto-pulse morph every 13 seconds when idle so everyone sees ANV even without touching
  useEffect(() => {
    const timer = setInterval(() => {
      if (!morphTl.current && motionState.morph < 0.05) {
        activate()
      }
    }, 13000)
    return () => clearInterval(timer)
  }, [activate])

  // Keyboard equivalent — the hero renders a focusable control that fires this.
  useEffect(() => {
    window.addEventListener('centerpiece:activate', activate)
    return () => window.removeEventListener('centerpiece:activate', activate)
  }, [activate])

  const setHover = useCallback((hovering) => {
    if (motionState.isTouch) return
    window.dispatchEvent(new CustomEvent('cursor:hover', { detail: hovering }))
  }, [])

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05)
    const g = group.current
    if (!g) return

    const reduced = motionState.reducedMotion
    const { viewport } = state
    const morph = motionState.morph
    const intro = reduced ? 1 : motionState.intro.object

    // A scroll mid-animation wins: kill the click timeline and ease home.
    const travelled = Math.abs(motionState.scroll - scrollAtActivate.current)

    if (morphTl.current && travelled > SCROLL_INTERRUPT) {
      morphTl.current.kill()
      morphTl.current = null
      gsap.to(motionState, { morph: 0, duration: 0.3, ease: 'power2.out', overwrite: true })
    }

    /* ---- anchors ---- */
    // Portrait and squarish viewports stack: object above, text below.
    const narrow = viewport.aspect < 1.05

    const heroScale = narrow ? 0.6 : Math.min(0.9, viewport.width / 9.5)

    // Anchored to the right edge rather than to a fraction of the width
    const heroX = narrow ? 0 : viewport.width / 2 - (SHELL_RADIUS * heroScale + 0.6)
    const heroY = narrow ? 1.32 : 0.12

    const dockX = viewport.width / 2 - (narrow ? 0.66 : 1.15)
    const dockY = viewport.height / 2 - (narrow ? 1.15 : 1.45)
    const dockScale = heroScale * 0.45

    /* ---- continuous scrubbed scroll animation timeline ---- */
    let x = heroX
    let y = heroY
    let scale = heroScale
    let opacity = 1
    let dockT = 0

    if (!reduced) {
      // Smoothly glides from hero to dock position and orbits across the page background
      dockT = easeInOutCubic(progressBetween(motionState.scroll, 0.1, 0.28))

      // Orbital gentle drift across the background as page scrolls so it rotates around different areas
      const orbitX = Math.sin(motionState.scroll * Math.PI * 3) * (narrow ? 0.25 : 1.25)
      const orbitY = Math.cos(motionState.scroll * Math.PI * 2.5) * (narrow ? 0.35 : 0.65)

      x = lerp(heroX, dockX + orbitX, dockT)
      y = lerp(heroY, dockY + orbitY, dockT)
      scale = lerp(heroScale, dockScale * 1.15, dockT)

      // Near the bottom, gently ease opacity without disappearing
      const ending = progressBetween(motionState.scroll, 0.92, 1)
      opacity = lerp(1, 0.45, ending)
      scale *= lerp(1, 0.9, ending)
    }

    scale *= intro
    scale *= 1 + Math.sin(morph * Math.PI) * 0.08

    g.position.x = damp(g.position.x, x, 6, dt)
    g.position.y = damp(g.position.y, y, 6, dt)
    g.scale.setScalar(damp(g.scale.x, scale, 8, dt))

    /* ---- dynamic scroll-linked & pointer rotation ---- */
    if (!reduced) {
      // Living idle spin + settling boost during dock transition
      const settleKick = Math.sin(dockT * Math.PI) * 1.8
      g.rotation.y += dt * (0.32 + settleKick + (1 - intro) * 3.0) * (1 - morph)

      // Ambient 3D tumbling so it rotates in full space
      g.rotation.x += dt * 0.08 * (1 - morph)

      // When the initials are morphing, face forward
      if (morph > 0.01) {
        const TAU = Math.PI * 2
        const facing = Math.round(g.rotation.y / TAU) * TAU
        g.rotation.y = damp(g.rotation.y, facing, 8 * morph, dt)
      }

      // Responsive tilt to both touch drag and mouse pointer throughout the page
      const tilt = (1 - morph) * 0.16
      const scrollTilt = Math.sin(motionState.scroll * Math.PI * 2) * 0.1
      const targetX = -motionState.pointer.y * tilt + scrollTilt + (1 - intro) * 0.55
      const targetZ = motionState.pointer.x * tilt * 0.6 + (1 - intro) * 0.8

      g.rotation.x = damp(g.rotation.x, targetX, 3.0, dt)
      g.rotation.z = damp(g.rotation.z, targetZ, 3.0, dt)
    }

    /* ---- material state ---- */
    const pu = pointsMat.current?.uniforms
    if (pu) {
      pu.uTime.value = state.clock.elapsedTime
      pu.uMorph.value = morph
      pu.uScale.value = g.scale.x
      pu.uOpacity.value = opacity * intro
    }

    if (shell.current) {
      shell.current.material.opacity = 0.45 * opacity * intro * (1 - morph * 0.92)
      shell.current.scale.setScalar(1 + Math.sin(morph * Math.PI) * 0.42)
      if (!reduced) shell.current.rotation.y -= dt * 0.1
    }

    if (core.current) {
      core.current.material.opacity = 0.9 * opacity * intro * (1 - morph)
      core.current.material.emissiveIntensity = 0.18 + Math.sin(morph * Math.PI) * 0.9
      core.current.material.emissive.copy(VIOLET).lerp(CYAN, morph)
    }

    const hu = haloMat.current?.uniforms
    if (hu) {
      hu.uIntensity.value = (0.32 + Math.sin(morph * Math.PI) * 0.5) * opacity * intro
      hu.uColor.value.copy(VIOLET).lerp(CYAN, morph)
    }
  })

  return (
    <group ref={group} scale={0}>
      <points frustumCulled={false} raycast={() => null}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute ref={targetAttr} attach="attributes-aTarget" args={[targets, 3]} />
          <bufferAttribute attach="attributes-aSeed" args={[seeds, 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={pointsMat}
          vertexShader={pointsVertex}
          fragmentShader={pointsFragment}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <mesh ref={shell} raycast={() => null}>
        <icosahedronGeometry args={[SHELL_RADIUS, 1]} />
        <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0} depthWrite={false} />
      </mesh>

      <mesh ref={core} raycast={() => null}>
        <icosahedronGeometry args={[0.42, 0]} />
        <meshStandardMaterial
          color="#0f0f17"
          emissive="#8b5cf6"
          emissiveIntensity={0.18}
          roughness={0.25}
          metalness={0.9}
          transparent
          opacity={0}
          flatShading
        />
      </mesh>

      <mesh ref={halo} scale={1.52} raycast={() => null}>
        <sphereGeometry args={[1, 32, 32]} />
        <shaderMaterial
          ref={haloMat}
          uniforms={haloUniforms}
          vertexShader={haloVertex}
          fragmentShader={haloFragment}
          transparent
          depthWrite={false}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Invisible, generous hit area. Draws nothing, still raycasts. */}
      <mesh
        scale={1.5}
        onClick={activate}
        onPointerDown={activate}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} colorWrite={false} />
      </mesh>
    </group>
  )
}
