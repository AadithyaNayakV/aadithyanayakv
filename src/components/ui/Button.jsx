import { motion } from 'framer-motion'

/**
 * Button component:
 * When as="a", renders a pure native anchor tag so protocol links (mailto:)
 * trigger the OS mail application directly without Framer Motion tap interception.
 */

const VARIANTS = {
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
  iconClass = 'group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5',
  className = '',
  children,
  ...rest
}) {
  const commonClasses = `group relative inline-flex items-center gap-2.5 overflow-hidden rounded-md px-5 py-2.5 font-sans text-sm font-medium transition-all duration-200 ${VARIANTS[variant]} ${className}`

  if (as === 'a') {
    return (
      <a
        href={href}
        className={`${commonClasses} hover:-translate-y-0.5 active:scale-95`}
        {...rest}
      >
        <span
          aria-hidden="true"
          className={`absolute inset-0 origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100 ${SWEEP[variant]}`}
        />
        <span className="relative">{children}</span>
        {Icon ? (
          <Icon
            className={`relative size-4 shrink-0 transition-all duration-200 ease-out group-hover:text-signal ${iconClass}`}
            strokeWidth={1.75}
          />
        ) : null}
      </a>
    )
  }

  return (
    <motion.button
      type="button"
      className={commonClasses}
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
          className={`relative size-4 shrink-0 transition-all duration-200 ease-out group-hover:text-signal ${iconClass}`}
          strokeWidth={1.75}
        />
      ) : null}
    </motion.button>
  )
}
