/**
 * Work Experience data.
 * Truth source: Resume of Aadithya Nayak V.
 * Note: Datavex.ai concluded in September 2026.
 */

export const experiences = [
  {
    id: 'datavex',
    role: 'Software Engineering Intern — Datavex.ai',
    org: 'Datavex.ai',
    location: 'Mangaluru, Karnataka',
    start: 'September 2025',
    end: 'September 2026',
    current: false,
    certificateUrl: '/Aadithya%20Nayak%20V%20Internship%20Completion%20Letter.pdf',
    certificateLabel: 'Internship Certificate',
    summary:
      'Engineered scalable frontend modules and backend AI integrations for an AI-powered CRM and multi-tenant SaaS platform, improving UX responsiveness, optimizing state synchronization, and streamlining automated email processing pipelines.',
    achievements: [
      'Engineered scalable frontend modules for an AI-powered CRM and a multi-tenant SaaS platform, optimizing UX and application performance by implementing custom pagination and debounced search features using React.js and Next.js (App Router).',
      'Developed a multi-stage student profiling pipeline and complex workflow-oriented UI, leveraging TanStack React Query and Redux Toolkit for real-time state synchronization.',
      'Secured multi-user sessions and authentication by implementing Role-Based Access Control (RBAC), SSR cookie forwarding, API interceptors, and anti-CSRF validation.',
      'Integrated FastAPI endpoints with a custom automated email processing system and AI scoring engine, leveraging Azure OpenAI to analyze incoming inquiries and generate real-time responses rendered on the client side.',
      'Containerized frontend applications using Docker and managed seamless deployments across various Azure virtual machine environments.',
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
