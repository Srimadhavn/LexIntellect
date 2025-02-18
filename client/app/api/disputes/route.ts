import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const data = await req.json()
    // Create dispute in database
    // Send notifications to parties
    return NextResponse.json({ success: true, data })
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 })
  }
} 