import { useState } from 'react'
import Sidebar from './components/Sidebar/Sidebar'
import ChatArea from './components/Chat/ChatArea'
import { useChat } from './hooks/useChat'
import { useUpload } from './hooks/useUpload'
import './App.css'

/**
 * Root App component
 * Manages global state and layout
 */
function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const chat = useChat()
  const upload = useUpload()

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const closeSidebar = () => {
    setSidebarOpen(false)
  }

  const handleSendMessage = async (message) => {
    if (!upload.uploadedFile) {
      // Add error message to chat
      chat.addMessage('bot', '❌ No document uploaded yet. Please upload a document first to ask questions.')
      return
    }
    await chat.sendMessage(message)
  }

  return (
    <div className="app">
      {/* Sidebar */}
      <Sidebar
        uploadedFile={upload.uploadedFile}
        isUploading={upload.isUploading}
        uploadError={upload.uploadError}
        onUpload={upload.handleUpload}
        onNewChat={chat.startNewSession}
        sessionId={chat.sessionId}
        messageCount={chat.messages.length}
        isOpen={sidebarOpen}
        onClose={closeSidebar}
      />

      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={closeSidebar} />
      )}

      {/* Main chat area */}
      <ChatArea
        messages={chat.messages}
        isLoading={chat.isLoading}
        chatError={chat.chatError}
        uploadedFile={upload.uploadedFile}
        onSendMessage={handleSendMessage}
        onToggleSidebar={toggleSidebar}
        isSidebarOpen={sidebarOpen}
        onClearChat={chat.clearChat}
      />
    </div>
  )
}

export default App
