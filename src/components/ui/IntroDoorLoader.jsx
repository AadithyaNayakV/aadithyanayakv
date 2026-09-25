import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

/**
 * Creative "Torn Paper" Intro Reveal
 * Features two halves of fine deckled paper tearing apart down the center seam
 * in a clean white paper aesthetic, with zero dark reload artifacts.
 */
export default function IntroDoorLoader() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Quick, elegant 0.95s paper tear intro
    const timer = setTimeout(() => {
      setLoading(false)
    }, 950)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {loading ? (
        <motion.div
          key="intro-paper"
          className="fixed inset-0 z-[100] flex pointer-events-auto select-none overflow-hidden bg-transparent"
          exit={{ opacity: 0, transition: { duration: 0.25, delay: 0.55 } }}
        >
          {/* Left Torn Paper Half */}
          <motion.div
            initial={{ x: 0 }}
            exit={{ x: '-105%' }}
            transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1], delay: 0.08 }}
            className="relative h-full w-[52%] bg-[#ffffff] shadow-[8px_0_24px_rgba(0,0,0,0.06)] flex items-center justify-end"
          >
            {/* Subtle paper grain texture */}
            <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#0f172a_1px,transparent_1px)] [background-size:12px_12px]" />

            {/* Jagged Ripped Paper Right Edge SVG */}
            <svg
              className="absolute -right-5 inset-y-0 h-full w-6 text-[#ffffff] fill-current drop-shadow-[4px_0_8px_rgba(0,0,0,0.04)] pointer-events-none"
              preserveAspectRatio="none"
              viewBox="0 0 20 1000"
            >
              <path d="M0,0 L12,30 L6,70 L16,120 L8,170 L14,220 L5,270 L15,330 L7,380 L14,430 L4,490 L16,540 L8,590 L15,640 L6,700 L14,750 L5,810 L15,860 L7,920 L13,970 L0,1000 Z" />
            </svg>
          </motion.div>

          {/* Right Torn Paper Half */}
          <motion.div
            initial={{ x: 0 }}
            exit={{ x: '105%' }}
            transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1], delay: 0.08 }}
            className="relative h-full w-[52%] -ml-[4%] bg-[#ffffff] shadow-[-8px_0_24px_rgba(0,0,0,0.06)] flex items-center justify-start"
          >
            <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#0f172a_1px,transparent_1px)] [background-size:12px_12px]" />

            {/* Jagged Ripped Paper Left Edge SVG */}
            <svg
              className="absolute -left-5 inset-y-0 h-full w-6 text-[#ffffff] fill-current drop-shadow-[-4px_0_8px_rgba(0,0,0,0.04)] pointer-events-none"
              preserveAspectRatio="none"
              viewBox="0 0 20 1000"
            >
              <path d="M20,0 L8,30 L14,70 L4,120 L12,170 L6,220 L15,270 L5,330 L13,380 L6,430 L16,490 L4,540 L12,590 L5,640 L14,700 L6,750 L15,810 L5,860 L13,920 L7,970 L20,1000 Z" />
            </svg>
          </motion.div>

          {/* Center Embossed Seal & Monogram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
            className="absolute inset-0 m-auto flex flex-col items-center justify-center pointer-events-none z-10"
          >
            <div className="relative flex flex-col items-center justify-center size-24 rounded-full bg-white border border-slate-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
              <span className="font-mono text-2xl font-bold tracking-widest text-slate-900">
                ANV
              </span>
              <span className="mt-0.5 font-mono text-[9px] uppercase tracking-widest text-slate-500 font-medium">
                Portfolio
              </span>
              <span className="absolute -bottom-1 size-1.5 rounded-full bg-sky-500 animate-ping" />
            </div>

            <div className="mt-4 flex items-center gap-2 font-mono text-xs tracking-wider text-slate-600 uppercase font-medium bg-white/90 px-3 py-1 rounded-full border border-slate-200/60 shadow-2xs">
              <span className="size-1.5 rounded-full bg-indigo-500 animate-pulse" />
              <span>Full-Stack & AI Engineer</span>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
