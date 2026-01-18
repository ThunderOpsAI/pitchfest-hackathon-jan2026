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
