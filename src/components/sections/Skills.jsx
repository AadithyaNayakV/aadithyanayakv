import { motion } from 'framer-motion'
import { useLayoutEffect, useRef } from 'react'
import { skillGroups } from '../../data/skills'
import { REVEAL_START, gsap } from '../../lib/gsapConfig'
import { motionState } from '../../lib/motionState'
import SectionHeading from '../ui/SectionHeading'
import SpotlightCard from '../ui/SpotlightCard'

/**
 * Skills Section: Balanced, full-width responsive grid of technical capabilities.
 * Cards tilt smoothly on hover/touch with dynamic spotlight, and skill chips react with tactile bounce.
 */
export default function Skills() {
  const scope = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(scope)
      const groups = q('[data-skill-group]')

      if (motionState.reducedMotion) {
        gsap.set(q('[data-skill-item]'), { opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 })
        gsap.set(groups, { opacity: 1 })
        return
      }

      const rand = gsap.utils.random

      groups.forEach((group, index) => {
        const items = group.querySelectorAll('[data-skill-item]')

        gsap.set(items, {
          opacity: 0,
          scale: 0.88,
          x: () => rand(-24, 24),
          y: () => rand(-16, 16),
        })

        gsap.to(items, {
          opacity: 1,
          scale: 1,
          x: 0,
          y: 0,
          duration: 0.7,
          ease: 'back.out(1.4)',
          stagger: { each: 0.03, from: 'random' },
          delay: index * 0.07,
          scrollTrigger: { trigger: scope.current, start: REVEAL_START },
        })
      })
    }, scope)

    return () => ctx.revert()
  }, [])

  return (
    <section id="skills" ref={scope} className="relative z-10 py-28 md:py-36">
      <div className="shell">
        <SectionHeading
          index="02"
          title="Technical Stack"
          lede="Technologies and frameworks engineered in production systems and end-to-end projects."
        />

        <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <div key={group.id} data-skill-group>
              <SpotlightCard
                spotlightColor="rgba(139, 92, 246, 0.18)"
                borderColor="rgba(139, 92, 246, 0.4)"
                className="p-6 h-full"
              >
                <div className="flex items-center justify-between border-b border-edge/80 pb-3">
                  <h3 className="font-display text-lg font-medium text-ink">
                    {group.label}
                  </h3>
                  <span className="font-mono text-xs text-muted">
                    {group.items.length} skills
                  </span>
                </div>

                <ul className="mt-5 flex flex-wrap gap-2.5">
                  {group.items.map((skill) => (
                    <motion.li
                      key={skill.name}
                      data-skill-item
                      whileHover={{ scale: 1.07, y: -2 }}
                      whileTap={{ scale: 0.94 }}
                      transition={{ type: 'spring', stiffness: 450, damping: 20 }}
                      className={`cursor-default flex items-center gap-1.5 rounded-lg border px-3 py-1.5 font-mono text-xs transition-colors duration-150 ${
                        skill.emphasis
                          ? 'border-accent/40 bg-accent/15 text-ink shadow-[0_0_12px_-4px_rgba(139,92,246,0.35)]'
                          : 'border-edge bg-surface/80 text-muted hover:border-edge/90 hover:text-ink'
                      }`}
                    >
                      {skill.emphasis ? (
                        <span className="size-1.5 rounded-full bg-signal shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
                      ) : null}
                      <span>{skill.name}</span>
                    </motion.li>
                  ))}
                </ul>
              </SpotlightCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
