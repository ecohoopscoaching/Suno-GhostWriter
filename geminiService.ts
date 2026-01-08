
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
       Use the themes and story from the document context provided above.`
    : "";

  let structure = "";
  if (data.performanceMode === 'solo_rap') {
    structure = `
    1. [Intro]: Cinematic build.
    2. [Verse 1]: ${rapper.tag}. 16 bars.
    3. [Refrain]: [Hook | ${rapper.name}]. Rhythmic and catchy.
    4. [Verse 2]: ${rapper.tag.replace(']', ' | Flow Switch]')}. 16 bars.
    5. [Refrain]: Repeat hook.
    6. [Outro]: [Outro | Fade Out].`;
  } else if (data.performanceMode === 'solo_singer') {
    structure = `
    1. [Intro]: Melodic start.
    2. [Verse 1]: ${singer.tag.replace('Chorus', 'Verse')}. 8-12 bars.
    3. [Chorus]: ${singer.tag}. Big vocal performance.
    4. [Verse 2]: ${singer.tag.replace('Chorus', 'Verse')}. 8-12 bars.
    5. [Chorus]: Repeat big vocal performance.
    6. [Bridge]: [Bridge | ${singer.name}]. Emotional high.
    7. [Outro]: [Outro | Vocal Fade].`;
  } else {
    structure = `
    1. [Intro]: Production intro.
    2. [Verse 1]: ${rapper.tag}. 8-12 bars.
    3. [Chorus]: ${singer.tag}. Vocal hook.
    4. [Verse 2]: ${rapper.tag.replace(']', ' | Flow Switch]')}. 8-12 bars.
    5. [Chorus]: Repeat hook.
    6. [Verse 3]: [Verse | Interaction]. Rapper and Singer together.
    7. [Outro]: [Outro | Interaction | Fade].`;
  }

  let specialPersonaInstructions = "";
  if (data.rapperName.includes("King Los")) {
    specialPersonaInstructions = `
      SPECIAL INSTRUCTION FOR 'THE ARCHITECT (KING LOS)' PERSONA:
      - Technique: FOCUS ON LYRICAL ARCHITECTURE. Build syllables like a master trade.
      - Syllable Matching: Every word must have a purpose. Match syllable counts across rhyming lines for a 'domino effect'.
      - Internal Rhyming: Rhyme words *inside* the lines as well as at the ends.
      - Elastic Flow: Change speeds instantly. Go from slow street-pace to rapid double-time. Indicate this with meta-tags like [Double-time] or [Staccato].
      - Wordplay: Use word-association double meanings (e.g. 'Ice-T Range and the beat coco' -> 'Ice-T TV and Coco'). 
      - Substance: Blend street scholarship with themes of spirituality, fatherhood, and guidance.
      - Flow Inspiration: Rhythmic motor of Krayzie Bone with the street scholar enunciation of Nas. No mumbling. Articulate every syllable.
    `;
  }

  const systemInstruction = `You are a world-class AI music ghostwriter. 
  Your goal is to write high-impact lyrics using Suno AI's meta-tagging system.
  
  ${contextInstruction}
  ${specialPersonaInstructions}

  MANDATORY STRUCTURE:${structure}

  Formatting Rules:
  - Do not use markdown like bolding.
  - Put all meta-tags on their own lines.
  - Write professional lyrics reflecting the production style: ${producer.style}.`;

  const prompt = `Write a song about: "${data.topic}".
  Producer Style: ${producer.name} (${producer.style}).
  Performance Mode: ${data.performanceMode.replace('_', ' ')}.
  Rapper: ${rapper.name}.
  Singer: ${singer.name}.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.8,
      },
    });

    const lyrics = response.text || "Failed to generate lyrics.";
    
    return {
      stylePrompt: producer.style,
      lyrics: lyrics,
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to connect to the ghostwriting engine.");
  }
};
