import { useLayoutEffect, useRef } from 'react'
import { projects } from '../../data/projects'
import { EASE, REVEAL_START, gsap } from '../../lib/gsapConfig'
import { motionState } from '../../lib/motionState'
import SectionHeading from '../ui/SectionHeading'
import ProjectCard from './ProjectCard'

/**
 * Projects Section: Expansive 2-column full-width grid of engineered systems.
 * Card wrapper handles GSAP entrance stagger, while cards handle internal 3D physics.
 */
export default function Projects() {
  const scope = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(scope)
      const wraps = q('[data-card-wrap]')

      if (motionState.reducedMotion) {
        gsap.set(wraps, { opacity: 1, y: 0 })
        return
      }

      gsap.fromTo(
        wraps,
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: EASE.settle,
          scrollTrigger: { trigger: scope.current, start: REVEAL_START },
        },
      )
    }, scope)

    return () => ctx.revert()
  }, [])

  return (
    <section id="projects" ref={scope} className="relative z-10 py-28 md:py-36">
      <div className="shell">
        <SectionHeading
          index="03"
          title="Featured Projects"
          lede="Production architectures built end to end, focusing on real-time event distribution, AI inference moderation, and reactive user interfaces."
        />

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {projects.map((project) => (
            <div key={project.id} data-card-wrap>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
