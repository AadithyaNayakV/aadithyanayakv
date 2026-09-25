import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight, CheckCircle2, ChevronDown, GitBranch } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/** Deterministic PRNG so a given seed always draws the same preview. */
function mulberry32(seed) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/**
 * Generated cover art for projects.
 */
function GeneratedPreview({ kind, seed }) {
  const paths = useMemo(() => {
    const rand = mulberry32(seed * 9973)
    const out = []

    if (kind === 'orbit') {
      for (let i = 0; i < 6; i++) {
        const rx = 32 + i * 24 + rand() * 10
        const ry = rx * (0.42 + rand() * 0.12)
        out.push({ type: 'ellipse', rx, ry, rotate: -22 + rand() * 16, opacity: 0.55 - i * 0.07 })
      }
      for (let i = 0; i < 9; i++) {
        out.push({
          type: 'node',
          x: 35 + rand() * 250,
          y: 25 + rand() * 125,
          r: 1.5 + rand() * 2.8,
        })
      }
    }

    if (kind === 'wave') {
      for (let i = 0; i < 7; i++) {
        const amp = 8 + rand() * 18
        const y = 24 + i * 18
        const points = Array.from({ length: 17 }, (_, j) => {
          const x = (j / 16) * 320
          return `${x.toFixed(1)},${(y + Math.sin(j * 0.6 + i) * amp * 0.5).toFixed(1)}`
        })
        out.push({ type: 'poly', points: points.join(' '), opacity: 0.45 - i * 0.045 })
      }
    }

    if (kind === 'stack') {
      for (let i = 0; i < 5; i++) {
        out.push({
          type: 'rect',
          x: 42 + i * 14,
          y: 34 + i * 16,
          w: 150 - i * 6,
          h: 34,
          opacity: 0.5 - i * 0.08,
        })
      }
    }

    if (kind === 'grid') {
      for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 21; c++) {
          out.push({
            type: 'cell',
            x: 22 + c * 13,
            y: 20 + r * 15,
            on: rand() > 0.74,
          })
        }
      }
    }

    return out
  }, [kind, seed])

  return (
    <svg viewBox="0 0 320 176" className="size-full" role="presentation">
      <defs>
        <linearGradient id={`fade-${kind}-${seed}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#221e35" />
          <stop offset="100%" stopColor="#0d0d14" />
        </linearGradient>
      </defs>

      <rect width="320" height="176" fill={`url(#fade-${kind}-${seed})`} />

      <g stroke="#8b5cf6" fill="none" strokeWidth="0.9">
        {paths.map((p, i) => {
          if (p.type === 'ellipse') {
            return (
              <ellipse
                key={i}
                cx="160"
                cy="88"
                rx={p.rx}
                ry={p.ry}
                opacity={p.opacity}
                stroke={i % 2 === 0 ? '#22d3ee' : '#8b5cf6'}
                transform={`rotate(${p.rotate} 160 88)`}
              />
            )
          }
          if (p.type === 'node') {
            return (
              <circle
                key={i}
                cx={p.x}
                cy={p.y}
                r={p.r}
                fill={i % 2 === 0 ? '#22d3ee' : '#c9c9d4'}
                stroke="none"
                opacity={0.8}
              />
            )
          }
          if (p.type === 'poly') {
            return <polyline key={i} points={p.points} opacity={p.opacity} stroke="#22d3ee" />
          }
          if (p.type === 'rect') {
            return (
              <rect
                key={i}
                x={p.x}
                y={p.y}
                width={p.w}
                height={p.h}
                rx="3"
                opacity={p.opacity}
                stroke="#8b5cf6"
              />
            )
          }
          return (
            <rect
              key={i}
              x={p.x}
              y={p.y}
              width="8"
              height="8"
              rx="1"
              opacity={p.on ? 0.7 : 0.15}
              fill={p.on ? '#8b5cf6' : 'none'}
              stroke={p.on ? '#22d3ee' : '#8b8b96'}
            />
          )
        })}
      </g>
    </svg>
  )
}

/**
 * ProjectCard:
 * - 3D dynamic card tilt on mouse move and touch
 * - Parallax image preview
 * - Key architecture highlights / bullet points
 * - Fast external links
 */
export default function ProjectCard({ project }) {
  const reducedMotion = useReducedMotion()
  const [expanded, setExpanded] = useState(false)

  // Spring physics for smooth 3D tilt
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 160, damping: 20, mass: 0.3 })
  const sy = useSpring(my, { stiffness: 160, damping: 20, mass: 0.3 })

  // 3D rotation values
  const rotateX = useTransform(sy, [-0.5, 0.5], [6, -6])
  const rotateY = useTransform(sx, [-0.5, 0.5], [-6, 6])
  const previewX = useTransform(sx, [-0.5, 0.5], [12, -12])
  const previewY = useTransform(sy, [-0.5, 0.5], [8, -8])

  const onMove = useCallback(
    (e) => {
      if (reducedMotion) return
      const r = e.currentTarget.getBoundingClientRect()
      const clientX = e.clientX ?? (e.touches && e.touches[0] ? e.touches[0].clientX : 0)
      const clientY = e.clientY ?? (e.touches && e.touches[0] ? e.touches[0].clientY : 0)
      mx.set((clientX - r.left) / r.width - 0.5)
      my.set((clientY - r.top) / r.height - 0.5)
    },
    [mx, my, reducedMotion],
  )

  const onLeave = useCallback(() => {
    mx.set(0)
    my.set(0)
  }, [mx, my])

  const primary = project.live ?? project.repo

  return (
    <motion.article
      data-project-card
      style={reducedMotion ? {} : { rotateX, rotateY, transformPerspective: 1000 }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      onTouchMove={onMove}
      onTouchEnd={onLeave}
      className="panel-interactive group relative flex flex-col overflow-hidden rounded-xl border border-edge transition-all duration-300 hover:border-accent/50 hover:shadow-[0_12px_40px_-12px_rgba(139,92,246,0.25)]"
    >
      {/* Top Media / Geometric Canvas */}
      <div className="relative aspect-[16/9] overflow-hidden border-b border-edge bg-void">
        <motion.div
          style={reducedMotion ? {} : { x: previewX, y: previewY }}
          className="absolute -inset-[6%]"
        >
          {project.image ? (
            <img
              src={project.image}
              alt={`${project.title} interface`}
              className="size-full object-cover"
              loading="lazy"
            />
          ) : (
            <GeneratedPreview kind={project.preview.kind} seed={project.preview.seed} />
          )}
        </motion.div>

        {/* Ambient glare on hover */}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-surface via-transparent to-transparent opacity-80" />

        {/* Year tag */}
        <div className="absolute top-3 right-3 rounded-md bg-void/80 px-2 py-0.5 font-mono text-xs text-muted backdrop-blur-md border border-edge/60">
          {project.year}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-2xl font-semibold text-ink group-hover:text-signal transition-colors">
            {primary ? (
              <a
                href={primary}
                target="_blank"
                rel="noreferrer noopener"
                className="hover:underline"
              >
                {project.title}
              </a>
            ) : (
              project.title
            )}
          </h3>
        </div>

        <p className="mt-1 text-sm font-medium text-accent">{project.subtitle}</p>

        <p className="mt-3 text-sm text-ink/80 leading-relaxed">{project.description}</p>

        {/* Key Architecture Highlights / Bullet points */}
        {project.highlights?.length ? (
          <div className="mt-4 border-t border-edge/60 pt-3">
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="flex items-center justify-between w-full text-xs font-mono text-muted hover:text-ink transition-colors py-1"
            >
              <span>{expanded ? 'Hide Architecture Details' : 'Key Architecture Highlights'}</span>
              <ChevronDown
                className={`size-3.5 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
              />
            </button>

            {expanded ? (
              <ul className="mt-2.5 space-y-2 text-xs text-ink/85 leading-relaxed">
                {project.highlights.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="mt-1 size-1.5 shrink-0 rounded-full bg-signal" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            ) : (
              /* Show the first highlight by default as a preview */
              <div className="mt-2 flex items-start gap-2 text-xs text-ink/75 leading-relaxed">
                <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-signal/80 transition-colors duration-200 group-hover:text-accent" />
                <span>{project.highlights[0]}</span>
              </div>
            )}
          </div>
        ) : null}

        {/* Tech Stack Pills */}
        <ul className="mt-5 flex flex-wrap gap-1.5">
          {project.tech.map((tech) => (
            <li
              key={tech}
              className="rounded-md border border-edge/80 bg-surface/80 px-2.5 py-1 font-mono text-xs text-muted transition-colors hover:text-ink hover:border-edge"
            >
              {tech}
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="mt-6 flex items-center gap-5 border-t border-edge/80 pt-4">
          {project.live ? (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer noopener"
              className="group/link flex items-center gap-1.5 text-sm font-medium text-signal hover:underline"
            >
              <span>Live System</span>
              <ArrowUpRight className="size-4 text-signal transition-all duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 group-hover/link:text-accent" />
            </a>
          ) : (
            <span className="font-mono text-xs text-muted/60">Source Verified</span>
          )}

          {project.repo ? (
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer noopener"
              className="group/repo flex items-center gap-1.5 text-sm text-ink/80 transition-colors hover:text-ink"
            >
              <GitBranch className="size-4 text-accent transition-all duration-200 group-hover/repo:-translate-y-0.5 group-hover/repo:text-signal" />
              <span>Repository</span>
            </a>
          ) : null}
        </div>
      </div>
    </motion.article>
  )
}
