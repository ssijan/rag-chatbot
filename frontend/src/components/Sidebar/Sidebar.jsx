import UploadZone from './UploadZone'
import SessionInfo from './SessionInfo'
import './Sidebar.css'

/**
 * Sidebar component
 * Contains document upload, session info, and chat controls
 */
function Sidebar({
  uploadedFile,
  isUploading,
  uploadError,
  onUpload,
  onNewChat,
  sessionId,
  messageCount,
  isOpen,
  onClose
}) {
  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      {/* Header */}
      <div className="sidebar-header">
        <div className="logo-icon">
          <span className="material-icons">chat</span>
        </div>
        <div className="logo-text">
          <h1>RAGChat AI</h1>
          <p>Powered by RAG</p>
        </div>
      </div>

      {/* Upload Zone */}
      <UploadZone
        onUpload={onUpload}
        uploadedFile={uploadedFile}
        isUploading={isUploading}
        uploadError={uploadError}
      />

      <div className="divider" />

      {/* Session Info */}
      <SessionInfo
        sessionId={sessionId}
        messageCount={messageCount}
        onNewSession={onNewChat}
      />

      {/* About Section */}
      <div className="sidebar-footer">
        <div className="about-section">
          <h3>About RAGChat</h3>
          <p>
            An intelligent AI chatbot powered by Retrieval-Augmented Generation (RAG). Upload your documents and ask questions - the chatbot will answer based on the content with source attribution and confidence scoring.
          </p>
          <ul className="features-list">
            <li>📄 Supports PDF & DOCX</li>
            <li>🎯 Zero hallucination</li>
            <li>📍 Source attribution</li>
            <li>⚡ Instant answers</li>
          </ul>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
