import './TypingIndicator.css'

/**
 * TypingIndicator component
 * Shows bot is thinking
 */
function TypingIndicator() {
  return (
    <div className="typing-indicator-wrapper">
      <div className="message-avatar typing">
        <span className="material-icons">smart_toy</span>
      </div>

      <div className="typing-indicator">
        <div className="typing-dot" />
        <div className="typing-dot" />
        <div className="typing-dot" />
      </div>

      <p className="typing-text">DocChat AI is thinking...</p>
    </div>
  )
}

export default TypingIndicator
