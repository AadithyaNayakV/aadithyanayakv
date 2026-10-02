import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { useCallback, useState } from 'react'
import { useTheme } from '../../context/ThemeContext'
import { useReducedMotion } from '../../hooks/useReducedMotion'

function GithubIcon({ className = 'size-4' }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        clipRule="evenodd"
      />
    </svg>
  )
}

function TechIcon({ name, className = 'size-3.5' }) {
  switch (name) {
    case 'React.js':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <ellipse cx="12" cy="12" rx="4" ry="9" transform="rotate(30 12 12)" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <ellipse cx="12" cy="12" rx="4" ry="9" transform="rotate(-30 12 12)" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <ellipse cx="12" cy="12" rx="4" ry="9" transform="rotate(90 12 12)" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        </svg>
      )
    case 'Docker':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M13.98 11.08h2.12a.19.19 0 00.19-.19V9.01a.19.19 0 00-.19-.19h-2.12a.19.19 0 00-.19.19v1.88c0 .1.09.19.19.19m-2.95-5.43h2.12a.19.19 0 00.19-.19V3.57a.19.19 0 00-.19-.18h-2.12a.19.19 0 00-.19.18v1.89c0 .1.08.19.19.19m0 2.72h2.12a.19.19 0 00.19-.19V6.29a.19.19 0 00-.19-.18h-2.12a.19.19 0 00-.19.18v1.89c0 .1.08.19.19.19m-2.93 0h2.12a.19.19 0 00.18-.19V6.29a.19.19 0 00-.18-.18H8.1a.19.19 0 00-.19.18v1.89c0 .1.09.19.19.19m5.89 2.71h2.12a.19.19 0 00.19-.18V9.01a.19.19 0 00-.19-.19h-2.12a.19.19 0 00-.19.19v1.88c0 .1.08.18.19.18M23.76 9.89c-.06-.05-.67-.51-1.95-.51-.34 0-.68.03-1.01.09-.25-1.7-1.65-2.53-1.72-2.57l-.34-.2-.23.33c-.28.44-.49.92-.61 1.43-.23.97-.09 1.88.4 2.66-.59.33-1.55.41-1.74.42H.75a.75.75 0 00-.75.75 11.38 11.38 0 00.69 4.06c.55 1.43 1.36 2.48 2.41 3.12 1.18.72 3.1 1.14 5.28 1.14.98 0 1.96-.09 2.93-.27a12.25 12.25 0 003.82-1.39 12.4 12.4 0 002.61-2.13c1.25-1.42 2-3 2.55-4.4h.22c1.37 0 2.22-.55 2.68-1.01.31-.29.55-.65.71-1.05l.1-.29z" />
        </svg>
      )
    case 'TypeScript':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z" />
        </svg>
      )
    case 'Vite':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="m8.29 10.58.51-8.66a.31.31 0 0 1 .25-.28L17.38 0a.31.31 0 0 1 .35.39l-1.56 5.4a.31.31 0 0 0 .36.39l2.38-.46a.31.31 0 0 1 .34.44l-6.8 13.55-.12.19a.29.29 0 0 1-.25.14c-.18 0-.35-.15-.3-.37l1.09-5.3a.31.31 0 0 0-.39-.36l-1.43.44a.31.31 0 0 1-.39-.36l.69-3.37a.31.31 0 0 0-.37-.36l-2.32.53a.31.31 0 0 1-.38-.31z" />
        </svg>
      )
    case 'Next.js':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M7 7.5v9h2.2v-5.2l6.2 5.2h1.6v-9h-2.2v5.2L8.6 7.5H7z" />
        </svg>
      )
    case 'Node.js':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l9 5.2v10.4L12 23l-9-5.4V7.2L12 2zm0 2.3L4.8 8.5v7l7.2 4.2 7.2-4.2v-7L12 4.3z" />
        </svg>
      )
    case 'Python':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.9 2c-3.8 0-3.6 1.6-3.6 1.6l.04 1.7h3.7v.5H6.2S4 5.6 4 9.4s1.9 3.6 1.9 3.6h1.1V11.4s-.1-1.3 1.3-1.3h4.6s1.2.1 1.2-1.2V4.5s.4-2.5-2.2-2.5zm-1.8 1.2a.7.7 0 110 1.4.7.7 0 010-1.4zm1.9 18.8c3.8 0 3.6-1.6 3.6-1.6l-.04-1.7h-3.7v-.5h5.8s2.2.2 2.2-3.6-1.9-3.6-1.9-3.6h-1.1v1.6s.1 1.3-1.3 1.3h-4.6s-1.2-.1-1.2 1.2v4.4s-.4 2.5 2.2 2.5zm1.8-1.2a.7.7 0 110-1.4.7.7 0 010 1.4z" />
        </svg>
      )
    case 'FastAPI':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M11 5l-4 7h4l-1 7 6-9h-4l2-5z" />
        </svg>
      )
    case 'PostgreSQL':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3c-4.4 0-8 2.7-8 6v6c0 3.3 3.6 6 8 6s8-2.7 8-6V9c0-3.3-3.6-6-8-6zm6 6c0 1.9-2.7 3.5-6 3.5S6 10.9 6 9s2.7-3.5 6-3.5 6 1.6 6 3.5zm0 4.5c-.8 1.4-3.1 2.5-6 2.5s-5.2-1.1-6-2.5V11c1.5 1.5 4.3 2.5 6 2.5s4.5-1 6-2.5v2.5zm0 4.5c-.8 1.4-3.1 2.5-6 2.5s-5.2-1.1-6-2.5v-1.1c1.5 1.5 4.3 2.5 6 2.5s4.5-1 6-2.5V18z" />
        </svg>
      )
    case 'Redis':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 7l10 5 10-5-10-5zm-9 7.5L12 14l9-4.5V14l-9 5-9-5V9.5zm0 6.5L12 21l9-4.5V19l-9 5-9-5V16z" />
        </svg>
      )
    case 'Apache Kafka':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="6" r="3" fill="currentColor" />
          <circle cx="6" cy="18" r="3" fill="currentColor" />
          <circle cx="18" cy="18" r="3" fill="currentColor" />
          <path d="M12 9v6M9 16.5l6-3M15 16.5l-6-3" stroke="currentColor" strokeWidth="2" />
        </svg>
      )
    case 'Tailwind CSS':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
        </svg>
      )
    case 'Gemini API':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4L12 2z" />
        </svg>
      )
    case 'WebSockets':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M8 7l4-4 4 4M12 3v10M16 17l-4 4-4-4M12 21V11" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    default:
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="4" />
        </svg>
      )
  }
}

