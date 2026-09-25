import { Check, Copy, ExternalLink, Mail } from 'lucide-react'
import { useLayoutEffect, useRef, useState } from 'react'
import { site } from '../../data/site'
import { EASE, REVEAL_START, gsap } from '../../lib/gsapConfig'
import { motionState } from '../../lib/motionState'
import Button from '../ui/Button'
import ResumeDownloadButton from '../ui/ResumeDownloadButton'
import SectionHeading from '../ui/SectionHeading'
import SpotlightCard from '../ui/SpotlightCard'

/**
 * Contact Section: Interactive 4-column spotlight grid.
 * Responds vividly to both cursor hover and touch with 3D tilt, dynamic radial glow, and spring feedback.
 */
export default function Contact() {
  const scope = useRef(null)
  const [copied, setCopied] = useState(false)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(scope)
      const block = q('[data-contact-block]')

      if (motionState.reducedMotion) {
        gsap.set(block, { opacity: 1, y: 0 })
        return
      }

      gsap.fromTo(
        block,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: EASE.swift,
          scrollTrigger: { trigger: scope.current, start: REVEAL_START },
        },
      )
    }, scope)

    return () => ctx.revert()
  }, [])

  const copyEmail = () => {
    navigator.clipboard.writeText(site.contact.email)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" ref={scope} className="relative z-10 py-28 md:py-36">
      <div className="shell">
        <SectionHeading index="05" title="Get In Touch" />

        <div data-contact-block className="mt-14">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <p className="measure text-2xl font-medium text-ink md:text-3xl leading-snug">
              {site.closingLine}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button as="a" href={`mailto:${site.contact.email}`} variant="primary" icon={Mail}>
                Email Me
              </Button>
              <button
                type="button"
                onClick={copyEmail}
                className="group flex items-center gap-2 rounded-md border border-edge bg-surface px-4 py-2.5 text-sm text-ink transition-all hover:border-accent/50 hover:bg-surface/90 active:scale-95 shadow-sm"
              >
                {copied ? (
                  <>
                    <Check className="size-4 text-signal" />
                    <span className="text-signal font-medium">Copied to Clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-4 text-muted group-hover:text-ink transition-colors" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>
              <ResumeDownloadButton />
            </div>
          </div>

          {/* Interactive 3D Spotlight Cards (GitHub, LinkedIn, LeetCode, Email) */}
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {site.socials.map((social) => {
              const isLeetcode = social.label === 'LeetCode'
              const isEmail = social.label === 'Email'

              return (
                <li key={social.label} className="h-full">
                  <SpotlightCard
                    spotlightColor={
                      isLeetcode
                        ? 'rgba(34, 211, 238, 0.25)'
                        : isEmail
                        ? 'rgba(139, 92, 246, 0.25)'
                        : 'rgba(139, 92, 246, 0.2)'
                    }
                    borderColor={
                      isLeetcode
                        ? 'rgba(34, 211, 238, 0.7)'
                        : 'rgba(139, 92, 246, 0.6)'
                    }
                    className="h-full"
                  >
                    <a
                      href={social.href}
                      target={social.href.startsWith('mailto:') ? undefined : '_blank'}
                      rel="noreferrer noopener"
                      className="flex h-full flex-col justify-between p-6 cursor-pointer"
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs text-muted uppercase tracking-wider">
                            {social.label}
                          </span>
                          <ExternalLink className="size-4 text-muted transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-signal" />
                        </div>

                        <p className="mt-4 font-display text-lg font-medium text-ink break-all group-hover:text-signal transition-colors duration-200">
                          {social.handle}
                        </p>
                      </div>

                      <div className="mt-8 flex items-center gap-1.5 font-mono text-xs text-muted group-hover:text-ink transition-colors">
                        <span>{isLeetcode ? 'Problem Solver Profile' : isEmail ? 'Send Direct Email' : 'Connect'}</span>
                        <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                      </div>
                    </a>
                  </SpotlightCard>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
