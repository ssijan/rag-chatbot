/**
 * API integration for RAGChat backend
 */

const API_BASE = 'http://127.0.0.1:8000'

/**
 * Upload a document file to the backend
 * @param {File} file - The PDF or DOCX file to upload
 * @returns {Promise} Response with filename, chunks, and message
 */
export async function uploadDocument(file) {
  try {
    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch(`${API_BASE}/upload`, {
      method: 'POST',
      body: formData
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Upload failed')
    }

    return await response.json()
  } catch (error) {
    console.error('Upload error:', error)
    throw error
  }
}

/**
 * Send a message/question to the chatbot
 * @param {string} question - The user's question
 * @param {string} sessionId - The session ID
 * @returns {Promise} Response with answer, sources, scores, confidence
 */
export async function sendMessage(question, sessionId) {
  try {
    const response = await fetch(`${API_BASE}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        question,
        session_id: sessionId
      })
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Failed to get response')
    }

    return await response.json()
  } catch (error) {
    console.error('Chat error:', error)
    throw error
  }
}

/**
 * Clear session memory on the backend
 * @param {string} sessionId - The session ID to clear
 * @returns {Promise} Response confirming deletion
 */
export async function clearSession(sessionId) {
  try {
    const response = await fetch(`${API_BASE}/session/${sessionId}`, {
      method: 'DELETE'
    })

    if (!response.ok) {
      throw new Error('Failed to clear session')
    }

    return await response.json()
  } catch (error) {
    console.error('Clear session error:', error)
    throw error
  }
}
