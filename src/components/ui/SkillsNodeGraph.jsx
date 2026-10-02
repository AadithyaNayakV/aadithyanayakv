import { motion, AnimatePresence } from 'framer-motion'
import { Brain, Cloud, Code, Database, Sparkles, Cpu, Layers } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { skillCategories } from '../../data/skills'
import { TechIcon } from './TechIcons'

const DOMAIN_ICONS = {
  fullstack: Code,
  'ai-engineering': Brain,
  'data-storage': Database,
  'cloud-devops': Cloud,
}

export default function SkillsNodeGraph() {
  const [activeDomainId, setActiveDomainId] = useState('ai-engineering')
  const [hoveredSkill, setHoveredSkill] = useState(null)
  const containerRef = useRef(null)
  const [parentPoint, setParentPoint] = useState({ x: 0, y: 0 })
  const [childPoints, setChildPoints] = useState([])

  const parentRef = useRef(null)
  const childRefs = useRef([])

  const activeCategory =
    skillCategories.find((c) => c.id === activeDomainId) || skillCategories[0]

  const DomainIcon = DOMAIN_ICONS[activeCategory.id] || Sparkles

  // Recalculate SVG connector anchor points whenever active category changes or window resizes
  useEffect(() => {
    const updateCoordinates = () => {
      if (!containerRef.current || !parentRef.current) return

      const containerRect = containerRef.current.getBoundingClientRect()
      const parentRect = parentRef.current.getBoundingClientRect()

      const pX = parentRect.left - containerRect.left + parentRect.width / 2
      const pY = parentRect.top - containerRect.top + parentRect.height

      setParentPoint({ x: pX, y: pY })

      const newChildPoints = []
      childRefs.current.forEach((el, idx) => {
        if (el) {
          const rect = el.getBoundingClientRect()
          const cX = rect.left - containerRect.left + rect.width / 2
          const cY = rect.top - containerRect.top
          newChildPoints[idx] = { x: cX, y: cY }
        }
      })
      setChildPoints(newChildPoints)
    }

    const timer = setTimeout(updateCoordinates, 80)
    window.addEventListener('resize', updateCoordinates)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', updateCoordinates)
    }
  }, [activeDomainId])

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-2xl border border-edge/70 bg-surface/50 backdrop-blur-md p-6 sm:p-8 overflow-hidden shadow-xl"
    >
      {/* Background Cybernetic Circuit Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035] dark:opacity-[0.06]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Radial Theme Ambient Aura */}
      <div
        className="pointer-events-none absolute inset-0 transition-all duration-700 opacity-25 dark:opacity-35"
        style={{
          background: `radial-gradient(circle at 50% 30%, ${activeCategory.themeColor}35, transparent 65%)`,
        }}
      />

      {/* Top Bar: 4 Interactive Domain Hub Nodes */}
      <div className="relative z-10">
        <div className="flex items-center justify-between border-b border-edge/50 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ backgroundColor: activeCategory.themeColor }}
              />
              <span
                className="relative inline-flex rounded-full h-2 w-2"
                style={{ backgroundColor: activeCategory.themeColor }}
              />
            </span>
            <span className="font-mono text-[11px] font-semibold tracking-wider uppercase text-muted">
              INTERACTIVE NODE EXPLORER • CLICK ANY NODE TO BLOOM
            </span>
          </div>

          <span
            className="font-mono text-[10px] font-medium px-2 py-0.5 rounded border"
            style={{
              borderColor: `${activeCategory.themeColor}40`,
              backgroundColor: `${activeCategory.themeColor}10`,
              color: activeCategory.themeColor,
            }}
          >
            ACTIVE: {activeCategory.title.toUpperCase()}
          </span>
        </div>

        {/* 4 Clickable Primary Domain Nodes */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {skillCategories.map((cat) => {
            const Icon = DOMAIN_ICONS[cat.id] || Sparkles
            const isActive = activeDomainId === cat.id

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveDomainId(cat.id)}
                className={`relative flex items-center gap-3 p-3 rounded-xl border text-left transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'border-accent/60 bg-surface/90 shadow-md scale-[1.02]'
                    : 'border-edge/70 bg-surface/40 hover:border-edge hover:bg-surface/70'
                }`}
                style={{
                  boxShadow: isActive ? `0 0 20px -3px ${cat.themeColor}30` : 'none',
                }}
              >
                <div
                  className="flex shrink-0 size-8 items-center justify-center rounded-lg transition-transform duration-200"
                  style={{
                    backgroundColor: `${cat.themeColor}20`,
                    color: cat.themeColor,
                  }}
                >
                  <Icon className="size-4" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="truncate text-xs font-semibold text-ink">
                    {cat.title}
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span
                      className="size-1.5 rounded-full"
                      style={{ backgroundColor: cat.themeColor }}
                    />
                    <span className="font-mono text-[10px] text-muted truncate">
                      {cat.skills.length} Skills
                    </span>
                  </div>
                </div>

                {isActive && (
                  <span
                    className="absolute -top-1 -right-1 size-2.5 rounded-full ring-2 ring-surface"
                    style={{ backgroundColor: cat.themeColor }}
                  />
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ON-THE-SPOT NODE BLOOMING CANVAS */}
      {/* ========================================================================= */}
      <div className="relative mt-8 pt-4">
        {/* SVG Connector Lines from Parent Node to Each Child Skill Node */}
        <svg
          className="pointer-events-none absolute inset-0 size-full z-0 overflow-visible"
          style={{ minHeight: '340px' }}
        >
          <defs>
            <linearGradient
              id={`laser-${activeCategory.id}`}
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor={activeCategory.themeColor} stopOpacity="0.8" />
              <stop offset="100%" stopColor={activeCategory.themeColor} stopOpacity="0.25" />
            </linearGradient>
          </defs>

          {parentPoint.x > 0 &&
            childPoints.map((pt, i) => {
              if (!pt || !pt.x) return null
              const isHovered = hoveredSkill === activeCategory.skills[i]?.name

              // Smooth vertical cubic Bezier curve
              const startX = parentPoint.x
              const startY = parentPoint.y
              const endX = pt.x
              const endY = pt.y

              const deltaY = endY - startY
              const cp1X = startX
              const cp1Y = startY + deltaY * 0.45
              const cp2X = endX
              const cp2Y = endY - deltaY * 0.45

              const d = `M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`

              return (
                <g key={`line-${i}`}>
                  {/* Outer Glow Path */}
                  <path
                    d={d}
                    fill="none"
                    stroke={activeCategory.themeColor}
                    strokeWidth={isHovered ? 4 : 2}
                    strokeOpacity={isHovered ? 0.6 : 0.25}
                    className="transition-all duration-200"
                  />
                  {/* Sharp Inner Circuit Beam */}
                  <path
                    d={d}
                    fill="none"
                    stroke={`url(#laser-${activeCategory.id})`}
                    strokeWidth={isHovered ? 2.5 : 1.5}
                    strokeDasharray={isHovered ? '4 2' : 'none'}
                    className="transition-all duration-200"
                  />
                  {/* Anchor Point at Child Node */}
                  <circle
                    cx={endX}
                    cy={endY}
                    r={isHovered ? 3.5 : 2.5}
                    fill={activeCategory.themeColor}
                  />
                </g>
              )
            })}
        </svg>

        {/* The Central Active Parent Node Anchor */}
        <div className="relative z-10 flex flex-col items-center justify-center">
          <div
            ref={parentRef}
            className="flex items-center gap-3 px-5 py-2.5 rounded-2xl border backdrop-blur-md shadow-lg transition-all duration-300"
            style={{
              backgroundColor: 'var(--color-surface, rgba(15, 13, 29, 0.9))',
              borderColor: activeCategory.themeColor,
              boxShadow: `0 0 25px -4px ${activeCategory.themeColor}40`,
            }}
          >
            <div
              className="grid size-8 place-items-center rounded-lg"
              style={{
                backgroundColor: `${activeCategory.themeColor}25`,
                color: activeCategory.themeColor,
              }}
            >
              <DomainIcon className="size-4.5" />
            </div>

            <div>
              <div className="text-sm font-semibold text-ink flex items-center gap-2">
                <span>{activeCategory.title}</span>
                <span
                  className="font-mono text-[9px] font-bold px-1.5 py-0.2 rounded"
                  style={{
                    backgroundColor: `${activeCategory.themeColor}20`,
                    color: activeCategory.themeColor,
                  }}
                >
                  PARENT NODE
                </span>
              </div>
              <div className="font-mono text-[10px] text-muted">
                {activeCategory.description}
              </div>
            </div>
          </div>
        </div>

        {/* The Spawned Child Skill Nodes (BLOOMING ON THE SPOT) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5"
          >
            {activeCategory.skills.map((skill, index) => {
              const isHovered = hoveredSkill === skill.name

              return (
                <div
                  key={skill.name}
                  ref={(el) => {
                    childRefs.current[index] = el
                  }}
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className={`group relative flex items-center justify-between gap-2.5 p-3 rounded-xl border transition-all duration-200 cursor-pointer ${
                    isHovered
                      ? 'scale-[1.03] shadow-md'
                      : 'hover:scale-[1.01]'
                  }`}
                  style={{
                    backgroundColor: isHovered
                      ? 'var(--color-surface, rgba(20, 18, 38, 0.95))'
                      : 'var(--color-surface, rgba(15, 13, 29, 0.75))',
                    borderColor: isHovered
                      ? activeCategory.themeColor
                      : 'var(--color-edge, rgba(255,255,255,0.1))',
                    boxShadow: isHovered
                      ? `0 0 16px -2px ${activeCategory.themeColor}40`
                      : 'none',
                  }}
                >
                  {/* Left: Brand Icon & Skill Name */}
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className="flex shrink-0 items-center justify-center size-7 rounded-lg border border-edge/60 transition-transform duration-200 group-hover:scale-110"
                      style={{
                        backgroundColor: 'var(--color-surface, rgba(255,255,255,0.06))',
                      }}
                    >
                      <TechIcon
                        name={skill.name}
                        color={skill.color}
                        className="size-4"
                      />
                    </div>

                    <div className="min-w-0">
                      <div className="truncate text-xs font-semibold text-ink group-hover:text-accent transition-colors">
                        {skill.name}
                      </div>
                      <div className="font-mono text-[9px] text-muted truncate">
                        {skill.role}
                      </div>
                    </div>
                  </div>

                  {/* Right: Level Dot Indicator */}
                  <span
                    className="size-2 rounded-full shrink-0 transition-transform duration-200 group-hover:scale-125"
                    style={{
                      backgroundColor: skill.color || activeCategory.themeColor,
                      boxShadow: `0 0 6px ${skill.color || activeCategory.themeColor}`,
                    }}
                  />
                </div>
              )
            })}
          </motion.div>
        </AnimatePresence>

        {/* Bottom Legend */}
        <div className="mt-8 pt-4 border-t border-edge/40 flex items-center justify-between text-[10px] font-mono text-muted/70">
          <span>CLICK ANY DOMAIN NODE AT TOP TO SPAWN ITS SUB-NODES</span>
          <span>{activeCategory.skills.length} SUB-NODES ACTIVE ON THE SPOT</span>
        </div>
      </div>
    </div>
  )
}
