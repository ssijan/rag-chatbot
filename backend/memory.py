from backend.rag import chat_histories

def get_memory(session_id: str):
    if session_id not in chat_histories:
        chat_histories[session_id] = []
    return chat_histories[session_id]

def clear_memory(session_id: str):
    if session_id in chat_histories:
        del chat_histories[session_id]