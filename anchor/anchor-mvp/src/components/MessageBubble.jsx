import React from 'react';

export default function MessageBubble({ role, content }) {
    const isUser = role === 'user';

    return (
        <div className={`flex w-full mb-6 ${isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}>
            <div
                className={`max-w-[85%] rounded-2xl px-6 py-4 text-base leading-relaxed shadow-sm
            ${isUser
                        ? 'bg-gradient-to-br from-[#4A90E2] to-[#357ABD] text-white rounded-tr-none shadow-blue-200'
                        : 'bg-white/80 backdrop-blur-sm text-[#2C3E50] rounded-tl-none border border-white/50'
                    }`}
            >
                {content}
            </div>
        </div>
    );
}
