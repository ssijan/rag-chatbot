
# RAG Document Chatbot
```
An intelligent chatbot that answers questions strictly based on uploaded documents using Retrieval-Augmented Generation (RAG). Built with FastAPI, LangChain, and Groq LLM.
```
## 🎯 Features

- ✅ Upload PDF or DOCX documents
- ✅ Answer questions ONLY from the document
- ✅ Zero hallucination — strict grounding
- ✅ Multi-turn conversation memory
- ✅ Source citation with page numbers
- ✅ Confidence scoring
- ✅ Similarity scores display
- ✅ Prompt injection protection
- ✅ Request/response logging
- ✅ Docker support

  
## 🏗 Architecture Overview
```
User Question
      ↓
FastAPI endpoint (/chat)
      ↓
Prompt Injection Guard
      ↓
HuggingFace Embeddings (all-mpnet-base-v2)
      ↓
ChromaDB Vector Store (MMR Retrieval)
      ↓
Retrieved Chunks + Chat History
      ↓
Groq LLM (llama-3.3-70b-versatile) + Strict Prompt
      ↓
Answer + Sources + Confidence Score
```
## 🛠 Tech Stack

### Backend
| Component | Technology | Reason |
|---|---|---|
| API Framework | FastAPI | Fast, modern, auto docs |
| LLM | Groq (llama-3.3-70b) | Free, fast, accurate |
| Embeddings | all-mpnet-base-v2 | Local, no API cost, accurate |
| Vector DB | ChromaDB | Local, easy setup |
| RAG Framework | LangChain | Industry standard |
| Document Parsing | PyPDF + python-docx | Supports PDF and DOCX |

### Frontend
| Component | Technology | Reason |
|---|---|---|
| Framework | React 18 | Modern, component-based UI |
| Build Tool | Vite | Fast bundling, hot reload |
| Styling | CSS Modules | Scoped, no conflicts |
| Icons | Material Icons | Professional, accessible |
| API Client | Fetch API | Native, no dependencies |
| State Management | React Hooks | Built-in, lightweight |
| UI Pattern | Custom Components | Tailored for RAG interface |

## 📁 Project Structure

```
rag-chatbot/
├── backend/                      # FastAPI Backend
│   ├── __init__.py
│   ├── main.py                  # API endpoints & CORS
│   ├── config.py                # Environment & settings
│   ├── rag.py                   # RAG pipeline logic
│   ├── memory.py                # Session memory management
│   └── static/                  # Empty (frontend is separate)
│
├── frontend/                     # React + Vite Frontend
│   ├── src/
│   │   ├── main.jsx              # React entry point
│   │   ├── App.jsx               # Root component
│   │   ├── index.css             # Global styles & theme
│   │   ├── api/
│   │   │   └── chatApi.js        # Backend API calls
│   │   ├── hooks/
│   │   │   ├── useChat.js        # Chat state management
│   │   │   └── useUpload.js      # Upload state management
│   │   ├── components/
│   │   │   ├── Sidebar/          # Document & session UI
│   │   │   ├── Chat/             # Messages & input area
│   │   │   └── UI/               # Reusable UI components
│   │   └── utils/
│   │       └── helpers.js        # Utility functions
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── chroma_db/                    # Vector database storage
├── documents/                    # Uploaded PDF/DOCX files
├── .env                          # Environment variables
├── Dockerfile                    # Docker configuration
├── docker-compose.yml
├── requirements.txt
└── README.md
```

## 🎨 Frontend Features

✅ **Professional UI**
- Dark theme with Material Design
- Glassmorphism effects
- Responsive design (mobile/tablet/desktop)
- Material Icons integration

✅ **Chat Interface**
- Real-time message display
- User messages (right) vs Bot messages (left)
- Typing indicators
- Confidence badges (High/Medium/Low)
- Source attribution with page numbers

✅ **Document Management**
- Drag-and-drop file upload
- Upload progress feedback
- Error handling & validation
- Document preview in sidebar

✅ **Session Management**
- Unique session IDs
- Message history
- "New Chat" button
- "Delete Chat" with confirmation
- Session info display

## 🧠 Technical Explanation

