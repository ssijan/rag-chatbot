# RAGChat AI Frontend

Professional React + Vite frontend for the RAG Document Chatbot.

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Chat/           # Chat interface components
│   │   ├── Sidebar/        # Sidebar components  
│   │   └── UI/             # Reusable UI components
│   ├── hooks/              # Custom React hooks
│   ├── api/                # API integration
│   ├── utils/              # Helper utilities
│   ├── App.jsx             # Root component
│   ├── App.css
│   ├── main.jsx
│   └── index.css           # Global styles
├── index.html
├── vite.config.js
└── package.json
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
cd frontend
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## Features

- **Material Icons** - Google Fonts Material Icons integration
- **Dark Professional Theme** - Modern design with dark color scheme
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Real-time Chat** - WebSocket-free polling with FastAPI backend
- **Document Upload** - Drag and drop PDF/DOCX upload
- **Session Management** - Unique session IDs for conversation memory
- **Source Citation** - View sources and similarity scores
- **Confidence Badges** - Color-coded confidence levels
- **Auto-scroll** - Messages auto-scroll to bottom
- **Accessibility** - ARIA labels and keyboard navigation

## API Integration

The frontend connects to the FastAPI backend at `http://127.0.0.1:8000`.

API endpoints used:
- `POST /upload` - Upload document
- `POST /chat` - Send question
- `DELETE /session/{session_id}` - Clear session

## Component Architecture

### Custom Hooks
- `useChat()` - Chat state and message handling
- `useUpload()` - Upload state and file handling

### Main Components
- `App` - Root layout and state management
- `Sidebar` - Document upload and session info
- `ChatArea` - Main chat interface
- `MessageList` - Message display with auto-scroll
- `MessageBubble` - Individual message with metadata
- `InputBar` - Message input with send button
- `ConfidenceBadge` - Confidence level indicator
- `SourcesPanel` - Collapsible sources display

## Styling

All styling uses CSS modules (ComponentName.css). CSS variables defined in `src/index.css` for consistent theming:

- `--bg-primary`, `--bg-secondary`, `--bg-tertiary`
- `--accent-primary`, `--accent-success`, `--accent-warning`, `--accent-danger`
- `--text-primary`, `--text-secondary`
- `--border-color`, `--border-radius`, `--border-radius-lg`

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Performance

- Responsive lazy loading
- Optimized re-renders with React hooks
- CSS animations for smooth transitions
- Efficient message rendering

## Accessibility

- ARIA labels on interactive elements
- Keyboard navigation support
- High contrast dark theme
- Focus management

## License

MIT
