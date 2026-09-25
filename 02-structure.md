# Portfolio — Structure & Content

## Page sections (in order)
1. **Hero** — name, one-line role/positioning statement, 3D centerpiece, scroll-down cue
2. **About** — short bio (2–3 sentences of real substance, not "I'm passionate about..."), what kind of work you want
3. **Skills / Stack** — grouped by category (e.g. Languages, Frameworks, Tools) — not a flat icon soup
4. **Projects** — 4–6 projects, each with: title, 1–2 sentence description, tech tags, live link, repo link, a visual (screenshot or generated preview)
5. **Experience / Timeline** — chronological, draws itself in as user scrolls (see animation spec)
6. **Interactive moment** — see below, placed either inside/around the Hero's 3D object or as its own small section — not a separate isolated "game" block
7. **Contact / Footer** — email, socials, resume download button, closing line

## Navigation
- Hidden/hamburger menu, expands on click (not hover) into a full or partial overlay
- Menu items: About, Skills, Projects, Experience, Contact
- Should visually indicate current section on scroll (active-state highlight) once expanded
- Resume download button lives in the nav overlay AND in the footer (two access points, don't force people to hunt)

## The interactive moment — spec
Not a standalone game. Integrate it into the Hero's 3D object: clicking or dragging the object triggers a small transformation — e.g. it "unfolds" or reassembles into another form (particles briefly disperse and reform as your initials, or the wireframe unfolds into a rotated state) before settling back. This should feel like a discovery, not a UI feature — no button labeled "Click me" — the object itself should read as interactive (subtle idle wobble or cursor-follow to invite the click).

## Folder / component structure

```
src/
  components/
    layout/
      Nav.jsx
      Footer.jsx
      SmoothScroll.jsx        (Lenis wrapper)
    sections/
      Hero.jsx
      About.jsx
      Skills.jsx
      Projects.jsx
      ProjectCard.jsx
      Experience.jsx
      Contact.jsx
    three/
      Scene.jsx                (R3F <Canvas> wrapper, one instance, persists across scroll)
      CenterpieceObject.jsx    (the main 3D object + its scroll-driven transform logic)
      Particles.jsx            (background star/particle field)
      SceneLighting.jsx
    ui/
      Button.jsx
      SectionHeading.jsx
      ResumeDownloadButton.jsx
  hooks/
    useScrollProgress.js        (tracks overall scroll % for the 3D timeline)
    useReducedMotion.js
  lib/
    gsapConfig.js               (register ScrollTrigger, shared ease presets)
  data/
    projects.js                 (array of project objects — content lives here, not hardcoded in JSX)
    skills.js
    experience.js
  App.jsx
  main.jsx
public/
  resume.pdf
  /models (if using any .glb assets later)
```

## Content I need to supply (flag these to me — don't invent)
- Real name, role/title, one-line positioning statement
- Bio paragraph
- 4–6 real projects: name, description, tech, links
- Skills list, grouped
- Experience entries: role, company/context, dates, 1-line description
- Resume PDF
- Contact email + social links
