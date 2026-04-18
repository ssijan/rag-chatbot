import { useEffect, useRef } from 'react'
import MessageBubble from './MessageBubble'
import './MessageList.css'

/**
 * MessageList component
 * Displays chat messages with auto-scroll
 */
function MessageList({ messages, isLoading, onSendMessage }) {
  const containerRef = useRef(null)

  // Auto-scroll to bottom
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [messages, isLoading])

  const exampleQuestions = [
    "What is the leave policy?",
    "Who is the CEO?",
    "What are the working hours?",
    "What is the salary structure?"
  ]

  const handleExampleClick = (question) => {
    if (onSendMessage) {
      onSendMessage(question)
    }
  }

  return (
    <div className="message-list" ref={containerRef} role="log">
      {messages.length === 0 ? (
        <div className="welcome-screen">
          <span className="material-icons welcome-icon">smart_toy</span>
          <h2>Hello! I am RAGChat AI</h2>
          <p>Upload a document and start asking questions about its content.</p>

          <div className="example-questions">
            {exampleQuestions.map((q, idx) => (
              <button
                key={idx}
                className="example-chip"
                onClick={() => handleExampleClick(q)}
              >
                <span className="material-icons">question_mark</span>
                {q}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="messages-container">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
        </div>
      )}
    </div>
  )
}

export default MessageList
