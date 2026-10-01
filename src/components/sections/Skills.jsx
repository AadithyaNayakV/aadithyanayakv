import { motion } from 'framer-motion'
import { Brain, Cloud, Code, Database, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { skillCategories } from '../../data/skills'
import SectionHeading from '../ui/SectionHeading'
import SpotlightCard from '../ui/SpotlightCard'

const CATEGORY_ICONS = {
  fullstack: Code,
  'ai-engineering': Brain,
  'data-storage': Database,
  'cloud-devops': Cloud,
}

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const displayedCategories =
    selectedCategory === 'all'
      ? skillCategories
      : skillCategories.filter((c) => c.id === selectedCategory)

  return (
    <section id="skills" className="relative z-10 py-20 md:py-28">
      <div className="shell">
        <SectionHeading
          index="05"
          title="Technical Skills"
          lede="Core engineering competencies across Full-Stack, AI Systems, Databases, and Cloud Infrastructure."
        />

        {/* Category Filter Chips */}
        <div className="mt-8 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`rounded-xl border px-3.5 py-1.5 font-mono text-xs transition-all duration-200 ${
              selectedCategory === 'all'
                ? 'border-accent bg-accent/15 text-accent font-semibold shadow-xs'
                : 'border-edge bg-surface/80 text-muted hover:border-accent/40 hover:text-ink'
            }`}
          >
            All Areas
          </button>

          {skillCategories.map((cat) => {
            const labelMap = {
              fullstack: 'Full-Stack',
              'ai-engineering': 'AI Systems',
              'data-storage': 'Databases',
              'cloud-devops': 'Cloud & DevOps',
            }
            const displayLabel = labelMap[cat.id] || cat.title
            const isActive = selectedCategory === cat.id

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`rounded-xl border px-3.5 py-1.5 font-mono text-xs transition-all duration-200 ${
                  isActive
                    ? 'border-accent bg-accent/15 text-accent font-semibold shadow-xs'
                    : 'border-edge bg-surface/80 text-muted hover:border-accent/40 hover:text-ink'
                }`}
              >
                {displayLabel}
              </button>
            )
          })}
        </div>

        {/* Compact Structured Grid */}
        <div className="mt-10 grid gap-5 md:gap-6 lg:grid-cols-2">
          {displayedCategories.map((category, index) => {
            const Icon = CATEGORY_ICONS[category.id] || Sparkles

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="h-full"
              >
                <SpotlightCard
                  spotlightColor="rgba(139, 92, 246, 0.18)"
                  borderColor="rgba(139, 92, 246, 0.4)"
                  className="group p-5 md:p-6 h-full flex flex-col justify-between"
                >
                  <div>
                    {/* Category Header */}
                    <div className="flex items-center justify-between border-b border-edge/60 pb-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="grid size-8 place-items-center rounded-lg bg-accent/15 text-accent transition-colors duration-200 group-hover:bg-signal/15 group-hover:text-signal">
                          <Icon className="size-4 transition-colors duration-200 group-hover:text-signal" />
                        </div>
                        <h3 className="font-display text-lg font-semibold text-ink">
                          {category.title}
                        </h3>
                      </div>
                      <span className="rounded-full border border-edge bg-surface px-2.5 py-0.5 font-mono text-[10px] text-signal font-medium">
                        {category.badge}
                      </span>
                    </div>

                    <p className="mt-3 text-xs font-mono text-muted leading-relaxed">
                      {category.description}
                    </p>

                    {/* Compact Skills Cloud */}
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <motion.li
                          key={skill.name}
                          whileHover={{ scale: 1.04, y: -1 }}
                          whileTap={{ scale: 0.96 }}
                          transition={{ type: 'spring', stiffness: 450, damping: 22 }}
                          className={`cursor-default flex items-center gap-1.5 rounded-md border px-2.5 py-1 font-mono text-xs transition-colors duration-150 ${
                            skill.emphasis
                              ? 'border-accent/40 bg-accent/15 text-ink font-medium shadow-[0_0_10px_-4px_rgba(139,92,246,0.3)]'
                              : 'border-edge bg-surface/70 text-muted hover:border-edge/90 hover:text-ink'
                          }`}
                        >
                          {skill.emphasis ? (
                            <span className="size-1.5 rounded-full bg-signal shadow-[0_0_5px_rgba(34,211,238,0.8)]" />
                          ) : null}
                          <span>{skill.name}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </SpotlightCard>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
