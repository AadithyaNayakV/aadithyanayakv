import { Bot, Cpu, Layers, Network, ShieldCheck, Sparkles } from 'lucide-react'
import { useLayoutEffect, useRef } from 'react'
import { site } from '../../data/site'
import { EASE, REVEAL_START, gsap } from '../../lib/gsapConfig'
import { motionState } from '../../lib/motionState'
import SectionHeading from '../ui/SectionHeading'
import SpotlightCard from '../ui/SpotlightCard'

const pillars = [
  {
    icon: Network,
    title: 'Distributed & Event-Driven Systems',
    desc: 'High-throughput microservices engineered with FastAPI and Apache Kafka. Architecting fault-tolerant event streams, decoupled services, and robust REST APIs.',
    color: 'rgba(2, 132, 199, 0.12)',
    border: 'rgba(2, 132, 199, 0.4)',
    badge: 'Backend Architecture',
  },
  {
    icon: Bot,
    title: 'Production AI & LLM Pipelines',
    desc: 'Multi-tier RAG architectures utilizing LangChain, ChromaDB vector indexing, and local offline LLM pipelines with structured tool-calling capabilities.',
    color: 'rgba(124, 58, 237, 0.12)',
    border: 'rgba(124, 58, 237, 0.4)',
    badge: 'Applied AI',
  },
  {
    icon: Layers,
    title: 'Reactive Frontend Architecture',
    desc: 'High-performance interactive interfaces crafted with React and Next.js. Engineered with TanStack Query and Redux Toolkit for seamless state synchronization.',
    color: 'rgba(2, 132, 199, 0.12)',
    border: 'rgba(2, 132, 199, 0.4)',
    badge: 'Frontend Systems',
  },
  {
    icon: ShieldCheck,
    title: 'Cloud Native & Systems Reliability',
    desc: 'Containerized deployment pipelines leveraging Docker, Azure, and AWS. Focused on predictable scaling, rigorous test coverage, and continuous integration.',
    color: 'rgba(124, 58, 237, 0.12)',
    border: 'rgba(124, 58, 237, 0.4)',
    badge: 'Cloud & DevOps',
  },
]

/**
 * About Section: Sleek, executive-grade presentation of engineering philosophy,
 * background narrative, and core technical pillars without redundant repeating cards.
 */
export default function About() {
  const scope = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(scope)
      const blocks = q('[data-wipe]')

      if (motionState.reducedMotion) {
        gsap.set(blocks, { opacity: 1, y: 0 })
        return
      }

      gsap.fromTo(
        blocks,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.1,
          ease: EASE.settle,
          scrollTrigger: { trigger: scope.current, start: REVEAL_START },
        },
      )
    }, scope)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={scope} className="relative z-10 py-24 md:py-32">
      <div className="shell">
        {/* Sleek Neutral Glass Container */}
        <div className="relative rounded-3xl border border-edge bg-surface/85 p-7 md:p-14 shadow-xs overflow-hidden backdrop-blur-md">
          <SectionHeading
            title="About Me"
            lede="Full-Stack Developer and AI Engineer building resilient architectures and intelligent platforms."
          />

          {/* Narrative Biography */}
          <div className="mt-12 max-w-4xl space-y-6">
            {site.bio.map((paragraph, i) => (
              <p
                key={i}
                data-wipe
                className={`text-base leading-relaxed text-ink/85 md:text-lg ${
                  i === 0 ? 'font-medium text-ink' : ''
                }`}
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Engineering Core Pillars (Replaces repeating credentials with substantive engineering capabilities) */}
          <div className="mt-14 pt-12 border-t border-edge">
            <div data-wipe className="flex items-center gap-2 mb-8">
              <Sparkles className="size-4 text-signal" />
              <h3 className="font-mono text-xs uppercase tracking-widest text-muted font-semibold">
                Core Engineering Specializations
              </h3>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {pillars.map((pillar, i) => {
                const Icon = pillar.icon
                return (
                  <SpotlightCard
                    key={i}
                    spotlightColor={pillar.color}
                    borderColor={pillar.border}
                    className="group flex flex-col justify-between p-6 bg-surface/90 border border-edge rounded-2xl transition-all duration-300 hover:shadow-md"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="grid size-11 place-items-center rounded-xl border border-edge bg-void/5 text-ink transition-transform duration-200 group-hover:scale-105 shadow-2xs">
                          <Icon className="size-5 text-accent transition-colors group-hover:text-signal" />
                        </div>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-muted font-medium px-2 py-0.5 rounded-full bg-void/5 border border-edge">
                          {pillar.badge}
                        </span>
                      </div>

                      <h4 className="font-display text-base font-semibold text-ink transition-colors group-hover:text-signal">
                        {pillar.title}
                      </h4>

                      <p className="mt-2.5 text-xs text-muted leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>
                  </SpotlightCard>
                )
              })}
            </div>
          </div>

          {/* Professional Status Bar */}
          <div
            data-wipe
            className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-edge bg-void/5 px-6 py-4 font-mono text-xs text-muted"
          >
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-ink font-medium">{site.availability}</span>
            </div>
            <div className="flex items-center gap-4">
              <span>{site.location}</span>
              <span className="hidden sm:inline opacity-30">•</span>
              <span className="hidden sm:inline text-accent">Clean Code & Resilient Systems</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
