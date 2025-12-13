const OpenAI = require('openai');

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const PROMPT_TEMPLATE = `
Tu es un expert en linguistique algérienne. Analyse le texte suivant pour identifier les néologismes, les expressions locales et le mélange de langues (français, arabe, derja, berbère).

Texte à analyser : "{TEXT_TO_ANALYZE}"

Réponds UNIQUEMENT avec un objet JSON valide respectant scrupuleusement ce format :
{
  "resume": "Un bref résumé du texte et de son contexte linguistique",
  "neologismsFound": [
    {
      "term": "Le mot ou l'expression identifié",
      "definition": "La définition ou l'explication du terme",
      "origin": "L'origine linguistique (ex: Derja, Français algérianisé, etc.)",
      "context": "Contexte d'utilisation",
      "examples": ["Exemple 1", "Exemple 2"],
      "grammarCategory": "Catégorie grammaticale (nom, verbe, etc.)",
      "region": "Région d'utilisation (ex: Alger, Oran, etc.)",
      "period": "Période d'apparition",
      "synonyms": ["Synonyme 1", "Synonyme 2"],
      "culturalNote": "Note culturelle ou explication sociale"
    }
  ]
}
`;

const cleanJson = (text) => {
    // Remove markdown code blocks if present
    return text.replace(/```json/g, '').replace(/```/g, '').trim();
};

const validateResponse = (data) => {
    if (!data.resume || !Array.isArray(data.neologismsFound)) {
        throw new Error("Invalid JSON structure from OpenAI");
    }
    return data;
};

/**
 * Analyzes text using DeepSeek API to find Algerian neologisms.
 * @param {string} text - The text to analyze.
 * @returns {Promise<Object>} - Contains { resume, neologismsFound }
 */
const analyzeTextWithDeepSeek = async (text) => {
    if (!process.env.OPENAI_API_KEY) {
        throw new Error("OpenAI API Key is missing in environment variables.");
    }

    try {
        const prompt = PROMPT_TEMPLATE.replace("{TEXT_TO_ANALYZE}", text);

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "Tu es un expert en linguistique algérienne. Réponds toujours en JSON valide." },
                { role: "user", content: prompt }
            ],
            temperature: 0.7,
            max_tokens: 2000
        });

        const responseText = completion.choices[0].message.content;
        console.log("OpenAI Raw Response:", responseText);

        // Parse and validate JSON
        const cleanedText = cleanJson(responseText);
        const jsonResponse = JSON.parse(cleanedText);

        return validateResponse(jsonResponse);

    } catch (error) {
        console.error("OpenAI Service Error:", error);
        console.error("Error details:", {
            message: error.message,
            status: error.status,
            response: error.response?.data
        });

        // Handle specific errors
        if (error.status === 401) {
            throw new Error("Unauthorized: Invalid OpenAI API Key");
        }
        if (error.status === 429) {
            throw new Error("Too Many Requests");
        }

        throw error;
    }
};

module.exports = { analyzeTextWithDeepSeek };
