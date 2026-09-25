# Portfolio — Animation Timeline

General rule for whoever/whatever builds this: every animation below is written as a **timeline with trigger conditions**, not a feature request. Implement it as scroll-percentage-driven (GSAP ScrollTrigger, `scrub: true` where noted) or as a discrete triggered sequence (page load, click) — not as a generic "fade up on scroll into view" applied uniformly, which is the default to avoid.

## Global / persistent
- **Background particle field** (drei `<Points>` or `<Stars>`): low density, slow ambient drift (not reactive to scroll), fixed behind all content, subtle parallax on mouse move (max ~10px offset — restrained, not floaty)
- **Smooth scroll**: Lenis active site-wide; all ScrollTrigger instances synced to Lenis's scroll event, not the native scroll event
- **Custom cursor** (optional but fits the sci-fi tone): small dot that scales up when hovering any clickable element — skip if it risks feeling gimmicky on mobile (disable entirely on touch devices)

## Page load sequence (0–1.5s, runs once)
1. 0.0s: black screen, nothing rendered
2. 0.0–0.4s: background particle field fades in (opacity 0 → 1)
3. 0.3–0.9s: 3D centerpiece object scales in from 0 → 1 with a slight overshoot (ease: `back.out(1.4)`), simultaneously rotating from an offset angle to its resting orientation
4. 0.6–1.2s: hero text (name, positioning line) enters — one clean staggered reveal (each line offset ~0.08s), not per-letter (per-letter reads as try-hard at this length)
5. 1.2–1.5s: scroll-down cue fades in last, small idle bounce begins (looping, subtle)

This is the "one orchestrated moment" — spend the animation budget here, keep section-entry animations after this calmer by comparison.

## Hero → scroll-driven 3D timeline
Tie the centerpiece object's transform to overall scroll progress (`useScrollProgress` hook, 0–1 across full page), using GSAP `scrub`:

| Scroll % | Object behavior |
|---|---|
| 0–15% (Hero in view) | Idle state: continuous slow rotation (~0.002 rad/frame via `useFrame`), floats center-screen, tilts toward cursor position (max ~8° tilt, lerped for smoothness) |
| 15–30% (entering About) | Scales 1.0 → 0.45, translates from center to a fixed top-right dock position; rotation briefly accelerates during the move (eased, not linear) as a "settling" cue |
| 30–95% | Stays docked top-right, continues slow idle rotation, unaffected by section content scrolling beneath it — acts as a persistent anchor |
| 95–100% (Contact/footer) | Gently fades in opacity (1 → 0.4) and scales down slightly — signals "you've reached the end" without disappearing entirely |

Do **not** implement this as separate per-section triggers that snap the object — it must feel like one continuous scrubbed timeline, scroll-position-driven, reversible if the user scrolls back up.

## Section-by-section entry animations
Vary the entry pattern per section — do not use the same fade-up-on-scroll for all of them, that's the generic default.

- **About**: text block slides in from the left with a subtle mask/reveal (clip-path wipe), not a simple fade
- **Skills**: category groups appear with a short stagger; within each group, individual skill items animate in as a loose cluster settling into position (mimics the "unfold" pattern in the hero, ties the language of motion together)
- **Projects**: cards enter with a stagger as the section scrolls into view (GSAP ScrollTrigger, `start: top 80%`). On hover: card lifts (`translateY: -8px`) AND the project's preview image does a subtle mousemove-based parallax (image shifts opposite to cursor, small range) — hover state should do two things, not one, to avoid reading as a generic card-lift
- **Experience/Timeline**: a vertical line draws itself (stroke-dashoffset animation or scaleY, scrubbed to scroll) as the user scrolls through entries; each entry's content fades/slides in as the line reaches it — the line drawing IS the animation, entries are secondary
- **Contact**: on scroll into view, background particle density or glow intensity increases subtly behind the form/links — signals "arrival" without new motion elements

## The interactive moment (click/drag on centerpiece)
- Idle invitation: very subtle continuous wobble or cursor-attraction on the object (already covered above) signals it's interactive without a label
- On click or drag: object's geometry briefly disperses (if particle-based) or unfolds/rotates through an alternate form (if mesh-based), holds for ~0.8s, then eases back to its current scroll-appropriate state (respecting whatever dock position scroll progress dictates)
- This should be interruptible — if the user scrolls mid-animation, the scroll-driven timeline takes priority and the click animation cancels gracefully rather than fighting it

## Hover / micro-interaction rules (apply throughout)
- Buttons: no color-swap-only hover. Combine at least two of: scale, shadow/glow change, icon shift, background fill direction
- Nav hamburger → open: icon morphs (not just fades) into a close icon; overlay content staggers in
- Links in body text: underline draws in from one side on hover (not instant), fast (~150ms)

## Explicitly avoid
- Per-letter text scramble/typewriter effects (overused, reads as templated)
- Tilt-on-hover for every card as the *only* hover behavior
- Animating every element that enters the viewport with the identical fade+translateY — vary it per section as specified above
- Confetti/particle bursts as decoration unconnected to any action
