import React, { useState, useEffect } from 'react';
import DisclaimerModal from './components/DisclaimerModal';
import SafetyScreen from './components/SafetyScreen';
import ChatInterface from './components/ChatInterface';
import SessionSummary from './components/SessionSummary';
import CookieConsent from './components/CookieConsent';
import { checkSafety } from './utils/safetyCheck';
import { getAIResponse, getSystemPrompt } from './utils/openaiService';
import { hasAcceptedDisclaimer, setDisclaimerAccepted as saveDisclaimer } from './utils/storage';

const tips = [
  "Take a deep breath and count to ten.",
  "Drink a glass of water to refresh your mind.",
  "Step outside and enjoy the fresh air.",
  "Write down three things you're grateful for.",
  "Stretch your body for five minutes.",
  "Listen to your favorite calming music.",
  "Close your eyes and visualize a peaceful place.",
  "Take a short walk to clear your mind.",
  "Practice box breathing: inhale for 4, hold for 4, exhale for 4, hold for 4.",
  "Read an inspiring quote or passage.",
  "Declutter your workspace for a fresh start.",
  "Smile at yourself in the mirror.",
  "Do a quick 5-minute meditation.",
  "Focus on naming 5 things you can see around you.",
  "Call a friend or loved one for a chat.",
  "Write down your thoughts in a journal.",
  "Light a candle or incense for a calming aroma.",
  "Repeat a positive affirmation to yourself.",
  "Plan one fun activity for the week ahead.",
  "Take a moment to appreciate your achievements."
];

