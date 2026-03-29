import os
import logging
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.rag import process_document, get_answer
from app.memory import clear_memory
from app.config import DOCUMENTS_PATH

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="RAG Document Chatbot")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)


class ChatRequest(BaseModel):
    question: str
    session_id: str = "default"


class ChatResponse(BaseModel):
    answer: str
    sources: list
    similarity_scores: list
    session_id: str
    confidence: str


@app.get("/")
def root():
    return {"message": "RAG Document Chatbot is running!"}


@app.post("/upload")
async def upload_document(file: UploadFile = File(...)):
    if not file.filename.endswith((".pdf", ".docx")):
        raise HTTPException(
            status_code=400,
            detail="Only PDF and DOCX files are supported"
        )
    os.makedirs(DOCUMENTS_PATH, exist_ok=True)
    file_path = os.path.join(DOCUMENTS_PATH, file.filename)

    with open(file_path, "wb") as f:
        content = await file.read()
        f.write(content)

    logger.info(f"Uploaded file: {file.filename}")
    chunks = process_document(file_path)

    return {
        "message": "Document processed successfully",
        "filename": file.filename,
        "chunks": chunks
    }


@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    if not request.question.strip():
        raise HTTPException(
            status_code=400,
            detail="Question cannot be empty"
        )
    logger.info(f"Incoming question: {request.question} | Session: {request.session_id}")
    result = get_answer(request.question, request.session_id)

    return ChatResponse(
        answer=result["answer"],
        sources=result["sources"],
        similarity_scores=result["similarity_scores"],
        session_id=request.session_id,
        confidence=result["confidence"]
    )


@app.delete("/session/{session_id}")
def clear_session(session_id: str):
    clear_memory(session_id)
    return {"message": f"Session {session_id} cleared"}


@app.get("/health")
def health():
    return {"status": "ok"}