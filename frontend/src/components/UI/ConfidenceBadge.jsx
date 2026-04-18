import { formatConfidenceText } from '../../utils/helpers'
import './ConfidenceBadge.css'

/**
 * ConfidenceBadge component
 * Displays confidence level with appropriate icon and color
 */
function ConfidenceBadge({ confidence }) {
  const getIcon = () => {
    switch (confidence) {
      case 'very_high':
        return 'verified'
      case 'high':
        return 'thumb_up'
      case 'medium':
        return 'info'
      case 'low':
        return 'warning'
      default:
        return 'help'
    }
  }

  return (
    <div className={`confidence-badge confidence-${confidence.replace('_', '-')}`}>
      <span className="material-icons">{getIcon()}</span>
      <span>{formatConfidenceText(confidence)} Confidence</span>
    </div>
  )
}

export default ConfidenceBadge
