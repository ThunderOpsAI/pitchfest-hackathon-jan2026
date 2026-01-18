import React from 'react';

export default function SafetyScreen({ onExit }) {
    return (
        <div className="fixed inset-0 bg-gradient-to-br from-orange-50 to-red-50 z-50 flex flex-col items-center justify-center p-6 text-center animate-fade-in backdrop-blur-sm">
            <div className="max-w-md w-full bg-white/60 backdrop-blur-xl border border-white/50 p-8 rounded-3xl shadow-2xl">
                <div className="mb-6 text-[#E67E22] bg-orange-100/50 w-24 h-24 mx-auto rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>

                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                    We're Here to Help
                </h1>

                <p className="text-gray-700 text-base mb-8 leading-relaxed">
                    I'm really sorry you're feeling this way. I can't provide the help you
                    need right now, but there are people who can support you immediately.
                </p>

                <div className="space-y-3 mb-8">
                    <a href="tel:131114" className="flex items-center justify-between bg-white/80 border border-blue-100 p-4 rounded-xl hover:border-blue-300 transition-colors shadow-sm group">
                        <span className="text-gray-600 font-medium">Lifeline (24/7)</span>
                        <span className="text-lg font-bold text-[#4A90E2] group-hover:underline">13 11 14</span>
                    </a>

                    <a href="tel:1300659467" className="flex items-center justify-between bg-white/80 border border-blue-100 p-4 rounded-xl hover:border-blue-300 transition-colors shadow-sm group">
                        <span className="text-gray-600 font-medium">Suicide Call Back</span>
                        <span className="text-lg font-bold text-[#4A90E2] group-hover:underline">1300 659 467</span>
                    </a>

                    <a href="tel:000" className="flex items-center justify-between bg-white/80 border border-red-100 p-4 rounded-xl hover:border-red-300 transition-colors shadow-sm group">
                        <span className="text-gray-600 font-medium">Emergency</span>
                        <span className="text-lg font-bold text-red-600 group-hover:underline">000</span>
                    </a>
                </div>

                <div className="bg-blue-50/50 p-6 rounded-2xl mb-8 border border-blue-100/50">
                    <p className="text-gray-600 italic text-sm">
                        "While you reach out for help, try to take a deep breath.
                        Name 3 things you can see around you right now."
                    </p>
                </div>

                <button
                    onClick={onExit}
                    className="text-gray-500 hover:text-gray-800 text-sm font-medium py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors"
                >
                    I'm Safe Now (Exit Safety Mode)
                </button>
            </div>
        </div>
    );
}
