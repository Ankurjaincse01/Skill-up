// Import Google Generative AI SDK and prompt templates
// const { GoogleGenerativeAI } = require("@google/generative-ai");
const Groq = require("groq-sdk");
const { questionAnswerPrompt, conceptExplainPrompt } = require("../utils/prompts");

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Custom JSON parser to handle improperly escaped JSON from AI responses
const safeJSONParse = (jsonString) => {
  try {
    return JSON.parse(jsonString);
  } catch (e) {
    let cleaned = jsonString
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/```\s*$/i, '')
      .trim();

    // Remove control characters outside of strings
    cleaned = cleaned.replace(/[\x00-\x1F\x7F]/g, (match) => {
      if (match === '\n' || match === '\r' || match === '\t') {
        return match;
      }
      return '';
    });

    let result = '';
    let inString = false;
    let escapeNext = false;

    for (let i = 0; i < cleaned.length; i++) {
      const char = cleaned[i];
      const nextChar = cleaned[i + 1];

      if (escapeNext) {
        result += char;
        escapeNext = false;
        continue;
      }

      if (char === '\\' && inString) {
        if (nextChar && /["\\\/bfnrtu]/.test(nextChar)) {
          result += char;
          escapeNext = true;
        } else if (nextChar === '\n') {
          result += '\\n';
          escapeNext = true;
        } else if (nextChar === '\r') {
          result += '\\r';
          escapeNext = true;
        } else if (nextChar === '\t') {
          result += '\\t';
          escapeNext = true;
        }
        continue;
      }

      if (char === '"' && !escapeNext) {
        inString = !inString;
        result += char;
        continue;
      }

      if (inString) {
        if (char === '\n') {
          result += '\\n';
        } else if (char === '\r') {
          result += '\\r';
        } else if (char === '\t') {
          result += '\\t';
        } else if (char.charCodeAt(0) < 32) {
          continue;
        } else {
          result += char;
        }
      } else {
        result += char;
      }
    }

    try {
      return JSON.parse(result);
    } catch (e2) {
      console.error("JSON parsing failed:", e2.message);
      throw new Error(`JSON Parse Error: ${e.message}`);
    }
  }
};

// Generate interview questions using Groq AI (Gemini Alternative)
// POST /ai/generate-questions
const generateInterviewQuestions = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

    let count = parseInt(numberOfQuestions) || 10;
    if (count > 20) count = 20;
    if (count < 0) count = 0;

    const topics = Array.isArray(topicsToFocus)
      ? topicsToFocus.join(", ")
      : String(topicsToFocus);

    const prompt = questionAnswerPrompt(role, experience, topics, count);

    // --- Groq Implementation ---
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile",
    });
    const rawText = chatCompletion.choices[0]?.message?.content || "";

    const cleanedText = rawText
      .replace(/^```\s*json\s*/i, "")
      .replace(/```\s*$/i, "")
      .trim();

    const data = safeJSONParse(cleanedText);

    return res.status(200).json(data);
  } catch (error) {
    console.error("[Groq AI] Error:", error.message);
    return res.status(500).json({
      message: "Failed to generate questions",
      error: error.message,
    });
  }
};

// Generate concept explanation using Groq AI
// POST /ai/generate-explanation
const generateConceptExplanation = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        message: "question is required",
      });
    }

    // --- Groq Implementation ---
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: conceptExplainPrompt(question),
        },
      ],
      model: "llama-3.3-70b-versatile",
    });
    const rawText = chatCompletion.choices[0]?.message?.content || "";

    const cleanedText = rawText
      .replace(/^```\s*json\s*/i, "")
      .replace(/```\s*$/i, "")
      .trim();

    const data = safeJSONParse(cleanedText);

    return res.status(200).json(data);
  } catch (error) {
    console.error("[Groq AI] Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to generate explanation",
      error: error.message,
    });
  }
};

module.exports = {
  generateInterviewQuestions,
  generateConceptExplanation,
};
