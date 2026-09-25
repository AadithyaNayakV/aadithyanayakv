import { motion } from 'framer-motion'

/**
 * High-tech Section Transition Gate ("Door / Portal" seam)
 * Appears between sections, animating open like an iris / cyber gate when scrolled into view.
 */
export default function SectionPortalDivider({ className = '' }) {
  return (
    <div className={`relative z-10 py-6 overflow-hidden ${className}`} aria-hidden="true">
      <div className="shell flex items-center justify-center">
        {/* Left shutter beam */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="h-px flex-1 origin-right bg-linear-to-r from-transparent via-edge to-accent/60"
        />

        {/* Center Cyber Node */}
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'backOut' }}
          className="mx-4 flex items-center gap-2"
        >
          <span className="size-1.5 rounded-full bg-signal shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
          <span className="font-mono text-[10px] tracking-widest text-muted/60 uppercase select-none">
            [SYS // GATE]
          </span>
          <span className="size-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(139,92,246,0.8)]" />
        </motion.div>

        {/* Right shutter beam */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="h-px flex-1 origin-left bg-linear-to-l from-transparent via-edge to-signal/60"
        />
      </div>
    </div>
  )
}
