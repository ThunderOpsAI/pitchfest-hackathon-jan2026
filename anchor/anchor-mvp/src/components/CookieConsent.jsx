import React, { useState } from 'react';

export default function CookieConsent() {
    const [visible, setVisible] = useState(true);

    if (!visible) return null;

    return (
        <button
            onClick={() => setVisible(false)}
            className="fixed bottom-6 right-6 flex items-center bg-white border border-gray-200 shadow-lg px-4 py-2 rounded-lg hover:shadow-xl transition-all duration-300 z-50 group hover:bg-gray-50"
        >
            <div className="mr-3 text-slate-500 group-hover:text-slate-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 9a3 3 0 100-6 3 3 0 000 6zm0 2a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    {/* Simple accessibility icon representation */}
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0 1 1 0 002 0zm-1 3a1 1 0 00-1 1v4a1 1 0 002 0V9a1 1 0 00-1-1z" />
                </svg>
            </div>
            <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">Accept Cookies</span>
        </button>
    );
}
