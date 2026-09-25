import { motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

export default function ThemeToggle({ className = '', showLabel = false }) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={`group relative flex items-center gap-2 rounded-full border border-edge bg-surface/80 px-3 py-1.5 text-xs text-ink backdrop-blur-md transition-all hover:border-accent/60 hover:bg-surface active:scale-95 ${className}`}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 0 : 180, scale: [0.85, 1.1, 1] }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="grid size-5 place-items-center rounded-full text-ink group-hover:text-accent"
      >
        {isDark ? (
          <Moon className="size-3.5 fill-accent/20 text-accent transition-colors duration-200 group-hover:text-signal" />
        ) : (
          <Sun className="size-3.5 fill-amber-500/20 text-amber-500 transition-colors duration-200 group-hover:text-accent" />
        )}
      </motion.div>
      {showLabel ? (
        <span className="font-mono text-xs text-muted group-hover:text-ink transition-colors capitalize">
          {theme} mode
        </span>
      ) : null}
    </button>
  )
}
