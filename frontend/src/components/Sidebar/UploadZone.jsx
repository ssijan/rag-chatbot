import { useRef, useState } from 'react'
import './UploadZone.css'

/**
 * UploadZone component
 * Handles file upload with drag and drop support
 */
function UploadZone({ onUpload, uploadedFile, isUploading, uploadError }) {
  const fileInputRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      onUpload(file)
    }
    e.target.value = ''
  }

  const handleDragEnter = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const file = e.dataTransfer?.files?.[0]
    if (file) {
      onUpload(file)
    }
  }

  return (
    <div className="upload-zone-container">
      <p className="section-label">DOCUMENT</p>

      {!uploadedFile && !uploadError && (
        <div
          className={`upload-zone ${isDragging ? 'dragging' : ''}`}
          onClick={handleClick}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {isUploading ? (
            <>
              <div className="loading-spinner" />
              <p className="upload-text">Processing document...</p>
            </>
          ) : (
            <>
              <span className="material-icons upload-icon">cloud_upload</span>
              <p className="upload-text">
                <strong>Drop PDF or DOCX here</strong>
                <br />
                or click to browse
              </p>
            </>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />
        </div>
      )}

      {uploadError && (
        <div className="upload-error">
          <span className="material-icons">error</span>
          <div>
            <p className="error-title">Upload failed</p>
            <p className="error-message">{uploadError}</p>
          </div>
        </div>
      )}

      {uploadedFile && !uploadError && (
        <div className="upload-success">
          <div className="success-icon">
            <span className="material-icons">check_circle</span>
          </div>
          <div className="success-content">
            <p className="file-name">
              <span className="material-icons">description</span>
              {uploadedFile.name}
            </p>
            <p className="file-meta">
              {uploadedFile.chunks} chunks • {uploadedFile.size}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default UploadZone
