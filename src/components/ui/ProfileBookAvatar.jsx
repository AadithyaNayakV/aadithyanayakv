import { AnimatePresence, motion } from 'framer-motion'
import {
  Award,
  BookOpen,
  Code2,
  ExternalLink,
  Flame,
  Sparkles,
  Trophy,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import developerData from '../../data/developer-data.json'
import { site } from '../../data/site'

const totalSolved = developerData.leetcode?.totalSolved || 709

const pages = [
  {
    id: 'leetcode',
    tag: 'Algorithmic Mastery',
    title: 'LeetCode Problem Solving',
    subtitle: `${totalSolved}+ Problems Solved (@DKSbFeaWen)`,
    content: {
      stats: [
        { label: 'Total Solved', val: `${totalSolved}`, color: 'text-signal' },
        { label: 'Handle', val: '@DKSbFeaWen', color: 'text-accent' },
        { label: 'Focus', val: 'DSA & Systems', color: 'text-emerald-500' },
      ],
      desc: 'Consistent problem solver with deep algorithmic rigor in Dynamic Programming, Graph Theory, Segment Trees, and High-Concurrency Patterns. Solved over 700 problems with optimal runtime and memory efficiency.',
      link: 'https://leetcode.com/u/DKSbFeaWen/',
    },
  },
  {
    id: 'the-end',
    tag: 'Epilogue',
    title: 'The End',
    subtitle: '— Chapter 1: The Best is Yet to Come —',
    content: {
      quote:
        '“Engineering software is an art of turning pure logic into resilient, living systems that empower humans.”',
      signature: 'Aadithya Nayak V',
      actionText: 'Ready to build high-scale solutions together.',
      ctaEmail: site.contact.email,
    },
  },
]

const PAGE_DURATION = 3200 // 3.2s per page auto-flip

/**
 * ProfileBookAvatar:
 * Default: Clean round photo avatar with animated glowing rings.
 * Hover / Tap: Opens like a real 3D page from the left spine.
 * Automatically flips forward through LeetCode Achievements and finishes on "The End".
 * No manual next/prev buttons — purely automatic and fluid.
 */
export default function ProfileBookAvatar() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const autoPageTimer = useRef(null)

  // Automatically flip pages forward while mouse is upon it
  useEffect(() => {
    if (isOpen) {
      autoPageTimer.current = setInterval(() => {
        setCurrentPage((prev) => (prev + 1) % pages.length)
      }, PAGE_DURATION)
    } else {
      if (autoPageTimer.current) clearInterval(autoPageTimer.current)
      setCurrentPage(0)
    }

    return () => {
      if (autoPageTimer.current) clearInterval(autoPageTimer.current)
    }
  }, [isOpen])

  const activePage = pages[currentPage]

  return (
    <div
      className="relative flex flex-col items-center justify-center select-none"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onClick={() => {
        if (!isOpen) setIsOpen(true)
        else setCurrentPage((prev) => (prev + 1) % pages.length)
      }}
      style={{ perspective: 1400 }}
    >
      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* =========================================================
             DEFAULT STATE: ROUND CIRCLE WITH USER PHOTO
             ========================================================= */
          <motion.div
            key="circle-avatar"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="group relative cursor-pointer flex flex-col items-center"
          >
            {/* Ambient Background Glow */}
            <div className="absolute -inset-4 rounded-full bg-linear-to-tr from-accent/25 via-signal/20 to-accent/20 blur-2xl opacity-60 transition-opacity duration-500 group-hover:opacity-100 animate-pulse" />

            {/* Rotating Outer Gyroscope Border Ring */}
            <div className="absolute -inset-3 rounded-full border border-dashed border-signal/40 animate-[spin_24s_linear_infinite] pointer-events-none" />
            <div className="absolute -inset-1.5 rounded-full border border-accent/40 animate-[spin_18s_linear_infinite_reverse] pointer-events-none" />

            {/* Solid Round Photo Circle Frame */}
            <div className="relative size-64 sm:size-72 md:size-80 lg:size-88 rounded-full p-1.5 bg-linear-to-b from-white via-slate-100 to-white dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 shadow-[0_12px_40px_rgba(2,132,199,0.18)] transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_16px_50px_rgba(124,58,237,0.25)]">
              <div className="relative size-full rounded-full overflow-hidden border-2 border-edge bg-slate-900">
                <img
                  src="/prof.jpeg"
                  alt="Aadithya Nayak V"
                  className="size-full object-cover object-top transition-transform duration-500 group-hover:scale-108"
                />

                {/* Subtle vignette over photo edge */}
                <div className="absolute inset-0 rounded-full shadow-[inset_0_0_24px_rgba(0,0,0,0.35)] pointer-events-none" />
              </div>

              {/* Status Badge overlay */}
              <div className="absolute -bottom-2 inset-x-0 mx-auto w-max flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surface/95 border border-edge shadow-md backdrop-blur-md font-mono text-[11px] text-ink font-medium">
                <span className="size-2 rounded-full bg-emerald-500 animate-ping" />
                <span>Full-Stack & AI</span>
              </div>
            </div>

            {/* Interactive hint tooltip below */}
            <motion.div
              initial={{ y: 5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-6 flex items-center gap-2 px-4 py-1.5 rounded-full border border-edge bg-surface/80 backdrop-blur-md shadow-2xs font-mono text-xs text-muted group-hover:text-signal group-hover:border-signal/40 transition-colors"
            >
              <BookOpen className="size-3.5 text-accent animate-bounce" />
              <span>Hover or tap to open achievements page 📖</span>
            </motion.div>
          </motion.div>
        ) : (
          /* =========================================================
             OPEN STATE: 3D REALISTIC BOOK PAGE OPENING & AUTO-FLIPPING
             ========================================================= */
          <motion.div
            key="open-book-page"
            initial={{ rotateY: -80, opacity: 0, scale: 0.88 }}
            animate={{ rotateY: 0, opacity: 1, scale: 1 }}
            exit={{ rotateY: -75, opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: 'left center' }}
            className="relative cursor-pointer w-[320px] sm:w-[380px] md:w-[420px] rounded-2xl bg-surface border border-edge shadow-[0_24px_64px_rgba(15,23,42,0.18)] p-6 md:p-8 backdrop-blur-xl overflow-hidden"
          >
            {/* Book Spine / Binding Left Highlight with 3D Depth */}
            <div className="absolute inset-y-0 left-0 w-3 bg-linear-to-r from-accent/50 via-signal/30 to-transparent border-r border-edge/60 shadow-[2px_0_6px_rgba(0,0,0,0.06)]" />

            {/* Subtle paper grain texture */}
            <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#0f172a_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none" />

            {/* Auto-flip duration progress bar at the very top */}
            <div className="absolute top-0 inset-x-0 h-1 bg-edge/40">
              <motion.div
                key={currentPage}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: PAGE_DURATION / 1000, ease: 'linear' }}
                className="h-full bg-linear-to-r from-accent to-signal"
              />
            </div>

            {/* Top Header / Page Tag */}
            <div className="flex items-center justify-between border-b border-edge/60 pb-3 mb-5 pl-2 mt-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-accent font-semibold px-2 py-0.5 rounded-md bg-accent/10 border border-accent/20">
                  {activePage.tag}
                </span>
                <span className="font-mono text-[10px] text-muted">
                  Page {currentPage + 1} of {pages.length}
                </span>
              </div>

              {/* Progress Indicator Dots */}
              <div className="flex items-center gap-1.5">
                {pages.map((p, idx) => (
                  <div
                    key={p.id}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === currentPage ? 'w-5 bg-signal' : 'w-1.5 bg-edge'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Smooth 3D Page Turn Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activePage.id}
                initial={{ rotateY: 65, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: -65, opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: 'left center' }}
                className="min-h-[270px] flex flex-col justify-between pl-2"
              >
                {/* 1. LEETCODE ACHIEVEMENTS PAGE */}
                {activePage.id === 'leetcode' && (
                  <div className="space-y-4 py-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="grid size-10 place-items-center rounded-xl bg-signal/10 border border-signal/20 text-signal shadow-2xs">
                          <Code2 className="size-5" />
                        </div>
                        <div>
                          <h3 className="font-display text-lg font-bold text-ink leading-tight">
                            {activePage.title}
                          </h3>
                          <span className="font-mono text-xs text-signal font-medium">
                            {activePage.subtitle}
                          </span>
                        </div>
                      </div>

                      <a
                        href={activePage.content.link}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-1.5 rounded-lg text-muted hover:text-signal hover:bg-void/5 transition-all"
                        title="View LeetCode Profile"
                      >
                        <ExternalLink className="size-4" />
                      </a>
                    </div>

                    {/* Stats Highlights */}
                    <div className="grid grid-cols-3 gap-2 py-1">
                      {activePage.content.stats.map((s, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 text-center rounded-xl border border-edge bg-void/5"
                        >
                          <span className={`block font-mono text-lg font-bold ${s.color}`}>
                            {s.val}
                          </span>
                          <span className="font-mono text-[9px] text-muted uppercase tracking-wider">
                            {s.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Narrative Description */}
                    <p className="text-xs text-muted leading-relaxed bg-void/5 p-3.5 rounded-xl border border-edge">
                      {activePage.content.desc}
                    </p>

                    {/* Bottom Achievement Badge */}
                    <div className="flex items-center gap-2 pt-1 font-mono text-[10px] text-accent">
                      <Trophy className="size-3.5 text-signal" />
                      <span>Consistent algorithmic problem solving & system optimization</span>
                    </div>
                  </div>
                )}

                {/* 2. THE END PAGE */}
                {activePage.id === 'the-end' && (
                  <div className="flex flex-col items-center justify-center text-center py-4 space-y-3.5">
                    <div className="grid size-12 place-items-center rounded-full bg-signal/10 text-signal border border-signal/20 shadow-2xs">
                      <Award className="size-6" />
                    </div>

                    <div>
                      <h3 className="font-display text-2xl font-bold tracking-tight text-ink">
                        The End
                      </h3>
                      <p className="font-mono text-xs text-muted mt-0.5">
                        {activePage.subtitle}
                      </p>
                    </div>

                    <blockquote className="text-xs italic text-ink/80 leading-relaxed max-w-xs px-2">
                      {activePage.content.quote}
                    </blockquote>

                    <div className="pt-2">
                      <p className="font-mono text-xs font-semibold text-accent">
                        — {activePage.content.signature} —
                      </p>
                      <span className="font-mono text-[10px] text-muted block mt-1">
                        {activePage.content.actionText}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 font-mono text-[10px] text-emerald-500 pt-1">
                      <Flame className="size-3.5" />
                      <span>Available for Full-Stack & AI Roles</span>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Auto-turn forward status message */}
            <div className="mt-4 pt-3 border-t border-edge/60 flex items-center justify-center pl-2">
              <span className="font-mono text-[10px] text-muted tracking-wider flex items-center gap-1.5">
                <Sparkles className="size-3 text-signal animate-spin" />
                <span>Auto-turning page • Keep mouse here</span>
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
