import { motion } from 'framer-motion'

/**
 * Hover never changes colour alone — every variant moves at least two things
 * (a fill that sweeps in from the left, a lift, a glow, the icon shifting).
 * Focus-visible mirrors hover so keyboard users get the same affordance.
 */

const VARIANTS = {
  /* The one focal CTA on the page. Violet lives here and nowhere else in UI. */
  primary:
    'bg-accent text-white border border-accent/60 glow-accent hover:brightness-110',
  secondary: 'border border-edge text-ink hover:border-ink/35',
  quiet: 'border border-transparent text-muted hover:text-ink',
}

const SWEEP = {
  primary: 'bg-white/12',
  secondary: 'bg-ink/6',
  quiet: 'bg-ink/6',
}

export default function Button({
  as = 'button',
  href,
  variant = 'secondary',
  icon: Icon,
  // Full utility strings, not fragments — Tailwind scans source text, so the
  // class has to appear literally wherever it is passed in.
  iconClass = 'group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5',
  className = '',
  children,
  ...rest
}) {
  const Component = as === 'a' ? motion.a : motion.button

  return (
    <Component
      href={href}
      className={`group relative inline-flex items-center gap-2.5 overflow-hidden rounded-md px-5 py-2.5 font-sans text-sm font-medium transition-colors duration-200 ${VARIANTS[variant]} ${className}`}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 420, damping: 28 }}
      {...rest}
    >
      <span
        aria-hidden="true"
        className={`absolute inset-0 origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100 ${SWEEP[variant]}`}
      />
      <span className="relative">{children}</span>
      {Icon ? (
        <Icon
          className={`relative size-4 shrink-0 transition-transform duration-200 ease-out ${iconClass}`}
          strokeWidth={1.75}
        />
      ) : null}
    </Component>
  )
}
