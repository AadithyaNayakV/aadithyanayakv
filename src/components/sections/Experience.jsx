import { AnimatePresence, motion } from 'framer-motion'
import { Briefcase, Calendar, ChevronDown, ChevronRight, MapPin, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { experiences } from '../../data/experience'
import SectionHeading from '../ui/SectionHeading'
import SpotlightCard from '../ui/SpotlightCard'

export default function Experience() {
  const [expanded, setExpanded] = useState({})

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <section id="experience" className="relative z-10 py-20 md:py-28">
      <div className="shell">
        <SectionHeading
          index="02"
          title="Work Experience"
          lede="Industry engineering background, enterprise frontend architectures, and applied AI systems."
        />

        <div className="relative mt-12">
          {/* Continuous vertical track */}
          <div
            className="absolute inset-y-0 left-3 md:left-6 w-px bg-edge"
            aria-hidden="true"
          />
          <div
            className="absolute inset-y-0 left-3 md:left-6 w-px origin-top bg-linear-to-b from-accent via-signal to-transparent"
            aria-hidden="true"
          />

          <div className="space-y-10 pl-8 md:pl-16">
            {experiences.map((entry, index) => {
              const isExpanded = !!expanded[entry.id]
              const hasMoreAchievements = (entry.achievements?.length || 0) > 2
              const visibleAchievements = isExpanded
                ? entry.achievements
                : entry.achievements?.slice(0, 2)

              return (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="relative"
                >
                  {/* Node beacon on track */}
                  <div
                    aria-hidden="true"
                    className="absolute top-6 -left-8 md:-left-16 size-4 -translate-x-1/2 rounded-full border-2 border-accent bg-void shadow-[0_0_12px_rgba(139,92,246,0.7)]"
                  >
                    <span className="absolute inset-0.5 rounded-full bg-accent" />
                  </div>

                  <SpotlightCard
                    spotlightColor="rgba(139, 92, 246, 0.18)"
                    borderColor="rgba(139, 92, 246, 0.4)"
                    className="group p-5 md:p-7"
                  >
                    {/* Header meta */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-edge/60 pb-4">
                      <div className="flex items-center gap-1.5 font-mono text-xs font-semibold text-signal">
                        <Calendar className="size-3.5 text-signal" />
                        <span>
                          {entry.start} — {entry.end}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 font-mono text-xs text-muted">
                        <MapPin className="size-3.5 text-muted" />
                        <span>{entry.location}</span>
                      </div>
                    </div>

                    {/* Role & Company */}
                    <div className="mt-4">
                      <h3 className="font-display text-xl md:text-2xl font-semibold text-ink tracking-tight">
                        {entry.role}
                      </h3>
                      <p className="mt-1 flex items-center gap-2 text-sm md:text-base font-medium text-accent">
                        <Briefcase className="size-4 text-accent" />
                        <span>{entry.org}</span>
                      </p>

                      <p className="mt-3 text-sm md:text-base leading-relaxed text-ink/85">
                        {entry.summary}
                      </p>
                    </div>

                    {/* Bullet achievements with Read More toggle */}
                    {entry.achievements?.length ? (
                      <div className="mt-5 space-y-2.5">
                        <h4 className="font-mono text-xs uppercase tracking-wider text-muted font-medium flex items-center gap-1.5">
                          <Sparkles className="size-3.5 text-accent" />
                          <span>Key Architecture & Responsibilities</span>
                        </h4>

                        <ul className="space-y-2">
                          <AnimatePresence initial={false}>
                            {visibleAchievements.map((item, i) => (
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.25, ease: 'easeOut' }}
                                className="flex items-start gap-2.5 text-xs md:text-sm leading-relaxed text-ink/85"
                              >
                                <ChevronRight className="size-3.5 text-signal shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </motion.li>
                            ))}
                          </AnimatePresence>
                        </ul>

                        {hasMoreAchievements ? (
                          <button
                            type="button"
                            onClick={() => toggleExpand(entry.id)}
                            className="group/btn mt-2 inline-flex items-center gap-1.5 rounded-lg border border-edge bg-surface/70 px-3 py-1.5 font-mono text-xs font-medium text-accent transition-all hover:border-accent/40 hover:text-signal hover:bg-surface active:scale-[0.98]"
                          >
                            <span className='text-purple-500'>
                              {isExpanded
                                ? 'Show Less'
                                : `Read More (${entry.achievements.length - 2} more details)`}
                            </span>
                            <ChevronDown
                              className={`size-3.5 transition-transform duration-200 ${
                                isExpanded ? 'rotate-180 text-signal' : 'text-accent group-hover/btn:translate-y-0.5'
                              }`}
                            />
                          </button>
                        ) : null}
                      </div>
                    ) : null}

                    {/* Tech tags */}
                    {entry.tech?.length ? (
                      <div className="mt-5 border-t border-edge/60 pt-4">
                        <span className="mb-2 block font-mono text-[11px] text-muted">
                          Applied Technologies & Environments:
                        </span>
                        <ul className="flex flex-wrap gap-1.5">
                          {entry.tech.map((t) => (
                            <li
                              key={t}
                              className="rounded-md border border-edge bg-surface/80 px-2 py-0.5 font-mono text-[11px] text-ink/80 transition-colors hover:border-accent/50 hover:text-ink"
                            >
                              {t}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </SpotlightCard>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
