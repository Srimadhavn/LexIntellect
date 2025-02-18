import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from "@google/generative-ai"

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "")
const model = genAI.getGenerativeModel({ model: "gemini-pro" })

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const fileContent = await file.text()

    // Analyze the document using Gemini
    const prompt = `Analyze this legal document and provide:
    1. A brief summary
    2. Key points
    3. Potential risks
    4. Document metadata
    
    Document content:
    ${fileContent}`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    // Parse and structure the response
    // This is a simple example - you'll want to improve the parsing logic
    const analysis = {
      summary: text.split('Summary:')[1]?.split('\n')[0]?.trim() || '',
      keyPoints: text.match(/Key points:([\s\S]*?)(?=Potential risks:)/)?.[1]
        ?.split('\n')
        .filter(point => point.trim())
        .map(point => point.replace(/^-\s*/, '')) || [],
      risks: text.match(/Potential risks:([\s\S]*?)(?=Document metadata:)/)?.[1]
        ?.split('\n')
        .filter(risk => risk.trim())
        .map(risk => risk.replace(/^-\s*/, '')) || [],
      metadata: {
        type: text.match(/Type:\s*(.*)/)?.[1] || 'Unknown',
        date: text.match(/Date:\s*(.*)/)?.[1] || 'Unknown',
        parties: text.match(/Parties:\s*(.*)/)?.[1]?.split(',').map(p => p.trim()) || [],
      }
    }

    return NextResponse.json(analysis)
  } catch (error) {
    console.error('Analysis error:', error)
    return NextResponse.json(
      { error: 'Analysis failed' },
      { status: 500 }
    )
  }
} 