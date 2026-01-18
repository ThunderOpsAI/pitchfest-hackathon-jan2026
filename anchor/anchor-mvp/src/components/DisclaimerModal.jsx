import React from 'react';

export default function DisclaimerModal({ onAccept }) {
    const handleAccept = () => {
        onAccept();
    };

    return (
        <div
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-50 p-4 transition-all duration-300"
            role="dialog"
            aria-labelledby="disclaimer-title"
            aria-describedby="disclaimer-description"
        >
            <div className="bg-[#6B8E85] text-white rounded-[2rem] shadow-2xl max-w-md w-full p-10 text-left animate-fade-in relative overflow-hidden ring-1 ring-white/20">
                {/* Subtle decorative elements matching the design */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-500/20 blur-xl"></div>

                <div className="relative z-10">
                    <h2
                        id="disclaimer-title"
                        className="text-2xl font-bold mb-6 text-white tracking-tight"
                    >
                        Before you begin:
                    </h2>

                    <div
                        id="disclaimer-description"
                        className="space-y-3 mb-8 text-white/90 font-medium text-lg leading-relaxed"
                    >
                        <ul className="list-disc ml-5 space-y-2">
                            <li>Find a quiet space.</li>
                            <li>Take a deep breath.</li>
                            <li>You are safe here.</li>
                        </ul>
                    </div>

                    <button
                        onClick={handleAccept}
                        className="w-full bg-white text-[#6B8E85] font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-white/30"
                    >
                        Start Calming Session
                    </button>

                    <div className="mt-6 text-xs text-white/60 text-center">
                        <p>Anchor is an AI demo. Not for medical emergencies.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
