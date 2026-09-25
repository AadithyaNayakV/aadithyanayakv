import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { navItems, site } from '../../data/site'
import { ScrollTrigger } from '../../lib/gsapConfig'
import { getLenis, scrollToSection } from '../../lib/lenis'
import ResumeDownloadButton from '../ui/ResumeDownloadButton'

const overlay = {
  hidden: { opacity: 0, transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] } },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.05, delayChildren: 0.08 },
  },
}

const item = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
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

  // Which section is under the middle of the viewport. The hero clears the
  // highlight rather than leaving the last section lit while you are at the top.
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
    // Let the overlay start clearing before the page moves under it.
    window.setTimeout(() => scrollToSection(id), 180)
  }, [])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        {/* Keeps the bar legible over whatever scrolls under it, without
            drawing a hard edge across the page. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-linear-to-b from-void via-void/80 to-transparent"
        />

        <div className="shell relative flex items-center justify-between py-5">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection('hero')
            }}
            className="font-display text-sm font-medium tracking-tight text-ink transition-opacity hover:opacity-70"
          >
            {site.name}
          </a>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="nav-overlay"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="relative -mr-2 grid size-11 place-items-center rounded-md text-ink transition-colors hover:bg-ink/6"
          >
            <MenuIcon open={open} />
          </button>
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
            className="fixed inset-0 z-40 bg-void/95 backdrop-blur-xl"
          >
            <nav className="shell flex h-full flex-col justify-center pt-20 pb-12">
              <ul className="flex flex-col gap-1">
                {navItems.map(({ id, label }, i) => {
                  const isActive = active === id
                  return (
                    <motion.li key={id} variants={item}>
                      <button
                        ref={i === 0 ? firstLinkRef : null}
                        type="button"
                        onClick={() => go(id)}
                        className="group flex w-full items-baseline gap-5 py-2 text-left"
                      >
                        <span
                          className={`font-mono text-sm tabular-nums transition-colors ${
                            isActive ? 'text-accent' : 'text-muted'
                          }`}
                        >
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span
                          className={`font-display text-3xl transition-colors duration-200 md:text-4xl ${
                            isActive ? 'text-ink' : 'text-muted group-hover:text-ink'
                          }`}
                        >
                          {label}
                        </span>
                        {isActive ? (
                          <motion.span
                            layoutId="nav-active"
                            className="size-1.5 translate-y-[-0.4em] rounded-full bg-accent"
                          />
                        ) : null}
                      </button>
                    </motion.li>
                  )
                })}
              </ul>

              <motion.div
                variants={item}
                className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-edge pt-8"
              >
                <div className="flex flex-wrap items-center gap-6">
                  <ResumeDownloadButton />
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="link-draw text-sm text-muted hover:text-ink"
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
                      className="text-xs font-mono text-muted transition-colors hover:text-signal"
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
