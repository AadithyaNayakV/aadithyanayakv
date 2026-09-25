import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

/**
 * High-Tech "Door / Curtain" Intro Reveal
 * Features dual sliding blast doors with cybernetic seam line and monogram reveal.
 */
export default function IntroDoorLoader() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Elegant quick 1.1s initial boot sequence
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {loading ? (
        <motion.div
          key="intro-doors"
          className="fixed inset-0 z-[100] flex pointer-events-auto select-none overflow-hidden"
          exit={{ opacity: 0, transition: { duration: 0.2, delay: 0.6 } }}
        >
          {/* Left Door */}
          <motion.div
            initial={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
            className="relative h-full w-1/2 bg-[#09090f] border-r border-accent/30 flex items-center justify-end pr-4"
          >
            {/* Tech grid texture */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#8b5cf6_1px,transparent_1px)] [background-size:16px_16px]" />
          </motion.div>

          {/* Right Door */}
          <motion.div
            initial={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
            className="relative h-full w-1/2 bg-[#09090f] border-l border-signal/30 flex items-center justify-start pl-4"
          >
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#22d3ee_1px,transparent_1px)] [background-size:16px_16px]" />
          </motion.div>

          {/* Center Monogram & Status Lock */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, transition: { duration: 0.25 } }}
            className="absolute inset-0 m-auto flex flex-col items-center justify-center pointer-events-none"
          >
            <div className="relative flex items-center justify-center size-20 rounded-2xl bg-surface/90 border border-edge shadow-[0_0_50px_rgba(34,211,238,0.3)] backdrop-blur-xl">
              <span className="font-mono text-2xl font-bold tracking-widest text-ink">
                ANV
              </span>
              <span className="absolute -bottom-1 size-2 rounded-full bg-signal animate-ping" />
            </div>

            <div className="mt-4 flex items-center gap-2 font-mono text-xs tracking-wider text-muted uppercase">
              <span className="size-1.5 rounded-full bg-accent animate-pulse" />
              <span>Initializing System...</span>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
