async function uploadFile(selectedFile) {
    try {
        const formData = new FormData();
        formData.append('file', selectedFile);

        const response = await fetch('http://localhost:5000/upload', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return {
            summary: data.summary,
            loopholes: data.loopholes
        };
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
} 