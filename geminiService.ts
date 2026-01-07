
import { GoogleGenAI } from "@google/genai";
import { SongFormData, GenerationResult } from "./types";
import { PRODUCERS, RAPPERS, SINGERS } from "./constants";

export const generateHit = async (data: SongFormData): Promise<GenerationResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const producer = PRODUCERS.find(p => p.id === data.producerId) || PRODUCERS[0];
  const rapper = RAPPERS.find(r => r.name === data.rapperName) || RAPPERS[0];
  const singer = SINGERS.find(s => s.name === data.singerName) || SINGERS[0];

  const contextInstruction = data.fileContext 
    ? `EXTENDED CONTEXT FROM UPLOADED DOCUMENT:
       """
       ${data.fileContext.substring(0, 15000)} 
       """
       Use the themes, characters, and narrative from the text above as the primary inspiration for the song's story.`
    : "";

  const systemInstruction = `You are a world-class AI music ghostwriter. 
  Your task is to write high-impact lyrics using Suno AI's meta-tagging system.
  
  ${contextInstruction}

  MANDATORY STRUCTURE:
  1. [Intro]: Create a short intro tag based on ${producer.name}'s production style.
  2. [Verse 1]: Use EXACT tag: ${rapper.tag}. Write 8-12 bars.
  3. [Chorus]: Use EXACT tag: ${singer.tag}. Write a powerful 4-line hook.
  4. [Verse 2]: Use tag: ${rapper.tag.replace(']', ' | Flow Switch]')}. Write 8-12 bars that escalate the story.
  5. [Chorus]: Repeat the hook text exactly.
  6. [Verse 3]: Use tag: ${rapper.tag.replace(']', ' | High Intensity | Finale]')}. Write a final 8 bars that bring the song to a climax.
  7. [Outro]: [Outro | Fade Out].

  Formatting:
  - Do not use markdown like bolding.
  - Keep the meta-tags on their own line above the lyrics.
  - Lyrics must be professional, thematic, and rhythmic.`;

  const prompt = `Write a song about the topic/vibe: "${data.topic}".
  Production style: ${producer.style}.
  Rapper persona: ${rapper.name}.
  Singer persona: ${singer.name}.
  
  Ensure the story aligns with any provided document context.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.85,
      },
    });

    const lyrics = response.text || "Failed to generate lyrics.";
    
    return {
      stylePrompt: producer.style,
      lyrics: lyrics,
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to connect to the studio engine.");
  }
};
