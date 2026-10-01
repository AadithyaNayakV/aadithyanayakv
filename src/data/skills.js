/**
 * Technical Skills data.
 * Truth source: Resume of Aadithya Nayak V.
 * Structured cleanly around Full-Stack Development and AI Engineering.
 */

export const skillCategories = [
  {
    id: 'fullstack',
    title: 'Full-Stack Development',
    badge: 'Core Competency',
    description: 'Modern frontend interfaces paired with high-throughput backend services.',
    skills: [
      { name: 'React.js', emphasis: true },
      { name: 'Next.js', emphasis: true },
      { name: 'FastAPI', emphasis: true },
      { name: 'Node.js', emphasis: true },
      { name: 'Apache Kafka', emphasis: true },
      { name: 'Python', emphasis: true },
      { name: 'JavaScript', emphasis: true },
      { name: 'Java', emphasis: true },
      { name: 'SQL', emphasis: true },
      { name: 'Redux Toolkit', emphasis: false },
      { name: 'TanStack Query', emphasis: false },
      { name: 'Tailwind CSS', emphasis: false },
      { name: 'REST & WebSockets', emphasis: false },
    ],
  },
  {
    id: 'ai-engineering',
    title: 'AI Engineering & Systems',
    badge: 'Specialization',
    description: 'Generative AI workflows, vector search pipelines, and autonomous agent tooling.',
    skills: [
      { name: 'LangChain', emphasis: true },
      { name: 'RAG Architecture', emphasis: true },
      { name: 'Azure OpenAI', emphasis: true },
      { name: 'Ollama (Local LLMs)', emphasis: true },
      { name: 'Tool Calling & Agents', emphasis: true },
      { name: 'LlamaIndex', emphasis: false },
      { name: 'Vosk ASR (Speech)', emphasis: false },
      { name: 'Document Ingestion', emphasis: false },
    ],
  },
  {
    id: 'data-storage',
    title: 'Databases & Vector Stores',
    badge: 'Data Layer',
    description: 'Relational data modeling, distributed caching, and vector indexing.',
    skills: [
      { name: 'PostgreSQL', emphasis: true },
      { name: 'MongoDB', emphasis: true },
      { name: 'Redis (Caching)', emphasis: true },
      { name: 'ChromaDB (Vectors)', emphasis: true },
      { name: 'MySQL', emphasis: false },
      { name: 'Firebase', emphasis: false },
    ],
  },
  {
    id: 'cloud-devops',
    title: 'Cloud, DevOps & Tooling',
    badge: 'Infrastructure',
    description: 'Containerized deployment pipelines, cloud hosting, and developer tooling.',
    skills: [
      { name: 'Docker', emphasis: true },
      { name: 'Microsoft Azure', emphasis: true },
      { name: 'AWS (EC2 & S3)', emphasis: true },
      { name: 'Git & GitHub', emphasis: true },
      { name: 'Postman', emphasis: false },
      { name: 'Linux', emphasis: false },
    ],
  },
]

export const skillGroups = skillCategories
