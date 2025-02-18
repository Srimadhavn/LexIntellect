import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from "@google/generative-ai"

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!)

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Get the dispute details from the request
    const dispute = await req.json()
    
    // Initialize the model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })

    // Craft a detailed prompt for dispute analysis
    const prompt = `
      As a legal mediator, analyze this dispute and propose a fair solution:
      
      Title: ${dispute.title}
      Party A: ${dispute.partyA}
      Party B: ${dispute.partyB}
      Description: ${dispute.description}
      
      Please provide:
      1. Analysis of both parties' positions
      2. Key legal considerations
      3. Proposed fair solution
      4. Recommended next steps
      5. Potential compromises
      
      Format the response in a clear, structured manner.
    `

    // Generate the analysis
    const result = await model.generateContent(prompt)
    const response = await result.response
    const analysis = response.text()

    // Structure the response
    const solution = {
      analysis: analysis,
      timestamp: new Date().toISOString(),
      status: "completed"
    }

    return NextResponse.json({
      success: true,
      solution: solution
    })
  } catch (error) {
    console.error('Dispute analysis error:', error)
    return NextResponse.json({ 
      success: false, 
      error: "Failed to analyze dispute" 
    }, { status: 500 })
  }
} 