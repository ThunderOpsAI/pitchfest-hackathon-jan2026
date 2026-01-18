# MASTER PROMPT: Build Anchor MVP (AI Mental Wellness Companion)

## Context & Objective
You are building a **hackathon-ready MVP** in 3-4 hours. This is a simplified AI mental wellness companion called **Anchor** that provides guided calming sessions with safety-first design.

**Critical Success Factors:**
1. Working demo in under 5 minutes
2. Safety detection visibly works
3. Professional, calming UI
4. No crashes or errors during demo
5. Clear differentiation from "just a chatbot"

---

## Project Specification

### What to Build
A single-page React application with:
1. **Disclaimer modal** (first-time user)
2. **Chat interface** for guided calming sessions
3. **Safety detection** that triggers crisis resources
4. **Session summary** at completion
5. **Local storage** for demo persistence

### What NOT to Build
- No authentication
- No backend server
- No database
- No multiple session types (just "Calm Down")
- No monetization UI
- No complex state management (Context API is fine)

---

## Technical Requirements

### Tech Stack
```
- React 18+ with Vite
- OpenAI API (direct from frontend)
- LocalStorage for persistence
- CSS Modules or Tailwind CSS (your choice)
- No additional libraries unless necessary
```

### Environment Setup
```bash
# .env.local
VITE_OPENAI_API_KEY=sk-your-key-here
VITE_OPENAI_MODEL=gpt-4o-mini
```

### Project Structure
```
/anchor-mvp
  /public
    index.html
  /src
    /components
      DisclaimerModal.jsx       # First-time user disclaimer
      SafetyScreen.jsx          # Crisis mode full-screen takeover
      ChatInterface.jsx         # Main session UI
      MessageBubble.jsx         # Individual chat message
      SessionSummary.jsx        # End-of-session recap
    /utils
      safetyCheck.js           # Keyword detection logic
      openaiService.js         # OpenAI API wrapper
      storage.js               # localStorage helpers
    /styles
      globals.css              # Base styles
    App.jsx                    # Main app component
    main.jsx                   # Entry point
  .env.local
  package.json
  vite.config.js
  README.md
```

---

## Component Specifications

### 1. App.jsx (Main Controller)
**State to manage:**
- `disclaimerAccepted` (boolean, from localStorage)
- `sessionActive` (boolean)
- `safetyModeActive` (boolean)
- `currentSession` (object with messages array)

**Flow:**
1. On mount, check if disclaimer was accepted
2. If not, show DisclaimerModal
3. If accepted, show home screen with "Start Session" button
4. When session active, show ChatInterface
5. If safety triggered, show SafetyScreen (full takeover)
6. On session complete, show SessionSummary

**Code structure:**
```javascript
function App() {
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);
  const [sessionActive, setSessionActive] = useState(false);
  const [safetyMode, setSafetyMode] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Load disclaimer flag from localStorage
    const accepted = localStorage.getItem('anchor_disclaimer_accepted');
    setDisclaimerAccepted(accepted === 'true');
  }, []);

  const handleStartSession = async () => {
    setSessionActive(true);
    // Send initial AI prompt
  };

  const handleSendMessage = async (userMessage) => {
    // 1. Check safety first
    const safetyResult = checkSafety(userMessage);
    if (!safetyResult.safe) {
      setSafetyMode(true);
      return;
    }
    
    // 2. Add user message to state
    // 3. Call OpenAI API
    // 4. Add AI response to state
  };

  return (
    <div className="app">
      {!disclaimerAccepted && <DisclaimerModal onAccept={...} />}
      {safetyMode && <SafetyScreen onExit={...} />}
      {/* Rest of UI */}
    </div>
  );
}
```

---

