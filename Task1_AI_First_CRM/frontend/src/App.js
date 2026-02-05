import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    hcpName: "",
    interactionType: "Meeting",
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().slice(0, 5),
    attendees: "",
    topics: "",
    materialsShared: [],
    samplesDistributed: [],
    sentiment: "Neutral",
    outcomes: "",
    followUpActions: "",
    suggestedFollowUps: []
  });

  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { role: "ai", text: 'Log interaction details here (e.g., "Met Dr. Smith, discussed Product X efficacy, positive sentiment, shared brochure") or ask for help.' }
  ]);
  const [loading, setLoading] = useState(false);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSentimentChange = (val) => {
    setFormData((prev) => ({ ...prev, sentiment: val }));
  };

  const handleSendChat = async () => {
    if (!chatMessage) return;

    setLoading(true);
    setChatHistory(prev => [...prev, { role: "user", text: chatMessage }]);

    try {
      const res = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: chatMessage })
      });
      const data = await res.json();

      // Update form data with extracted fields
      setFormData(prev => ({
        ...prev,
        ...data
      }));

      setChatHistory(prev => [...prev, { role: "ai", text: "I've updated the form with the details extracted from our chat. Please review it on the left." }]);
      setChatMessage("");
    } catch (error) {
      console.error("Error calling backend:", error);
      setChatHistory(prev => [...prev, { role: "ai", text: "Sorry, I had trouble connecting to the backend. Is it running at http://localhost:8000?" }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/log-interaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const result = await res.json();
      if (result.status === "success") {
        alert("Interaction Logged Successfully!");
        console.log("Logged Data:", formData);
      }
    } catch (error) {
      console.error("Error logging interaction:", error);
      alert("Failed to log interaction.");
    }
  };

  return (
    <div className="app-container">
      {/* Form Side */}
      <div className="form-side">
        <div className="form-header">
          <h2>Log HCP Interaction</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="section-card">
            <h3>Interaction Details</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>HCP Name</label>
                <input
                  name="hcpName"
                  value={formData.hcpName}
                  onChange={handleFormChange}
                  placeholder="Search or select HCP..."
                />
              </div>
              <div className="form-group">
                <label>Interaction Type</label>
                <select name="interactionType" value={formData.interactionType} onChange={handleFormChange}>
                  <option>Meeting</option>
                  <option>Call</option>
                  <option>Visit</option>
                  <option>Email</option>
                </select>
              </div>
              <div className="form-group">
                <label>Date</label>
                <input type="date" name="date" value={formData.date} onChange={handleFormChange} />
              </div>
              <div className="form-group">
                <label>Time</label>
                <input type="time" name="time" value={formData.time} onChange={handleFormChange} />
              </div>
              <div className="form-group full-width">
                <label>Attendees</label>
                <input
                  name="attendees"
                  value={formData.attendees}
                  onChange={handleFormChange}
                  placeholder="Enter names or search..."
                />
              </div>
              <div className="form-group full-width">
                <label>Topics Discussed</label>
                <div className="textarea-container">
                  <textarea
                    name="topics"
                    value={formData.topics}
                    onChange={handleFormChange}
                    placeholder="Enter key discussion points..."
                    rows="4"
                  />
                  <span className="mic-icon">🎤</span>
                </div>
                <button type="button" className="voice-btn">
                  <span>✨</span> Summarize from Voice Note (Requires Consent)
                </button>
              </div>
            </div>
          </div>

          <div className="section-card">
            <h3>Materials Shared / Samples Distributed</h3>
            <div className="table-section">
              <div className="table-header">
                <label>Materials Shared</label>
                <button type="button" className="search-add-btn">🔍 Search/Add</button>
              </div>
              {formData.materialsShared.length === 0 ? (
                <div className="empty-state">No materials added.</div>
              ) : (
                <ul className="follow-ups-list">
                  {formData.materialsShared.map((item, idx) => <li key={idx}>{item}</li>)}
                </ul>
              )}
            </div>
            <div className="table-section">
              <div className="table-header">
                <label>Samples Distributed</label>
                <button type="button" className="search-add-btn">📦 Add Sample</button>
              </div>
              {formData.samplesDistributed.length === 0 ? (
                <div className="empty-state">No samples added.</div>
              ) : (
                <ul className="follow-ups-list">
                  {formData.samplesDistributed.map((item, idx) => <li key={idx}>{item}</li>)}
                </ul>
              )}
            </div>
          </div>

          <div className="section-card">
            <h3>Observed/Inferred HCP Sentiment</h3>
            <div className="sentiment-group">
              <label className="sentiment-option">
                <input
                  type="radio"
                  name="sentiment"
                  value="Positive"
                  checked={formData.sentiment === "Positive"}
                  onChange={() => handleSentimentChange("Positive")}
                />
                <span>😊</span> Positive
              </label>
              <label className="sentiment-option">
                <input
                  type="radio"
                  name="sentiment"
                  value="Neutral"
                  checked={formData.sentiment === "Neutral"}
                  onChange={() => handleSentimentChange("Neutral")}
                />
                <span>😐</span> Neutral
              </label>
              <label className="sentiment-option">
                <input
                  type="radio"
                  name="sentiment"
                  value="Negative"
                  checked={formData.sentiment === "Negative"}
                  onChange={() => handleSentimentChange("Negative")}
                />
                <span>☹️</span> Negative
              </label>
            </div>
          </div>

          <div className="section-card">
            <div className="form-group full-width">
              <label>Outcomes</label>
              <textarea
                name="outcomes"
                value={formData.outcomes}
                onChange={handleFormChange}
                placeholder="Key outcomes or agreements..."
                rows="2"
              />
            </div>
            <div className="form-group full-width" style={{ marginTop: '16px' }}>
              <label>Follow-up Actions</label>
              <textarea
                name="followUpActions"
                value={formData.followUpActions}
                onChange={handleFormChange}
                placeholder="Enter next steps or tasks..."
                rows="2"
              />
            </div>
          </div>

          {formData.suggestedFollowUps.length > 0 && (
            <div className="section-card">
              <label style={{ fontSize: '12px', color: '#2563eb', fontWeight: 'bold' }}>AI Suggested Follow-ups:</label>
              <ul className="follow-ups-list">
                {formData.suggestedFollowUps.map((item, idx) => (
                  <li key={idx}>+ {item}</li>
                ))}
              </ul>
            </div>
          )}

          <div style={{ padding: '20px 0' }}>
            <button type="submit" className="submit-btn" style={{ width: '100%', justifyContent: 'center', padding: '14px' }}>
              Log Interaction
            </button>
          </div>
        </form>
      </div>

      {/* Chat Side */}
      <div className="chat-side">
        <div className="chat-header">
          <span>🌐</span>
          <h3>AI Assistant</h3>
        </div>
        <div className="chat-messages">
          {chatHistory.map((chat, idx) => (
            <div key={idx} className="chat-bubble" style={{ alignSelf: chat.role === 'user' ? 'flex-end' : 'flex-start', background: chat.role === 'user' ? '#eff6ff' : 'white' }}>
              {chat.text}
            </div>
          ))}
          {loading && <div className="loading-dots">AI is thinking...</div>}
        </div>
        <div className="chat-input-area">
          <input
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            placeholder="Describe interaction..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendChat()}
          />
          <button className="log-btn" onClick={handleSendChat} disabled={loading}>
            <span>⚠</span> Log
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
