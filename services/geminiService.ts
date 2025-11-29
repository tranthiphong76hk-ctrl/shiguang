import { GoogleGenAI, Type } from "@google/genai";

// Initialize Gemini Client
// Note: For Veo, we re-initialize to ensure the latest key is used if selected via UI.
const getAiClient = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateThinkingResponse = async (prompt: string): Promise<string> => {
  const ai = getAiClient();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 32768 },
      },
    });
    return response.text || "No response generated.";
  } catch (error) {
    console.error("Thinking Error:", error);
    throw error;
  }
};

export const generateFastResponse = async (prompt: string): Promise<string> => {
  const ai = getAiClient();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-flash-lite-latest',
      contents: prompt,
    });
    return response.text || "No response generated.";
  } catch (error) {
    console.error("Fast Response Error:", error);
    throw error;
  }
};

export const generateImage = async (prompt: string, size: '1K' | '2K' | '4K'): Promise<string> => {
  const ai = getAiClient();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        imageConfig: {
          imageSize: size,
          aspectRatio: "16:9",
        }
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No image data returned");
  } catch (error) {
    console.error("Image Gen Error:", error);
    throw error;
  }
};

export const generateVideo = async (
  prompt: string, 
  aspectRatio: '16:9' | '9:16', 
  imageBase64?: string
): Promise<string> => {
  // Ensure Key Selection for Veo
  if (window.aistudio) {
    const hasKey = await window.aistudio.hasSelectedApiKey();
    if (!hasKey) {
      await window.aistudio.openSelectKey();
    }
  }

  const ai = getAiClient(); // Re-init with potential new key context
  
  try {
    let operation;
    
    if (imageBase64) {
      // Image-to-Video
      operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt || "Animate this image cinematically",
        image: {
            imageBytes: imageBase64,
            mimeType: 'image/png' // Assuming PNG for simplicity, can act dynamic if needed
        },
        config: {
          numberOfVideos: 1,
          resolution: '720p', // Fast preview supports 720p
          aspectRatio: aspectRatio,
        }
      });
    } else {
      // Text-to-Video
      operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt,
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: aspectRatio,
        }
      });
    }

    // Polling Loop
    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 5000));
      operation = await ai.operations.getVideosOperation({ operation: operation });
    }

    const videoUri = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (!videoUri) throw new Error("Video generation failed to return URI");

    // Fetch the actual video blob
    const videoResponse = await fetch(`${videoUri}&key=${process.env.API_KEY}`);
    const blob = await videoResponse.blob();
    return URL.createObjectURL(blob);

  } catch (error) {
    console.error("Veo Error:", error);
    throw error;
  }
};

export const searchGrounding = async (query: string): Promise<{text: string, links: any[]}> => {
  const ai = getAiClient();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: query,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });
    
    return {
        text: response.text || "",
        links: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error) {
    console.error("Search Error:", error);
    throw error;
  }
}