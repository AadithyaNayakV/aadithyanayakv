import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Shared easing vocabulary. Every timeline in the site pulls from this list so
 * motion reads as one system rather than per-file taste.
 */
export const EASE = {
  /** Long decelerations — section reveals, the dock move. */
  settle: 'expo.out',
  /** Shorter reveals. */
  swift: 'power3.out',
  /** The load sequence's slight overshoot, per the animation spec. */
  overshoot: 'back.out(1.4)',
}

/** Sections begin revealing when their top hits 80% of the viewport. */
export const REVEAL_START = 'top 80%'

export { gsap, ScrollTrigger }
