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
