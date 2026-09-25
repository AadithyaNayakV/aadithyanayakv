import { AnimatePresence, motion } from 'framer-motion'
import { ArrowDownToLine } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { navItems, site } from '../../data/site'
import { ScrollTrigger } from '../../lib/gsapConfig'
import { getLenis, scrollToSection } from '../../lib/lenis'
import ResumeDownloadButton from '../ui/ResumeDownloadButton'
import ThemeToggle from '../ui/ThemeToggle'

const overlay = {
  hidden: { opacity: 0, transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] } },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.04, delayChildren: 0.06 },
  },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
}

/** Two bars that rotate into a cross — the icon morphs, it does not cross-fade. */
function MenuIcon({ open }) {
  const bar = 'absolute left-1/2 h-px w-5 -translate-x-1/2 bg-ink'
  const spring = { type: 'spring', stiffness: 380, damping: 30 }

  return (
    <span className="relative block size-5" aria-hidden="true">
      <motion.span
        className={bar}
        style={{ top: '50%' }}
        animate={open ? { y: 0, rotate: 45 } : { y: -4, rotate: 0 }}
        transition={spring}
      />
      <motion.span
        className={bar}
        style={{ top: '50%' }}
        animate={open ? { y: 0, rotate: -45 } : { y: 4, rotate: 0 }}
        transition={spring}
      />
    </span>
  )
}

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const toggleRef = useRef(null)
  const firstLinkRef = useRef(null)

  // Which section is under the middle of the viewport.
  useEffect(() => {
    const triggers = [...navItems.map((n) => n.id), 'hero'].map((id) =>
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: 'top 50%',
        end: 'bottom 50%',
        onToggle: (self) => self.isActive && setActive(id === 'hero' ? '' : id),
      }),
    )
    return () => triggers.forEach((t) => t.kill())
  }, [])

  // Lock the page behind the overlay.
  useEffect(() => {
    const lenis = getLenis()
    if (open) {
      lenis?.stop()
      document.body.style.overflow = 'hidden'
    } else {
      lenis?.start()
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    firstLinkRef.current?.focus()
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const go = useCallback((id) => {
    setOpen(false)
    toggleRef.current?.focus()
    window.setTimeout(() => scrollToSection(id), 180)
  }, [])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-linear-to-b from-void via-void/80 to-transparent"
        />

        <div className="shell relative flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('hero')
              }}
              aria-label="Back to top"
              className="font-mono text-xs font-semibold tracking-widest text-accent transition-colors hover:text-signal"
            >
              ANV
            </a>
          </div>


          <div className="flex items-center gap-2.5">
            {/* Quick Resume Download */}
            <a
              href={site.resumeUrl}
              download
              aria-label="Download Résumé"
              className="group inline-flex items-center gap-1.5 rounded-full border border-edge bg-surface/80 px-3 py-1.5 font-mono text-xs text-ink backdrop-blur-md transition-all hover:border-accent/60 hover:bg-surface active:scale-95"
            >
              <ArrowDownToLine className="size-3.5 text-accent transition-colors duration-200 group-hover:text-signal group-hover:translate-y-0.5" />
              <span className="hidden sm:inline">Résumé</span>
            </a>

            {/* Theme Toggle Button */}
            <ThemeToggle />

            {/* Mobile / Full Nav Drawer Toggle */}
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="nav-overlay"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="group relative grid size-10 place-items-center rounded-full border border-edge bg-surface/80 text-ink backdrop-blur-md transition-colors hover:bg-surface active:scale-95"
            >
              <MenuIcon open={open} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="nav-overlay"
            variants={overlay}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 z-40 bg-void/95 backdrop-blur-2xl overflow-y-auto"
          >
            <nav className="shell flex min-h-full flex-col justify-between pt-24 pb-12">
              <div className="max-w-xl">
                <p className="font-mono text-xs uppercase tracking-widest text-muted mb-4">
                  Navigation
                </p>
                <ul className="flex flex-col gap-1">
                  {navItems.map(({ id, label }, i) => {
                    const isActive = active === id
                    return (
                      <motion.li key={id} variants={item}>
                        <button
                          ref={i === 0 ? firstLinkRef : null}
                          type="button"
                          onClick={() => go(id)}
                          className="group flex w-full items-baseline gap-4 py-2 text-left"
                        >
                          <span
                            className={`font-mono text-xs tabular-nums transition-colors ${
                              isActive ? 'text-accent font-semibold' : 'text-muted'
                            }`}
                          >
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span
                            className={`font-display text-2xl md:text-3xl transition-colors duration-200 ${
                              isActive ? 'text-ink font-semibold' : 'text-muted group-hover:text-ink'
                            }`}
                          >
                            {label}
                          </span>
                          {isActive ? (
                            <motion.span
                              layoutId="nav-active"
                              className="size-1.5 translate-y-[-0.3em] rounded-full bg-accent"
                            />
                          ) : null}
                        </button>
                      </motion.li>
                    )
                  })}
                </ul>
              </div>

              <motion.div
                variants={item}
                className="mt-8 flex flex-wrap items-center justify-between gap-6 border-t border-edge pt-6"
              >
                <div className="flex flex-wrap items-center gap-4">
                  <ThemeToggle showLabel />
                  <ResumeDownloadButton />
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="link-draw font-mono text-xs text-muted hover:text-ink"
                  >
                    {site.contact.email}
                  </a>
                </div>

                <div className="flex items-center gap-4">
                  {site.socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target={s.href.startsWith('mailto:') ? undefined : '_blank'}
                      rel="noreferrer noopener"
                      className="font-mono text-xs text-muted transition-colors hover:text-signal"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </motion.div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
