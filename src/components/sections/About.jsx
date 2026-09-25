import { Code2, ExternalLink, GraduationCap, MapPin } from 'lucide-react'
import { useLayoutEffect, useRef } from 'react'
import { site } from '../../data/site'
import { EASE, REVEAL_START, gsap } from '../../lib/gsapConfig'
import { motionState } from '../../lib/motionState'
import SectionHeading from '../ui/SectionHeading'
import SpotlightCard from '../ui/SpotlightCard'

/**
 * About Section: Clean, spacious two-column layout with interactive 3D spotlight cards.
 * Left: Real bio narrative from site.js.
 * Right: Key academic and profile credentials (Education, LeetCode, Location).
 */
export default function About() {
  const scope = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(scope)
      const blocks = q('[data-wipe]')

      if (motionState.reducedMotion) {
        gsap.set(blocks, { opacity: 1, x: 0 })
        return
      }

      gsap.fromTo(
        blocks,
        { opacity: 0, x: -24 },
        {
          opacity: 1,
          x: 0,
          duration: 0.85,
          stagger: 0.1,
          ease: EASE.settle,
          scrollTrigger: { trigger: scope.current, start: REVEAL_START },
        },
      )
    }, scope)

    return () => ctx.revert()
  }, [])

  const leetcode = site.socials.find((s) => s.label === 'LeetCode')

  return (
    <section id="about" ref={scope} className="relative z-10 py-28 md:py-36">
      <div className="shell">
        <SectionHeading
          index="01"
          title="About Me"
          lede="Frontend and full-stack engineer building AI systems and real-time platforms."
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-12 items-start">
          {/* Left Column: Narrative Bio */}
          <div className="lg:col-span-8 space-y-6">
            {site.bio.map((paragraph, i) => (
              <p
                key={i}
                data-wipe
                className="text-base leading-relaxed text-ink/85 md:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Right Column: Interactive Credentials Cards */}
          <div data-wipe className="lg:col-span-4 space-y-4">
            {/* Education Card */}
            <SpotlightCard
              spotlightColor="rgba(139, 92, 246, 0.2)"
              borderColor="rgba(139, 92, 246, 0.5)"
              className="p-5"
            >
              <div className="flex items-center gap-3">
                <div className="grid size-9 place-items-center rounded-lg bg-accent/15 text-accent">
                  <GraduationCap className="size-5" />
                </div>
                <div>
                  <h3 className="font-display text-base font-medium text-ink">
                    B.E. Computer Science
                  </h3>
                  <span className="font-mono text-xs text-signal font-medium">CGPA: 9.52</span>
                </div>
              </div>
              <p className="mt-3 text-xs text-muted leading-relaxed">
                Sahyadri College of Engineering & Management, Mangaluru
              </p>
            </SpotlightCard>

            {/* LeetCode Card */}
            {leetcode ? (
              <SpotlightCard
                spotlightColor="rgba(34, 211, 238, 0.22)"
                borderColor="rgba(34, 211, 238, 0.6)"
              >
                <a
                  href={leetcode.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center justify-between p-5 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="grid size-9 place-items-center rounded-lg bg-signal/15 text-signal transition-transform duration-200 group-hover:scale-110">
                      <Code2 className="size-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-base font-medium text-ink group-hover:text-signal transition-colors">
                        LeetCode Profile
                      </h3>
                      <span className="font-mono text-xs text-muted">@{leetcode.handle}</span>
                    </div>
                  </div>
                  <ExternalLink className="size-4 text-muted transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-signal" />
                </a>
              </SpotlightCard>
            ) : null}

            {/* Location Card */}
            <SpotlightCard
              spotlightColor="rgba(34, 211, 238, 0.15)"
              borderColor="rgba(34, 211, 238, 0.4)"
              className="p-5"
            >
              <div className="flex items-center gap-3">
                <div className="grid size-9 place-items-center rounded-lg bg-surface text-ink">
                  <MapPin className="size-5 text-signal" />
                </div>
                <div>
                  <h3 className="font-display text-base font-medium text-ink">Location</h3>
                  <span className="font-mono text-xs text-muted">{site.location}</span>
                </div>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>
  )
}
