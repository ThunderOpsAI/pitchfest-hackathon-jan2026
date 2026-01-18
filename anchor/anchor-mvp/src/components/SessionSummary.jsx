import React from 'react';

export default function SessionSummary({ onStartNew }) {
    // Static summary for MVP - in a real app this would be derived from the session
    const summary = {
        technique: "Grounding and Breathing",
        takeaway: "Connecting to your senses helps ground you in the present moment."
    };

    return (
        <div className="flex flex-col items-center justify-center p-2 animate-fade-in h-full">
            <div className="w-full max-w-lg text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#8FBC8F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>

                <h2 className="text-3xl font-bold text-[#2C3E50] mb-2 tracking-tight">Session Complete</h2>
                <p className="text-gray-500 mb-10 text-lg">Great work taking time for yourself.</p>

                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 mb-10 text-left space-y-6 border border-white/50 shadow-sm">
                    <div>
                        <p className="text-xs font-bold text-[#4A90E2] uppercase tracking-wider mb-2">We Practiced</p>
                        <p className="text-[#2C3E50] font-medium text-lg border-l-4 border-[#4A90E2] pl-4">{summary.technique}</p>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-[#4A90E2] uppercase tracking-wider mb-2">Remember</p>
                        <p className="text-[#2C3E50] font-medium text-lg border-l-4 border-[#8FBC8F] pl-4">{summary.takeaway}</p>
                    </div>
                </div>

                <p className="text-gray-600 mb-10 text-base leading-relaxed italic max-w-md mx-auto">
                    "These techniques get easier with practice. Try to use them whenever you feel overwhelmed."
                </p>

                <button
                    onClick={onStartNew}
                    className="w-full bg-gradient-to-r from-[#4A90E2] to-[#357ABD] hover:from-[#357ABD] hover:to-[#2A5298] text-white font-bold py-4 px-6 rounded-xl transition-all shadow-md hover:shadow-lg transform hover:scale-[1.02]"
                >
                    Start New Session
                </button>
            </div>
        </div>
    );
}
