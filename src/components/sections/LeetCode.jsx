import { motion } from 'framer-motion'
import { Award, CheckCircle, Code2, ExternalLink } from 'lucide-react'
import developerData from '../../data/developer-data.json'
import SectionHeading from '../ui/SectionHeading'
import SpotlightCard from '../ui/SpotlightCard'

export default function LeetCode() {
  const { leetcode } = developerData

  const total = leetcode.totalSolved || 711
  const easy = leetcode.easySolved || 345
  const medium = leetcode.mediumSolved || 329
  const hard = leetcode.hardSolved || 37

  const easyPercent = Math.round((easy / total) * 100)
  const mediumPercent = Math.round((medium / total) * 100)
  const hardPercent = Math.round((hard / total) * 100)

  return (
    <section id="leetcode" className="relative z-10 py-20 md:py-28">
      <div className="shell">
        <SectionHeading
          index="07"
          title="LeetCode Problem Solving"
          lede="Algorithmic problem solving across data structures, graph traversals, and dynamic programming."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-12 items-stretch">
          {/* Total Solved Overview (Left 5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col"
          >
            <SpotlightCard
              spotlightColor="rgba(34, 211, 238, 0.2)"
              borderColor="rgba(34, 211, 238, 0.45)"
              className="group p-5 md:p-7 flex flex-col justify-between h-full"
            >
              <div>
                <div className="flex items-center justify-between border-b border-edge/60 pb-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="grid size-8 place-items-center rounded-lg bg-signal/15 text-signal transition-colors duration-200 group-hover:bg-accent/15 group-hover:text-accent">
                      <Code2 className="size-4.5 transition-colors duration-200 group-hover:text-accent" />
                    </div>
                    <div>
                      <span className="font-mono text-[11px] uppercase tracking-wider text-muted font-medium block">
                        LeetCode Profile
                      </span>
                      <h4 className="font-mono text-xs font-semibold text-ink">
                        @{leetcode.username}
                      </h4>
                    </div>
                  </div>

                  {leetcode.ranking ? (
                    <span className="rounded-full border border-edge bg-surface px-2.5 py-0.5 font-mono text-[10px] text-muted">
                      Rank #{leetcode.ranking.toLocaleString()}
                    </span>
                  ) : null}
                </div>

                <div className="mt-6 text-center sm:text-left">
                  <span className="font-mono text-xs uppercase tracking-widest text-muted block mb-1">
                    Total Solved
                  </span>
                  <div className="flex items-baseline gap-2 justify-center sm:justify-start">
                    <span className="font-display text-5xl md:text-6xl font-bold tracking-tight text-ink">
                      {total}
                    </span>
                    <span className="font-mono text-sm text-signal font-medium">problems</span>
                  </div>
                  <p className="mt-2 text-xs md:text-sm text-ink/80 leading-relaxed">
                    Consistent problem solving covering binary search, dynamic programming, graphs, and advanced data structures.
                  </p>
                </div>
              </div>

              {/* Profile Link Button */}
              <div className="mt-6 pt-3.5 border-t border-edge/60">
                <a
                  href={leetcode.profileUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group/btn flex w-full items-center justify-center gap-2 rounded-xl bg-signal/15 border border-signal/40 py-2.5 font-mono text-xs font-semibold text-signal transition-all hover:bg-signal/25 active:scale-[0.98]"
                >
                  <span>Visit LeetCode Profile</span>
                  <ExternalLink className="size-3.5 text-signal transition-all duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:text-accent" />
                </a>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Difficulty Breakdown (Right 7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col"
          >
            <SpotlightCard
              spotlightColor="rgba(139, 92, 246, 0.18)"
              borderColor="rgba(139, 92, 246, 0.4)"
              className="group p-5 md:p-7 flex flex-col justify-between h-full"
            >
              <div>
                <div className="flex items-center justify-between border-b border-edge/60 pb-3.5">
                  <div className="flex items-center gap-2">
                    <Award className="size-4 text-accent transition-colors duration-200 group-hover:text-signal" />
                    <h4 className="font-display text-base font-semibold text-ink">
                      Difficulty Distribution
                    </h4>
                  </div>
                  <span className="font-mono text-xs text-muted">
                    {total} Total Solutions
                  </span>
                </div>

                {/* Progress Indicators */}
                <div className="mt-6 space-y-5">
                  {/* Easy */}
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                      <span className="flex items-center gap-1.5 font-medium text-emerald-400">
                        <CheckCircle className="size-3.5" />
                        <span>Easy</span>
                      </span>
                      <span className="text-ink font-semibold">
                        {easy} <span className="text-muted font-normal">({easyPercent}%)</span>
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-surface border border-edge">
                      <motion.div
                        className="h-full rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${easyPercent}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                  </div>

                  {/* Medium */}
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                      <span className="flex items-center gap-1.5 font-medium text-amber-400">
                        <CheckCircle className="size-3.5" />
                        <span>Medium</span>
                      </span>
                      <span className="text-ink font-semibold">
                        {medium} <span className="text-muted font-normal">({mediumPercent}%)</span>
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-surface border border-edge">
                      <motion.div
                        className="h-full rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.4)]"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${mediumPercent}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                  </div>

                  {/* Hard */}
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                      <span className="flex items-center gap-1.5 font-medium text-rose-400">
                        <CheckCircle className="size-3.5" />
                        <span>Hard</span>
                      </span>
                      <span className="text-ink font-semibold">
                        {hard} <span className="text-muted font-normal">({hardPercent}%)</span>
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-surface border border-edge">
                      <motion.div
                        className="h-full rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.4)]"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${hardPercent}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 border-t border-edge/60 pt-3.5 flex items-center justify-between font-mono text-[11px] text-muted">
                <span>Core Focus</span>
                <span className="text-ink font-medium">DSA & Algorithms</span>
              </div>
            </SpotlightCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
