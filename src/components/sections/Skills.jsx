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
    <section id="skills" className="relative z-10 py-28 md:py-36">
      <div className="shell">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <SectionHeading
            index="05"
            title="Technical Skills"
            lede="Organized around Full-Stack Engineering, Applied AI Systems, and Distributed Infrastructure."
          />

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 rounded-full border border-edge bg-surface/80 p-1 backdrop-blur-md self-start md:self-auto">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`relative rounded-full px-3.5 py-1.5 font-mono text-xs transition-colors ${
                selectedCategory === 'all'
                  ? 'text-ink font-semibold'
                  : 'text-muted hover:text-ink'
              }`}
            >
              {selectedCategory === 'all' ? (
                <motion.span
                  layoutId="skills-pill"
                  className="absolute inset-0 rounded-full bg-accent/20 border border-accent/40"
                  transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                />
              ) : null}
              <span className="relative z-10">All Areas</span>
            </button>

            {skillCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`relative rounded-full px-3.5 py-1.5 font-mono text-xs transition-colors ${
                  selectedCategory === cat.id
                    ? 'text-ink font-semibold'
                    : 'text-muted hover:text-ink'
                }`}
              >
                {selectedCategory === cat.id ? (
                  <motion.span
                    layoutId="skills-pill"
                    className="absolute inset-0 rounded-full bg-accent/20 border border-accent/40"
                    transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                  />
                ) : null}
                <span className="relative z-10">{cat.title.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Structured Grid */}
        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {displayedCategories.map((category, index) => {
            const Icon = CATEGORY_ICONS[category.id] || Sparkles

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <SpotlightCard
                  spotlightColor="rgba(139, 92, 246, 0.2)"
                  borderColor="rgba(139, 92, 246, 0.45)"
                  className="group p-6 md:p-8 h-full flex flex-col justify-between"
                >
                  <div>
                    {/* Category Header */}
                    <div className="flex items-center justify-between border-b border-edge/60 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="grid size-9 place-items-center rounded-lg bg-accent/15 text-accent transition-colors duration-200 group-hover:bg-signal/15 group-hover:text-signal">
                          <Icon className="size-5 transition-colors duration-200 group-hover:text-signal" />
                        </div>
                        <div>
                          <h3 className="font-display text-xl font-semibold text-ink">
                            {category.title}
                          </h3>
                        </div>
                      </div>
                      <span className="rounded-full border border-edge bg-surface px-2.5 py-0.5 font-mono text-[10px] text-signal font-medium">
                        {category.badge}
                      </span>
                    </div>

                    <p className="mt-4 text-xs font-mono text-muted leading-relaxed">
                      {category.description}
                    </p>

                    {/* Subgroups */}
                    <div className="mt-6 space-y-6">
                      {category.subgroups.map((group) => (
                        <div key={group.name}>
                          <h4 className="font-mono text-xs text-ink/70 uppercase tracking-wider mb-2.5">
                            {group.name}
                          </h4>
                          <ul className="flex flex-wrap gap-2">
                            {group.skills.map((skill) => (
                              <motion.li
                                key={skill.name}
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: 'spring', stiffness: 450, damping: 22 }}
                                className={`cursor-default flex items-center gap-1.5 rounded-lg border px-3 py-1.5 font-mono text-xs transition-colors duration-150 ${
                                  skill.emphasis
                                    ? 'border-accent/40 bg-accent/15 text-ink font-medium shadow-[0_0_12px_-4px_rgba(139,92,246,0.35)]'
                                    : 'border-edge bg-surface/70 text-muted hover:border-edge/90 hover:text-ink'
                                }`}
                              >
                                {skill.emphasis ? (
                                  <span className="size-1.5 rounded-full bg-signal shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
                                ) : null}
                                <span>{skill.name}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
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
