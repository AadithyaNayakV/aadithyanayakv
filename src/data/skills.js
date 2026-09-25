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
    description: 'Scalable frontend client architectures paired with robust, event-driven backend services.',
    subgroups: [
      {
        name: 'Frontend Frameworks & State',
        skills: [
          { name: 'React.js', emphasis: true },
          { name: 'Next.js (App Router)', emphasis: true },
          { name: 'Redux Toolkit', emphasis: true },
          { name: 'TanStack React Query', emphasis: true },
          { name: 'Tailwind CSS', emphasis: false },
        ],
      },
      {
        name: 'Backend & Distributed Services',
        skills: [
          { name: 'FastAPI', emphasis: true },
          { name: 'Node.js', emphasis: true },
          { name: 'Express.js', emphasis: false },
          { name: 'Apache Kafka', emphasis: true },
          { name: 'REST APIs & WebSockets', emphasis: false },
        ],
      },
      {
        name: 'Programming Languages',
        skills: [
          { name: 'Python', emphasis: true },
          { name: 'JavaScript', emphasis: true },
          { name: 'Java', emphasis: true },
          { name: 'SQL', emphasis: true },
        ],
      },
    ],
  },
  {
    id: 'ai-engineering',
    title: 'AI Engineering & Systems',
    badge: 'Specialization',
    description: 'Production generative AI architectures, retrieval systems, local inference, and agent tool calling.',
    subgroups: [
      {
        name: 'LLM & Agent Frameworks',
        skills: [
          { name: 'LangChain', emphasis: true },
          { name: 'LlamaIndex', emphasis: true },
          { name: 'RAG Architecture', emphasis: true },
          { name: 'Azure OpenAI', emphasis: true },
          { name: 'Ollama (Local LLMs)', emphasis: true },
        ],
      },
      {
        name: 'Speech, OCR & Tool Calling',
        skills: [
          { name: 'Vosk ASR (Offline Speech)', emphasis: false },
          { name: 'Gemini API Tool Calling', emphasis: true },
          { name: 'Document OCR Ingestion', emphasis: false },
          { name: 'Playwright Data Scraping', emphasis: false },
        ],
      },
    ],
  },
  {
    id: 'data-storage',
    title: 'Databases & Vector Stores',
    badge: 'Data Layer',
    description: 'Relational data modeling, distributed caching, and vector indexing for fast semantic retrieval.',
    subgroups: [
      {
        name: 'Relational & Document Databases',
        skills: [
          { name: 'PostgreSQL', emphasis: true },
          { name: 'MySQL', emphasis: false },
          { name: 'MongoDB', emphasis: true },
          { name: 'Firebase', emphasis: false },
        ],
      },
      {
        name: 'Vector Search & Caching',
        skills: [
          { name: 'ChromaDB (Vector Store)', emphasis: true },
          { name: 'Redis (Semantic Caching)', emphasis: true },
        ],
      },
    ],
  },
  {
    id: 'cloud-devops',
    title: 'Cloud, DevOps & Tooling',
    badge: 'Infrastructure',
    description: 'Containerized deployment pipelines, cloud environments, and workflow automation.',
    subgroups: [
      {
        name: 'Cloud & Infrastructure',
        skills: [
          { name: 'Docker', emphasis: true },
          { name: 'Microsoft Azure', emphasis: true },
          { name: 'AWS (EC2 & S3)', emphasis: true },
        ],
      },
      {
        name: 'Developer Tooling & Workflows',
        skills: [
          { name: 'Git & GitHub', emphasis: true },
          { name: 'Postman', emphasis: false },
          { name: 'KNIME', emphasis: false },
          { name: 'n8n Workflow Automation', emphasis: false },
        ],
      },
    ],
  },
]

export const skillGroups = skillCategories

