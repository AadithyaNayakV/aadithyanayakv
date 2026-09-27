/**
 * ProfileBookAvatar:
 * Clean, high-tech circular profile photo avatar with rotating gyroscope rings.
 * Clicking directly opens the full-size image in a new tab immediately without page navigation.
 */
export default function ProfileBookAvatar() {
  return (
    <div className="relative flex flex-col items-center justify-center select-none">
      <a
        href="/prof.jpeg"
        target="_blank"
        rel="noopener noreferrer"
        title="View Full Photo — Aadithya Nayak V"
        className="group relative flex flex-col items-center cursor-pointer transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
      >
        {/* Ambient Background Glow */}
        <div className="absolute -inset-4 rounded-full bg-linear-to-tr from-accent/25 via-signal/20 to-accent/20 blur-2xl opacity-60 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Rotating Outer Gyroscope Border Ring */}
        <div className="absolute -inset-3 rounded-full border border-dashed border-signal/40 animate-[spin_24s_linear_infinite] pointer-events-none" />
        <div className="absolute -inset-1.5 rounded-full border border-accent/40 animate-[spin_18s_linear_infinite_reverse] pointer-events-none" />

        {/* Solid Round Photo Circle Frame */}
        <div className="relative size-64 sm:size-72 md:size-80 lg:size-88 rounded-full p-1.5 bg-linear-to-b from-white via-slate-100 to-white dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 shadow-[0_12px_40px_rgba(2,132,199,0.18)] transition-all duration-300 group-hover:shadow-[0_16px_50px_rgba(124,58,237,0.25)]">
          <div className="relative size-full rounded-full overflow-hidden border-2 border-edge bg-slate-900">
            <img
              src="/prof.jpeg"
              alt="Aadithya Nayak V"
              className="size-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />

            {/* Subtle vignette over photo edge */}
            <div className="absolute inset-0 rounded-full shadow-[inset_0_0_24px_rgba(0,0,0,0.35)] pointer-events-none" />
          </div>

          {/* Status Badge overlay */}
          <div className="absolute -bottom-2 inset-x-0 mx-auto w-max flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surface/95 border border-edge shadow-md backdrop-blur-md font-mono text-[11px] text-ink font-medium">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Full-Stack & AI</span>
          </div>
        </div>
      </a>
    </div>
  )
}
