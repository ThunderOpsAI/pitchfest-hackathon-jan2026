/**
 * Calls OpenAI API for chat completion
 * @param {Array} messages - Conversation history
 * @returns {Promise<string>} - AI response text
 */
export async function getAIResponse(messages) {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    const model = import.meta.env.VITE_OPENAI_MODEL || 'gpt-4o-mini';

    if (!apiKey) {
        console.error('OpenAI API key missing');
        // Simulate a response for demo purposes if key is missing, or throw
        // For MVP, let's throw so we know configuration is wrong, but maybe handle gracefully in UI
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
            const errData = await response.json();
            throw new Error(`OpenAI API error: ${response.status} - ${JSON.stringify(errData)}`);
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
