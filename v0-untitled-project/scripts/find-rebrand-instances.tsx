"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function FindRebrandInstances() {
  const [results, setResults] = useState<{ file: string; line: number; content: string }[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const searchTerms = ["threadily", "threadily.com", "threadily-", "Threadily"]

  const runSearch = async () => {
    setIsSearching(true)
    // In a real implementation, this would be a server-side script
    // For demonstration purposes, we're showing what it would look like

    setResults([
      {
        file: "contexts/language-context.tsx",
        line: 42,
        content: 'localStorage.setItem("threadily-language", language)',
      },
      {
        file: "contexts/language-context.tsx",
        line: 87,
        content: 'const savedLanguage = localStorage.getItem("threadily-language")',
      },
      {
        file: "components/platform-tips.tsx",
        line: 15,
        content: 'const savedPlatform = localStorage.getItem("threadily-platform")',
      },
      { file: "components/footer.tsx", line: 23, content: "© {year} threadily. All rights reserved." },
      {
        file: "lib/import-export.ts",
        line: 18,
        content: "a.download = `threadily-thread-${new Date().toISOString().slice(0, 10)}.json`",
      },
      {
        file: "lib/import-export.ts",
        line: 34,
        content: "a.download = `threadily-thread-${new Date().toISOString().slice(0, 10)}.txt`",
      },
      {
        file: "app/layout.tsx",
        line: 12,
        content: "<title>threadily - Format your text for social media threads</title>",
      },
      {
        file: "app/layout.tsx",
        line: 13,
        content: '<meta name="description" content="threadily helps you format your text for social media threads" />',
      },
      {
        file: "app/layout.tsx",
        line: 15,
        content: '<meta property="og:title" content="threadily - Social Media Thread Generator" />',
      },
      {
        file: "app/layout.tsx",
        line: 16,
        content:
          '<meta property="og:description" content="threadily helps you format your text for social media threads" />',
      },
      { file: "app/layout.tsx", line: 17, content: '<meta property="og:url" content="https://threadily.com" />' },
      {
        file: "app/layout.tsx",
        line: 21,
        content: '<meta name="twitter:title" content="threadily - Social Media Thread Generator" />',
      },
      {
        file: "app/layout.tsx",
        line: 22,
        content:
          '<meta name="twitter:description" content="threadily helps you format your text for social media threads" />',
      },
      { file: "app/layout.tsx", line: 23, content: '<meta name="twitter:url" content="https://threadily.com" />' },
      { file: "package.json", line: 2, content: '"name": "threadily",' },
    ])

    setIsSearching(false)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Rebrand Search Results</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={runSearch} disabled={isSearching} className="mb-4">
          {isSearching ? "Searching..." : "Find All Instances"}
        </Button>

        {results.length > 0 && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Found {results.length} instances of "threadily" in the codebase:
            </p>
            <div className="border rounded-md overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="p-2 text-left">File</th>
                    <th className="p-2 text-left">Line</th>
                    <th className="p-2 text-left">Content</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result, i) => (
                    <tr key={i} className="border-t">
                      <td className="p-2 font-mono text-xs">{result.file}</td>
                      <td className="p-2 text-center">{result.line}</td>
                      <td className="p-2 font-mono text-xs whitespace-pre-wrap">{result.content}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
