import { formatTime } from '../../utils/helpers'
import ConfidenceBadge from '../UI/ConfidenceBadge'
import SourcesPanel from '../UI/SourcesPanel'
import './MessageBubble.css'

/**
 * MessageBubble component
 * Individual message display with metadata
 */
function MessageBubble({ message }) {
  const isUser = message.role === 'user'
  const timestamp = formatTime(message.timestamp)

  return (
    <div className={`message-bubble-wrapper ${isUser ? 'user' : 'bot'}`}>
      {!isUser && (
        <div className="message-avatar">
          <span className="material-icons">smart_toy</span>
        </div>
      )}

      <div className="message-bubble-content">
        <div className={`message-bubble ${isUser ? 'user' : 'bot'}`}>
          <p className="message-text">{message.content}</p>
        </div>

        <div className="message-meta">
          <span className="message-time">{timestamp}</span>
        </div>

        {!isUser && (
          <div className="message-details">
            {message.confidence && (
              <ConfidenceBadge confidence={message.confidence} />
            )}

            {message.sources && message.sources.length > 0 && (
              <SourcesPanel
                sources={message.sources}
                similarity_scores={message.similarity_scores}
              />
            )}
          </div>
        )}
      </div>

      {isUser && (
        <div className="message-avatar user">
          <span className="material-icons">person</span>
        </div>
      )}
    </div>
  )
}

export default MessageBubble
