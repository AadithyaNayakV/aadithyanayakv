# Portfolio — Design System

## Color
- Background: `#0a0a0f` (near-black, slight blue tint — not pure `#000`)
- Surface (cards/panels): `#12121a`, with a 1px border `#22222e` rather than a shadow — shadows on dark backgrounds read flat/cheap, borders read more precise/technical
- Primary accent: `#8b5cf6` (violet) — used ONLY on the 3D centerpiece, the active-nav indicator, and one focal CTA. Not scattered across every icon/border.
- Secondary accent: `#22d3ee` (cyan) — used only in the click/unfold interaction and timeline "draw" line, to visually tie those two moments together as a pair
- Text: `#e4e4e7` primary, `#8b8b96` secondary/muted
- Glow effects: achieved via `filter: blur()` duplicate layers or CSS `box-shadow` with the accent color at low opacity — used at exactly two moments (hero object, timeline line), not as ambient decoration everywhere

## Typography
- Display/headline face: something with real character for a dev-portfolio-sci-fi tone — consider a geometric or slightly technical sans (e.g. a grotesk like Söhne, General Sans, or Space Grotesk) rather than a default system font
- Body face: a clean, highly legible sans — can be the same family at a lighter weight, or one clearly distinct pairing (e.g. a monospace for small metadata/tags only — project tech-stack tags are a legitimate place for monospace, since they represent code, not everything)
- Type scale: pick one deliberate scale (e.g. 1.25 ratio) and stick to it — don't eyeball sizes per section
- Line length: body text under ~75 characters per line
- Avoid: single-word-accent headlines (one word in a different color/italic), ALL CAPS labels, "eyebrow" labels above every heading, middle-dot-joined meta strings, arrows appended to every link/button

## Layout
- Left-aligned content within a constrained max-width column (not centered-everything) — reads more considered, gives the 3D object room to exist off to the side rather than competing for center stage after the hero
- Generous vertical rhythm between sections — let the scroll-driven 3D object and particle field be reason enough for space, don't fill every gap with decoration
- Section wireframe (rough):

```
┌─────────────────────────────────────┐
│  [hamburger]                         │  ← nav, top-right
│                                       │
│   Name                                │
│   Positioning line          [ 3D ]    │  ← hero: text left, object right
│   ↓ scroll                            │
├─────────────────────────────────────┤
│   About text block (left, ~60% width)│         [3D docked, top-right,
│                                       │          small, persists]
├─────────────────────────────────────┤
│   Skills — grouped columns            │
├─────────────────────────────────────┤
│   Projects — 2-col grid (1-col mobile)│
├─────────────────────────────────────┤
│   | Experience line + entries        │
├─────────────────────────────────────┤
│   Contact / resume / footer          │
└─────────────────────────────────────┘
```

## Restraint checklist (apply before calling any section done)
- Is there more than one accent color doing the same job? Cut one.
- Did every section get the same entrance animation? If yes, vary at least half of them per the animation spec.
- Any label in ALL CAPS or joined by middle dots? Remove.
- Any card using a generic soft drop-shadow instead of the border treatment above? Fix it.
- Does the hero's 3D object + violet accent feel like the one "loud" element, with everything else quiet by comparison? If something else is competing with it for attention, pull it back.

## Accessibility floor
- Visible keyboard focus states on all interactive elements (nav links, project cards, buttons) — don't rely on hover-only affordances
- `prefers-reduced-motion`: disable the scroll-scrubbed 3D transform and page-load sequence; replace with instant/simple opacity transitions
- Color contrast: verify text on `#0a0a0f`/`#12121a` meets WCAG AA against the muted text color
- All interactive elements reachable and operable via keyboard, including the centerpiece's click interaction (provide a keyboard-triggerable equivalent, e.g. focus + Enter)
