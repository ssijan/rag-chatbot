from dotenv import load_dotenv
import os

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
CHROMA_DB_PATH = "./chroma_db"
DOCUMENTS_PATH = "./documents"
CHUNK_SIZE = 512
CHUNK_OVERLAP = 100
TOP_K_RESULTS = 6
MODEL_NAME = "llama-3.3-70b-versatile"
EMBEDDING_MODEL = "all-mpnet-base-v2"