/**
 * A single mutable object shared between the DOM timeline (GSAP) and the WebGL
 * render loop (useFrame).
 *
 * This is deliberately not React state: scroll progress and pointer position
 * update every frame, and pushing them through setState would re-render the
 * whole tree 60 times a second. GSAP writes into it, useFrame reads out of it,
 * and React never sees the intermediate values.
 */

export const motionState = {
  /** 0 → 1 across the whole document. Written by useScrollProgressDriver. */
  scroll: 0,

  /** Pointer in normalised device coords, -1 → 1, origin centre. */
  pointer: { x: 0, y: 0 },

  /** Page-load sequence. Tweened by the intro timeline, read in useFrame. */
  intro: { particles: 0, object: 0 },

  /** 0 → 1 dispersal of the centrepiece into the initials. */
  morph: 0,

  reducedMotion: false,
  isTouch: false,
}

export const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v))

export const lerp = (a, b, t) => a + (b - a) * t

/** Frame-rate independent smoothing. */
export const damp = (current, target, lambda, dt) =>
  lerp(current, target, 1 - Math.exp(-lambda * dt))

/** Maps v from [inMin, inMax] onto 0 → 1, clamped. */
export const progressBetween = (v, inMin, inMax) => clamp((v - inMin) / (inMax - inMin))

/** Smooth acceleration and deceleration — the "settling" feel, no libraries. */
export const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

export function initPointerTracking() {
  motionState.isTouch = window.matchMedia('(pointer: coarse)').matches

  const onMove = (e) => {
    motionState.pointer.x = (e.clientX / window.innerWidth) * 2 - 1
    motionState.pointer.y = -((e.clientY / window.innerHeight) * 2 - 1)
  }

  const onLeave = () => {
    motionState.pointer.x = 0
    motionState.pointer.y = 0
  }

  const onTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      motionState.pointer.x = (e.touches[0].clientX / window.innerWidth) * 2 - 1
      motionState.pointer.y = -((e.touches[0].clientY / window.innerHeight) * 2 - 1)
    }
  }

  window.addEventListener('pointermove', onMove, { passive: true })
  document.addEventListener('pointerleave', onLeave)
  window.addEventListener('touchmove', onTouchMove, { passive: true })
  window.addEventListener('touchend', onLeave, { passive: true })

  return () => {
    window.removeEventListener('pointermove', onMove)
    document.removeEventListener('pointerleave', onLeave)
    window.removeEventListener('touchmove', onTouchMove)
    window.removeEventListener('touchend', onLeave)
  }
}