const LIGHT_TECH_STYLES = {
  'Docker': 'bg-sky-50/90 border-sky-200 text-sky-800',
  'React.js': 'bg-blue-50/90 border-blue-200 text-blue-800',
  'TypeScript': 'bg-indigo-50/90 border-indigo-200 text-indigo-800',
  'Next.js': 'bg-slate-100 border-slate-300 text-slate-800',
  'Vite': 'bg-purple-50/90 border-purple-200 text-purple-800',
  'Tailwind CSS': 'bg-cyan-50/90 border-cyan-200 text-cyan-800',
  'Node.js': 'bg-emerald-50/90 border-emerald-200 text-emerald-800',
  'Python': 'bg-amber-50/90 border-amber-200 text-amber-800',
  'FastAPI': 'bg-teal-50/90 border-teal-200 text-teal-800',
  'PostgreSQL': 'bg-blue-50/90 border-blue-200 text-blue-800',
  'Redis': 'bg-rose-50/90 border-rose-200 text-rose-800',
  'Apache Kafka': 'bg-rose-50/90 border-rose-200 text-rose-800',
  'Gemini API': 'bg-violet-50/90 border-violet-200 text-violet-800',
  'ChromaDB': 'bg-indigo-50/90 border-indigo-200 text-indigo-800',
  'Vector Search': 'bg-indigo-50/90 border-indigo-200 text-indigo-800',
  'RAG': 'bg-cyan-50/90 border-cyan-200 text-cyan-800',
  'LangChain': 'bg-emerald-50/90 border-emerald-200 text-emerald-800',
  'WebSockets': 'bg-amber-50/90 border-amber-200 text-amber-800',
  'REST APIs': 'bg-purple-50/90 border-purple-200 text-purple-800',
  'Vosk ASR': 'bg-amber-50/90 border-amber-200 text-amber-800',
  'AI Moderation': 'bg-pink-50/90 border-pink-200 text-pink-800',
  'Ollama': 'bg-slate-100 border-slate-300 text-slate-800',
  'Playwright': 'bg-green-50/90 border-green-200 text-green-800',
}

