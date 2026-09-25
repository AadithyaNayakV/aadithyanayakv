import { motion } from 'framer-motion'
import { useCallback, useRef, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/**
 * SpotlightCard: Smooth interactive card with 3D tilt, spring hover/tap physics,
 * and a dynamic radiant spotlight following mouse and touch.
 */
export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(139, 92, 246, 0.18)',
  borderColor = 'rgba(34, 211, 238, 0.4)',
  onClick,
  ...props
}) {
  const cardRef = useRef(null)
  const reducedMotion = useReducedMotion()
  const [isHovered, setIsHovered] = useState(false)
  const [rotate, setRotate] = useState({ x: 0, y: 0 })

  const handlePointerMove = useCallback(
    (e) => {
      if (reducedMotion || !cardRef.current) return
      const rect = cardRef.current.getBoundingClientRect()
      const clientX = e.clientX ?? (e.touches && e.touches[0] ? e.touches[0].clientX : 0)
      const clientY = e.clientY ?? (e.touches && e.touches[0] ? e.touches[0].clientY : 0)

      const x = clientX - rect.left
      const y = clientY - rect.top

      // Set CSS variables for spotlight
      cardRef.current.style.setProperty('--spot-x', `${x}px`)
      cardRef.current.style.setProperty('--spot-y', `${y}px`)

      // Calculate tilt (-6deg to +6deg)
      const normX = (x / rect.width - 0.5) * 2
      const normY = (y / rect.height - 0.5) * 2
      setRotate({ x: -normY * 5, y: normX * 5 })
      setIsHovered(true)
    },
    [reducedMotion],
  )

  const handlePointerLeave = useCallback(() => {
    setRotate({ x: 0, y: 0 })
    setIsHovered(false)
  }, [])

  return (
    <motion.div
      ref={cardRef}
      style={{
        transformPerspective: 1000,
        transform: reducedMotion
          ? 'none'
          : `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: 'transform 180ms ease-out, border-color 250ms ease, box-shadow 250ms ease',
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onTouchMove={handlePointerMove}
      onTouchEnd={handlePointerLeave}
      onClick={onClick}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative overflow-hidden rounded-2xl border border-edge/80 bg-surface/60 backdrop-blur-md transition-all duration-200 ${
        isHovered
          ? 'border-accent/40 shadow-[0_16px_36px_-10px_rgba(0,0,0,0.5),0_0_20px_-6px_rgba(139,92,246,0.25)]'
          : 'shadow-xs'
      } ${className}`}
      {...props}
    >
      {/* Radiant dynamic spotlight following touch / pointer */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(350px circle at var(--spot-x, 50%) var(--spot-y, 50%), ${spotlightColor}, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* Radiant border glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          border: `1px solid ${borderColor}`,
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 size-full">{children}</div>
    </motion.div>
  )
}
