/**
 * Section headings carry an inline index and a modern gradient rule across the container.
 */
export default function SectionHeading({ index, title, lede, className = '' }) {
  return (
    <header className={`relative ${className}`}>
      <div className="flex items-baseline gap-4">
        {index ? (
          <span
            className="rounded border border-edge bg-surface px-2 py-0.5 font-mono text-xs text-accent tabular-nums"
            aria-hidden="true"
          >
            {index}
          </span>
        ) : null}
        <h2 className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">{title}</h2>
      </div>

      {lede ? <p className="measure mt-4 text-base text-muted md:text-lg">{lede}</p> : null}

      <div className="mt-8 flex items-center gap-4">
        <div className="h-px flex-1 bg-linear-to-r from-edge via-edge/60 to-transparent" />
        <div className="size-1.5 rounded-full bg-accent/60" />
      </div>
    </header>
  )
}
