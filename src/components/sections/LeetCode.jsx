import { motion } from 'framer-motion'
import { Award, CheckCircle, Code2, ExternalLink, RefreshCw, Trophy, Zap } from 'lucide-react'
import developerData from '../../data/developer-data.json'
import SectionHeading from '../ui/SectionHeading'
import SpotlightCard from '../ui/SpotlightCard'

export default function LeetCode() {
  const { leetcode } = developerData

  const total = leetcode.totalSolved || 706
  const easy = leetcode.easySolved || 345
  const medium = leetcode.mediumSolved || 324
  const hard = leetcode.hardSolved || 37

  const easyPercent = Math.round((easy / total) * 100)
  const mediumPercent = Math.round((medium / total) * 100)
  const hardPercent = Math.round((hard / total) * 100)

  return (
    <section id="leetcode" className="relative z-10 py-28 md:py-36">
      <div className="shell">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <SectionHeading
            index="07"
            title="LeetCode Problem Solving"
            lede="Algorithmic problem solving, data structures, and continuous practice."
          />
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-12 items-stretch">
          {/* Total Solved Overview (Left 5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col"
          >
            <SpotlightCard
              spotlightColor="rgba(34, 211, 238, 0.22)"
              borderColor="rgba(34, 211, 238, 0.55)"
              className="group p-6 md:p-8 flex flex-col justify-between h-full"
            >
              <div>
                <div className="flex items-center justify-between border-b border-edge/60 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="grid size-9 place-items-center rounded-lg bg-signal/15 text-signal transition-colors duration-200 group-hover:bg-accent/15 group-hover:text-accent">
                      <Code2 className="size-5 transition-colors duration-200 group-hover:text-accent" />
                    </div>
                    <div>
                      <span className="font-mono text-xs uppercase tracking-wider text-muted font-medium">
                        LeetCode Profile
                      </span>
                      <h4 className="font-mono text-sm font-semibold text-ink">
                        @{leetcode.username}
                      </h4>
                    </div>
                  </div>

                  {leetcode.ranking ? (
                    <span className="rounded-full border border-signal/40 bg-signal/10 px-2.5 py-0.5 font-mono text-[11px] text-signal font-medium">
                      Rank #{leetcode.ranking.toLocaleString()}
                    </span>
                  ) : null}
                </div>

                <div className="mt-8 text-center sm:text-left">
                  <span className="font-mono text-xs uppercase tracking-widest text-muted block mb-1">
                    Total Solved
                  </span>
                  <div className="flex items-baseline gap-2 justify-center sm:justify-start">
                    <span className="font-display text-6xl md:text-7xl font-bold tracking-tight text-ink">
                      {total}
                    </span>
                    <span className="font-mono text-base text-signal font-medium">problems</span>
                  </div>
                  <p className="mt-3 text-sm text-ink/80 leading-relaxed">
                    Consistent problem solving covering binary search, dynamic programming, graph traversals, and advanced data structures.
                  </p>
                </div>

                {/* Additional Stats */}
                <div className="mt-8 grid grid-cols-2 gap-3 border-t border-edge/60 pt-6">
                  <div className="rounded-xl border border-edge bg-surface/70 p-3.5">
                    <div className="flex items-center gap-1.5 text-muted mb-1">
                      <Trophy className="size-3.5 text-amber-400 transition-transform duration-200 group-hover:scale-125" />
                      <span className="font-mono text-[11px]">Contest Rating</span>
                    </div>
                    <span className="font-mono text-sm font-semibold text-ink">
                      {leetcode.contestRating ? `${leetcode.contestRating}` : 'Active Contender'}
                    </span>
                  </div>

                  <div className="rounded-xl border border-edge bg-surface/70 p-3.5">
                    <div className="flex items-center gap-1.5 text-muted mb-1">
                      <Zap className="size-3.5 text-signal transition-colors duration-200 group-hover:text-accent" />
                      <span className="font-mono text-[11px]">Focus Ratio</span>
                    </div>
                    <span className="font-mono text-sm font-semibold text-ink">
                      ~46% Mediums
                    </span>
                  </div>
                </div>
              </div>

              {/* Profile Link Button */}
              <div className="mt-8 pt-4 border-t border-edge/60">
                <a
                  href={leetcode.profileUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group/btn flex w-full items-center justify-center gap-2 rounded-xl bg-signal/15 border border-signal/40 py-3 font-mono text-xs font-semibold text-signal transition-all hover:bg-signal/25 active:scale-[0.98]"
                >
                  <span>Visit LeetCode Profile</span>
                  <ExternalLink className="size-3.5 text-signal transition-all duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:text-accent" />
                </a>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Difficulty Breakdown (Right 7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col"
          >
            <SpotlightCard
              spotlightColor="rgba(139, 92, 246, 0.2)"
              borderColor="rgba(139, 92, 246, 0.45)"
              className="group p-6 md:p-8 flex flex-col justify-between h-full"
            >
              <div>
                <div className="flex items-center justify-between border-b border-edge/60 pb-4">
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
                <div className="mt-8 space-y-7">
                  {/* Easy */}
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono mb-2">
                      <span className="flex items-center gap-2 font-medium text-emerald-400">
                        <CheckCircle className="size-3.5" />
                        <span>Easy</span>
                      </span>
                      <span className="text-ink font-semibold">
                        {easy} <span className="text-muted font-normal">({easyPercent}%)</span>
                      </span>
                    </div>
                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-surface border border-edge">
                      <motion.div
                        className="h-full rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${easyPercent}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                  </div>

                  {/* Medium */}
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono mb-2">
                      <span className="flex items-center gap-2 font-medium text-amber-400">
                        <CheckCircle className="size-3.5" />
                        <span>Medium</span>
                      </span>
                      <span className="text-ink font-semibold">
                        {medium} <span className="text-muted font-normal">({mediumPercent}%)</span>
                      </span>
                    </div>
                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-surface border border-edge">
                      <motion.div
                        className="h-full rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${mediumPercent}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                  </div>

                  {/* Hard */}
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono mb-2">
                      <span className="flex items-center gap-2 font-medium text-rose-400">
                        <CheckCircle className="size-3.5" />
                        <span>Hard</span>
                      </span>
                      <span className="text-ink font-semibold">
                        {hard} <span className="text-muted font-normal">({hardPercent}%)</span>
                      </span>
                    </div>
                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-surface border border-edge">
                      <motion.div
                        className="h-full rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${hardPercent}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Takeaway footer note */}
              <div className="mt-8 rounded-xl border border-edge/80 bg-surface/50 p-4">
                <p className="text-xs font-mono text-muted leading-relaxed">
                  Focusing on optimal time and space complexity across graph algorithms, dynamic programming states, trees, and backtracking problems.
                </p>
              </div>
            </SpotlightCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
