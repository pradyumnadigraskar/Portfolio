import os
from typing import Any, Dict, List

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from google import genai  # Google Gen AI SDK

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "").strip()

app = FastAPI(title="Portfolio + Gemini Assistant")

# Serve static assets from /static -> public/
app.mount("/static", StaticFiles(directory="public"), name="static")


# Serve homepage
@app.get("/")
def home():
    return FileResponse("public/index.html")


# OPTIONAL: If you have other pages like main.html, etc.
@app.get("/{page_name}.html")
def serve_pages(page_name: str):
    file_path = f"public/{page_name}.html"
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="Page not found")
    return FileResponse(file_path)


@app.post("/api/chat")
async def chat(payload: Dict[str, Any]):
    """
    Expected JSON:
    {
      "message": "user text",
      "context": "portfolio context string",
      "history": [
        {"role":"user","parts":[{"text":"..."}]},
        {"role":"model","parts":[{"text":"..."}]}
      ]
    }
    """
    if not GEMINI_API_KEY:
        raise HTTPException(status_code=500, detail="Missing GEMINI_API_KEY in environment/.env")

    message = (payload.get("message") or "").strip()
    context = (payload.get("context") or "").strip()
    history = payload.get("history") or []

    if not message:
        raise HTTPException(status_code=400, detail="Message is required")

    system_instruction = (
        "You are an AI assistant for Pradyumna Digraskar's portfolio website.\n"
        "Answer ONLY using the PORTFOLIO CONTEXT below.\n"
        "If something isn't in the context, say you don't know and suggest contacting Pradyumna.\n"
        "Keep answers short and helpful.\n"
    )

    transcript_lines: List[str] = []
    for turn in history[-8:]:  # keep last few turns to reduce token usage
        role = (turn.get("role") or "").strip()
        parts = turn.get("parts") or []
        text = ""
        if isinstance(parts, list) and parts:
            text = (parts[0].get("text") or "").strip()

        if text:
            if role == "user":
                transcript_lines.append(f"User: {text}")
            else:
                transcript_lines.append(f"Assistant: {text}")

    transcript = "\n".join(transcript_lines).strip()

    final_prompt = (
        f"{system_instruction}\n\n"
        f"=== PORTFOLIO CONTEXT ===\n{context}\n\n"
        f"=== CHAT HISTORY ===\n{transcript if transcript else '(none)'}\n\n"
        f"=== USER QUESTION ===\n{message}\n\n"
        f"Answer now:"
    )

    try:
        client = genai.Client(api_key=GEMINI_API_KEY)

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=final_prompt,
        )

        reply_text = (getattr(response, "text", None) or "").strip()
        if not reply_text:
            reply_text = "I couldn't generate a response."

        return JSONResponse({"reply": reply_text})

    except Exception as e:
        err = str(e)

        # Friendly handling for rate-limit/quota issues
        if "RESOURCE_EXHAUSTED" in err or "429" in err:
            return JSONResponse(
                {"reply": "I’m getting a lot of requests right now 😅 Please wait a few seconds and try again."},
                status_code=200
            )

        raise HTTPException(status_code=500, detail=f"Gemini error: {err}")