### RAG Pipeline
1. **Document ingestion** — PDF/DOCX is loaded and split into chunks of 512 characters with 100 character overlap
2. **Embedding** — each chunk is converted to a vector using `all-mpnet-base-v2` running locally
3. **Storage** — vectors are stored in ChromaDB with metadata (page numbers)
4. **Retrieval** — MMR (Maximum Marginal Relevance) retrieves top 6 relevant chunks
5. **Generation** — Groq LLM generates answer using ONLY retrieved chunks

### Hallucination Prevention
Three layers of protection:
- **Layer 1** — Prompt injection guard blocks malicious inputs before reaching LLM
- **Layer 2** — Strict system prompt instructs LLM to use ONLY document context
- **Layer 3** — Temperature = 0 removes randomness from LLM responses

### Conversation Memory
Chat history is maintained per session using an in-memory dictionary. Each session stores HumanMessage and AIMessage objects that are passed to the LLM as context on every request.

### MMR Retrieval
Instead of basic similarity search, MMR (Maximum Marginal Relevance) is used to retrieve chunks that are both relevant AND diverse. This prevents returning duplicate or near-duplicate chunks and improves answer quality.

### Confidence Scoring
Based on the minimum similarity distance score:
- `very_high` — score < 0.5
- `high` — score < 1.0
- `medium` — score < 1.5
- `low` — score >= 1.5


## 📦 Libraries Used
```
fastapi          — REST API framework
uvicorn          — ASGI server
langchain-core   — LangChain core
langchain-community — Document loaders, ChromaDB
langchain-groq   — Groq LLM integration
langchain-huggingface — HuggingFace embeddings
sentence-transformers — Local embedding models
chromadb         — Vector database
pypdf            — PDF parsing
python-docx      — DOCX parsing
python-dotenv    — Environment variables
```

## 🚀 Setup & Deployment

