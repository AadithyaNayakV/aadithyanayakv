import { motion } from 'framer-motion'
import { Award, Calendar, GraduationCap, MapPin, Sparkles } from 'lucide-react'
import { educationData } from '../../data/education'
import SectionHeading from '../ui/SectionHeading'
import SpotlightCard from '../ui/SpotlightCard'

export default function Education() {
  const cgpaPercentage = (parseFloat(educationData.cgpa) / 10) * 100

  return (
    <section id="education" className="relative z-10 py-28 md:py-36">
      <div className="shell">
        <SectionHeading
          index="03"
          title="Education & Academics"
          lede="Rigorous computer science curriculum, algorithmic excellence, and academic foundation."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-12 items-stretch">
          {/* Main Academic Card (Left 7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col"
          >
            <SpotlightCard
              spotlightColor="rgba(139, 92, 246, 0.22)"
              borderColor="rgba(139, 92, 246, 0.5)"
              className="group p-6 md:p-8 flex flex-col justify-between h-full"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-edge/60 pb-5">
                  <div className="flex items-center gap-2">
                    <span className="grid size-8 place-items-center rounded-lg bg-accent/15 text-accent transition-colors duration-200 group-hover:bg-signal/15 group-hover:text-signal">
                      <GraduationCap className="size-4 transition-colors duration-200 group-hover:text-signal" />
                    </span>
                    <span className="font-mono text-xs font-semibold text-accent transition-colors duration-200 group-hover:text-signal">
                      Undergraduate Degree
                    </span>
                  </div>

                  <div className="flex items-center gap-2 font-mono text-xs text-muted">
                    <Calendar className="size-3.5 text-muted transition-colors duration-200 group-hover:text-signal" />
                    <span>{educationData.duration}</span>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-display text-2xl md:text-3xl font-semibold text-ink">
                    {educationData.degree}
                  </h3>
                  <p className="mt-2 text-base md:text-lg font-medium text-signal">
                    {educationData.institution}
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 font-mono text-xs text-muted">
                    <MapPin className="size-3.5 text-muted transition-colors duration-200 group-hover:text-signal" />
                    <span>{educationData.location}</span>
                  </p>
                </div>

                <p className="mt-5 text-sm md:text-base leading-relaxed text-ink/85">
                  {educationData.description}
                </p>

                {/* Highlights */}
                <div className="mt-6 space-y-2.5">
                  {educationData.keyHighlights.map((hl, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-sm text-ink/80">
                      <Sparkles className="size-4 text-signal shrink-0 mt-0.5 transition-colors duration-200 group-hover:text-accent" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status pill */}
              <div className="mt-8 border-t border-edge/60 pt-4 flex items-center justify-between">
                <span className="font-mono text-xs text-muted">Current Academic Status</span>
                <span className="rounded-full border border-signal/40 bg-signal/15 px-3 py-1 font-mono text-xs font-medium text-signal">
                  {educationData.status}
                </span>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Academic Metric & Excellence Card (Right 5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col"
          >
            <SpotlightCard
              spotlightColor="rgba(34, 211, 238, 0.25)"
              borderColor="rgba(34, 211, 238, 0.6)"
              className="group p-6 md:p-8 flex flex-col justify-between h-full"
            >
              <div>
                <div className="flex items-center justify-between border-b border-edge/60 pb-5">
                  <div className="flex items-center gap-2">
                    <Award className="size-5 text-signal transition-colors duration-200 group-hover:text-accent" />
                    <span className="font-mono text-xs uppercase tracking-wider text-muted font-medium">
                      Academic Standing
                    </span>
                  </div>
                  <span className="rounded-full bg-signal/20 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-signal border border-signal/30">
                    Distinction
                  </span>
                </div>

                <div className="mt-8">
                  <span className="font-mono text-xs uppercase tracking-widest text-muted block mb-1">
                    Cumulative Grade Point Average
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-6xl md:text-7xl font-bold tracking-tight text-ink">
                      {educationData.cgpa}
                    </span>
                    <span className="font-mono text-xl text-muted">/ {educationData.cgpaScale}</span>
                  </div>

                  {/* Progress track */}
                  <div className="mt-5">
                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-surface border border-edge">
                      <motion.div
                        className="h-full rounded-full bg-linear-to-r from-signal to-accent"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${cgpaPercentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                    <p className="mt-2.5 text-xs font-mono text-muted text-right">
                      {educationData.semesterNote}
                    </p>
                  </div>
                </div>

                <div className="mt-8 space-y-3 rounded-xl border border-edge bg-surface/60 p-4">
                  <div className="flex items-center gap-2 font-mono text-xs text-ink/90 font-medium">
                    <span className="size-1.5 rounded-full bg-signal" />
                    <span>Top Academic Tier</span>
                  </div>
                  <p className="text-xs text-muted leading-relaxed">
                    Consistent top-tier academic standing combining theoretical computer science foundations with high-performance practical software engineering.
                  </p>
                </div>
              </div>

              <div className="mt-8 border-t border-edge/60 pt-4 flex items-center justify-between font-mono text-xs text-muted">
                <span>Field</span>
                <span className="text-ink font-medium">Computer Science & Engineering</span>
              </div>
            </SpotlightCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
