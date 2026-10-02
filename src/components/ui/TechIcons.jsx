/**
 * Precision SVG brand icons for technical skills.
 * Clean, lightweight, scalable, and responsive to theme colors.
 */

export function TechIcon({ name, className = "size-4", color }) {
  const iconKey = name.toLowerCase().replace(/[\s\(\)\.\/\&-]/g, '')

  switch (iconKey) {
    // --- Fullstack Icons ---
    case 'reactjs':
    case 'react':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} style={{ color: color || '#00d8ff' }}>
          <ellipse cx="12" cy="12" rx="10" ry="4.2" />
          <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
        </svg>
      )

    case 'nextjs':
    case 'next':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <circle cx="12" cy="12" r="10" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 8.5v7M16 15.5l-6.8-8.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          <path d="M16 8.5v4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      )

    case 'fastapi':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} style={{ color: color || '#059669' }}>
          <circle cx="12" cy="12" r="10" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5" />
          <path d="M11 6L6.5 13H12l-1 5 6.5-7H12l1-5z" fill="currentColor" />
        </svg>
      )

    case 'nodejs':
    case 'node':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} style={{ color: color || '#22c55e' }}>
          <path d="M12 2.5l8.5 4.9v9.8L12 22l-8.5-4.8V7.4L12 2.5z" stroke="currentColor" strokeWidth="1.6" fill="currentColor" fillOpacity="0.1" />
          <path d="M12 7.5v9M8 9.8l4 2.3 4-2.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )

    case 'expressjs':
    case 'express':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} style={{ color: color || '#94a3b8' }}>
          <circle cx="12" cy="12" r="9" stroke="currentColor" fill="currentColor" fillOpacity="0.12" />
          <path d="M8 8l8 8M16 8l-8 8" strokeLinecap="round" />
        </svg>
      )

    case 'apachekafka':
    case 'kafka':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} style={{ color: color || '#f43f5e' }}>
          <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.6" fill="currentColor" fillOpacity="0.15" />
          <circle cx="5" cy="8" r="2.2" fill="currentColor" />
          <circle cx="19" cy="8" r="2.2" fill="currentColor" />
          <circle cx="5" cy="16" r="2.2" fill="currentColor" />
          <circle cx="19" cy="16" r="2.2" fill="currentColor" />
          <path d="M7 9l3 2M14 13l3 2M7 15l3-2M14 11l3-2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      )

    case 'python':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M11.9 2c-3.1 0-4.9.4-4.9 2.2v2.7h5v.9H4.8C2.5 7.8 2 9.5 2 12.3c0 2.5.7 4.2 2.8 4.2h1.6v-2.3c0-2.3 1.9-4.2 4.2-4.2h5.1c1.9 0 3.4-1.5 3.4-3.4V4.2C19.1 2.3 17 2 11.9 2z" fill="#3b82f6" />
          <path d="M12.1 22c3.1 0 4.9-.4 4.9-2.2v-2.7h-5v-.9h7.2c2.3 0 2.8-1.7 2.8-4.5 0-2.5-.7-4.2-2.8-4.2h-1.6v2.3c0 2.3-1.9 4.2-4.2 4.2H8.3c-1.9 0-3.4 1.5-3.4 3.4v4.6c0 1.9 2.1 2.2 7.2 2.2z" fill="#eab308" />
          <circle cx="9" cy="4.5" r="0.8" fill="#ffffff" />
          <circle cx="15" cy="19.5" r="0.8" fill="#ffffff" />
        </svg>
      )

    case 'javascript':
    case 'js':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} style={{ color: color || '#facc15' }}>
          <rect x="2.5" y="2.5" width="19" height="19" rx="3.5" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.6" />
          <path d="M9 11v5c0 1.5-.8 2-2 2H6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M14 11.5c.8-.5 1.7-.6 2.5-.3.8.3 1.2.9 1.2 1.8 0 1.6-2.5 1.8-2.5 3 0 .7.6 1.2 1.6 1.2.8 0 1.6-.3 2.2-.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      )

    case 'java':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} style={{ color: color || '#ef4444' }}>
          <path d="M12 2c-2.5 2-1 4.5 0 6M9 4c-2 2-1 3.5 0 5" stroke="#ef4444" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M4 14.5c0 3.5 3.5 5 8 5s8-1.5 8-5H4z" fill="currentColor" fillOpacity="0.18" stroke="currentColor" strokeWidth="1.6" />
          <path d="M18 14.5c1.5 0 3 .8 3 2s-1.5 2-3 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M3 21c4.5 1 13.5 1 18 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )

    case 'sql':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} style={{ color: color || '#38bdf8' }}>
          <ellipse cx="12" cy="6" rx="8" ry="3" fill="currentColor" fillOpacity="0.15" />
          <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" />
          <path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
        </svg>
      )

    case 'reduxtoolkit':
    case 'redux':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} style={{ color: color || '#a855f7' }}>
          <circle cx="12" cy="7.5" r="2.5" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="7.5" cy="15.5" r="2.5" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="16.5" cy="15.5" r="2.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M10.5 9.5l-2 4M13.5 9.5l2 4M9.5 16h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )

    case 'tanstackquery':
    case 'tanstack':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} style={{ color: color || '#ef4444' }}>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" strokeDasharray="3 3" />
          <circle cx="12" cy="12" r="5" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
        </svg>
      )

    case 'tailwindcss':
    case 'tailwind':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={{ color: color || '#38bdf8' }}>
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
        </svg>
      )

    case 'restwebsockets':
    case 'websockets':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} style={{ color: color || '#06b6d4' }}>
          <path d="M4 8h16M4 8l4-4M20 8l-4 4M20 16H4M20 16l-4 4M4 16l4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )

    // --- AI Systems Icons ---
    case 'langchain':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} style={{ color: color || '#10b981' }}>
          <rect x="3" y="4" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6" fill="currentColor" fillOpacity="0.15" />
          <rect x="14" y="13" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6" fill="currentColor" fillOpacity="0.15" />
          <path d="M10 7.5h4a2 2 0 012 2v4M14 16.5h-4a2 2 0 01-2-2v-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )

    case 'ragarchitecture':
    case 'rag':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} style={{ color: color || '#a855f7' }}>
          <rect x="3" y="3" width="6" height="6" rx="1.5" />
          <rect x="15" y="3" width="6" height="6" rx="1.5" />
          <rect x="9" y="15" width="6" height="6" rx="1.5" fill="currentColor" fillOpacity="0.2" />
          <path d="M6 9v3a3 3 0 003 3h3M18 9v3a3 3 0 01-3 3h-3" strokeLinecap="round" />
        </svg>
      )

    case 'azureopenai':
    case 'azure':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} style={{ color: color || '#0078d4' }}>
          <path d="M13 2.5l7 12-4.5 7h-7l2-4 4.5-8L13 2.5z" fill="currentColor" fillOpacity="0.8" />
          <path d="M3.5 17.5L8 9.5l4 7.5H3.5z" fill="currentColor" fillOpacity="0.4" />
        </svg>
      )

    case 'ollamalocalllms':
    case 'ollama':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} style={{ color: color || '#e2e8f0' }}>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="9" cy="11" r="1.5" fill="currentColor" />
          <circle cx="15" cy="11" r="1.5" fill="currentColor" />
          <path d="M10 15.5a2.5 2.5 0 004 0" strokeLinecap="round" />
        </svg>
      )

    case 'toolcallingagents':
    case 'agents':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} style={{ color: color || '#ec4899' }}>
          <circle cx="12" cy="8" r="4" fill="currentColor" fillOpacity="0.15" />
          <path d="M6 19a6 6 0 0112 0H6z" />
          <path d="M18 6l2-2M20 6l-2-2" strokeLinecap="round" />
          <path d="M6 6l-2-2M4 6l2-2" strokeLinecap="round" />
        </svg>
      )

    case 'llamaindex':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} style={{ color: color || '#8b5cf6' }}>
          <path d="M4 6h16M4 12h10M4 18h6M17 11l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )

    case 'voskasrspeech':
    case 'vosk':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} style={{ color: color || '#38bdf8' }}>
          <path d="M12 2v20M8 6v12M4 10v4M16 6v12M20 10v4" strokeLinecap="round" />
        </svg>
      )

    case 'documentingestion':
    case 'ingestion':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} style={{ color: color || '#06b6d4' }}>
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" fill="currentColor" fillOpacity="0.1" />
          <path d="M14 2v6h6M12 12v6M9 15l3 3 3-3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )

    // --- Databases & Storage Icons ---
    case 'postgresql':
    case 'postgres':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} style={{ color: color || '#336791' }}>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" fill="currentColor" fillOpacity="0.15" />
          <path d="M8 10c0-2 1.8-3.5 4-3.5s4 1.5 4 3.5c0 3-2 5-4 5.5v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="10" cy="10" r="1" fill="currentColor" />
          <circle cx="14" cy="10" r="1" fill="currentColor" />
        </svg>
      )

    case 'mongodb':
    case 'mongo':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} style={{ color: color || '#22c55e' }}>
          <path d="M12 2.5C12 2.5 7 7.5 7 13.5c0 4 3 7.5 5 8 2-.5 5-4 5-8 0-6-5-11-5-11z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.6" />
          <path d="M12 2.5v19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )

    case 'rediscaching':
    case 'redis':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} style={{ color: color || '#dc2626' }}>
          <path d="M12 2l9 5.2v9.6l-9 5.2-9-5.2V7.2L12 2z" stroke="currentColor" strokeWidth="1.6" fill="currentColor" fillOpacity="0.15" />
          <path d="M3.5 8L12 13l8.5-5M12 13v9" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      )

    case 'chromadbvectors':
    case 'chromadb':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} style={{ color: color || '#f97316' }}>
          <circle cx="7" cy="8" r="3.5" fill="#f97316" fillOpacity="0.7" />
          <circle cx="17" cy="8" r="3.5" fill="#a855f7" fillOpacity="0.7" />
          <circle cx="12" cy="16" r="3.5" fill="#06b6d4" fillOpacity="0.7" />
          <path d="M7 8l5 8 5-8" stroke="currentColor" strokeWidth="1.4" strokeDasharray="2 2" />
        </svg>
      )

    case 'mysql':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} style={{ color: color || '#00758f' }}>
          <path d="M4 14c2-4 6-6 10-5 2 .5 4 2 6 5M6 18c3-2 7-3 12 0" strokeLinecap="round" />
          <circle cx="17" cy="9" r="1.5" fill="currentColor" />
        </svg>
      )

    case 'firebase':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} style={{ color: color || '#f59e0b' }}>
          <path d="M5 18l3.5-12.5L12 12l-7 6z" fill="#f59e0b" fillOpacity="0.6" />
          <path d="M19 18l-5-14-2 8 7 6z" fill="#f59e0b" />
          <path d="M12 12l2-4 5 10H5l7-6z" fill="#fbbf24" fillOpacity="0.4" />
        </svg>
      )

    // --- Cloud & DevOps Icons ---
    case 'docker':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} style={{ color: color || '#0284c7' }}>
          <path d="M3 13.5c1 0 2-.5 3-.5s2 .5 3 .5 2-.5 3-.5 2 .5 3 .5 2-.5 3-.5 2 .5 3 .5c0 4-3.5 7-10 7S2 17.5 3 13.5z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" />
          <rect x="6" y="9.5" width="2" height="2" fill="currentColor" />
          <rect x="9" y="9.5" width="2" height="2" fill="currentColor" />
          <rect x="12" y="9.5" width="2" height="2" fill="currentColor" />
          <rect x="9" y="6.5" width="2" height="2" fill="currentColor" />
          <rect x="12" y="6.5" width="2" height="2" fill="currentColor" />
          <circle cx="17.5" cy="15.5" r="0.8" fill="currentColor" />
        </svg>
      )

    case 'microsoftazure':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} style={{ color: color || '#0078d4' }}>
          <path d="M13 2.5l7 12-4.5 7h-7l2-4 4.5-8L13 2.5z" fill="currentColor" fillOpacity="0.8" />
          <path d="M3.5 17.5L8 9.5l4 7.5H3.5z" fill="currentColor" fillOpacity="0.4" />
        </svg>
      )

    case 'awsec2s3':
    case 'aws':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} style={{ color: color || '#f97316' }}>
          <path d="M12 2.5l8 4.6v9.8L12 21.5l-8-4.6V7.1L12 2.5z" stroke="currentColor" strokeWidth="1.6" fill="currentColor" fillOpacity="0.15" />
          <path d="M4 7.5L12 12l8-4.5M12 12v9.5" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      )

    case 'gitgithub':
    case 'git':
    case 'github':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} style={{ color: color || '#f05032' }}>
          <circle cx="6" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="6" cy="18" r="2.5" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="18" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.6" fill="currentColor" fillOpacity="0.2" />
          <path d="M6 8.5v7M8.5 6h4a4.5 4.5 0 014.5 4.5v0" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      )

    case 'postman':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} style={{ color: color || '#ff6c37' }}>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" fill="currentColor" fillOpacity="0.15" />
          <path d="M8 12h8M13 9l3 3-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )

    case 'knime':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} style={{ color: color || '#facc15' }}>
          <path d="M4 4h16v16H4z" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.6" rx="3" />
          <path d="M8 7v10M16 7l-6 5 6 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )

    case 'n8n':
    case 'n8nworkflowautomation':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} style={{ color: color || '#ea580c' }}>
          <circle cx="6" cy="12" r="3" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="18" cy="7" r="3" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="18" cy="17" r="3" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M9 12h3m0 0l3-5m-3 5l3 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )

    case 'linux':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} style={{ color: color || '#facc15' }}>
          <path d="M12 3a5 5 0 00-5 5v4a5 5 0 0010 0V8a5 5 0 00-5-5z" fill="currentColor" fillOpacity="0.15" />
          <circle cx="10" cy="8" r="1" fill="currentColor" />
          <circle cx="14" cy="8" r="1" fill="currentColor" />
          <path d="M6 14c-1.5 2-1 5 1 6h10c2-1 2.5-4 1-6" />
        </svg>
      )

    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
          <rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" />
          <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.3" />
        </svg>
      )
  }
}
