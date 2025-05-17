import sharp from "sharp"
import path from "path"
import fs from "fs"
import { createHash } from "crypto"

interface ImageProcessingOptions {
  width?: number
  height?: number
  quality?: number
  format?: "webp" | "jpeg" | "png" | "avif"
}

export async function processAndSaveImage(
  imageUrl: string,
  destinationDir: string,
  options: ImageProcessingOptions = {},
): Promise<string> {
  try {
    // Create hash of URL for filename
    const urlHash = createHash("md5").update(imageUrl).digest("hex").substring(0, 10)

    // Set defaults
    const { width = 1200, height, quality = 80, format = "webp" } = options

    // Create destination directory if it doesn't exist
    const publicDir = path.join(process.cwd(), "public")
    const fullDestDir = path.join(publicDir, destinationDir)

    if (!fs.existsSync(fullDestDir)) {
      fs.mkdirSync(fullDestDir, { recursive: true })
    }

    // Generate filename
    const filename = `${urlHash}-${width}${height ? `x${height}` : ""}.${format}`
    const outputPath = path.join(fullDestDir, filename)
    const publicPath = path.join(destinationDir, filename)

    // Skip processing if file already exists
    if (fs.existsSync(outputPath)) {
      return `/${publicPath.replace(/\\/g, "/")}`
    }

    // Fetch image
    const response = await fetch(imageUrl)
    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Process image with sharp
    let sharpInstance = sharp(buffer)

    // Resize
    if (width || height) {
      sharpInstance = sharpInstance.resize({
        width,
        height,
        fit: "cover",
        position: "attention", // Focus on the important part of the image
      })
    }

    // Convert to desired format
    switch (format) {
      case "webp":
        sharpInstance = sharpInstance.webp({ quality })
        break
      case "jpeg":
        sharpInstance = sharpInstance.jpeg({ quality })
        break
      case "png":
        sharpInstance = sharpInstance.png({ quality })
        break
      case "avif":
        sharpInstance = sharpInstance.avif({ quality })
        break
    }

    // Save to file
    await sharpInstance.toFile(outputPath)

    // Return public path
    return `/${publicPath.replace(/\\/g, "/")}`
  } catch (error) {
    console.error("Error processing image:", error)
    return imageUrl // Return original URL if processing fails
  }
}

export function generatePlaceholder(width: number, height: number, text: string): string {
  return `/placeholder.svg?height=${height}&width=${width}&query=${encodeURIComponent(text)}`
}
