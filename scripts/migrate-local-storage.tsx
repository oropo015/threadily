"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, AlertCircle } from "lucide-react"

// Function to migrate localStorage keys from threadily to threadify
export function migrateLocalStorage() {
  if (typeof window === "undefined") return 0

  const keysToMigrate = ["language", "platform", "content", "threads", "find", "replace"]

  let migratedCount = 0

  keysToMigrate.forEach((key) => {
    const oldKey = `threadily-${key}`
    const newKey = `threadify-${key}`

    // Check if old key exists and new key doesn't
    if (localStorage.getItem(oldKey) !== null && localStorage.getItem(newKey) === null) {
      // Copy value from old key to new key
      localStorage.setItem(newKey, localStorage.getItem(oldKey) || "")
      migratedCount++

      // Optionally remove old key
      // localStorage.removeItem(oldKey);
    }
  })

  return migratedCount
}

// Add a function to run the migration automatically
export function autoMigrateLocalStorage() {
  const migratedCount = migrateLocalStorage()
  if (migratedCount > 0) {
    console.log(`Migrated ${migratedCount} localStorage items from threadily to threadify`)
  }
}

export default function MigrateLocalStorage() {
  const [migrationStatus, setMigrationStatus] = useState<"idle" | "migrating" | "success" | "no-data">("idle")
  const [migratedItems, setMigratedItems] = useState<string[]>([])

  useEffect(() => {
    // Automatically run migration on component mount
    autoMigrateLocalStorage()
  }, [])

  const handleManualMigration = () => {
    setMigrationStatus("migrating")

    // Keys to migrate from threadily-* to threadify-*
    const keysToMigrate = [
      "threadily-language",
      "threadily-platform",
      "threadily-theme",
      "threadily-history",
      "threadily-settings",
    ]

    const migrated: string[] = []

    // Check if we're in a browser environment
    if (typeof window !== "undefined") {
      keysToMigrate.forEach((oldKey) => {
        const value = localStorage.getItem(oldKey)

        if (value !== null) {
          // Create the new key name
          const newKey = oldKey.replace("threadily", "threadify")

          // Store the value under the new key
          localStorage.setItem(newKey, value)

          // Optionally remove the old key
          // localStorage.removeItem(oldKey)

          migrated.push(oldKey)
        }
      })
    }

    if (migrated.length > 0) {
      setMigratedItems(migrated)
      setMigrationStatus("success")
    } else {
      setMigrationStatus("no-data")
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Migrate Local Storage Data</CardTitle>
        <CardDescription>Migrate user data from "threadily-*" keys to "threadify-*" keys</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button onClick={handleManualMigration} disabled={migrationStatus === "migrating"}>
            {migrationStatus === "migrating" ? "Migrating..." : "Migrate Local Storage Data"}
          </Button>

          {migrationStatus === "success" && (
            <Alert
              variant="default"
              className="bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900"
            >
              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
              <AlertTitle>Migration Successful</AlertTitle>
              <AlertDescription>
                <p>Successfully migrated {migratedItems.length} items:</p>
                <ul className="list-disc list-inside mt-2 text-sm">
                  {migratedItems.map((item) => (
                    <li key={item}>
                      {item} → {item.replace("threadily", "threadify")}
                    </li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          {migrationStatus === "no-data" && (
            <Alert
              variant="default"
              className="bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-900"
            >
              <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
              <AlertTitle>No Data Found</AlertTitle>
              <AlertDescription>No local storage data with "threadily" prefix was found to migrate.</AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
