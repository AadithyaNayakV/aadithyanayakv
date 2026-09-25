import { motion } from 'framer-motion'
import { Briefcase, Calendar, CheckCircle2, ChevronRight, MapPin, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { experiences } from '../../data/experience'
import SectionHeading from '../ui/SectionHeading'
import SpotlightCard from '../ui/SpotlightCard'

export default function Experience() {
  const [activeTab, setActiveTab] = useState('all') // 'all' | 'datavex' | 'current'

  const filteredExperiences = experiences.filter((exp) => {
    if (activeTab === 'all') return true
    if (activeTab === 'datavex') return exp.id === 'datavex'
    if (activeTab === 'current') return exp.id === 'next-role'
    return true
  })

  return (
    <section id="experience" className="relative z-10 py-28 md:py-36">
      <div className="shell">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <SectionHeading
            index="02"
            title="Work Experience"
            lede="Industry engineering background, enterprise frontend architectures, and applied AI systems."
          />

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 rounded-full border border-edge bg-surface/80 p-1 backdrop-blur-md self-start md:self-auto">
            {[
              { id: 'all', label: 'All Timeline' },
              { id: 'datavex', label: 'Datavex.ai (Concluded)' },
              { id: 'current', label: 'Current Status' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`relative rounded-full px-3.5 py-1.5 font-mono text-xs transition-colors ${
                  activeTab === tab.id
                    ? 'text-ink font-semibold'
                    : 'text-muted hover:text-ink'
                }`}
              >
                {activeTab === tab.id ? (
                  <motion.span
                    layoutId="exp-filter-pill"
                    className="absolute inset-0 rounded-full bg-accent/20 border border-accent/40"
                    transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                  />
                ) : null}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="relative mt-14">
          {/* Continuous vertical track */}
          <div
            className="absolute inset-y-0 left-3 md:left-6 w-px bg-edge"
            aria-hidden="true"
          />
          <div
            className="absolute inset-y-0 left-3 md:left-6 w-px origin-top bg-linear-to-b from-signal via-accent to-transparent"
            aria-hidden="true"
          />

          <div className="space-y-12 pl-8 md:pl-16">
            {filteredExperiences.map((entry, index) => {
              const isCurrent = entry.current

              return (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.55, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="relative"
                >
                  {/* Node beacon on track */}
                  <div
                    aria-hidden="true"
                    className={`absolute top-6 -left-8 md:-left-16 size-4 -translate-x-1/2 rounded-full border-2 transition-all ${
                      isCurrent
                        ? 'border-signal bg-void shadow-[0_0_14px_rgba(34,211,238,0.9)]'
                        : 'border-accent bg-void shadow-[0_0_12px_rgba(139,92,246,0.7)]'
                    }`}
                  >
                    <span
                      className={`absolute inset-0.5 rounded-full ${
                        isCurrent ? 'bg-signal animate-ping opacity-60' : 'bg-accent'
                      }`}
                    />
                  </div>

                  <SpotlightCard
                    spotlightColor={
                      isCurrent
                        ? 'rgba(34, 211, 238, 0.18)'
                        : 'rgba(139, 92, 246, 0.2)'
                    }
                    borderColor={
                      isCurrent
                        ? 'rgba(34, 211, 238, 0.5)'
                        : 'rgba(139, 92, 246, 0.45)'
                    }
                    className="group p-6 md:p-8"
                  >
                    {/* Header meta */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-edge/60 pb-5">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="flex items-center gap-1.5 font-mono text-xs font-semibold text-signal">
                          <Calendar className="size-3.5 text-signal transition-colors duration-200 group-hover:text-accent" />
                          <span>
                            {entry.start} — {entry.end}
                          </span>
                        </span>

                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-mono text-[11px] font-medium border ${
                            isCurrent
                              ? 'border-signal/40 bg-signal/15 text-signal'
                              : 'border-edge bg-surface text-muted'
                          }`}
                        >
                          {isCurrent ? (
                            <span className="size-1.5 rounded-full bg-signal animate-pulse" />
                          ) : (
                            <CheckCircle2 className="size-3 text-accent transition-colors duration-200 group-hover:text-signal" />
                          )}
                          <span>{entry.statusBadge}</span>
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 font-mono text-xs text-muted">
                        <MapPin className="size-3.5 text-muted transition-colors duration-200 group-hover:text-signal" />
                        <span>{entry.location}</span>
                      </div>
                    </div>

                    {/* Role & Company */}
                    <div className="mt-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-display text-2xl md:text-3xl font-semibold text-ink tracking-tight transition-colors duration-200 group-hover:text-ink">
                            {entry.role}
                          </h3>
                          <p className="mt-1 flex items-center gap-2 text-base md:text-lg font-medium text-accent transition-colors duration-200 group-hover:text-signal">
                            <Briefcase className="size-4 text-accent transition-colors duration-200 group-hover:text-signal" />
                            <span>{entry.org}</span>
                          </p>
                        </div>
                      </div>

                      <p className="mt-4 text-sm md:text-base leading-relaxed text-ink/85">
                        {entry.summary}
                      </p>
                    </div>

                    {/* Detailed bullet achievements */}
                    {entry.achievements?.length ? (
                      <div className="mt-6 space-y-3">
                        <h4 className="font-mono text-xs uppercase tracking-wider text-muted font-medium flex items-center gap-1.5">
                          <Sparkles className="size-3.5 text-accent transition-colors duration-200 group-hover:text-signal" />
                          <span>Key Architecture & Responsibilities</span>
                        </h4>
                        <ul className="space-y-2.5">
                          {entry.achievements.map((item, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2.5 text-sm leading-relaxed text-ink/85"
                            >
                              <ChevronRight className="size-4 text-signal shrink-0 mt-0.5 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-accent" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}

                    {/* Tech tags */}
                    {entry.tech?.length ? (
                      <div className="mt-7 border-t border-edge/60 pt-5">
                        <span className="mb-2.5 block font-mono text-xs text-muted">
                          Applied Technologies & Environments:
                        </span>
                        <ul className="flex flex-wrap gap-2">
                          {entry.tech.map((t) => (
                            <li
                              key={t}
                              className="rounded-md border border-edge bg-surface/80 px-2.5 py-1 font-mono text-xs text-ink/80 transition-colors hover:border-accent/50 hover:text-ink"
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
