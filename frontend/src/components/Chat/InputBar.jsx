import { useEffect, useRef, useState } from 'react'
import './InputBar.css'

/**
 * InputBar component
 * Text input with send button
 */
function InputBar({ onSend, isLoading, uploadedFile }) {
  const [value, setValue] = useState('')
  const textareaRef = useRef(null)

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      const height = Math.min(textareaRef.current.scrollHeight, 120)
      textareaRef.current.style.height = height + 'px'
    }
  }, [value])

  const handleSend = () => {
    if (value.trim() && !isLoading) {
      onSend(value)
      setValue('')
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const canSend = value.trim().length > 0 && !isLoading

  return (
    <div className="input-area">
      <div className="input-wrapper">
        <div className="textarea-wrapper">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a question about your document..."
            maxLength={500}
            rows={1}
            disabled={isLoading}
          />

          <div className="input-actions">
            <span className="char-counter">
              {value.length}/500
            </span>
            <button
              className="send-btn"
              onClick={handleSend}
              disabled={!canSend}
              title="Send message (Enter)"
              aria-label="Send message"
            >
              <span className="material-icons">send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InputBar
