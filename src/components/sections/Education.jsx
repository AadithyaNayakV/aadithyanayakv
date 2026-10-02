import { motion } from 'framer-motion'
import { Award, Calendar, GraduationCap, MapPin, Sparkles } from 'lucide-react'
import { educationData } from '../../data/education'
import SectionHeading from '../ui/SectionHeading'
import SpotlightCard from '../ui/SpotlightCard'

export default function Education() {
  const cgpaPercentage = (parseFloat(educationData.cgpa) / 10) * 100

  return (
    <section id="education" className="relative z-10 py-20 md:py-28">
      <div className="shell">
        <SectionHeading
          index="05"
          title="Education & Academics"
          lede="Computer science curriculum, algorithmic excellence, and academic foundation."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-12 items-stretch">
          {/* Main Academic Card (Left 8 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8 flex flex-col"
          >
            <SpotlightCard
              spotlightColor="rgba(139, 92, 246, 0.18)"
              borderColor="rgba(139, 92, 246, 0.4)"
              className="group p-5 md:p-7 flex flex-col justify-between h-full"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-edge/60 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="grid size-7 place-items-center rounded-lg bg-accent/15 text-accent transition-colors duration-200 group-hover:bg-signal/15 group-hover:text-signal">
                      <GraduationCap className="size-4 transition-colors duration-200 group-hover:text-signal" />
                    </span>
                    <span className="font-mono text-xs font-semibold text-accent transition-colors duration-200 group-hover:text-signal">
                      Undergraduate Degree
                    </span>
                  </div>

                  <div className="flex items-center gap-2 font-mono text-xs text-muted">
                    <Calendar className="size-3.5 text-muted" />
                    <span>{educationData.duration}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="font-display text-xl md:text-2xl font-semibold text-ink">
                    {educationData.degree}
                  </h3>
                  <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1">
                    <p className="text-sm md:text-base font-medium text-signal">
                      {educationData.institution}
                    </p>
                    <span className="flex items-center gap-1 font-mono text-xs text-muted">
                      <MapPin className="size-3 text-muted" />
                      <span>{educationData.location}</span>
                    </span>
                  </div>
                </div>

                {/* Highlights */}
                <div className="mt-4 space-y-2">
                  {educationData.keyHighlights.map((hl, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs md:text-sm text-ink/80">
                      <Sparkles className="size-3.5 text-signal shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>

                {/* Coursework pills */}
                <div className="mt-5 flex flex-wrap items-center gap-1.5">
                  <span className="font-mono text-[11px] text-muted mr-1">Core:</span>
                  {educationData.coursework.map((course) => (
                    <span
                      key={course}
                      className="rounded-md border border-edge bg-surface/70 px-2 py-0.5 font-mono text-[11px] text-muted"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>

              {/* Status pill */}
              <div className="mt-5 border-t border-edge/60 pt-3.5 flex items-center justify-between">
                <span className="font-mono text-xs text-muted">Status</span>
                <span className="rounded-full border border-signal/40 bg-signal/15 px-2.5 py-0.5 font-mono text-[11px] font-medium text-signal">
                  {educationData.status}
                </span>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Academic Metric (Right 4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 flex flex-col"
          >
            <SpotlightCard
              spotlightColor="rgba(34, 211, 238, 0.2)"
              borderColor="rgba(34, 211, 238, 0.45)"
              className="group p-5 md:p-7 flex flex-col justify-between h-full"
            >
              <div>
                <div className="flex items-center justify-between border-b border-edge/60 pb-4">
                  <div className="flex items-center gap-2">
                    <Award className="size-4 text-signal" />
                    <span className="font-mono text-xs uppercase tracking-wider text-muted font-medium">
                      Standing
                    </span>
                  </div>
                  <span className="rounded-full bg-signal/20 px-2 py-0.5 font-mono text-[10px] font-semibold text-signal border border-signal/30">
                    Distinction
                  </span>
                </div>

                <div className="mt-6 text-center sm:text-left">
                  <span className="font-mono text-xs uppercase tracking-widest text-muted block mb-1">
                    Cumulative CGPA
                  </span>
                  <div className="flex items-baseline gap-1.5 justify-center sm:justify-start">
                    <span className="font-display text-5xl md:text-6xl font-bold tracking-tight text-ink">
                      {educationData.cgpa}
                    </span>
                    <span className="font-mono text-lg text-muted">/ {educationData.cgpaScale}</span>
                  </div>

                  {/* Progress track */}
                  <div className="mt-4">
                    <div className="h-2 w-full overflow-hidden rounded-full bg-surface border border-edge">
                      <motion.div
                        className="h-full rounded-full bg-linear-to-r from-signal to-accent"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${cgpaPercentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                    <p className="mt-2 text-[11px] font-mono text-muted text-right">
                      {educationData.semesterNote}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 border-t border-edge/60 pt-3.5 flex items-center justify-between font-mono text-xs text-muted">
                <span>Field</span>
                <span className="text-ink font-medium">CS & Engineering</span>
              </div>
            </SpotlightCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
