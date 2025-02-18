import { GoogleGenerativeAI } from "@google/generative-ai"
import { NextResponse } from "next/server"
import { createWorker } from 'tesseract.js'
import * as pdfjs from 'pdfjs-dist'

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_KEY || "")

async function extractTextFromPDF(pdfData: ArrayBuffer): Promise<string> {
  try {
    const loadingTask = pdfjs.getDocument(new Uint8Array(pdfData))
    const pdf = await loadingTask.promise
    let fullText = ''

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i)
      const textContent = await page.getTextContent()
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ')
      fullText += pageText + '\n'
    }

    return fullText
  } catch (error) {
    console.error('Error extracting text from PDF:', error)
    return ''
  }
}

async function performOCR(imageData: ArrayBuffer): Promise<string> {
  const worker = await createWorker()
  
  try {
    const buffer = Buffer.from(imageData)
    const { data: { text } } = await worker.recognize(buffer)
    return text
  } finally {
    await worker.terminate()
  }
}

async function processDocument(file: ArrayBuffer, fileName: string): Promise<string> {
  try {
    // First try to extract text directly from PDF
    let text = await extractTextFromPDF(file)

    // If no text was extracted, try OCR
    if (!text.trim()) {
      text = await performOCR(file)
    }

    return text
  } catch (error) {
    console.error(`Error processing document ${fileName}:`, error)
    return ''
  }
}

function truncateText(text: string, maxLength: number = 15000): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + "..."
}

export async function POST(req: Request) {
  try {
    if (!process.env.GOOGLE_AI_KEY) {
      throw new Error("GOOGLE_AI_KEY is not configured")
    }

    const formData = await req.formData()
    const files = formData.getAll('files') as File[]

    if (!files.length) {
      return NextResponse.json(
        { error: 'Please upload at least one document' },
        { status: 400 }
      )
    }

    // Process documents
    const processedTexts = await Promise.all(
      files.map(async (file) => {
        const buffer = await file.arrayBuffer()
        const text = await processDocument(buffer, file.name)
        return `Document: ${file.name}\n${text}`
      })
    )

    const model = genAI.getGenerativeModel({ model: "gemini-pro" })

    const result = await model.generateContent({
      contents: [{
        role: "user",
        parts: [{
          text: `You are a legal expert AI. Analyze these legal documents and respond ONLY with a JSON object in the exact format shown below.

          DOCUMENTS TO ANALYZE:
          ${processedTexts.join('\n\n')}

          REQUIRED JSON FORMAT:
          {
            "caseSummary": "brief summary of the case",
            "winProbability": 50,
            "recommendedSteps": [
              "first specific step",
              "second specific step",
              "third specific step"
            ],
            "oppositionWeaknesses": [
              "first weakness",
              "second weakness",
              "third weakness"
            ],
            "keyEvidenceStrength": {
              "documentName": "strong"
            },
            "riskFactors": [
              "first risk",
              "second risk",
              "third risk"
            ],
            "documentAnalysis": {
              "keyFindings": [
                "first finding",
                "second finding",
                "third finding"
              ],
              "missingElements": [
                "first missing element",
                "second missing element",
                "third missing element"
              ]
            }
          }

          IMPORTANT: Respond ONLY with the JSON object. No other text.`
        }]
      }]
    })

    const text = result.response.text().trim()
    
    try {
      const analysis = JSON.parse(text)
      
      // Validate required fields with default values
      const validatedAnalysis = {
        caseSummary: analysis.caseSummary || "Case analysis completed",
        winProbability: Number(analysis.winProbability) || 50,
        recommendedSteps: (analysis.recommendedSteps || []).slice(0, 3),
        oppositionWeaknesses: (analysis.oppositionWeaknesses || []).slice(0, 3),
        keyEvidenceStrength: analysis.keyEvidenceStrength || {},
        riskFactors: (analysis.riskFactors || []).slice(0, 3),
        documentAnalysis: {
          keyFindings: (analysis.documentAnalysis?.keyFindings || []).slice(0, 3),
          missingElements: (analysis.documentAnalysis?.missingElements || []).slice(0, 3)
        }
      }

      return NextResponse.json(validatedAnalysis)
    } catch (parseError) {
      console.error('Raw AI response:', text)
      return NextResponse.json({
        error: 'Failed to parse analysis results',
        details: text
      }, { status: 500 })
    }

  } catch (error) {
    console.error('Analysis failed:', error)
    return NextResponse.json(
      { error: 'Failed to analyze documents. Please try again.' },
      { status: 500 }
    )
  }
} 