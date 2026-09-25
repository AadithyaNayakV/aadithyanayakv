import { useScrollProgress } from '../../hooks/useScrollProgress'

/**
 * ScrollProgress displays a glowing, dynamic gradient track at the top
 * of the screen to indicate document scroll depth.
 */
export default function ScrollProgress() {
  const progress = useScrollProgress(0.002)

  return (
    <div
      className="pointer-events-none fixed top-0 inset-x-0 z-50 h-[3px] bg-transparent"
      aria-hidden="true"
    >
      <div
        className="h-full bg-linear-to-r from-accent via-signal to-accent transition-all duration-75 ease-out shadow-[0_0_12px_rgba(139,92,246,0.8),0_0_24px_rgba(34,211,238,0.5)]"
        style={{ width: `${Math.min(100, Math.max(0, progress * 100))}%` }}
      />
    </div>
  )
}
