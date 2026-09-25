/**
 * Section headings with clean typography index prefix and subtle gradient rule.
 */
export default function SectionHeading({ index, title, lede, className = '' }) {
  return (
    <header className={`relative ${className}`}>
      <h2 className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">
        {title}
      </h2>

      {lede ? (
        <p className="measure mt-3.5 text-base text-muted md:text-lg leading-relaxed">
          {lede}
        </p>
      ) : null}

      <div className="mt-7 flex items-center gap-4">
        <div className="h-px flex-1 bg-linear-to-r from-edge via-edge/60 to-transparent" />
        <div className="size-1.5 rounded-full bg-accent/60" />
      </div>
    </header>
  )
}
