import { Brain, Database, Layout, Sparkles, Terminal, Wrench } from 'lucide-react'
import { useState } from 'react'
import { skillCategories } from '../../data/skills'
import SectionHeading from '../ui/SectionHeading'
import { TechIcon } from '../ui/TechIcons'
import Skills3DModel from '../three/Skills3DModel'

const CATEGORY_ICONS = {
  languages: Terminal,
  frontend: Layout,
  'backend-ai': Brain,
  databases: Database,
  tools: Wrench,
}

export default function Skills() {
  const [mobileCategory, setMobileCategory] = useState('all')

  const displayedMobileCategories =
    mobileCategory === 'all'
      ? skillCategories
      : skillCategories.filter((c) => c.id === mobileCategory)

  return (
    <section id="skills" className="relative z-10 py-20 md:py-28">
      <div className="shell">
        <SectionHeading
          index="04"
          title="Technical Skills"
          lede="Exact core proficiencies across Programming Languages, Frontend, Backend & AI, Databases, and Tools & Platforms."
        />

        {/* ========================================================================= */}
        {/* LAPTOP / DESKTOP (MD+): Interactive 3D Neural Nodes Spawner */}
        {/* ========================================================================= */}
        <div className="mt-8 hidden md:block">
          <Skills3DModel />
        </div>

        {/* ========================================================================= */}
        {/* MOBILE (< MD): Clean Normal Bento Cards (Zero Lag, Fast & Responsive) */}
        {/* ========================================================================= */}
        <div className="mt-6 md:hidden">
          {/* Mobile Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 pb-4 border-b border-edge/60">
            <button
              type="button"
              onClick={() => setMobileCategory('all')}
              className={`rounded-lg border px-3 py-1 font-mono text-xs transition-colors ${
                mobileCategory === 'all'
                  ? 'border-accent bg-accent/15 text-accent font-semibold'
                  : 'border-edge bg-surface text-muted'
              }`}
            >
              All
            </button>
            {skillCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setMobileCategory(cat.id)}
                className={`rounded-lg border px-3 py-1 font-mono text-xs transition-colors flex items-center gap-1.5 ${
                  mobileCategory === cat.id
                    ? 'border-accent bg-accent/15 text-accent font-semibold'
                    : 'border-edge bg-surface text-muted'
                }`}
              >
                <span
                  className="size-1.5 rounded-full"
                  style={{ backgroundColor: cat.themeColor }}
                />
                <span>{cat.shortTitle || cat.title}</span>
              </button>
            ))}
          </div>

          {/* Normal Clean Mobile Cards */}
          <div className="flex flex-col gap-4 mt-4">
            {displayedMobileCategories.map((category) => {
              const Icon = CATEGORY_ICONS[category.id] || Sparkles

              return (
                <div
                  key={category.id}
                  className="rounded-xl border border-edge/80 bg-surface/80 p-4 shadow-xs"
                >
                  <div className="flex items-center justify-between border-b border-edge/60 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="grid size-8 place-items-center rounded-lg"
                        style={{
                          backgroundColor: `${category.themeColor}18`,
                          color: category.themeColor,
                        }}
                      >
                        <Icon className="size-4" />
                      </div>
                      <div>
                        <h3 className="font-display text-base font-semibold text-ink">
                          {category.title}
                        </h3>
                        <span className="font-mono text-[10px] text-muted">
                          {category.skills.length} Technologies
                        </span>
                      </div>
                    </div>
                    <span
                      className="font-mono text-[10px] font-medium px-2 py-0.5 rounded border"
                      style={{
                        borderColor: `${category.themeColor}30`,
                        color: category.themeColor,
                      }}
                    >
                      {category.badge}
                    </span>
                  </div>

                  <p className="mt-2.5 text-xs font-mono text-muted leading-relaxed">
                    {category.description}
                  </p>

                  {/* Clean Mobile Tech Grid */}
                  <div className="mt-3.5 grid grid-cols-2 gap-2">
                    {category.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="flex items-center gap-2.5 rounded-lg border border-edge/60 bg-surface/60 px-3 py-2"
                      >
                        <TechIcon
                          name={skill.name}
                          color={skill.color}
                          className="size-3.5 shrink-0"
                        />
                        <span className="truncate text-xs font-medium text-ink">
                          {skill.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
