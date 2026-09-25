# How to use this spec

This folder has 4 files. Feed them to Claude Code **in this order, as separate messages** in the same session — not pasted all at once. Claude Code builds better when it can commit to the tech stack and structure before it sees animation detail, and commit to structure before styling.

1. `01-overview.md` — paste first. Let it scaffold the project (Vite + React + Tailwind + deps installed) before moving on.
2. `02-structure.md` — paste once the scaffold exists. This builds the section/component shells with real content, no animation yet.
3. `03-animations.md` — paste once structure is in place and you can see it in the browser. This is the highest-leverage file — it's what separates this from your last attempt.
4. `04-design-system.md` — paste last, or interleave with `03` if you want styling and motion to land together.

After each file, actually run the dev server and look at it before pasting the next one. Course-correcting after step 2 is cheap; course-correcting after all 4 are dumped in one go is expensive, because Claude Code has already committed to file structure and naming you might not like.

One instruction to prepend to your very first message, every time:

> Before writing code, read this whole spec and ask me anything that's ambiguous. Then propose a component file structure and wait for my go-ahead before generating code.

That single sentence is what stops it from guessing.
