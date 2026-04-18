import { useState } from 'react'
import { uploadDocument } from '../api/chatApi'
import { formatFileSize } from '../utils/helpers'

/**
 * Custom hook for document upload functionality
 */
export function useUpload() {
  const [uploadedFile, setUploadedFile] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState(null)

  const handleUpload = async (file) => {
    // Validate file type
    if (!file.name.match(/\.(pdf|docx)$/i)) {
      setUploadError('Only PDF and DOCX files are supported')
      return
    }

    setIsUploading(true)
    setUploadError(null)

    try {
      const result = await uploadDocument(file)
      const fileSize = file.size

      setUploadedFile({
        name: result.filename || file.name,
        chunks: result.chunks,
        size: formatFileSize(fileSize)
      })
    } catch (error) {
      setUploadError(error.message || 'Failed to upload document')
      setUploadedFile(null)
    } finally {
      setIsUploading(false)
    }
  }

  const resetUpload = () => {
    setUploadedFile(null)
    setUploadError(null)
  }

  return {
    uploadedFile,
    isUploading,
    uploadError,
    handleUpload,
    resetUpload
  }
}
