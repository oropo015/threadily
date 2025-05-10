import type { PlatformKey } from "./constants"

export interface ThreadExportData {
  version: string
  timestamp: number
  platform: PlatformKey
  content: string
  threads: string[]
}

export function exportThread(content: string, threads: string[], platform: PlatformKey): string {
  const exportData: ThreadExportData = {
    version: "1.0",
    timestamp: Date.now(),
    platform,
    content,
    threads,
  }

  return JSON.stringify(exportData, null, 2)
}

export function downloadThreadAsJson(content: string, threads: string[], platform: PlatformKey): void {
  const exportData = exportThread(content, threads, platform)
  const blob = new Blob([exportData], { type: "application/json" })
  const url = URL.createObjectURL(blob)

  const a = document.createElement("a")
  a.href = url
  a.download = `ritetext-thread-${new Date().toISOString().slice(0, 10)}.json`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export function downloadThreadAsText(content: string, threads: string[]): void {
  const textContent =
    threads.length > 0 ? threads.map((thread, i) => `--- Post ${i + 1} ---\n${thread}`).join("\n\n") : content

  const blob = new Blob([textContent], { type: "text/plain" })
  const url = URL.createObjectURL(blob)

  const a = document.createElement("a")
  a.href = url
  a.download = `ritetext-thread-${new Date().toISOString().slice(0, 10)}.txt`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export async function importThreadFromFile(file: File): Promise<ThreadExportData | string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (event) => {
      try {
        const result = event.target?.result
        if (typeof result !== "string") {
          reject(new Error("Invalid file content"))
          return
        }

        // Check if it's JSON
        if (file.type === "application/json") {
          try {
            const data = JSON.parse(result) as ThreadExportData
            if (!data.version || !data.content) {
              reject(new Error("Invalid thread data format"))
              return
            }
            resolve(data)
          } catch (e) {
            reject(new Error("Invalid JSON format"))
          }
        } else {
          // Treat as plain text
          resolve(result)
        }
      } catch (e) {
        reject(e)
      }
    }

    reader.onerror = () => {
      reject(new Error("Error reading file"))
    }

    if (file.type === "application/json") {
      reader.readAsText(file)
    } else {
      reader.readAsText(file)
    }
  })
}