function App() {
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);
  const [sessionActive, setSessionActive] = useState(false);
  const [safetyMode, setSafetyMode] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentTip, setCurrentTip] = useState(0);

  useEffect(() => {
    if (hasAcceptedDisclaimer()) {
      setDisclaimerAccepted(true);
    }
    const today = new Date().getDate();
    setCurrentTip(today % tips.length);
  }, []);

  const handleAcceptDisclaimer = () => {
    saveDisclaimer();
    setDisclaimerAccepted(true);
  };

  const handleStartSession = () => {
    setSessionActive(true);
    setShowSummary(false);
    setMessages([
      {
        role: 'assistant',
        content: "Hi, I'm Anchor. I'm here to help you feel a bit calmer. What's making you feel stressed or anxious right now?"
      }
    ]);
  };

  const handleSendMessage = async (content) => {
    const safetyResult = checkSafety(content);
    if (!safetyResult.safe) {
      setSafetyMode(true);
      return;
    }

    const newMessages = [...messages, { role: 'user', content }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const apiMessages = [getSystemPrompt(), ...newMessages];
      const aiContent = await getAIResponse(apiMessages);
      setMessages(prev => [...prev, { role: 'assistant', content: aiContent }]);
    } catch (error) {
      console.error('Failed to get response', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I'm having trouble connecting right now. Let's try to focus on your breathing together. Breathe in... and out."
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleEndSession = () => {
    setSessionActive(false);
    setShowSummary(true);
  };

  const handleSafetyExit = () => {
    setSafetyMode(false);
    setSessionActive(false);
    setMessages([]);
  };

  if (safetyMode) {
    return <SafetyScreen onExit={handleSafetyExit} />;
  }

  return (
    <div className="min-h-screen text-[#2C3E50] antialiased relative overflow-hidden flex flex-col">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-150px] right-[-150px] w-[600px] h-[600px] bg-[#C8E6DC] rounded-full blur-[120px] opacity-50"></div>
        <div className="absolute bottom-[-100px] left-[-100px] w-[500px] h-[500px] bg-[#D4EDE4] rounded-full blur-[100px] opacity-60"></div>
        <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] bg-[#E8F5F0] rounded-full blur-[80px] opacity-40"></div>
      </div>

      {/* Persistence Safety Modal (First Load) */}
      {!disclaimerAccepted && <DisclaimerModal onAccept={handleAcceptDisclaimer} />}

      {/* Navigation Bar - White, Sticky with Shadow */}
      <nav className="nav-bar px-6 md:px-8 py-4">
        <div className="max-w-[1100px] mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#7FA99B] rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <h1 className="text-xl font-semibold heading-display text-[#2C3E50]">Anchor</h1>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-10 text-sm">
            <span className="nav-link active cursor-pointer">Home</span>
            <span className="nav-link cursor-pointer">Daily Tip</span>
            <span className="nav-link cursor-pointer">Resources</span>
            <span className="nav-link cursor-pointer">Sessions</span>
            <span className="nav-link cursor-pointer">Contact Us</span>
          </div>

          {/* User Icon */}
          <button className="w-10 h-10 rounded-full bg-[#F0F5F3] hover:bg-[#E0EBE7] transition-colors flex items-center justify-center text-[#6B8E85]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="relative z-10 w-full px-6 md:px-8 pt-8 md:pt-16 pb-20 flex-1">
        {sessionActive ? (
          <div className="w-full max-w-4xl mx-auto bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/60 overflow-hidden h-[75vh] animate-fade-in flex flex-col">
            <header className="px-6 py-4 flex justify-between items-center border-b border-gray-100 bg-white/50">
              <span className="font-semibold text-[#2C3E50] heading-display">Calming Session</span>
              <button
                onClick={handleEndSession}
                className="text-xs font-semibold text-gray-500 hover:text-red-500 uppercase tracking-wider px-4 py-2 bg-gray-50 rounded-lg hover:bg-red-50 transition-colors"
              >
                End Session
              </button>
            </header>
            <div className="flex-1 overflow-hidden">
              <ChatInterface
                messages={messages}
                onSendMessage={handleSendMessage}
                loading={loading}
              />
            </div>
          </div>
        ) : showSummary ? (
          <div className="max-w-2xl mx-auto w-full">
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/60 p-8">
              <SessionSummary onStartNew={handleStartSession} />
            </div>
          </div>
        ) : (
          /* Dashboard Home Layout - 2 Column Grid */
          <div className="max-w-[1000px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

              {/* Left Content - Main Text */}
              <div className="lg:col-span-7 space-y-10 animate-fade-in">
                {/* Hero Section */}
                <div className="space-y-5">
                  <h2 className="heading-display text-4xl md:text-5xl text-[#2C3E50]">
                    Welcome to Anchor
                  </h2>
                  <p className="text-lg text-gray-600 text-body leading-relaxed max-w-md">
                    Your safe space for finding calm in moments of stress.
                  </p>
                </div>

                {/* Daily Tip Section */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-[#2C3E50] heading-display">Daily Tip</h3>
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border-l-4 border-[#7FA99B]">
                    <p className="text-gray-700 text-body leading-relaxed">
                      {tips[currentTip]}
                    </p>
                  </div>
                </div>

                {/* Resources Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-[#2C3E50] heading-display">Resources</h3>
                  <ul className="space-y-3">
                    <li>
                      <a
                        href="https://www.lifeline.org.au"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-3 text-[#4A90E2] hover:text-[#357ABD] transition-colors group"
                      >
                        <span className="w-2 h-2 rounded-full bg-[#7FA99B] group-hover:scale-125 transition-transform"></span>
                        <span className="underline underline-offset-2">Lifeline Australia</span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.beyondblue.org.au"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-3 text-[#4A90E2] hover:text-[#357ABD] transition-colors group"
                      >
                        <span className="w-2 h-2 rounded-full bg-[#7FA99B] group-hover:scale-125 transition-transform"></span>
                        <span className="underline underline-offset-2">Beyond Blue</span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.suicidecallbackservice.org.au"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-3 text-[#4A90E2] hover:text-[#357ABD] transition-colors group"
                      >
                        <span className="w-2 h-2 rounded-full bg-[#7FA99B] group-hover:scale-125 transition-transform"></span>
                        <span className="underline underline-offset-2">Suicide Call Back Service</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Right Content - Floating Cards */}
              <div className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-24 animate-slide-in-right" style={{ animationDelay: '0.2s' }}>

                {/* Before You Begin Card - White with Sage Header */}
                <div className="before-begin-card">
                  <div className="before-begin-header">
                    Before you begin:
                  </div>
                  <div className="before-begin-body">
                    <ul className="space-y-1">
                      <li>Find a quiet space.</li>
                      <li>Take a deep breath.</li>
                      <li>You are safe here.</li>
                    </ul>
                  </div>
                </div>

                {/* Start Session Button - Elevated White Card */}
                <button
                  onClick={handleStartSession}
                  className="start-session-btn"
                >
                  <span className="heading-display">Start Calming Session</span>
                  <div className="play-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                </button>
              </div>

            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-20 w-full py-8 px-6 md:px-8 mt-auto">
        <div className="max-w-[1000px] mx-auto border-t border-gray-200/60 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-1">
              <p className="text-gray-600 text-sm text-body">
                Have feedback? <a href="mailto:contact@anchor.com" className="text-[#4A90E2] hover:underline">Contact us</a>
              </p>
              <p className="text-gray-400 text-xs">© 2026 Anchor. All rights reserved.</p>
            </div>
            <CookieConsent />
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
