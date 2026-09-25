import { ArrowDownToLine } from 'lucide-react'
import { site } from '../../data/site'
import Button from './Button'

/**
 * Two access points for this: the nav overlay and the footer. Same component,
 * so the file path only has to be right in one place (data/site.js).
 */
export default function ResumeDownloadButton({ variant = 'secondary', className = '' }) {
  return (
    <Button
      as="a"
      href={site.resumeUrl}
      download
      variant={variant}
      icon={ArrowDownToLine}
      iconClass="group-hover:translate-y-0.5 group-focus-visible:translate-y-0.5"
      className={className}
    >
      Download résumé
    </Button>
  )
}
