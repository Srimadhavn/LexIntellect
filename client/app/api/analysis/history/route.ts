import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Here you would typically fetch from your database
    // For now, we'll return mock data
    const analysisHistory = [
      {
        id: 1,
        fileName: "Contract_A.pdf",
        date: "2024-03-15",
        status: "Completed",
      },
      {
        id: 2,
        fileName: "Agreement_B.pdf",
        date: "2024-03-14",
        status: "Completed",
      }
    ]

    return NextResponse.json(analysisHistory)
  } catch (error) {
    console.error('Fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analysis history' },
      { status: 500 }
    )
  }
} 