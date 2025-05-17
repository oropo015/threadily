// Function to export thread data as JSON
export function downloadThreadAsJson(data: any, threadPosts: any, platform: string) {
  const jsonString = JSON.stringify({ content: data, threads: threadPosts, platform: platform }, null, 2)
  const blob = new Blob([jsonString], { type: "application/json" })
  const url = URL.createObjectURL(blob)

  const a = document.createElement("a")
  a.href = url
  a.download = `threadify-thread-${new Date().toISOString().slice(0, 10)}.json`
  document.body.appendChild(a)
  a.click()

  // Clean up
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

// Function to export thread data as plain text
export function downloadThreadAsText(data: string, threadPosts: string[]) {
  const textContent = data + "\n\n---\n\n" + threadPosts.join("\n\n---\n\n")
  const blob = new Blob([textContent], { type: "text/plain" })
  const url = URL.createObjectURL(blob)

  const a = document.createElement("a")
  a.href = url
  a.download = `threadify-thread-${new Date().toISOString().slice(0, 10)}.txt`
  document.body.appendChild(a)
  a.click()

  // Clean up
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

// Function to import thread data from JSON file
export function importThreadFromFile(file: File): Promise<any> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string)
        resolve(data)
      } catch (error) {
        reject(new Error("Invalid JSON file"))
      }
    }

    reader.onerror = () => {
      reject(new Error("Error reading file"))
    }

    reader.readAsText(file)
  })
}
