<div align="center">

# ⚡ Aadithya Nayak V — Developer Portfolio

**Full-Stack Developer & AI Engineer**  
*Engineering resilient architectures, distributed backend pipelines, and production AI systems.*

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?style=for-the-badge&logo=threedotjs&logoColor=white)](https://threejs.org/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-13-FF0055?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

[**Explore Live Portfolio »**](https://aadi-dev.vercel.app/)

</div>

---

## 🌟 Overview

This repository houses the source code for the personal developer portfolio of **Aadithya Nayak V**. Designed with precision engineering, kinetic animations, and high-performance WebGL aesthetics, the portfolio serves as an executive showcase of production systems, algorithmic problem solving, and modern full-stack development.

---

## ✨ Key Features & Creative Highlights

- **📖 Interactive 3D Dev Chronicles Book Avatar**:
  - Starts as a sleek circular avatar with glowing cybernetic gyroscope rings.
  - On hover or tap, opens like a physical 3D book along the spine, automatically flipping through live LeetCode achievements and an engineering epilogue.
- **⚡ Animated Motherboard Circuit Background**:
  - Real-time HTML5 canvas rendering realistic PCB circuit traces with 45°/90° chamfer bends, solder vias, and animated data pulses traveling across pathways.
- **📜 Torn Paper Intro Reveal**:
  - Deckled jagged-edge paper tear animation greeting visitors on first load with zero dark-flash reload artifacts.
- **🔄 Fully Automated Live Stats Pipeline**:
  - Automatically queries the **LeetCode GraphQL API** for live problem counts (**700+ solved**) and the **GitHub REST API** for public repository metrics.
  - Zero manual updates needed — updates nightly via GitHub Actions and rebuilds seamlessly on Vercel.
- **🎯 Professional Experience & Academic Timeline**:
  - Highlights experience at **Datavex.ai** as a Software Engineering Intern (Sept 2025 – Sept 2026) and academic standing at **Sahyadri College of Engineering & Management** (9.52 CGPA).
- **🚀 Project Showcase with Live Filtering**:
  - Detailed interactive project cards featuring production systems: *Startup Foundry*, *FairPlace*, *JARVIS*, and *FinDad*.
- **🌀 Silky Smooth Scroll & Responsive Physics**:
  - Driven by **Lenis** smooth wheel physics synced with **GSAP ScrollTrigger** and Framer Motion spring micro-interactions.
- **🌓 Adaptive Theme System**:
  - Instant light-first design with dark-mode toggle, custom glassmorphism tokens, and responsive mobile-first typography.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | [React 19](https://react.dev/), [Vite 8](https://vitejs.dev/) |
| **Styling & Design System** | [Tailwind CSS v4](https://tailwindcss.com/), Custom Design Tokens, Glassmorphism |
| **Motion & Physics** | [Framer Motion](https://www.framer.com/motion/), [GSAP](https://greensock.com/gsap/), [Lenis Smooth Scroll](https://github.com/darkroomengineering/lenis) |
| **3D Graphics & Canvas** | [Three.js](https://threejs.org/), [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber), HTML5 Canvas 2D |
| **Icons & Typography** | [Lucide React](https://lucide.dev/), Space Grotesk, Inter, JetBrains Mono |
| **Automation & CI/CD** | Node.js fetch script, GitHub Actions Cron, Vercel Continuous Deployment |

---

## 📂 Project Structure

```text
aadi-dev/
├── .github/
│   └── workflows/
│       └── update-developer-data.yml   # Daily automated stats cron job
├── public/
│   ├── favicon.svg                     # Custom ANV cybernetic monogram badge
│   ├── prof.jpeg                       # High-res portrait asset
│   └── resume.pdf                      # Official curriculum vitae
├── scripts/
│   └── fetch-developer-data.mjs        # Live LeetCode & GitHub data fetcher
├── src/
│   ├── components/
│   │   ├── layout/                     # Nav, Footer, SmoothScroll
│   │   ├── sections/                   # Hero, About, Experience, Education, Projects, Skills, LeetCode, Contact
│   │   ├── three/                      # WebGL Canvas, Particles, Scene Lighting
│   │   └── ui/                         # CircuitBackground, ProfileBookAvatar, IntroDoorLoader, SpotlightCard
│   ├── context/                        # ThemeContext (Light / Dark)
│   ├── data/                           # site.js, projects.js, developer-data.json
│   ├── lib/                            # lenis.js, gsapConfig.js, motionState.js
│   ├── App.jsx                         # Main application tree & portal dividers
│   ├── index.css                       # Tailwind v4 theme variables & design tokens
│   └── main.jsx                        # React root entry point
├── vercel.json                         # SPA routing & cache control headers
└── package.json                        # Dependencies, build scripts & sync triggers
```

---

## ⚙️ Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)

### 1. Clone the repository
```bash
git clone https://github.com/AadithyaNayakV/aadi-dev.git
cd aadi-dev
```

### 2. Install dependencies
```bash
npm install
```

### 3. Sync live developer data (Optional)
Pulls your latest GitHub repos and LeetCode problem counts directly from the APIs:
```bash
npm run sync-data
```

### 4. Start the local development server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to view the portfolio.

### 5. Build for production
```bash
npm run build
```
This triggers an automatic data sync followed by the optimized Vite production bundle build.

---

## 🤖 Live Automation Architecture

This portfolio operates on a self-updating automation loop:

1. **Daily Scheduled Action**: Every night at `00:00 UTC`, `.github/workflows/update-developer-data.yml` triggers automatically.
2. **API Querying**: `scripts/fetch-developer-data.mjs` calls:
   - **LeetCode GraphQL API**: Fetches current problems solved, ranking, and difficulty distribution for `@DKSbFeaWen`.
   - **GitHub REST API**: Fetches public repositories, stars, and language metrics for `@AadithyaNayakV`.
3. **Automated Commit**: If metrics have changed, the action commits the updated `developer-data.json` directly to the repository.
4. **Instant Deployment**: Vercel detects the commit and immediately rebuilds and deploys the updated live site without any manual intervention.

---

## 📬 Connect with Me

- **Portfolio**: [aadi-dev.vercel.app](https://aadi-dev.vercel.app/)
- **GitHub**: [@AadithyaNayakV](https://github.com/AadithyaNayakV)
- **LinkedIn**: [Aadithya Nayak V](https://linkedin.com/in/aadithya-nayak-v-3533a4293)
- **LeetCode**: [@DKSbFeaWen](https://leetcode.com/u/DKSbFeaWen/)
- **Email**: [aadithyanayakv@gmail.com](mailto:aadithyanayakv@gmail.com)

---

<div align="center">
  <sub>Crafted with passion, precision, and code by <b>Aadithya Nayak V</b> © 2026.</sub>
</div>
