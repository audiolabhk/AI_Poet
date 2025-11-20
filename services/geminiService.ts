import { GoogleGenAI } from "@google/genai";

// Fix: Initialize GoogleGenAI directly with process.env.API_KEY as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generatePoem(prompt: string, temperature: number, maxTokens: number): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        temperature: temperature,
        maxOutputTokens: maxTokens,
        // Reserve a portion of tokens for thinking to avoid empty responses
        thinkingConfig: { thinkingBudget: Math.floor(maxTokens * 0.25) }
      },
    });

    const text = response.text;
    if (text) {
        return text.trim();
    } else {
        throw new Error("The AI returned an empty response. Try adjusting the parameters.");
    }
  } catch (error) {
    console.error("Error generating poem with Gemini:", error);
    // Provide a more user-friendly error message
    if (error instanceof Error && error.message.includes('SAFETY')) {
        return "The generated content was blocked due to safety settings. Please try a different subject.";
    }
    throw new Error("Failed to generate poem. Please check your API key and network connection.");
  }
}