/**
 * Technical Skills data.
 * Exact 1:1 Source of Truth: Resume of Aadithya Nayak V.
 * 5 Separate Categories without combining:
 * 1. Programming Languages
 * 2. Frontend
 * 3. Backend & AI
 * 4. Databases
 * 5. Tools & Platforms
 */

export const skillCategories = [
  {
    id: 'languages',
    title: 'Programming Languages',
    shortTitle: 'Languages',
    badge: 'Core Foundation',
    themeColor: '#38bdf8',
    glowColor: 'rgba(56, 189, 248, 0.25)',
    description: 'Core programming languages for algorithmic problem-solving and systems architecture.',
    skills: [
      { name: 'JavaScript', color: '#facc15', emphasis: true },
      { name: 'Python', color: '#3b82f6', emphasis: true },
      { name: 'Java', color: '#ef4444', emphasis: true },
      { name: 'SQL', color: '#38bdf8', emphasis: true },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    shortTitle: 'Frontend',
    badge: 'User Interfaces',
    themeColor: '#00d8ff',
    glowColor: 'rgba(0, 216, 255, 0.25)',
    description: 'Modern reactive client architectures, server components, and design systems.',
    skills: [
      { name: 'React.js', color: '#00d8ff', emphasis: true },
      { name: 'Next.js', color: '#e2e8f0', emphasis: true },
      { name: 'Redux Toolkit', color: '#a855f7', emphasis: false },
      { name: 'TanStack Query', color: '#ef4444', emphasis: false },
      { name: 'Tailwind CSS', color: '#38bdf8', emphasis: false },
    ],
  },
  {
    id: 'backend-ai',
    title: 'Backend & AI',
    shortTitle: 'Backend & AI',
    badge: 'Services & Intelligence',
    themeColor: '#8b5cf6',
    glowColor: 'rgba(139, 92, 246, 0.25)',
    description: 'High-throughput asynchronous backend APIs, event streaming, and generative AI LLM pipelines.',
    skills: [
      { name: 'Node.js', color: '#22c55e', emphasis: true },
      { name: 'Express.js', color: '#94a3b8', emphasis: true },
      { name: 'FastAPI', color: '#059669', emphasis: true },
      { name: 'LangChain', color: '#10b981', emphasis: true },
      { name: 'LlamaIndex', color: '#8b5cf6', emphasis: true },
      { name: 'RAG', color: '#a855f7', emphasis: true },
      { name: 'Apache Kafka', color: '#f43f5e', emphasis: true },
      { name: 'Ollama', color: '#e2e8f0', emphasis: true },
      { name: 'Azure OpenAI', color: '#0078d4', emphasis: true },
    ],
  },
  {
    id: 'databases',
    title: 'Databases',
    shortTitle: 'Databases',
    badge: 'Data Layer',
    themeColor: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.25)',
    description: 'Relational databases, document collections, distributed caching, and vector indexing.',
    skills: [
      { name: 'PostgreSQL', color: '#336791', emphasis: true },
      { name: 'MySQL', color: '#00758f', emphasis: false },
      { name: 'MongoDB', color: '#22c55e', emphasis: true },
      { name: 'Redis', color: '#dc2626', emphasis: true },
      { name: 'ChromaDB', color: '#f97316', emphasis: true },
      { name: 'Firebase', color: '#f59e0b', emphasis: false },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & Platforms',
    shortTitle: 'Tools & Platforms',
    badge: 'Tooling & DevOps',
    themeColor: '#f59e0b',
    glowColor: 'rgba(245, 158, 11, 0.25)',
    description: 'Version control, containerization, cloud hosting, API testing, and workflow automation.',
    skills: [
      { name: 'Git', color: '#f05032', emphasis: true },
      { name: 'GitHub', color: '#e2e8f0', emphasis: true },
      { name: 'Postman', color: '#ff6c37', emphasis: false },
      { name: 'Docker', color: '#0284c7', emphasis: true },
      { name: 'Microsoft Azure', color: '#0078d4', emphasis: true },
      { name: 'AWS', color: '#f97316', emphasis: true },
      { name: 'KNIME', color: '#facc15', emphasis: false },
      { name: 'n8n', color: '#ea580c', emphasis: false },
    ],
  },
]

export const skillGroups = skillCategories
