import { useState, useEffect, useRef } from "react";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --cream: #F5F0E8;
    --warm: #E8DDD0;
    --bark: #6B5B4E;
    --soil: #3D2E25;
    --moss: #5C7A5A;
    --gold: #C49A3C;
    --soft-red: #B85C4A;
    --mist: #D6E4E0;
    --text: #2A1F18;
    --text-light: #7A6558;
  }

  body {
    background: var(--cream);
    font-family: 'DM Sans', sans-serif;
    color: var(--text);
    min-height: 100vh;
  }

  .app {
    max-width: 430px;
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: var(--cream);
    position: relative;
    overflow: hidden;
  }

  /* Background texture */
  .app::before {
    content: '';
    position: fixed;
    top: -50%;
    right: -30%;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(92,122,90,0.08) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }

  .app::after {
    content: '';
    position: fixed;
    bottom: -20%;
    left: -20%;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(196,154,60,0.06) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }

  /* ONBOARDING */
  .onboarding {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 48px 28px 32px;
    position: relative;
    z-index: 1;
    animation: fadeUp 0.6s ease;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 48px;
  }

  .brand-dot {
    width: 10px;
    height: 10px;
    background: var(--moss);
    border-radius: 50%;
  }

  .brand-name {
    font-family: 'Lora', serif;
    font-size: 18px;
    color: var(--bark);
    letter-spacing: 0.05em;
  }

  .onboard-heading {
    font-family: 'Lora', serif;
    font-size: 30px;
    line-height: 1.3;
    color: var(--soil);
    margin-bottom: 8px;
  }

  .onboard-heading em {
    color: var(--moss);
    font-style: italic;
  }

  .onboard-sub {
    font-size: 14px;
    color: var(--text-light);
    margin-bottom: 40px;
    line-height: 1.6;
  }

  .field {
    margin-bottom: 20px;
  }

  .field label {
    display: block;
    font-size: 12px;
    font-weight: 500;
    color: var(--bark);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 8px;
  }

  .field input, .field textarea, .field select {
    width: 100%;
    background: white;
    border: 1.5px solid var(--warm);
    border-radius: 12px;
    padding: 14px 16px;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    color: var(--text);
    outline: none;
    transition: border-color 0.2s;
    -webkit-appearance: none;
  }

  .field input:focus, .field textarea:focus, .field select:focus {
    border-color: var(--moss);
  }

  .field textarea {
    resize: none;
    height: 90px;
    line-height: 1.5;
  }

  .faith-options {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .faith-option {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    background: white;
    border: 1.5px solid var(--warm);
    border-radius: 12px;
    padding: 14px 16px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .faith-option.selected {
    border-color: var(--moss);
    background: rgba(92,122,90,0.05);
  }

  .faith-option-radio {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid var(--warm);
    flex-shrink: 0;
    margin-top: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
  }

  .faith-option.selected .faith-option-radio {
    border-color: var(--moss);
    background: var(--moss);
  }

  .faith-option.selected .faith-option-radio::after {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: white;
  }

  .faith-option-text strong {
    display: block;
    font-size: 14px;
    color: var(--soil);
    margin-bottom: 2px;
  }

  .faith-option-text span {
    font-size: 12px;
    color: var(--text-light);
    line-height: 1.4;
  }

  .start-btn {
    width: 100%;
    background: var(--soil);
    color: var(--cream);
    border: none;
    border-radius: 14px;
    padding: 16px;
    font-family: 'DM Sans', sans-serif;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    margin-top: 8px;
    transition: all 0.2s;
    letter-spacing: 0.02em;
  }

  .start-btn:hover {
    background: var(--bark);
    transform: translateY(-1px);
  }

  .start-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  /* CHAT */
  .chat-screen {
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100vh;
    position: relative;
    z-index: 1;
  }

  .chat-header {
    padding: 20px 24px 16px;
    background: rgba(245,240,232,0.95);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--warm);
    display: flex;
    align-items: center;
    gap: 12px;
    position: sticky;
    top: 0;
    z-index: 10;
  }

  .avatar {
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, var(--moss), var(--bark));
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Lora', serif;
    font-size: 16px;
    color: white;
    font-weight: 600;
    flex-shrink: 0;
  }

  .header-info {}

  .header-name {
    font-family: 'Lora', serif;
    font-size: 16px;
    color: var(--soil);
    font-weight: 600;
  }

  .header-status {
    font-size: 11px;
    color: var(--moss);
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .status-dot {
    width: 6px;
    height: 6px;
    background: var(--moss);
    border-radius: 50%;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }

  .messages {
    flex: 1;
    overflow-y: auto;
    padding: 24px 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    scroll-behavior: smooth;
  }

  .messages::-webkit-scrollbar { width: 0; }

  .message {
    display: flex;
    flex-direction: column;
    animation: msgIn 0.3s ease;
  }

  @keyframes msgIn {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .message.starly { align-items: flex-start; }
  .message.user { align-items: flex-end; }

  .bubble {
    max-width: 82%;
    padding: 13px 16px;
    border-radius: 18px;
    font-size: 14.5px;
    line-height: 1.6;
  }

  .message.starly .bubble {
    background: white;
    color: var(--text);
    border-bottom-left-radius: 4px;
    box-shadow: 0 1px 6px rgba(61,46,37,0.06);
  }

  .message.user .bubble {
    background: var(--soil);
    color: var(--cream);
    border-bottom-right-radius: 4px;
  }

  .msg-time {
    font-size: 10px;
    color: var(--text-light);
    margin-top: 4px;
    padding: 0 4px;
  }

  .typing-bubble {
    background: white;
    border-radius: 18px;
    border-bottom-left-radius: 4px;
    padding: 14px 18px;
    display: flex;
    gap: 5px;
    align-items: center;
    box-shadow: 0 1px 6px rgba(61,46,37,0.06);
    width: fit-content;
  }

  .typing-dot {
    width: 7px;
    height: 7px;
    background: var(--bark);
    border-radius: 50%;
    animation: typingBounce 1.2s infinite;
    opacity: 0.6;
  }

  .typing-dot:nth-child(2) { animation-delay: 0.2s; }
  .typing-dot:nth-child(3) { animation-delay: 0.4s; }

  @keyframes typingBounce {
    0%, 60%, 100% { transform: translateY(0); opacity: 0.6; }
    30% { transform: translateY(-6px); opacity: 1; }
  }

  .chat-input-area {
    padding: 12px 16px 24px;
    background: rgba(245,240,232,0.95);
    backdrop-filter: blur(10px);
    border-top: 1px solid var(--warm);
    display: flex;
    gap: 10px;
    align-items: flex-end;
  }

  .chat-input {
    flex: 1;
    background: white;
    border: 1.5px solid var(--warm);
    border-radius: 20px;
    padding: 11px 16px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14.5px;
    color: var(--text);
    outline: none;
    resize: none;
    max-height: 120px;
    line-height: 1.5;
    transition: border-color 0.2s;
  }

  .chat-input:focus { border-color: var(--moss); }
  .chat-input::placeholder { color: #B0A090; }

  .send-btn {
    width: 42px;
    height: 42px;
    background: var(--soil);
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: all 0.2s;
  }

  .send-btn:hover { background: var(--bark); transform: scale(1.05); }
  .send-btn:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }

  .send-icon {
    width: 18px;
    height: 18px;
    fill: none;
    stroke: var(--cream);
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
`;

function getTimeContext() {
  const now = new Date();
  const hour = now.getHours();
  const day = now.toLocaleDateString('en-US', { weekday: 'long' });
  const date = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  let timeOfDay;
  if (hour >= 5 && hour < 9) timeOfDay = "early morning";
  else if (hour >= 9 && hour < 12) timeOfDay = "morning";
  else if (hour >= 12 && hour < 15) timeOfDay = "afternoon";
  else if (hour >= 15 && hour < 18) timeOfDay = "late afternoon";
  else if (hour >= 18 && hour < 21) timeOfDay = "evening";
  else if (hour >= 21 && hour < 24) timeOfDay = "late night";
  else timeOfDay = "the early hours";

  return { hour, day, date, time, timeOfDay };
}

function formatMsgTime() {
  return new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

export default function FriendlyApp() {
  const [screen, setScreen] = useState("onboarding");
  const [profile, setProfile] = useState({ name: "", about: "", faith: "none" });
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = STYLES;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function startChat() {
    setScreen("chat");
    setLoading(true);

    const ctx = getTimeContext();
    const faithNote = profile.faith !== "none"
      ? `The user has indicated they want faith-based (Christian) support integrated naturally when relevant. Only bring faith in organically — never force it.`
      : `The user has not opted into faith-based support. Keep responses secular.`;

    const systemPrompt = `You are Starly, an AI companion inside an app called Friendly. You support people through emotional struggles.

USER CONTEXT:
- Name: ${profile.name}
- What they shared about themselves: "${profile.about}"
- Faith preference: ${profile.faith !== "none" ? "Christian faith — integrate naturally when relevant" : "Secular only"}
- Current time: ${ctx.time} on ${ctx.day}, ${ctx.date} (${ctx.timeOfDay})

YOUR PERSONALITY:
- You are warm but not a pushover. You do not blindly validate everything.
- You speak like a real person — not a wellness bot.
- You are direct, occasionally dry, and genuinely curious.
- You notice what people are NOT saying, not just what they say.
- You ask one question at a time. Never a list of questions.
- You never start with "I understand how you feel" or similar hollow openers.
- You don't use emojis unless the user does first.
- You hold people accountable to things they said earlier in the conversation.
- You never panic at difficult emotions — you sit with them.
- You adapt your energy to the time of day — lighter in the morning, quieter and slower late at night.
- If someone is in genuine crisis, you acknowledge it directly and suggest real help.

${faithNote}

WHAT YOU NEVER DO:
- Never say "That sounds really hard. You're so strong!"
- Never give a list of bullet-point advice unprompted
- Never use the phrase "I hear you" as a substitute for actual engagement
- Never be cruel — but never be fake either

Start with a brief, natural opening that acknowledges the time of day and what they shared about themselves. Make it feel like you already know them a little — because you do.`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: systemPrompt,
          messages: [{ role: "user", content: `[${profile.name} has just opened the app for the first time]` }]
        })
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || "Hey. I'm here.";
      setMessages([{ role: "starly", text: reply, time: formatMsgTime(), systemPrompt, history: [] }]);
    } catch {
      setMessages([{ role: "starly", text: "Hey. Something went a little sideways on my end. Give it a moment and try again.", time: formatMsgTime() }]);
    }
    setLoading(false);
  }

  async function sendMessage() {
    if (!input.trim() || loading) return;
    const userText = input.trim();
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";

    const userMsg = { role: "user", text: userText, time: formatMsgTime() };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setLoading(true);

    const ctx = getTimeContext();
    const systemPrompt = messages[0]?.systemPrompt || "";

    // Build conversation history for API
    const apiHistory = [];
    for (let i = 0; i < updatedMessages.length; i++) {
      const m = updatedMessages[i];
      if (i === 0 && m.role === "starly") {
        apiHistory.push({ role: "user", content: `[${profile.name} has just opened the app for the first time]` });
        apiHistory.push({ role: "assistant", content: m.text });
      } else if (m.role === "user") {
        apiHistory.push({ role: "user", content: m.text });
      } else if (m.role === "starly" && i > 0) {
        apiHistory.push({ role: "assistant", content: m.text });
      }
    }

    // Add current time awareness
    const timeAwareSystem = systemPrompt + `\n\nCurrent time right now: ${ctx.time} on ${ctx.day}, ${ctx.date} (${ctx.timeOfDay}). Never reference a wrong time or day.`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: timeAwareSystem,
          messages: apiHistory
        })
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || "...";
      setMessages(prev => [...prev, { role: "starly", text: reply, time: formatMsgTime() }]);
    } catch {
      setMessages(prev => [...prev, { role: "starly", text: "Lost the connection for a second. I'm still here — try again.", time: formatMsgTime() }]);
    }
    setLoading(false);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  function handleTextareaChange(e) {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
  }

  if (screen === "onboarding") {
    return (
      <div className="app">
        <div className="onboarding">
          <div className="brand">
            <div className="brand-dot" />
            <span className="brand-name">Friendly</span>
          </div>

          <h1 className="onboard-heading">
            Meet <em>Starly</em>.<br />She's not here to impress you.
          </h1>
          <p className="onboard-sub">
            Tell her a little about yourself so she can actually show up for you — not just go through the motions.
          </p>

          <div className="field">
            <label>Your name</label>
            <input
              type="text"
              placeholder="What do you go by?"
              value={profile.name}
              onChange={e => setProfile(p => ({ ...p, name: e.target.value }))}
            />
          </div>

          <div className="field">
            <label>What's going on with you?</label>
            <textarea
              placeholder="It doesn't have to be perfect. Just real."
              value={profile.about}
              onChange={e => setProfile(p => ({ ...p, about: e.target.value }))}
            />
          </div>

          <div className="field">
            <label>One more thing</label>
            <div className="faith-options">
              {[
                { value: "none", title: "No preference", desc: "Keep it open, no specific lens" },
                { value: "faith", title: "Faith matters to me", desc: "I'd like that reflected when it fits" }
              ].map(opt => (
                <div
                  key={opt.value}
                  className={`faith-option ${profile.faith === opt.value ? "selected" : ""}`}
                  onClick={() => setProfile(p => ({ ...p, faith: opt.value }))}
                >
                  <div className="faith-option-radio" />
                  <div className="faith-option-text">
                    <strong>{opt.title}</strong>
                    <span>{opt.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            className="start-btn"
            disabled={!profile.name.trim() || !profile.about.trim()}
            onClick={startChat}
          >
            Start talking to Starly
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="chat-screen">
        <div className="chat-header">
          <div className="avatar">S</div>
          <div className="header-info">
            <div className="header-name">Starly</div>
            <div className="header-status">
              <div className="status-dot" />
              here with you
            </div>
          </div>
        </div>

        <div className="messages">
          {messages.map((msg, i) => (
            <div key={i} className={`message ${msg.role}`}>
              <div className="bubble">{msg.text}</div>
              <span className="msg-time">{msg.time}</span>
            </div>
          ))}
          {loading && (
            <div className="message starly">
              <div className="typing-bubble">
                <div className="typing-dot" />
                <div className="typing-dot" />
                <div className="typing-dot" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input-area">
          <textarea
            ref={textareaRef}
            className="chat-input"
            placeholder="Say something..."
            value={input}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            rows={1}
          />
          <button className="send-btn" onClick={sendMessage} disabled={!input.trim() || loading}>
            <svg className="send-icon" viewBox="0 0 24 24">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
