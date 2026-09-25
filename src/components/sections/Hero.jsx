import { ArrowUpRight, Code2, ExternalLink } from 'lucide-react'
import { useLayoutEffect, useRef } from 'react'
import { site } from '../../data/site'
import { useScrollProgress } from '../../hooks/useScrollProgress'
import { EASE, gsap } from '../../lib/gsapConfig'
import { scrollToSection } from '../../lib/lenis'
import { clamp, motionState } from '../../lib/motionState'

/**
 * Hero section: Clean, bold typography and positioning on the left,
 * leaving the right side clear for the 3D particle centerpiece to shine and interact directly.
 */
export default function Hero() {
  const scope = useRef(null)
  const cueLine = useRef(null)
  const progress = useScrollProgress(0.005)

  const cueOpacity = clamp(1 - progress / 0.035)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(scope)
      const lines = q('[data-hero-line]')
      const cue = q('[data-hero-cue]')

      if (motionState.reducedMotion) {
        motionState.intro.particles = 1
        motionState.intro.object = 1
        gsap.set([...lines, ...cue], { opacity: 1, y: 0, clipPath: 'none' })
        return
      }

      gsap.set(lines, { opacity: 0, y: 26 })
      gsap.set(cue, { opacity: 0 })

      const tl = gsap.timeline()

      // 0.0 - 0.4s: particle field
      tl.to(motionState.intro, { particles: 1, duration: 0.4, ease: 'none' }, 0)

      // 0.3 - 0.9s: 3D centerpiece scales in
      tl.to(motionState.intro, { object: 1, duration: 0.6, ease: EASE.overshoot }, 0.3)

      // 0.6 - 1.2s: hero text lines stagger in
      tl.to(lines, { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: EASE.settle }, 0.6)

      // 1.2 - 1.5s: scroll cue
      tl.to(cue, { opacity: 1, duration: 0.3, ease: EASE.swift }, 1.2)
      tl.add(() => {
        gsap.to(cueLine.current, {
          y: 8,
          duration: 1.1,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      }, 1.5)
    }, scope)

    return () => ctx.revert()
  }, [])

  const leetcode = site.socials.find((s) => s.label === 'LeetCode')

  return (
    <section
      id="hero"
      ref={scope}
      className="relative z-10 flex min-h-svh items-end pb-28 md:items-center md:pb-0"
    >
      <div className="shell grid w-full items-center gap-10 md:grid-cols-12">
        {/* Left Side: Identity, Positioning & Quick CTAs */}
        <div className="md:col-span-8 lg:col-span-7">
          <div
            data-hero-line
            className="inline-flex items-center gap-2 rounded-full border border-edge bg-surface/70 px-3.5 py-1 text-xs text-muted backdrop-blur-md"
          >
            <span className="size-2 rounded-full bg-signal animate-pulse" />
            <span className="font-mono text-ink/90">Software Engineering Intern @ Datavex.ai</span>
          </div>

          <h1
            data-hero-line
            className="mt-6 text-5xl leading-[1.03] font-semibold tracking-tight text-ink md:text-6xl lg:text-7xl"
          >
            {site.name}
          </h1>

          <p
            data-hero-line
            className="measure mt-6 text-lg leading-relaxed text-ink/85 md:text-xl"
          >
            {site.positioning}
          </p>

          <div
            data-hero-line
            className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-sm text-muted"
          >
            <span className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-accent" />
              {site.role}
            </span>
            <span className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-signal" />
              {site.location}
            </span>
          </div>

          {/* Action CTAs */}
          <div data-hero-line className="mt-8 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => scrollToSection('projects')}
              className="group inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-accent/25 transition-all hover:bg-accent/90 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Explore Projects</span>
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            {leetcode ? (
              <a
                href={leetcode.href}
                target="_blank"
                rel="noreferrer noopener"
                className="group inline-flex items-center gap-2 rounded-md border border-edge bg-surface/80 px-4 py-2.5 text-sm text-ink backdrop-blur-md transition-all hover:border-signal/50 hover:bg-surface active:scale-[0.98]"
              >
                <Code2 className="size-4 text-signal transition-transform group-hover:rotate-12" />
                <span>LeetCode</span>
                <span className="font-mono text-xs text-muted">@{leetcode.handle}</span>
                <ExternalLink className="size-3 text-muted group-hover:text-ink" />
              </a>
            ) : null}

            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              className="inline-flex items-center gap-2 rounded-md border border-edge bg-surface/40 px-4 py-2.5 text-sm text-ink backdrop-blur-md transition-all hover:bg-surface active:scale-[0.98]"
            >
              Contact Me
            </button>
          </div>
        </div>

        {/* Right Side: Reserved for the 3D particle centerpiece (unobstructed) */}
        <div className="md:col-span-4 lg:col-span-5 lg:justify-self-end">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent('centerpiece:activate'))}
            className="sr-only rounded-md border border-edge bg-surface px-4 py-2 text-sm text-ink focus:not-sr-only focus:relative"
          >
            Scatter the centrepiece
          </button>
        </div>
      </div>

      <div
        data-hero-cue
        className="absolute inset-x-0 bottom-6 md:bottom-8"
        aria-hidden="true"
      >
        <div className="shell" style={{ opacity: cueOpacity }}>
          <div className="flex items-center gap-3 text-muted">
            <span ref={cueLine} className="block h-8 w-px bg-linear-to-b from-signal via-accent to-transparent" />
            <span className="font-mono text-xs uppercase tracking-widest text-muted">Scroll to explore</span>
          </div>
        </div>
      </div>
    </section>
  )
}
