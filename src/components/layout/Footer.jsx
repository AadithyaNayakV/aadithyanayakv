import { ArrowUp } from 'lucide-react'
import { site } from '../../data/site'
import { scrollToSection } from '../../lib/lenis'

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-edge">
      <div className="shell flex flex-col gap-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} {site.name}
        </p>

        <div className="flex flex-wrap items-center gap-6">
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

          <button
            type="button"
            onClick={() => scrollToSection('hero')}
            className="group flex items-center gap-2 rounded-md text-sm text-muted transition-colors hover:text-ink"
          >
            Top
            <ArrowUp
              className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5"
              strokeWidth={1.75}
            />
          </button>
        </div>
      </div>
    </footer>
  )
}
