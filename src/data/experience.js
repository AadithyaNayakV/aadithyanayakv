/**
 * Work Experience data.
 * Truth source: Resume of Aadithya Nayak V.
 * Note: Datavex.ai concluded in September 2026.
 */

export const experiences = [
  {
    id: 'next-role',
    role: 'Open to Full-Stack & AI Engineering Roles',
    org: 'New Opportunities',
    location: 'Mangaluru / Remote / Hybrid',
    start: 'Sept 2026',
    end: 'Present',
    current: true,
    statusBadge: 'Now Available',
    summary:
      'Seeking full-stack engineering and AI systems roles. Ready to contribute across the entire stack: from distributed FastAPI/Node microservices and AI/RAG architectures to responsive React/Next.js interfaces and cloud deployments.',
    achievements: [
      'Available for full-time / internship opportunities in Full-Stack Development and AI Engineering',
      'Extensive project portfolio featuring distributed Kafka microservices, offline voice agents, and vector-search RAG pipelines',
      'Strong algorithmic foundation with 700+ solved LeetCode challenges',
    ],
    tech: ['Full-Stack', 'FastAPI', 'Next.js', 'React.js', 'LangChain', 'Kafka', 'Docker', 'Azure', 'AWS'],
  },
  {
    id: 'datavex',
    role: 'Software Engineering Intern',
    org: 'Datavex.ai Pvt Ltd',
    location: 'Mangaluru, Karnataka',
    start: 'Sept 2025',
    end: 'Sept 2026',
    current: false,
    statusBadge: 'Completed (Sept 2026)',
    summary:
      'Engineered scalable modules for an AI-Powered CRM and a multi-tenant SaaS platform, optimizing UX and application performance while integrating AI evaluation pipelines and managing containerized Azure deployments.',
    achievements: [
      'Engineered scalable frontend modules for an AI-Powered CRM and a multi-tenant SaaS platform, optimizing UX and application performance by implementing custom pagination and debounced search features using React.js and Next.js (App Router).',
      'Developed a multi-stage student profiling pipeline and complex workflow-oriented UI, leveraging TanStack React Query and Redux Toolkit for real-time state synchronization.',
      'Secured multi-user sessions and authentication by implementing Role-Based Access Control (RBAC), SSR cookie forwarding, API interceptors, and anti-CSRF validation.',
      'Integrated FastAPI endpoints with a custom automated email processing system and AI scoring engine, leveraging Azure OpenAI to analyze incoming inquiries and generate real-time responses rendered on the client side.',
      'Containerized frontend applications using Docker and managed seamless deployments across various Azure environments.',
    ],
    tech: [
      'React.js',
      'Next.js',
      'Redux Toolkit',
      'TanStack React Query',
      'FastAPI',
      'Azure OpenAI',
      'Docker',
      'Azure VM',
    ],
  },
]

export const experience = experiences

