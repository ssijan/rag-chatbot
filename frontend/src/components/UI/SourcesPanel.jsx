import { useState } from 'react'
import { truncateText, getScoreColor } from '../../utils/helpers'
import './SourcesPanel.css'

/**
 * SourcesPanel component
 * Displays retrieved sources and their similarity scores
 */
function SourcesPanel({ sources, similarity_scores }) {
  const [isExpanded, setIsExpanded] = useState(false)

  if (!sources || sources.length === 0) return null

  return (
    <div className="sources-panel">
      <button
        className="sources-header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="sources-title">
          <span className="material-icons">source</span>
          <span>Sources ({sources.length})</span>
        </div>
        <span className={`material-icons toggle-icon ${isExpanded ? 'expanded' : ''}`}>
          expand_more
        </span>
      </button>

      {isExpanded && (
        <div className="sources-content">
          {sources.map((source, idx) => (
            <div key={idx} className="source-card">
              <div className="source-header">
                <span className="material-icons">description</span>
                <span>Page {source.page + 1}</span>
              </div>

              <p className="source-content">
                {truncateText(source.content, 200)}
              </p>

              {similarity_scores && similarity_scores[idx] !== undefined && (
                <div className="similarity-score">
                  <label>Similarity Score</label>
                  <div className="score-bar-wrapper">
                    <div className="score-bar">
                      <div
                        className="score-fill"
                        style={{
                          width: `${Math.min(((2 - Math.min(similarity_scores[idx], 2)) / 2) * 100, 100)}%`,
                          backgroundColor: getScoreColor(similarity_scores[idx])
                        }}
                      />
                    </div>
                    <span className="score-value">
                      {Math.round(((2 - Math.min(similarity_scores[idx], 2)) / 2) * 100)}%
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SourcesPanel
