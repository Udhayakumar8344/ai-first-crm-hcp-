import datetime
import re
from tools import (
    log_interaction,
    edit_interaction,
    summarize_interaction,
    next_best_action,
    compliance_check
)

def langgraph_agent(message: str):
    """
    Simulated LangGraph agent for extracting CRM data from chat.
    """
    print(f"LangGraph Agent processing: {message}")
    msg_lower = message.lower()
    
    # 🔍 Extraction Logic (Simulated)
    
    # 1. Extract HCP Name
    hcp_match = re.search(r"dr\.\s?([a-z]+)", msg_lower)
    hcp = hcp_match.group(0).title() if hcp_match else "Dr. Kumar"
    
    # 2. Extract Interaction Type
    interaction_type = "Meeting"
    if "call" in msg_lower: interaction_type = "Call"
    elif "visit" in msg_lower: interaction_type = "Visit"
    elif "email" in msg_lower: interaction_type = "Email"

    # 3. Extract Sentiment
    sentiment = "Neutral"
    if any(word in msg_lower for word in ["positive", "good", "great", "excellent", "happy", "satisfied"]):
        sentiment = "Positive"
    elif any(word in msg_lower for word in ["negative", "bad", "poor", "unhappy", "difficult", "complain"]):
        sentiment = "Negative"

    # 4. Extract Topics & Product Mentions
    topic = "General Inquiry"
    materials = []
    samples = []
    
    if "diabetes" in msg_lower: topic = "Diabetes Management"
    if "vaxfix" in msg_lower: 
        topic = "VaxFix Vaccine Discussion"
        samples.append("VaxFix Sample Pack")
    if "oncoboost" in msg_lower:
        topic = "OncoBoost Oncology Study"
        materials.append("OncoBoost Phase III PDF")
    if "brochure" in msg_lower:
        materials.append("Product Brochure")

    # 5. Extract Follow-ups & Outcomes
    outcome = "Information shared and discussed."
    if "agreed" in msg_lower or "outcome" in msg_lower:
        outcome = "Agreed on next steps as discussed."
    
    follow_up = "TBD"
    if "follow up" in msg_lower or "next week" in msg_lower:
        follow_up = "Follow up scheduled for next week."
    elif "send" in msg_lower:
        follow_up = "Send requested materials to HCP."

    # 6. Suggested Follow-ups (Static but contextual)
    suggestions = [
        f"Schedule follow-up {interaction_type.lower()} in 2 weeks",
        f"Verify receipt of {materials[0]}" if materials else "Send OncoBoost Phase III Clinical Data",
        f"Update {hcp}'s preference profile"
    ]

    extracted = {
        "hcpName": hcp,
        "interactionType": interaction_type,
        "date": datetime.date.today().strftime("%Y-%m-%d"),
        "time": datetime.datetime.now().strftime("%H:%M"),
        "attendees": f"{hcp}, Sales Rep" if hcp else "TBD",
        "topics": f"{topic}: {message}",
        "materialsShared": materials,
        "samplesDistributed": samples,
        "sentiment": sentiment,
        "outcomes": outcome,
        "followUpActions": follow_up,
        "suggestedFollowUps": suggestions
    }

    # 🔹 Simulated tool invocation flow
    log_interaction(extracted)
    compliance_check()

    return extracted