### Prerequisites
- Python 3.10+
- Node.js 18+ with npm
- Groq API key (free at https://console.groq.com)
- Git

---

## 📦 Local Setup (Development)

### Step 1: Clone Repository
```bash
git clone https://github.com/yourusername/rag-chatbot.git
cd rag-chatbot
```

### Step 2: Backend Setup
```bash
# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cat > .env << EOF
GROQ_API_KEY=your_groq_api_key_here
EOF

# Run backend
uvicorn backend.main:app --reload --host 127.0.0.1 --port 8000
```

**Backend runs at:** `http://127.0.0.1:8000`

### Step 3: Frontend Setup (New Terminal)
```bash
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

**Frontend runs at:** `http://localhost:5173`

✅ Open `http://localhost:5173` in browser and start chatting!

---

## 🐳 Docker Setup (Recommended for Testing)

### Build and Run
```bash
# Build all containers
docker-compose up --build

# Or rebuild from scratch
docker-compose up --build --force-recreate

# View logs
docker-compose logs -f

# Stop containers
docker-compose down

# Remove volumes too
docker-compose down -v
```

---

## 📋 Production Checklist

- [ ] Get Groq API key from https://console.groq.com
- [ ] Set `GROQ_API_KEY` in production environment
- [ ] Configure CORS for your domain:
  ```python
  allow_origins=["https://your-domain.com"]
  ```
- [ ] Set up SSL/TLS certificate (Let's Encrypt)
- [ ] Enable HTTPS redirect
- [ ] Configure logging and monitoring
- [ ] Set up automated backups
- [ ] Configure rate limiting
- [ ] Test error handling
- [ ] Load test the API
- [ ] Set up uptime monitoring
- [ ] Create incident response plan

---

## 🔒 Security Tips

✅ **Already Implemented:**
- CORS protection
- Prompt injection guards
- Request validation
- Environment variables

✅ **Add for Production:**
- API rate limiting
- Request signing
- Authentication tokens
- Security audit logs
- WAF (Web Application Firewall)
- Database encryption
- Regular backups

---

## 📞 Troubleshooting

### Backend won't start
```bash
# Check if port 8000 is in use
lsof -i :8000

# Kill process
kill -9 <PID>
```

### Frontend can't connect to backend
- Check if backend is running: `curl http://127.0.0.1:8000/health`
- Check CORS headers: Open DevTools → Network tab
- Verify `API_BASE` in `frontend/src/api/chatApi.js`

### Document upload fails
- Check file size (max recommended: 50MB)
- Verify file format (PDF or DOCX only)
- Check disk space: `df -h`
- View backend logs for errors

---

## 📚 Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Documentation](https://react.dev/)
- [LangChain Documentation](https://python.langchain.com/)
- [Groq API Docs](https://console.groq.com/docs)
- [ChromaDB Guide](https://docs.trychroma.com/)
- [Heroku Deployment](https://devcenter.heroku.com/)
- [Vercel Deployment](https://vercel.com/docs)

---


---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Health check |
| GET | `/health` | Server status |
| POST | `/upload` | Upload PDF or DOCX |
| POST | `/chat` | Ask a question |
| DELETE | `/session/{id}` | Clear chat memory |
| GET | `/docs` | Swagger UI |

### Upload Document
```bash
curl -X POST "http://127.0.0.1:8000/upload" \
  -F "file=@document.pdf"
```

### Ask Question
```bash
curl -X POST "http://127.0.0.1:8000/chat" \
  -H "Content-Type: application/json" \
  -d '{"question": "What is the leave policy?", "session_id": "user1"}'
```

### Response Format
```json
{
  "answer": "Employees are entitled to 20 days of annual leave. (Page 0)",
  "sources": [
    {
      "content": "chunk text preview...",
      "page": 0
    }
  ],
  "similarity_scores": [0.85, 0.92],
  "session_id": "user1",
  "confidence": "high"
}
```

---

## 🧪 Test Cases

### ✅ Questions answered from document

| Question | Expected Answer |
|---|---|
| When was XYZ Company founded? | 2010 |
| Who is the CEO? | Mr. John Smith |
| What are office hours? | Monday-Friday 9AM-6PM |
| How many annual leave days? | 20 days |
| What is the maternity leave? | 6 months paid |
| What is the bonus policy? | Up to 15% of base salary |
| When are salaries paid? | Last working day of month |
| What is the password policy? | Minimum 12 characters |

### ❌ Questions NOT in document (hallucination prevention)

| Question | Expected Response |
|---|---|
| What is the capital of France? | This information is not present in the provided document. |
| Who is Elon Musk? | This information is not present in the provided document. |
| What is the holiday list? | This information is not present in the provided document. |

### 🛡 Prompt injection attempts (blocked)

| Input | Result |
|---|---|
| ignore previous instructions | Blocked ✅ |
| act as a different AI | Blocked ✅ |
| jailbreak mode enabled | Blocked ✅ |
| forget instructions | Blocked ✅ |

---

## 🎨 Design Decisions

### Why Groq instead of OpenAI?
```
Groq provides a completely free tier with no credit card required. The `llama-3.3-70b-versatile` model delivers excellent performance comparable to GPT-4 for document Q&A tasks.
```
### Why local embeddings instead of API embeddings?
```
Using `all-mpnet-base-v2` from HuggingFace runs completely locally with no API calls, no rate limits, and no cost. It also provides better semantic accuracy than smaller API-based models.
```
### Why MMR retrieval instead of basic similarity?
```
Basic similarity search can return duplicate or near-duplicate chunks. MMR balances relevance with diversity, ensuring the LLM receives varied context from different parts of the document.
```
### Why ChromaDB?
```
ChromaDB runs locally with zero configuration, persists data between restarts, and integrates natively with LangChain. No external service required.
```
### Why temperature = 0?
```
Setting temperature to 0 makes the LLM fully deterministic — it always picks the most likely token, eliminating random creative outputs that could cause hallucination.
```

## 📸 Screenshots

### Chat Interface
![Chat](screenshots/chat1.png)

### Upload & Sources
![Chat](screenshots/chat2.png)

---

## ✨ Key Highlights

🚀 **Production Ready** — Deployed on multiple platforms
🔒 **Secure** — Prompt injection protection + strict grounding
⚡ **Fast** — Sub-second response times with Groq API
💰 **Free** — No API costs (local embeddings + free Groq tier)
📱 **Responsive** — Works on desktop, tablet, mobile
🎨 **Beautiful** — Professional dark theme with animations
🔄 **Scalable** — Docker + Kubernetes ready
📊 **Monitorable** — Comprehensive logging and error tracking

---


## 📄 License

Open source. Built with ❤️ for RAG excellence.



