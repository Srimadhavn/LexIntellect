export async function analyzeContract(file: File) {
  const formData = new FormData()
  formData.append('file', file)

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_FLASK_API_URL}/analyze`, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Analysis failed')
    }

    return await response.json()
  } catch (error) {
    console.error('Analysis error:', error)
    throw error
  }
}

export async function getAnalysisHistory() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_FLASK_API_URL}/analysis/history`, {
      headers: {
        'Accept': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch analysis history')
    }

    return await response.json()
  } catch (error) {
    console.error('Fetch error:', error)
    throw error
  }
} 