const DARK_TECH_STYLES = {
  'Docker': 'bg-sky-500/15 border-sky-400/30 text-sky-200',
  'React.js': 'bg-blue-500/15 border-blue-400/30 text-blue-200',
  'TypeScript': 'bg-indigo-500/15 border-indigo-400/30 text-indigo-200',
  'Next.js': 'bg-white/10 border-white/20 text-white',
  'Vite': 'bg-purple-500/15 border-purple-400/30 text-purple-200',
  'Tailwind CSS': 'bg-cyan-500/15 border-cyan-400/30 text-cyan-200',
  'Node.js': 'bg-emerald-500/15 border-emerald-400/30 text-emerald-200',
  'Python': 'bg-amber-500/15 border-amber-400/30 text-amber-200',
  'FastAPI': 'bg-teal-500/15 border-teal-400/30 text-teal-200',
  'PostgreSQL': 'bg-blue-500/15 border-blue-400/30 text-blue-200',
  'Redis': 'bg-rose-500/15 border-rose-400/30 text-rose-200',
  'Apache Kafka': 'bg-rose-500/15 border-rose-400/30 text-rose-200',
  'Gemini API': 'bg-violet-500/15 border-violet-400/30 text-violet-200',
  'ChromaDB': 'bg-indigo-500/15 border-indigo-400/30 text-indigo-200',
  'Vector Search': 'bg-indigo-500/15 border-indigo-400/30 text-indigo-200',
  'RAG': 'bg-cyan-500/15 border-cyan-400/30 text-cyan-200',
  'LangChain': 'bg-emerald-500/15 border-emerald-400/30 text-emerald-200',
  'WebSockets': 'bg-amber-500/15 border-amber-400/30 text-amber-200',
  'REST APIs': 'bg-purple-500/15 border-purple-400/30 text-purple-200',
  'Vosk ASR': 'bg-amber-500/15 border-amber-400/30 text-amber-200',
  'AI Moderation': 'bg-pink-500/15 border-pink-400/30 text-pink-200',
  'Ollama': 'bg-slate-500/15 border-slate-400/30 text-slate-200',
  'Playwright': 'bg-green-500/15 border-green-400/30 text-green-200',
}

function TechBadge({ name, isDark }) {
  const style = isDark
    ? DARK_TECH_STYLES[name] || 'bg-white/10 border-white/20 text-white'
    : LIGHT_TECH_STYLES[name] || 'bg-zinc-100 border-zinc-200 text-zinc-800'

  return (
    <div
      className={`flex items-center gap-1.5 shrink-0 px-2.5 py-1 rounded-full text-[11px] font-medium border transition-colors shadow-2xs ${style}`}
    >
      <span className="flex items-center justify-center size-3.5">
        <TechIcon name={name} className="size-3.5" />
      </span>
      <span>{name}</span>
    </div>
  )
}

const PROJECT_THEMES = {
  fairplace: {
    darkGradient:
      'linear-gradient(to top, #061e14 44%, rgba(6,78,59,0.9) 70%, transparent 100%)',
    lightGradient:
      'linear-gradient(to top, #ffffff 42%, rgba(236,253,245,0.97) 68%, rgba(167,243,208,0.4) 88%, transparent 100%)',
    cloudDark: 'rgba(16, 185, 129, 0.32)',
    cloudLight: 'rgba(52, 211, 153, 0.22)',
    accentBorderLight: 'hover:border-emerald-300',
    accentBorderDark: 'hover:border-emerald-500/30',
  },
  'startup-foundry': {
    darkGradient:
      'linear-gradient(to top, #081226 44%, rgba(30,58,138,0.9) 70%, transparent 100%)',
    lightGradient:
      'linear-gradient(to top, #ffffff 42%, rgba(239,246,255,0.97) 68%, rgba(191,219,254,0.4) 88%, transparent 100%)',
    cloudDark: 'rgba(59, 130, 246, 0.32)',
    cloudLight: 'rgba(96, 165, 250, 0.22)',
    accentBorderLight: 'hover:border-blue-300',
    accentBorderDark: 'hover:border-blue-500/30',
  },
  jarvis: {
    darkGradient:
      'linear-gradient(to top, #041822 44%, rgba(8,51,68,0.9) 70%, transparent 100%)',
    lightGradient:
      'linear-gradient(to top, #ffffff 42%, rgba(236,254,255,0.97) 68%, rgba(165,243,252,0.4) 88%, transparent 100%)',
    cloudDark: 'rgba(6, 182, 212, 0.32)',
    cloudLight: 'rgba(34, 211, 238, 0.22)',
    accentBorderLight: 'hover:border-cyan-300',
    accentBorderDark: 'hover:border-cyan-500/30',
  },
  findad: {
    darkGradient:
      'linear-gradient(to top, #1e1004 44%, rgba(120,53,15,0.9) 70%, transparent 100%)',
    lightGradient:
      'linear-gradient(to top, #ffffff 42%, rgba(254,252,232,0.97) 68%, rgba(253,230,138,0.4) 88%, transparent 100%)',
    cloudDark: 'rgba(245, 158, 11, 0.32)',
    cloudLight: 'rgba(251, 191, 36, 0.22)',
    accentBorderLight: 'hover:border-amber-300',
    accentBorderDark: 'hover:border-amber-500/30',
  },
}

