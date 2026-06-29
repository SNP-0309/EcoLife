const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const analyzeWaste = async (imageUrl) => {
  try {
    const prompt = `
You are an AI waste classification expert.

Analyze the image and respond ONLY in valid JSON.

{
  "wasteType": "",
  "category": "",
  "recyclable": true,
  "confidence": 0,
  "ecoScore": 0,
  "recyclingInstructions": "",
  "environmentalImpact": ""
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              fileData: {
                fileUri: imageUrl,
                mimeType: "image/jpeg",
              },
            },
            {
              text: prompt,
            },
          ],
        },
      ],
    });

    const text = response.text;

    // Remove markdown if Gemini wraps the JSON
    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleaned);

  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};

module.exports = analyzeWaste;