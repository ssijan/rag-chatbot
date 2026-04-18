import TopBar from '../UI/TopBar'
import MessageList from './MessageList'
import InputBar from './InputBar'
import TypingIndicator from './TypingIndicator'
import './ChatArea.css'

/**
 * ChatArea component
 * Main chat interface with messages and input
 */
function ChatArea({
  messages,
  isLoading,
  chatError,
  uploadedFile,
  onSendMessage,
  onToggleSidebar,
  isSidebarOpen,
  onClearChat
}) {
  return (
    <div className="chat-area">
      {/* Top Navigation */}
      <TopBar
        uploadedFile={uploadedFile}
        onToggleSidebar={onToggleSidebar}
        isSidebarOpen={isSidebarOpen}
        onClearChat={onClearChat}
        messageCount={messages.length}
      />

      {/* Messages Container */}
      <MessageList
        messages={messages}
        isLoading={isLoading}
        onSendMessage={onSendMessage}
      />

      {/* Typing Indicator */}
      {isLoading && <TypingIndicator />}

      {/* Input Area */}
      <InputBar
        onSend={onSendMessage}
        isLoading={isLoading}
        uploadedFile={uploadedFile}
      />
    </div>
  )
}

export default ChatArea
