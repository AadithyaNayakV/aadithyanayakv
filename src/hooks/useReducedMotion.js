import { useSyncExternalStore } from 'react'
import { motionState } from '../lib/motionState'

const QUERY = '(prefers-reduced-motion: reduce)'

// Seeded at import time so the very first frame of the load sequence already
// knows whether it is allowed to run.
if (typeof window !== 'undefined') {
  motionState.reducedMotion = window.matchMedia(QUERY).matches
}

function subscribe(onChange) {
  const mq = window.matchMedia(QUERY)
  const handler = (event) => {
    motionState.reducedMotion = event.matches
    onChange()
  }

  mq.addEventListener('change', handler)
  return () => mq.removeEventListener('change', handler)
}

const getSnapshot = () => window.matchMedia(QUERY).matches

export function useReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false)
}
