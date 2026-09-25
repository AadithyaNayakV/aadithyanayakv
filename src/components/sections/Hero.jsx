import { ArrowDownToLine, ArrowUpRight, Code2, ExternalLink, Mail } from 'lucide-react'
import { useLayoutEffect, useRef } from 'react'
import { site } from '../../data/site'
import developerData from '../../data/developer-data.json'
import { EASE, gsap } from '../../lib/gsapConfig'
import { scrollToSection } from '../../lib/lenis'
import { motionState } from '../../lib/motionState'
import ProfileBookAvatar from '../ui/ProfileBookAvatar'

/**
 * Hero section: Clean, bold typography and positioning on the left,
 * leaving the right side clear for the 3D particle centerpiece to shine and interact directly.
 */
export default function Hero() {
  const scope = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(scope)
      const lines = q('[data-hero-line]')

      if (motionState.reducedMotion) {
        motionState.intro.particles = 1
        motionState.intro.object = 1
        gsap.set(lines, { opacity: 1, y: 0, clipPath: 'none' })
        return
      }

      gsap.set(lines, { opacity: 0, y: 26 })

      const tl = gsap.timeline()

      // 0.0 - 0.4s: particle field
      tl.to(motionState.intro, { particles: 1, duration: 0.4, ease: 'none' }, 0)

      // 0.3 - 0.9s: 3D centerpiece scales in
      tl.to(motionState.intro, { object: 1, duration: 0.6, ease: EASE.overshoot }, 0.3)

      // 0.6 - 1.2s: hero text lines stagger in
      tl.to(lines, { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: EASE.settle }, 0.6)
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
          <h1
            data-hero-line
            className="text-5xl leading-[1.03] font-semibold tracking-tight text-ink md:text-6xl lg:text-7xl mt-16"
          >
            {site.name}
          </h1>

          <p
            data-hero-line
            className="measure mt-4 text-xl md:text-2xl font-semibold tracking-tight text-signal"
          >
            Engineering systems that think, scale, and deliver.
          </p>

          <p
            data-hero-line
            className="measure mt-3.5 text-base md:text-lg leading-relaxed text-ink/85"
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
          <div data-hero-line className="mt-8 flex flex-wrap items-center gap-3.5">
            {/* Explore Projects */}
            <button
              type="button"
              onClick={() => scrollToSection('projects')}
              className="group inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-accent/25 transition-all hover:bg-accent/90 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Explore Projects</span>
              <ArrowUpRight className="size-4 text-white transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-signal" />
            </button>

            {/* Resume Download with icon */}
            <a
              href={site.resumeUrl}
              download
              className="group inline-flex items-center gap-2 rounded-md border border-edge bg-surface/80 px-4 py-2.5 text-sm text-ink backdrop-blur-md transition-all hover:border-accent/60 hover:bg-surface active:scale-[0.98]"
            >
              <ArrowDownToLine className="size-4 text-accent transition-all duration-200 group-hover:text-signal group-hover:translate-y-0.5" />
              <span>Download Résumé</span>
            </a>

            {/* LeetCode quick button */}
            {leetcode ? (
              <a
                href="#leetcode"
                className="group inline-flex items-center gap-2 rounded-md border border-edge bg-surface/80 px-4 py-2.5 text-sm text-ink backdrop-blur-md transition-all hover:border-signal/50 hover:bg-surface active:scale-[0.98]"
              >
                <Code2 className="size-4 text-signal transition-all duration-200 group-hover:rotate-12 group-hover:text-accent" />
                <span>LeetCode</span>
                <span className="font-mono text-xs text-muted">
                  {developerData.leetcode?.totalSolved || '700'}+
                </span>
                <ExternalLink className="size-3 text-muted transition-colors duration-200 group-hover:text-signal" />
              </a>
            ) : null}

            {/* Contact CTA */}
            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              className="group inline-flex items-center gap-2 rounded-md border border-edge bg-surface/40 px-4 py-2.5 text-sm text-ink backdrop-blur-md transition-all hover:bg-surface active:scale-[0.98]"
            >
              <Mail className="size-4 text-muted transition-colors duration-200 group-hover:text-accent" />
              <span>Contact Me</span>
            </button>
          </div>
        </div>

        {/* Right Side: Interactive Dev Book Avatar */}
        <div data-hero-line className="md:col-span-4 lg:col-span-5 flex justify-center lg:justify-end">
          <ProfileBookAvatar />
        </div>
      </div>
    </section>
  )
}
