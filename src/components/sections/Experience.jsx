import { useLayoutEffect, useRef } from 'react'
import { experience } from '../../data/experience'
import { EASE, gsap } from '../../lib/gsapConfig'
import { motionState } from '../../lib/motionState'
import SectionHeading from '../ui/SectionHeading'
import SpotlightCard from '../ui/SpotlightCard'

/**
 * Experience Section: Full-width scrubbed timeline track with interactive 3D spotlight cards.
 */
export default function Experience() {
  const scope = useRef(null)
  const line = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(scope)
      const entries = q('[data-entry]')

      if (motionState.reducedMotion) {
        gsap.set(line.current, { scaleY: 1 })
        gsap.set(q('[data-entry-content]'), { opacity: 1, y: 0 })
        gsap.set(q('[data-entry-node]'), { opacity: 1, scale: 1 })
        return
      }

      gsap.fromTo(
        line.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: scope.current,
            start: 'top 70%',
            end: 'bottom 85%',
            scrub: true,
          },
        },
      )

      entries.forEach((entry) => {
        const trigger = { trigger: entry, start: 'top 75%' }

        gsap.fromTo(
          entry.querySelector('[data-entry-content]'),
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.65, ease: EASE.swift, scrollTrigger: trigger },
        )

        gsap.fromTo(
          entry.querySelector('[data-entry-node]'),
          { opacity: 0.25, scale: 0.3 },
          { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(2.4)', scrollTrigger: trigger },
        )
      })
    }, scope)

    return () => ctx.revert()
  }, [])

  return (
    <section id="experience" ref={scope} className="relative z-10 py-28 md:py-36">
      <div className="shell">
        <SectionHeading
          index="04"
          title="Experience & Education"
          lede="Software engineering in industry and academic foundation."
        />

        <div className="relative mt-14">
          {/* Timeline continuous vertical track */}
          <div className="absolute inset-y-0 left-3 md:left-4 w-px bg-edge" aria-hidden="true" />
          <div
            ref={line}
            className="glow-signal absolute inset-y-0 left-3 md:left-4 w-px origin-top bg-signal"
            style={{ transform: 'scaleY(0)' }}
            aria-hidden="true"
          />

          <ol className="space-y-10 pl-9 md:pl-12">
            {experience.map((entry) => (
              <li key={entry.id} data-entry className="relative">
                {/* Node beacon on track */}
                <span
                  data-entry-node
                  aria-hidden="true"
                  className={`absolute top-6 -left-9 md:-left-12 size-3.5 -translate-x-1/2 rounded-full border-2 ${
                    entry.current
                      ? 'border-signal bg-void shadow-[0_0_14px_rgba(34,211,238,0.9)]'
                      : 'border-accent bg-void shadow-[0_0_10px_rgba(139,92,246,0.7)]'
                  }`}
                />

                <div data-entry-content>
                  <SpotlightCard
                    spotlightColor={
                      entry.current ? 'rgba(34, 211, 238, 0.2)' : 'rgba(139, 92, 246, 0.18)'
                    }
                    borderColor={
                      entry.current ? 'rgba(34, 211, 238, 0.5)' : 'rgba(139, 92, 246, 0.4)'
                    }
                    className="p-6 md:p-8"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-signal font-medium">
                          {entry.start} — {entry.end}
                        </span>
                        {entry.current ? (
                          <span className="rounded-full bg-signal/20 px-2 py-0.5 font-mono text-[10px] text-signal border border-signal/30">
                            Active
                          </span>
                        ) : null}
                      </div>
                      <span className="font-mono text-xs text-muted">{entry.location}</span>
                    </div>

                    <h3 className="mt-3 font-display text-2xl font-semibold text-ink">
                      {entry.role}
                    </h3>
                    <p className="mt-1 text-base font-medium text-accent">{entry.org}</p>

                    <p className="mt-4 text-sm text-ink/85 leading-relaxed">
                      {entry.summary}
                    </p>

                    {entry.tech?.length ? (
                      <div className="mt-5 border-t border-edge/60 pt-4">
                        <span className="font-mono text-xs text-muted block mb-2">
                          Technologies & Domains:
                        </span>
                        <ul className="flex flex-wrap gap-2">
                          {entry.tech.map((tech) => (
                            <li
                              key={tech}
                              className="rounded-md border border-edge bg-surface/80 px-2.5 py-1 font-mono text-xs text-muted"
                            >
                              {tech}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </SpotlightCard>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
