import { useState } from 'react'
import './SessionInfo.css'

/**
 * SessionInfo component
 * Displays current session ID and message count
 */
function SessionInfo({ sessionId, messageCount, onNewSession }) {
  const [showFullId, setShowFullId] = useState(false)

  const displayId = showFullId ? sessionId : sessionId.substring(0, 8) + '...'

  return (
    <div className="session-info">
      <p className="section-label">SESSION</p>

      <div className="session-card">
        <div className="session-row">
          <div className="session-label">
            <span className="material-icons">person</span>
            Session ID
          </div>
          <button
            className="session-id-btn"
            onClick={() => setShowFullId(!showFullId)}
            title={sessionId}
          >
            {displayId}
          </button>
        </div>

        <div className="session-row">
          <div className="session-label">
            <span className="material-icons">chat_bubble</span>
            Messages
          </div>
          <span className="message-count">{messageCount}</span>
        </div>
      </div>

      <button className="btn-refresh" onClick={onNewSession} title="Start new session">
        <span className="material-icons">refresh</span>
        New Session
      </button>
    </div>
  )
}

export default SessionInfo
