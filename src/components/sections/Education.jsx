import { motion } from 'framer-motion'
import { Award, BookOpen, Calendar, GraduationCap, MapPin, Sparkles } from 'lucide-react'
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
          lede="Rigorous computer science curriculum, algorithmic excellence, and systems principles."
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

          {/* Academic Metric & Coursework (Right 5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
            {/* CGPA Metric Card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <SpotlightCard
                spotlightColor="rgba(34, 211, 238, 0.25)"
                borderColor="rgba(34, 211, 238, 0.6)"
                className="group p-6 md:p-7"
              >
                <div className="flex items-center justify-between">
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

                <div className="mt-5 flex items-baseline gap-2">
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
                      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                  <p className="mt-2 text-xs font-mono text-muted text-right">
                    {educationData.semesterNote}
                  </p>
                </div>
              </SpotlightCard>
            </motion.div>

            {/* Core Coursework Card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1"
            >
              <SpotlightCard
                spotlightColor="rgba(139, 92, 246, 0.18)"
                borderColor="rgba(139, 92, 246, 0.4)"
                className="group p-6 md:p-7 h-full flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 border-b border-edge/60 pb-3">
                    <BookOpen className="size-4 text-accent transition-colors duration-200 group-hover:text-signal" />
                    <h4 className="font-display text-base font-semibold text-ink">
                      Core Computer Science Coursework
                    </h4>
                  </div>

                  <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {educationData.coursework.map((course) => (
                      <li
                        key={course.name}
                        className="flex items-center justify-between rounded-lg border border-edge bg-surface/70 px-3 py-2 text-xs font-mono text-ink/85 transition-colors hover:border-accent/40"
                      >
                        <span className="truncate pr-1">{course.name}</span>
                        <span className="text-[10px] rounded bg-surface border border-edge px-1.5 py-0.5 text-muted">
                          {course.tag}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="mt-4 text-xs font-mono text-muted text-center border-t border-edge/40 pt-3">
                  Theoretical foundations translated into practical software architectures
                </p>
              </SpotlightCard>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
