/**
 * Projects.
 * All entries are real production-grade systems built end to end.
 *
 * `preview` controls the generated cover art:
 *   seed  — any number, changes the geometry
 *   kind  — 'orbit' | 'wave' | 'stack' | 'grid' | 'network'
 */

export const projects = [
  {
    id: 'fairplace',
    title: 'FairPlace',
    subtitle: 'AI-Powered Online Marketplace Platform',
    description:
      'A full-stack online marketplace platform engineered with React.js and Node.js, featuring automated AI content moderation, real-time WebSocket negotiations, and a RAG assistant for pricing insights.',
    highlights: [
      'Developed a full-stack online marketplace platform using React.js and Node.js, enabling users to list, browse, buy, and sell products.',
      'Engineered an automated content moderation pipeline integrating AI inference APIs to validate listing images and descriptions, flagging category mismatches and policy violations before publication to reduce incorrect listings.',
      'Built a RAG chatbot using vectorized knowledge data and web scraping for real-time pricing insights, and integrated WebSocket-based user-to-user chat for instant buyer-seller negotiation.',
    ],
    tech: ['React.js', 'Node.js', 'REST APIs', 'WebSockets', 'RAG', 'AI Moderation', 'Vector Search'],
    year: '2025',
    live: null,
    repo: 'https://github.com/AadithyaNayakV/fairplace',
    image: null,
    preview: { kind: 'orbit', seed: 42 },
  },
  {
    id: 'startup-foundry',
    title: 'Startup Foundry',
    subtitle: 'AI-powered venture intelligence platform',
    description:
      'A role-based VC platform with separate workflows for founders pitching, admins auditing and investors discovering. Scoring and scraping run off the request path through Kafka, so a 7B model rating a deck never blocks the UI.',
    highlights: [
      'Built role-based venture capital workflows separating founder pitching, admin auditing, and investor deal flow.',
      'Decoupled heavy 7B model evaluations and web scrapers from the HTTP path using Apache Kafka message brokers.',
      'Engineered asynchronous deck analysis pipelines with zero UI blocking or timeout dropouts under peak traffic.',
    ],
    tech: ['FastAPI', 'Next.js', 'Apache Kafka', 'PostgreSQL', 'Playwright', 'Ollama', 'AWS EC2', 'Docker'],
    year: '2025',
    live: null,
    repo: 'https://github.com/AadithyaNayakV/startup-foundry',
    image: null,
    preview: { kind: 'grid', seed: 3 },
  },
  {
    id: 'jarvis',
    title: 'JARVIS',
    subtitle: 'Local voice-driven desktop assistant',
    description:
      'A desktop assistant that hears you without sending audio anywhere — Vosk handles speech recognition offline, Gemini handles reasoning, and a tool-calling layer executes real local actions: file management, web automation, hardware telemetry read back out loud.',
    highlights: [
      'Architected 100% offline edge speech recognition using Vosk ASR, eliminating latency and privacy leaks.',
      'Wired Gemini API tool-calling interfaces to dispatch local filesystem and web automation actions.',
      'Implemented real-time hardware telemetry streams with natural text-to-speech audio feedback.',
    ],
    tech: ['Python', 'Flask', 'Gemini API', 'Vosk ASR', 'LlamaIndex'],
    year: '2025',
    live: null,
    repo: 'https://github.com/AadithyaNayakV/jarvis',
    image: null,
    preview: { kind: 'wave', seed: 7 },
  },
  {
    id: 'findad',
    title: 'FinDad',
    subtitle: 'AI financial guidance assistant',
    description:
      'A multi-tier RAG pipeline that answers financial questions from your own documents — Redis for semantic caching, ChromaDB as the vector store, OCR ingestion for scanned statements, and a web-scraping fallback when the corpus genuinely does not know.',
    highlights: [
      'Engineered multi-tier RAG system over personal financial records and statements with ChromaDB vector search.',
      'Implemented Redis semantic cache layer reducing repeat query latency and LLM token expenditures by ~60%.',
      'Built OCR processing pipeline for scanned bank statements paired with dynamic real-time web scraping fallbacks.',
    ],
    tech: ['FastAPI', 'LangChain', 'Redis', 'ChromaDB', 'Gemini API'],
    year: '2025',
    live: null,
    repo: 'https://github.com/AadithyaNayakV/findad',
    image: null,
    preview: { kind: 'stack', seed: 11 },
  },
]