### 2. DisclaimerModal.jsx
**Requirements:**
- Full-screen overlay with centered modal
- Cannot dismiss without clicking "I Understand"
- Must include:
  - Heading: "Before You Begin"
  - Content:
    - "Anchor is a wellness companion, NOT a replacement for therapy or medical care"
    - "If you're in immediate danger, call 000 (Australia) or local emergency services"
    - "Anchor may make mistakes - do not rely on it for emergencies"
  - Single button: "I Understand"

**On click:**
- Save `anchor_disclaimer_accepted: true` to localStorage
- Call parent's `onAccept()` callback

**Styling:**
- Max-width: 500px
- Padding: 32px
- Box shadow
- Background: white
- Overlay: rgba(0,0,0,0.6)

---

### 3. ChatInterface.jsx
**Props:**
- `messages` (array of {role: 'user'|'assistant', content: string})
- `onSendMessage` (function)
- `loading` (boolean)

**UI Elements:**
1. **Messages container:**
   - Scrollable
   - Auto-scroll to bottom on new message
   - Map through messages and render MessageBubble for each

2. **Input area (fixed at bottom):**
   - Text input field
   - Send button (or Enter to submit)
   - Disabled when loading
   - Placeholder: "Type your response..."

**Behavior:**
- Clear input after sending
- Show typing indicator when loading
- Focus input on mount

---

### 4. MessageBubble.jsx
**Props:**
- `role` ('user' | 'assistant')
- `content` (string)

