import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!)

interface DisputeAnalysisRequest {
  claimantArguments: string[];
  respondentArguments: string[];
}

interface DisputeAnalysisResponse {
  status: string;
  analysis: {
    claimantLegalReferences: string[];
    respondentLegalReferences: string[];
    suggestedResolution: string;
    ethicalRecommendations: string[];
  };
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const analyzeDispute = async (
  claimantArgs: string[],
  respondentArgs: string[]
): Promise<DisputeAnalysisResponse> => {
  try {
    const response = await fetch(`${API_URL}/analyze-dispute`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        claimantArguments: claimantArgs,
        respondentArguments: respondentArgs,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error analyzing dispute:', error);
    throw error;
  }
}; 