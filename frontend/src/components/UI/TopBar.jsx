import './TopBar.css'

/**
 * TopBar component
 * Navigation bar for the chat area
 */
function TopBar({ uploadedFile, onToggleSidebar, isSidebarOpen, onClearChat, messageCount }) {
  const statusText = uploadedFile ? 'Ready' : 'No document'
  const statusDot = uploadedFile ? 'ready' : 'idle'

  const handleClearChat = () => {
    if (messageCount === 0) return
    if (window.confirm('Are you sure you want to delete all chat messages? This cannot be undone.')) {
      onClearChat()
    }
  }

  return (
    <div className="topbar">
      <div className="topbar-left">
        <button
          className="hamburger-btn"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          <span className="material-icons">menu</span>
        </button>
        <h1 className="topbar-title">RAGChat AI</h1>
      </div>

      <div className="topbar-right">
        <div className={`status-indicator ${statusDot}`}>
          <div className="status-dot" />
          <span>{statusText}</span>
        </div>
        {messageCount > 0 && (
          <button
            className="delete-chat-btn"
            onClick={handleClearChat}
            title="Delete all chat messages"
            aria-label="Delete chat"
          >
            <span className="material-icons">delete_outline</span>
          </button>
        )}
      </div>
    </div>
  )
}

export default TopBar