**Styling:**
- User messages: right-aligned, blue background (#4A90E2), white text
- AI messages: left-aligned, light gray background (#F0F0F0), dark text
- Both: rounded corners (12px), padding (12px 16px), max-width 70%
- Animate in with fade + slide (optional but nice)

---

### 5. SafetyScreen.jsx
**Props:**
- `onExit` (function)

**Content:**
- **Large heading:** "We're Here to Help You Stay Safe"
- **Body text:**
  ```
  I'm really sorry you're feeling this way. I can't provide the help you 
  need right now, but there are people who can.
  ```
- **Crisis Resources (large, clickable on mobile):**
  - Lifeline: 13 11 14
  - Suicide Call Back Service: 1300 659 467
  - Emergency: 000
  - Kids Helpline (under 25): 1800 55 1800
- **Optional grounding text:**
  ```
  While you reach out for help, here's something that might help you feel 
  more present: Take a deep breath. Name 3 things you can see around you.
  ```
- **Exit button (bottom):** "I'm Safe Now"

**Styling:**
- Full viewport height/width
- Warm, calm colors (soft orange or warm gray)
- Large, readable text (20px+)
- Plenty of white space

---

### 6. SessionSummary.jsx
**Props:**
- `summary` (object: {userConcern, techniqueUsed, takeaway})
- `onStartNew` (function)

**Content:**
- Heading: "Session Complete"
- Display:
  - "You were feeling: [userConcern]"
  - "We practiced: [techniqueUsed]"
  - "Remember: [takeaway]"
- Encouragement: "Great work! These techniques get easier with practice."
- Button: "Start New Session"

**Styling:**
- Centered card layout
- Calm colors
- Clean typography

---

## Utility Functions

### safetyCheck.js
```javascript
/**
 * Checks if a message contains crisis-level risk keywords
 * @param {string} message - User's message
 * @returns {{safe: boolean, trigger?: string}}
 */
export function checkSafety(message) {
  const riskKeywords = [
    'kill myself',
    'suicide',
    'end my life',
    'want to die',
    'harm myself',
    'hurt myself',
    'cut myself',
    'better off dead',
    'no reason to live',
    'have a plan',
    'going to do it',
    'not worth living'
  ];

  const lowerMessage = message.toLowerCase();

  for (let keyword of riskKeywords) {
    if (lowerMessage.includes(keyword)) {
      console.warn(`[SAFETY] Trigger detected: "${keyword}"`);
      return { safe: false, trigger: keyword };
    }
  }

  return { safe: true };
}
```

---

### openaiService.js
```javascript
/**
 * Calls OpenAI API for chat completion
 * @param {Array} messages - Conversation history
 * @returns {Promise<string>} - AI response text
 */
export async function getAIResponse(messages) {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  const model = import.meta.env.VITE_OPENAI_MODEL || 'gpt-4o-mini';

  if (!apiKey) {
    throw new Error('OpenAI API key not found in environment variables');
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: model,
        messages: messages,
        max_tokens: 150,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('[OpenAI Error]', error);
    throw error;
  }
}

/**
 * Builds the system prompt for Anchor
 */
export function getSystemPrompt() {
  return {
    role: 'system',
    content: `You are Anchor, a compassionate AI wellness companion. You provide brief, structured coping guidance for everyday stress and anxiety.

IMPORTANT RULES:
1. You are NOT a therapist, doctor, or medical professional
2. You provide educational wellness support only
3. Keep responses SHORT (2-3 sentences max per message)
4. Use a warm, calm, non-judgmental tone
5. Guide users through structured exercises (grounding, breathing)
6. Never provide medical advice or diagnosis
7. Never suggest medication changes
8. Focus on present-moment coping techniques

CURRENT SESSION TYPE: Calming session
STRUCTURE:
1. First response: Ask what's making them feel stressed/anxious (1-2 sentences)
2. Second response: Guide through 5-4-3-2-1 grounding (name 5 things you see, 4 you touch, 3 you hear, 2 you smell, 1 you taste)
3. Third response: Box breathing (breathe in 4, hold 4, out 4, hold 4, repeat 3 times)
4. Final response: Brief summary (2 sentences) + encouragement to practice

Start with step 1 now.`
  };
}
```

---

### storage.js
```javascript
/**
 * LocalStorage helpers for Anchor
 */

const KEYS = {
  DISCLAIMER: 'anchor_disclaimer_accepted',
  CURRENT_SESSION: 'anchor_current_session',
  SESSION_HISTORY: 'anchor_session_history'
};

export function hasAcceptedDisclaimer() {
  return localStorage.getItem(KEYS.DISCLAIMER) === 'true';
}

export function setDisclaimerAccepted() {
  localStorage.setItem(KEYS.DISCLAIMER, 'true');
}

export function saveSession(messages) {
  const session = {
    messages,
    savedAt: new Date().toISOString()
  };
  localStorage.setItem(KEYS.CURRENT_SESSION, JSON.stringify(session));
}

export function loadSession() {
  const data = localStorage.getItem(KEYS.CURRENT_SESSION);
  return data ? JSON.parse(data) : null;
}

export function clearSession() {
  localStorage.removeItem(KEYS.CURRENT_SESSION);
}

export function addToHistory(summary) {
  const history = getHistory();
  history.unshift({
    id: Date.now().toString(),
    ...summary,
    completedAt: new Date().toISOString()
  });
  
  // Keep only last 5 sessions
  const trimmed = history.slice(0, 5);
  localStorage.setItem(KEYS.SESSION_HISTORY, JSON.stringify(trimmed));
}

export function getHistory() {
  const data = localStorage.getItem(KEYS.SESSION_HISTORY);
  return data ? JSON.parse(data) : [];
}
```

---

## AI Conversation Flow

### Step-by-Step Session Structure

**Initial State:**
```javascript
const initialMessages = [
  getSystemPrompt(),
  {
    role: 'assistant',
    content: "Hi, I'm Anchor. I'm here to help you feel a bit calmer. What's on your mind right now?"
  }
];
```

**User Response 1:** (e.g., "I'm really stressed about a presentation")

**AI Response 2:** Acknowledge + start grounding
```
I hear you - presentations can feel overwhelming. Let's try something that 
might help ground you. Can you name 5 things you can see around you right now?
```

**User Response 2:** (lists 5 things)

**AI Response 3:** Continue grounding
```
Great. Now 4 things you can touch, 3 you can hear, 2 you can smell, 
and 1 you can taste. Take your time.
```

**User Response 3:** (completes exercise)

**AI Response 4:** Breathing exercise
```
Nice work. Now let's try box breathing together. Breathe in for 4 counts, 
hold for 4, out for 4, hold for 4. Let's do this 3 times. Ready?
```

**User Response 4:** (confirms they did it)

**AI Response 5:** Summary + encouragement
```
You did great. When stress comes up, remember: grounding brings you back 
to the present, breathing calms your nervous system. Practice these daily, 
even when you're not anxious - it makes them easier to access when you need them.
```

**Session ends** → Show SessionSummary component

---

## Styling Guidelines

### Color Palette
```css
:root {
  --color-primary: #4A90E2;      /* Calm blue */
  --color-bg: #F7F9FC;           /* Light neutral */
  --color-text: #2C3E50;         /* Dark gray */
  --color-accent: #8FBC8F;       /* Sage green */
  --color-warning: #E67E22;      /* Warm orange (safety) */
  --color-user-bubble: #4A90E2;
  --color-ai-bubble: #F0F0F0;
}
```

### Typography
```css
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 
               'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 
               'Helvetica Neue', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: var(--color-text);
}

h1 { font-size: 28px; font-weight: 600; }
h2 { font-size: 22px; font-weight: 600; }
```

### Layout Principles
- Max content width: 800px (centered)
- Generous padding on mobile (16px minimum)
- Clear visual hierarchy
- Plenty of white space
- Smooth transitions (200-300ms)

---

## Error Handling

### OpenAI API Failure
```javascript
try {
  const response = await getAIResponse(messages);
  // Handle success
} catch (error) {
  console.error('AI Error:', error);
  
  // Fallback response
  const fallbackMessage = {
    role: 'assistant',
    content: "I'm having trouble connecting right now. Here's a quick grounding technique: Take a deep breath and name 5 things you can see around you."
  };
  
  setMessages(prev => [...prev, fallbackMessage]);
}
```

### Safety Check Fails Silently
- If `checkSafety()` throws an error, assume safe (log error)
- Better to let session continue than crash

### localStorage Quota Exceeded
- Wrap all localStorage calls in try/catch
- If quota exceeded, clear old session history

---

## Testing Checklist

Before considering MVP complete, manually test:

### Happy Path
- [ ] Disclaimer appears on first visit
- [ ] Disclaimer is not shown on refresh (after accepting)
- [ ] "Start Session" button works
- [ ] AI responds to initial message
- [ ] Can send multiple messages
- [ ] AI guides through full session flow
- [ ] Session summary appears at end
- [ ] Can start a new session

### Safety Path
- [ ] Typing "I want to hurt myself" triggers safety screen
- [ ] Safety screen shows crisis numbers
- [ ] "I'm Safe Now" button exits safety mode
- [ ] Can resume or start new session after safety mode

### Edge Cases
- [ ] Sending empty message is blocked
- [ ] Very long message doesn't break UI
- [ ] Refreshing mid-session restores messages (if implemented)
- [ ] Works on mobile screen (375px width minimum)
- [ ] OpenAI API key missing shows error (not crash)

### Performance
- [ ] Page loads in under 2 seconds
- [ ] AI responses appear within 5 seconds
- [ ] No console errors in production build

---

## Build Commands

```bash
# Initialize project
npm create vite@latest anchor-mvp -- --template react
cd anchor-mvp
npm install

# Install OpenAI (if using SDK instead of fetch)
npm install openai

# Development
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

---

## Demo Recording Tips

1. **Record in 1920x1080** (or 16:9 aspect ratio)
2. **Use Chrome/Firefox** (no browser bugs visible)
3. **Clear localStorage first** (fresh experience)
4. **Script your typing** (don't stumble)
5. **Show safety trigger clearly** (type slowly so judges can read)
6. **Have backup video** if live demo fails

### Demo Script (2-3 minutes)
1. Start app → disclaimer appears → accept
2. Click "Start Session"
3. Type: "I'm really anxious about my job interview tomorrow"
4. Wait for AI response
5. Complete 1-2 exchanges
6. Type: "I just feel like hurting myself sometimes" → Safety Mode triggers
7. Show safety resources clearly
8. Exit safety mode
9. Return to home screen
10. End recording

---

## Common Pitfalls to Avoid

### 1. Over-engineering
- Don't add Redux/Zustand for state management (useState is enough)
- Don't build multiple session types
- Don't add animations that take more than 10 minutes

### 2. API Key Exposure
- NEVER commit .env.local to git
- Add .env.local to .gitignore immediately

### 3. Styling Rabbit Holes
- Use simple CSS or Tailwind
- Don't spend >30 minutes on styling
- Function > beauty for MVP

### 4. Scope Creep
If you think "it would be cool to add X":
- NO unless it's in the SRS
- Write it down for "Future Enhancements" section of pitch

### 5. Testing Neglect
- Test safety trigger BEFORE recording demo
- Test on mobile viewport BEFORE recording demo
- Test with and without API key BEFORE recording demo

---

## Code Quality Standards (For This MVP)

### Do:
- Use meaningful variable names
- Add comments for complex logic
- Extract repeated code to functions
- Handle errors gracefully
- Console.log liberally (helps with debugging)

### Don't:
- Worry about perfect code structure
- Write extensive unit tests (no time)
- Optimize prematurely
- Refactor excessively

### "Good Enough" Checklist:
- [ ] No console errors in production
- [ ] No crashes during demo
- [ ] Code is readable by another developer
- [ ] Functions have clear purposes

---

## Post-Build: Preparing the Pitch

### 1. README.md
Create a clear README with:
- Project description
- How to run locally
- Environment variables needed
- Demo video link (if recorded)

### 2. GitHub Repo
- Clean commit history (optional)
- Clear .gitignore
- No API keys committed
- Nice-to-have: GitHub Pages deployment

### 3. Pitch Deck (Separate)
Create 5-7 slides:
1. Problem (mental health access gaps)
2. Solution (Anchor overview)
3. Demo screenshot/video
4. Safety-first approach
5. Market & scalability
6. Team & ask

---

## Final Checklist Before Submission

- [ ] App runs without errors locally
- [ ] Disclaimer works
- [ ] Chat interface works
- [ ] Safety detection works
- [ ] Mobile responsive (at 375px+)
- [ ] .env.local in .gitignore
- [ ] README is clear
- [ ] Demo video recorded (backup)
- [ ] Pitch deck ready
- [ ] Practiced 5-minute pitch

---

## Emergency Fallbacks

If OpenAI API fails during demo:
1. Use recorded video instead of live demo
2. Or: Show slides + explain what "would" happen

If safety detection fails during demo:
1. Type the exact phrase you tested with
2. Have backup screenshot ready

If judges ask hard questions:
- **"How do you prevent misuse?"** → "Disclaimers, safety detection, no advice on methods"
- **"What about liability?"** → "MVP establishes positioning; production requires legal review"
- **"Why not just use ChatGPT?"** → "Purpose-built safety, structured sessions, clear non-clinical framing"

---

## Success Criteria (Judge Rubric Targets)

Based on the rubric, aim for these scores:

1. **Problem Definition & Clarity:** 4-5
   - Clear statistics
   - Relatable user persona
   - Well-articulated gap

2. **Innovation & Creativity:** 4
   - Safety-first AI design
   - Structured micro-sessions (not open chat)
   - Clear differentiation

3. **Technical Feasibility:** 4-5
   - Working demo
   - Clear architecture
   - Scalability story

4. **Impact & Scalability:** 4-5
   - Immediate user impact
   - Low marginal cost
   - Large addressable market

5. **Presentation & Communication:** 4-5
   - Clear narrative
   - Professional delivery
   - Compelling demo

**Target Total:** 20-24 / 25 points

---

## Final Notes

**Time Management:**
- Hour 1: Project setup + basic UI shell
- Hour 2: OpenAI integration + chat interface
- Hour 3: Safety detection + safety screen
- Hour 4: Polish, testing, demo recording

**Energy Management:**
- Take a 5-minute break every hour
- Stay hydrated
- Don't skip testing to add features

**Mindset:**
This is a demonstration of your ability to:
1. Understand a problem deeply
2. Design a solution thoughtfully
3. Execute quickly and pragmatically
4. Communicate compellingly

You've got this. Build something you're proud to demo. 🚀

---

**END OF MASTER PROMPT**

---

## Appendix: Quick Copy-Paste Snippets

### package.json (Vite + React)
```json
{
  "name": "anchor-mvp",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.0",
    "vite": "^5.0.0"
  }
}
```

### .gitignore
```
node_modules
dist
.env
.env.local
.DS_Store
```

### Basic App.jsx skeleton
```javascript
import { useState, useEffect } from 'react';
import DisclaimerModal from './components/DisclaimerModal';
import ChatInterface from './components/ChatInterface';
import SafetyScreen from './components/SafetyScreen';
import { checkSafety } from './utils/safetyCheck';
import { getAIResponse, getSystemPrompt } from './utils/openaiService';
import './styles/globals.css';

function App() {
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);
  const [sessionActive, setSessionActive] = useState(false);
  const [safetyMode, setSafetyMode] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('anchor_disclaimer_accepted');
    setDisclaimerAccepted(accepted === 'true');
  }, []);

  const handleAcceptDisclaimer = () => {
    localStorage.setItem('anchor_disclaimer_accepted', 'true');
    setDisclaimerAccepted(true);
  };

  const handleStartSession = () => {
    const systemPrompt = getSystemPrompt();
    const initialMessage = {
      role: 'assistant',
      content: "Hi, I'm Anchor. I'm here to help you feel a bit calmer. What's on your mind right now?"
    };
    setMessages([systemPrompt, initialMessage]);
    setSessionActive(true);
  };

  const handleSendMessage = async (userMessage) => {
    // Safety check first
    const safetyResult = checkSafety(userMessage);
    if (!safetyResult.safe) {
      setSafetyMode(true);
      return;
    }

    // Add user message
    const newUserMessage = { role: 'user', content: userMessage };
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setLoading(true);

    try {
      const aiResponse = await getAIResponse(updatedMessages);
      const aiMessage = { role: 'assistant', content: aiResponse };
      setMessages([...updatedMessages, aiMessage]);
    } catch (error) {
      console.error('AI Error:', error);
      // Fallback message
      const fallback = {
        role: 'assistant',
        content: "I'm having trouble connecting. Try this: Take a deep breath and name 5 things you can see."
      };
      setMessages([...updatedMessages, fallback]);
    } finally {
      setLoading(false);
    }
  };

  const handleExitSafety = () => {
    setSafetyMode(false);
    setSessionActive(false);
    setMessages([]);
  };

  return (
    <div className="app">
      {!disclaimerAccepted && (
        <DisclaimerModal onAccept={handleAcceptDisclaimer} />
      )}
      
      {safetyMode && <SafetyScreen onExit={handleExitSafety} />}
      
      {!sessionActive && disclaimerAccepted && (
        <div className="home">
          <h1>Welcome to Anchor</h1>
          <button onClick={handleStartSession}>Start Calming Session</button>
        </div>
      )}
      
      {sessionActive && !safetyMode && (
        <ChatInterface
          messages={messages.filter(m => m.role !== 'system')}
          onSendMessage={handleSendMessage}
          loading={loading}
        />
      )}
    </div>
  );
}

export default App;
```

Good luck! 🎯
