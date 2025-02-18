export async function uploadDocument(file: File) {
  const formData = new FormData()
  formData.append('file', file)

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_FLASK_API_URL}/analyze`, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error('Upload failed')
    }

    return await response.json()
  } catch (error) {
    console.error('Upload error:', error)
    throw error
  }
} 