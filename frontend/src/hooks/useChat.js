import { useState, useEffect } from 'react'
import { sendMessage, clearSession } from '../api/chatApi'
import { generateUUID, formatTime } from '../utils/helpers'

/**
 * Custom hook for chat functionality
 */
export function useChat() {
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [chatError, setChatError] = useState(null)
  const [sessionId, setSessionId] = useState('')

  // Initialize session on mount
  useEffect(() => {
    setSessionId(generateUUID())
  }, [])

  const addMessage = (role, content, metadata = {}) => {
    const message = {
      id: generateUUID(),
      role,
      content,
      timestamp: new Date(),
      ...metadata
    }
    setMessages(prev => [...prev, message])
    return message
  }

  const sendUserMessage = async (question) => {
    if (!question.trim()) return

    // Add user message immediately
    addMessage('user', question.trim())
    setIsLoading(true)
    setChatError(null)

    try {
      const response = await sendMessage(question, sessionId)
      
      // Add bot response with metadata
      addMessage('bot', response.answer, {
        sources: response.sources || [],
        similarity_scores: response.similarity_scores || [],
        confidence: response.confidence || 'medium'
      })
    } catch (error) {
      setChatError(error.message || 'Failed to get response')
      // Add error message to chat
      addMessage('bot', `Error: ${error.message || 'Unable to get a response. Please try again.'}`)
    } finally {
      setIsLoading(false)
    }
  }

  const clearChat = async () => {
    try {
      await clearSession(sessionId)
      setMessages([])
      setChatError(null)
      // Generate new session ID
      setSessionId(generateUUID())
    } catch (error) {
      setChatError(error.message || 'Failed to clear chat')
    }
  }

  const startNewSession = () => {
    setMessages([])
    setChatError(null)
    setSessionId(generateUUID())
  }

  return {
    messages,
    isLoading,
    chatError,
    sessionId,
    addMessage,
    sendMessage: sendUserMessage,
    clearChat,
    startNewSession
  }
}
