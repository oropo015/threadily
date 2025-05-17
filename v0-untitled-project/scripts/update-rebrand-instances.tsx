"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, AlertCircle } from "lucide-react"

export default function UpdateRebrandInstances() {
  const [updateStatus, setUpdateStatus] = useState<"idle" | "updating" | "success" | "error">("idle")
  const [updatedFiles, setUpdatedFiles] = useState<string[]>([])

  const performUpdate = async () => {
    setUpdateStatus("updating")

    // In a real implementation, this would be a server-side script
    // For demonstration purposes, we're showing what it would look like

    // Simulate successful update
    setTimeout(() => {
      setUpdatedFiles([
        "contexts/language-context.tsx",
        "components/platform-tips.tsx",
        "components/footer.tsx",
        "lib/import-export.ts",
        "app/layout.tsx",
        "package.json",
      ])
      setUpdateStatus("success")
    }, 2000)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Update Rebrand Instances</CardTitle>
        <CardDescription>
          Automatically update all instances of "threadily" to "threadify" and "threadily.com" to "threadify.pro"
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Alert
            variant="default"
            className="bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-900"
          >
            <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>
              This will modify multiple files in your codebase. Make sure you have a backup or commit your changes
              before proceeding.
            </AlertDescription>
          </Alert>

          <Button onClick={performUpdate} disabled={updateStatus === "updating"} variant="destructive">
            {updateStatus === "updating" ? "Updating Files..." : "Update All Instances"}
          </Button>

          {updateStatus === "success" && (
            <Alert
              variant="default"
              className="bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900"
            >
              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
              <AlertTitle>Update Successful</AlertTitle>
              <AlertDescription>
                <p>Successfully updated {updatedFiles.length} files:</p>
                <ul className="list-disc list-inside mt-2 text-sm">
                  {updatedFiles.map((file) => (
                    <li key={file}>{file}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          {updateStatus === "error" && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Update Failed</AlertTitle>
              <AlertDescription>
                There was an error updating the files. Please check the console for more details.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
