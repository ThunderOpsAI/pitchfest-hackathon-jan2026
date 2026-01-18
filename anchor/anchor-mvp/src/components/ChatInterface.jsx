import React, { useState, useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';

export default function ChatInterface({ messages, onSendMessage, loading }) {
    const [inputObj, setInputObj] = useState('');
    const [darkMode, setDarkMode] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, loading]);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!inputObj.trim() || loading) return;

        onSendMessage(inputObj);
        setInputObj('');
    };

    return (
        <div className="flex flex-col h-full bg-transparent">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 custom-scrollbar">
                {messages.map((msg, index) => (
                    <MessageBubble key={index} role={msg.role} content={msg.content} />
                ))}
                {loading && (
                    <div className="flex justify-start mb-4">
                        <div className="bg-white/50 backdrop-blur-sm text-[#2C3E50] rounded-2xl rounded-tl-none px-5 py-3 shadow-sm flex items-center space-x-2 border border-white/40">
                            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-white/30 bg-white/20 backdrop-blur-md rounded-b-3xl">
                <form onSubmit={handleSubmit} className="flex items-center space-x-3">
                    <button type="button" className="text-gray-500 hover:text-[#4A90E2] transition-colors p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                    <input
                        ref={inputRef}
                        type="text"
                        value={inputObj}
                        onChange={(e) => setInputObj(e.target.value)}
                        disabled={loading}
                        placeholder="Type your response..."
                        className="flex-1 bg-white/60 border border-white/50 rounded-full px-6 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#4A90E2]/50 focus:bg-white transition-all placeholder-gray-500 text-gray-800"
                    />
                    <button
                        type="submit"
                        disabled={!inputObj.trim() || loading}
                        className="bg-[#4A90E2] hover:bg-[#357ABD] disabled:bg-gray-400/50 text-white rounded-full p-3 transition-all shadow-md transform hover:scale-105"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    );
}
