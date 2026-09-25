/**
 * Experience timeline, newest first.
 * Real production engineering and academic background.
 */

export const experience = [
  {
    id: 'datavex',
    role: 'Software Engineering Intern',
    org: 'Datavex.ai Pvt Ltd',
    location: 'Mangaluru, Karnataka',
    start: 'Sept 2025',
    end: 'Present',
    current: true,
    summary:
      'Architecting frontend systems for an AI-powered CRM and a multi-tenant SaaS platform — robust pagination, responsive debounced search under production load, RBAC and SSR cookie forwarding for multi-user security, and FastAPI endpoints wired to an Azure OpenAI scoring engine.',
    tech: ['React.js', 'Next.js', 'Redux Toolkit', 'TanStack Query', 'FastAPI', 'Docker', 'Azure OpenAI'],
  },
  {
    id: 'sahyadri',
    role: 'B.E. Computer Science Engineering',
    org: 'Sahyadri College of Engineering and Management',
    location: 'Mangaluru, Karnataka',
    start: 'Sept 2023',
    end: 'July 2027',
    current: false,
    summary:
      'CGPA 9.52 through the sixth semester. Deep focus on data structures, algorithmic design, distributed architectures, and building production-grade software alongside coursework.',
    tech: ['Data Structures & Algorithms', 'Operating Systems', 'Database Management', 'Computer Networks'],
  },
]
