# AI-First CRM  HCP Log Interaction Module

## Overview
This project is a prototype for an AI-first CRM module designed for healthcare sales representatives. It demonstrates a dual-mode interaction logging system:
1.  **Form Mode**: Traditional structured data entry.
2.  **Chat Mode**: AI-driven conversational entry where natural language is parsed and structured automatically.

## Tech Stack
-   **Frontend**: React
-   **Backend**: FastAPI (Python)
-   **AI Agent**: Simulated LangGraph Agent
-   **Tools**: Custom Python tools for Logging, Summarizing, and Compliance.

## Key Features
-   **Conversational Logging**: Reps can type notes in natural language, and the AI extracts entities like HCP name, topic, and next steps.
-   **LangGraph Agent Design**: The backend simulates an agentic workflow that manages tool execution.
-   **Mandatory Tools**:
    1.  `log_interaction`: Persists structured data (simulated).
    2.  `edit_interaction`: Modifies existing records (simulated).
    3.  `summarize_interaction`: Generates concise interaction summaries.
    4.  `next_best_action`: Recommends follow-up tasks.
    5.  `compliance_check`: Validates the interaction against regulatory norms.

## Architecture
`React UI`  `FastAPI`  `LangGraph Agent`  `Tools`

## Project Structure
-   `frontend/`: React application.
-   `backend/`: FastAPI application containing the agent logic and tools.

## Setup and Running

### Prerequisites
- Python 3.8+
- Node.js & npm

### Step 1: Start the Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```
The backend will run at `http://localhost:8000`.

### Step 2: Start the Frontend
```bash
cd frontend
npm start
```
The frontend will run at `http://localhost:3000`.

## Video Demo Talking Points
-   "This module showcases an AI-first approach to CRM data entry."
-   "The LangGraph agent acts as the brain, identifying the user's intent and calling the appropriate tools automatically."
-   "In chat mode, we use an LLM-driven process to extract structured information from messy field notes, increasing rep productivity and data quality."
-   "The five integrated tools ensure that every log is summarized, compliant, and actionable."
