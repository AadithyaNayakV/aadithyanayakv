# Portfolio — Project Overview

## Who this is for
A frontend developer's personal portfolio. Purpose: get recruiters/clients to remember it and reach out. It should read as technically impressive (since visitors are often other developers) without feeling like a tech demo that forgot to have content.

## Tone & Direction
Dark, moody, sci-fi-adjacent. Not neon-cyberpunk-cliché — more "precision instrument in a dark room" than "Tron." Confident and quiet, with one or two moments of real spectacle rather than motion everywhere. Think: a single orchestrated reveal, not fireworks on every scroll tick.

## References (what to borrow, not copy)
- https://majd-portfolio.framer.website/ — borrow: pacing, how sections reveal on scroll
- https://tamalsen.dev/ — borrow: structure/organization clarity
- https://www.lars-olson.com/ — borrow: use of space, restraint
- Explicitly: none of these are "top notch" enough on animation depth — the brief is to go further than all three, especially with 3D-that-responds-to-scroll (not just fade-ins) and a real interactive moment, not a hover gimmick.

## Tech Stack (do not substitute without asking)
- **Vite + React** — project scaffold
- **React Three Fiber (`@react-three/fiber`) + drei (`@react-three/drei`)** — all 3D. No CSS-fake-3D, no static 3D images.
- **GSAP + ScrollTrigger** — scroll-driven timelines (hero object transform, section reveals, timeline draw-in)
- **Framer Motion** — UI-level transitions: nav open/close, button/card micro-interactions, page-load sequence
- **Lenis** — smooth scroll, required for GSAP ScrollTrigger to feel right
- **Tailwind CSS** — styling scaffold, used alongside a small custom CSS layer for anything Tailwind can't express (glow effects, custom easing)
- **react-icons** or **lucide-react** — icons, used sparingly

## Non-negotiables
- Fully responsive down to mobile (375px). 3D scene must degrade gracefully — reduce particle count / simplify geometry on small screens rather than hiding it.
- Respect `prefers-reduced-motion`: provide a reduced-motion fallback for the scroll-driven 3D transform and the page-load sequence.
- No placeholder "Lorem ipsum" — ask me for real content per section rather than inventing filler bios.
- Performance budget: the 3D scene should not tank Lighthouse performance below ~75. Use `<Suspense>`, lazy-load the 3D canvas, and cap particle/star count reasonably (test on a mid-range laptop, not just a top-tier one).

## What "done" looks like
A single-page scroll site where:
1. The first 3 seconds feel deliberate (a real load-in sequence, not everything appearing at once)
2. One 3D object persists and visibly *transforms* as the user scrolls through sections (not decoration — it tracks progress)
3. There is one genuinely playful/interactive moment beyond hover states
4. Nothing animates "because it's there" — every motion either shows information changing or responds to a user action