export default function ProjectCard({ project }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [isHovered, setIsHovered] = useState(false)
  const reducedMotion = useReducedMotion()

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 180, damping: 22, mass: 0.25 })
  const sy = useSpring(my, { stiffness: 180, damping: 22, mass: 0.25 })

  const rotateX = useTransform(sy, [-0.5, 0.5], [3, -3])
  const rotateY = useTransform(sx, [-0.5, 0.5], [-3, 3])

  const onMove = useCallback(
    (e) => {
      if (reducedMotion) return
      const r = e.currentTarget.getBoundingClientRect()
      const clientX = e.clientX ?? (e.touches && e.touches[0] ? e.touches[0].clientX : 0)
      const clientY = e.clientY ?? (e.touches && e.touches[0] ? e.touches[0].clientY : 0)
      mx.set((clientX - r.left) / r.width - 0.5)
      my.set((clientY - r.top) / r.height - 0.5)
    },
    [mx, my, reducedMotion],
  )

  const onLeave = useCallback(() => {
    mx.set(0)
    my.set(0)
    setIsHovered(false)
  }, [mx, my])

  const primaryUrl = project.live || project.repo
  const currentTheme = PROJECT_THEMES[project.id] || PROJECT_THEMES.fairplace
  const marqueeTech = [...project.tech, ...project.tech]

  // Use light-themed image with white background in light mode, dark image in dark mode
  const displayImage = isDark ? project.image : (project.imageLight || project.image)

  return (
    <motion.article
      data-project-card
      style={reducedMotion ? {} : { rotateX, rotateY, transformPerspective: 1000 }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      onMouseEnter={() => setIsHovered(true)}
      onTouchStart={() => setIsHovered(true)}
      className={`group relative w-full h-[400px] md:h-[420px] rounded-3xl overflow-hidden transition-all duration-300 z-10 border ${
        isDark
          ? `bg-zinc-950 border-white/10 ${currentTheme.accentBorderDark} shadow-xl`
          : `bg-white border-zinc-200/90 ${currentTheme.accentBorderLight} shadow-sm hover:shadow-md`
      }`}
    >
      {/* Background Image Container */}
      <div className="absolute inset-x-0 top-0 h-[62%] overflow-hidden">
        <a
          href={primaryUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="block size-full"
          tabIndex={-1}
          aria-hidden="true"
        >
          {displayImage ? (
            <img
              src={displayImage}
              alt={`${project.title} interface preview`}
              className="size-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-102"
              loading="lazy"
            />
          ) : (
            <div
              className={`grid size-full place-items-center font-mono text-xs ${
                isDark ? 'bg-zinc-900 text-zinc-500' : 'bg-neutral-100 text-neutral-400'
              }`}
            >
              {project.title}
            </div>
          )}
        </a>
      </div>

      {/* Atmospheric Color Cloud ("cloud type") behind the text */}
      <div
        className="absolute inset-x-0 bottom-0 pointer-events-none z-10 transition-all duration-500 ease-out"
        style={{
          height: isHovered ? '84%' : '72%',
          background: isDark
            ? `radial-gradient(ellipse 95% 70% at 50% 85%, ${currentTheme.cloudDark} 0%, transparent 80%)`
            : `radial-gradient(ellipse 95% 70% at 50% 85%, ${currentTheme.cloudLight} 0%, transparent 80%)`,
        }}
      />

      {/* Theme Gradient Overlay: ensures solid backing so text never collides with image mockups */}
      <div
        className="absolute inset-x-0 bottom-0 pointer-events-none z-15 transition-all duration-400 ease-out"
        style={{
          height: isHovered ? '78%' : '64%',
          background: isDark ? currentTheme.darkGradient : currentTheme.lightGradient,
        }}
      />

      {/* Content Overlay */}
      <div className="relative z-20 p-5 md:p-6 flex flex-col justify-end h-full">
        {/* Title & Subtitle */}
        <h3
          className={`font-display text-lg md:text-xl font-bold tracking-tight leading-snug transition-colors ${
            isDark ? 'text-white' : 'text-zinc-900'
          }`}
        >
          <a
            href={primaryUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="hover:underline"
          >
            {project.title} – {project.subtitle}
          </a>
        </h3>

        {/* Description: expands cleanly on hover */}
        <div className="overflow-hidden transition-all duration-300">
          <p
            className={`mt-2 text-xs md:text-sm leading-relaxed transition-all duration-300 ${
              isDark ? 'text-zinc-300' : 'text-zinc-600'
            } ${isHovered ? 'line-clamp-none max-h-24 overflow-y-auto pr-1' : 'line-clamp-2'}`}
          >
            {project.description}
          </p>
        </div>

        {/* Tech stack: single marquee row by default, wrapped grid on hover */}
        <div className="mt-3 mb-3 transition-all duration-300">
          {isHovered ? (
            <div className="flex flex-wrap gap-1.5 max-h-18 overflow-y-auto pr-1 py-0.5 no-scrollbar animate-fade-in">
              {project.tech.map((t) => (
                <TechBadge key={t} name={t} isDark={isDark} />
              ))}
            </div>
          ) : (
            <div
              className="flex items-center overflow-hidden whitespace-nowrap w-full py-1"
              style={{
                maskImage:
                  'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
                WebkitMaskImage:
                  'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
              }}
            >
              <motion.div
                className="flex items-center gap-2 w-max"
                animate={reducedMotion ? {} : { x: ['0%', '-50%'] }}
                transition={{
                  repeat: Infinity,
                  repeatType: 'loop',
                  duration: 20,
                  ease: 'linear',
                }}
              >
                {marqueeTech.map((t, idx) => (
                  <TechBadge key={`${t}-${idx}`} name={t} isDark={isDark} />
                ))}
              </motion.div>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div
          className={`pt-3 border-t transition-colors ${
            isDark ? 'border-white/10' : 'border-zinc-200'
          }`}
        >
          {project.live ? (
            <div className="grid grid-cols-2 gap-3">
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer noopener"
                className={`group/btn flex items-center justify-center gap-2 rounded-xl font-sans text-xs font-semibold py-2.5 shadow-sm transition-all active:scale-95 ${
                  isDark
                    ? 'bg-white text-black hover:bg-neutral-200'
                    : 'bg-zinc-900 text-white hover:bg-black'
                }`}
              >
                <ExternalLink className="size-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                <span>View Website</span>
              </a>

              {project.repo ? (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={`group/btn flex items-center justify-center gap-2 rounded-xl font-sans text-xs font-semibold py-2.5 backdrop-blur-sm shadow-2xs transition-all active:scale-95 ${
                    isDark
                      ? 'bg-white/10 hover:bg-white/20 border border-white/20 text-white'
                      : 'bg-zinc-100 hover:bg-zinc-200 border border-zinc-300 text-zinc-900'
                  }`}
                >
                  <GithubIcon className="size-4" />
                  <span>GitHub</span>
                </a>
              ) : null}
            </div>
          ) : project.repo ? (
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer noopener"
              className={`group/btn flex w-full items-center justify-center gap-2 rounded-xl font-sans text-xs font-semibold py-2.5 backdrop-blur-sm shadow-2xs transition-all active:scale-95 ${
                isDark
                  ? 'bg-white/10 hover:bg-white/20 border border-white/20 text-white'
                  : 'bg-zinc-900 hover:bg-black text-white'
              }`}
            >
              <GithubIcon className="size-4 transition-transform duration-200 group-hover/btn:scale-110" />
              <span>GitHub</span>
              <ExternalLink className="size-3 opacity-70 transition-colors group-hover/btn:opacity-100" />
            </a>
          ) : null}
        </div>
      </div>
    </motion.article>
  )
}
