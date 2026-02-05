from fastapi import FastAPI
from pydantic import BaseModel
from langgraph_agent import langgraph_agent
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="AI-First CRM API")

# Enable CORS so the React frontend can call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

from typing import List, Optional

class Interaction(BaseModel):
    hcpName: str
    interactionType: str
    date: str
    time: str
    attendees: str
    topics: str
    materialsShared: List[str]
    samplesDistributed: List[str]
    sentiment: str
    outcomes: str
    followUpActions: str
    suggestedFollowUps: List[str]

class ChatRequest(BaseModel):
    message: str

@app.get("/")
def read_root():
    return {"message": "AI-First CRM Backend is running!"}

@app.get("/hcps")
def get_hcps():
    return ["Dr. Kumar", "Dr. Sharma", "Dr. Patel", "Dr. Gupta"]

@app.get("/materials")
def get_materials():
    return ["OncoBoost Phase III PDF", "VaxFix Brochure", "CardioCare Samples"]

@app.post("/chat")
def chat(req: ChatRequest):
    # Route the message to the simulated LangGraph agent
    return langgraph_agent(req.message)

@app.post("/log-interaction")
def log_interaction_endpoint(interaction: Interaction):
    print(f"Logging interaction: {interaction}")
    return {"status": "success", "message": "Interaction logged successfully"}
