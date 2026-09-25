/**
 * Skills, grouped by category — not a flat icon soup.
 * Straight from the resume. `emphasis: true` marks the handful you would
 * actually claim in an interview; the UI renders those in full-strength ink
 * and the rest muted, so the list has a shape instead of reading as a wall.
 */

export const skillGroups = [
  {
    id: 'languages',
    label: 'Languages',
    items: [
      { name: 'JavaScript', emphasis: true },
      { name: 'Python', emphasis: true },
      { name: 'Java' },
      { name: 'SQL' },
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    items: [
      { name: 'React.js', emphasis: true },
      { name: 'Next.js', emphasis: true },
      { name: 'Redux Toolkit' },
      { name: 'TanStack Query' },
      { name: 'Tailwind CSS' },
    ],
  },
  {
    id: 'backend-ai',
    label: 'Backend & AI',
    items: [
      { name: 'FastAPI', emphasis: true },
      { name: 'Node.js' },
      { name: 'Express.js' },
      { name: 'LangChain' },
      { name: 'LlamaIndex' },
      { name: 'RAG' },
      { name: 'Apache Kafka' },
      { name: 'Ollama' },
      { name: 'Azure OpenAI' },
    ],
  },
  {
    id: 'databases',
    label: 'Databases',
    items: [
      { name: 'PostgreSQL', emphasis: true },
      { name: 'MongoDB' },
      { name: 'MySQL' },
      { name: 'Redis' },
      { name: 'ChromaDB' },
      { name: 'Firebase' },
    ],
  },
  {
    id: 'tools',
    label: 'Tools & Platforms',
    items: [
      { name: 'Git' },
      { name: 'Docker', emphasis: true },
      { name: 'Microsoft Azure' },
      { name: 'AWS' },
      { name: 'Postman' },
      { name: 'KNIME' },
      { name: 'n8n' },
    ],
  },
]
