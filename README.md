
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
```
---
```
## 🏗 Architecture Overview


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
```
---
## 🛠 Tech Stack

| Component | Technology | Reason |
|---|---|---|
| API Framework | FastAPI | Fast, modern, auto docs |
| LLM | Groq (llama-3.3-70b) | Free, fast, accurate |
| Embeddings | all-mpnet-base-v2 | Local, no API cost, accurate |
| Vector DB | ChromaDB | Local, easy setup |
| RAG Framework | LangChain | Industry standard |
| Document Parsing | PyPDF + python-docx | Supports PDF and DOCX |

```
```
## 🧠 Technical Explanation
```
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

---
```
## 📦 Libraries Used

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

---

## 🚀 Setup and Run

### Prerequisites
- Python 3.10+
- Groq API key (free at https://console.groq.com)

### Installation

#### 1. Clone the repository
```bash
git clone https://github.com/yourusername/rag-chatbot.git
cd rag-chatbot
```

#### 2. Create virtual environment
```bash
python3 -m venv venv
source venv/bin/activate
```

#### 3. Install dependencies
```bash
pip install -r requirements.txt
```

#### 4. Set up environment variables
```bash
cp .env.example .env
```
Edit `.env` and add your Groq API key:
```
GROQ_API_KEY=your_groq_api_key_here
```

#### 5. Run the server
```bash
uvicorn app.main:app --reload
```

Server runs at `http://127.0.0.1:8000`

---

## 🐳 Docker Setup

```bash
docker-compose up --build
```

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
Groq provides a completely free tier with no credit card required. The `llama-3.3-70b-versatile` model delivers excellent performance comparable to GPT-4 for document Q&A tasks.

### Why local embeddings instead of API embeddings?
Using `all-mpnet-base-v2` from HuggingFace runs completely locally with no API calls, no rate limits, and no cost. It also provides better semantic accuracy than smaller API-based models.

### Why MMR retrieval instead of basic similarity?
Basic similarity search can return duplicate or near-duplicate chunks. MMR balances relevance with diversity, ensuring the LLM receives varied context from different parts of the document.

### Why ChromaDB?
ChromaDB runs locally with zero configuration, persists data between restarts, and integrates natively with LangChain. No external service required.

### Why temperature = 0?
Setting temperature to 0 makes the LLM fully deterministic — it always picks the most likely token, eliminating random creative outputs that could cause hallucination.

---

## ⏱ Estimated Development Time

| Task | Time |
|---|---|
| Project setup and architecture | 1 hour |
| Document loader and chunker | 1 hour |
| Embeddings and ChromaDB | 1 hour |
| RAG chain and hallucination guard | 2 hours |
| Conversation memory | 1 hour |
| FastAPI endpoints | 1.5 hours |
| MMR retrieval and confidence scoring | 1 hour |
| Docker setup | 30 minutes |
| Testing and debugging | 2 hours |
| README and documentation | 1 hour |
| **Total** | **~12 hours** |

---

## 📸 Screenshots

### API Documentation (Swagger UI)
![Swagger UI](screenshots/swagger.png)

### Upload Document
![Upload](screenshots/upload.png)

### Chat Response
![Chat](screenshots/chat.png)

---

## 👨‍💻 Author
Built as a technical assessment for AI Backend Engineer position.
```

---

## Create `.env.example` file
```bash
nano .env.example
```

Paste:
```
GROQ_API_KEY=your_groq_api_key_here
```
Save with `CTRL+X` → `Y` → `Enter`

---

## Take screenshots for README

```bash
mkdir screenshots
```
