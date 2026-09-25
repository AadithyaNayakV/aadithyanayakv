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
    <section id="about" ref={scope} className="relative z-10 py-24 md:py-32">
      <div className="shell">
        {/* Distinctive Ambient Glass Background for About section */}
        <div className="relative rounded-3xl border border-edge/60 bg-surface/45 p-7 md:p-12 backdrop-blur-md shadow-xs overflow-hidden">
          {/* Subtle Cyber Glow Accents */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-28 -right-28 size-80 rounded-full bg-accent/12 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-28 -left-28 size-80 rounded-full bg-signal/12 blur-3xl"
          />

          <SectionHeading
            title="About Me"
            lede="Full-Stack Developer and AI Engineer building resilient architectures and intelligent platforms."
          />

          <div className="mt-12 grid gap-12 lg:grid-cols-12 items-start">
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
              className="group p-5"
            >
              <a href="#education" className="block">
                <div className="flex items-center gap-3">
                  <div className="grid size-9 place-items-center rounded-lg bg-accent/15 text-accent transition-colors duration-200 group-hover:bg-signal/15 group-hover:text-signal">
                    <GraduationCap className="size-5 transition-colors duration-200 group-hover:text-signal" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-medium text-ink transition-colors duration-200 group-hover:text-accent">
                      B.E. Computer Science
                    </h3>
                    <span className="font-mono text-xs text-signal font-medium">CGPA: 9.52</span>
                  </div>
                </div>
                <p className="mt-3 text-xs text-muted leading-relaxed">
                  Sahyadri College of Engineering & Management, Mangaluru
                </p>
              </a>
            </SpotlightCard>

            {/* Experience Card */}
            <SpotlightCard
              spotlightColor="rgba(34, 211, 238, 0.2)"
              borderColor="rgba(34, 211, 238, 0.45)"
              className="group p-5"
            >
              <a href="#experience" className="block">
                <div className="flex items-center gap-3">
                  <div className="grid size-9 place-items-center rounded-lg bg-signal/15 text-signal transition-colors duration-200 group-hover:bg-accent/15 group-hover:text-accent">
                    <MapPin className="size-5 transition-colors duration-200 group-hover:text-accent" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-medium text-ink transition-colors duration-200 group-hover:text-signal">
                      Ex-SWE Intern @ Datavex.ai
                    </h3>
                    <span className="font-mono text-xs text-muted">Sept 2025 – Sept 2026</span>
                  </div>
                </div>
                <p className="mt-3 text-xs text-muted leading-relaxed">
                  AI-powered CRM frontend architecture, Next.js, FastAPI & Azure deployment
                </p>
              </a>
            </SpotlightCard>

            {/* LeetCode Card */}
            {leetcode ? (
              <SpotlightCard
                spotlightColor="rgba(139, 92, 246, 0.22)"
                borderColor="rgba(139, 92, 246, 0.6)"
                className="group"
              >
                <a
                  href="#leetcode"
                  className="flex items-center justify-between p-5 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="grid size-9 place-items-center rounded-lg bg-accent/15 text-accent transition-all duration-200 group-hover:scale-110 group-hover:bg-signal/15 group-hover:text-signal">
                      <Code2 className="size-5 transition-colors duration-200 group-hover:text-signal" />
                    </div>
                    <div>
                      <h3 className="font-display text-base font-medium text-ink transition-colors group-hover:text-accent">
                        LeetCode Problem Solving
                      </h3>
                      <span className="font-mono text-xs text-signal font-medium">700+ Problems Solved</span>
                    </div>
                  </div>
                  <ExternalLink className="size-4 text-muted transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-signal" />
                </a>
              </SpotlightCard>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  </section>
)
}
