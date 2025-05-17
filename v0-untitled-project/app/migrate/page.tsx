"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, AlertCircle, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function MigratePage() {
  const [migrationStatus, setMigrationStatus] = useState<"idle" | "migrating" | "success" | "no-data">("idle")
  const [migratedItems, setMigratedItems] = useState<{ oldKey: string; newKey: string }[]>([])

  const migrateLocalStorage = () => {
    setMigrationStatus("migrating")

    // Keys to migrate from threadily-* to threadify-*
    const keysToMigrate = [
      { old: "threadily-language", new: "threadify-language" },
      { old: "threadily-platform", new: "threadify-platform" },
      { old: "threadily-theme", new: "threadify-theme" },
      { old: "threadily-history", new: "threadify-history" },
      { old: "threadily-settings", new: "threadify-settings" },
    ]

    const migrated: { oldKey: string; newKey: string }[] = []

    // Check if we're in a browser environment
    if (typeof window !== "undefined") {
      keysToMigrate.forEach(({ old, new: newKey }) => {
        const value = localStorage.getItem(old)

        if (value !== null) {
          // Store the value under the new key
          localStorage.setItem(newKey, value)

          // Optionally remove the old key
          // localStorage.removeItem(old)

          migrated.push({ oldKey: old, newKey })
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

  // Auto-migrate on page load
  useEffect(() => {
    migrateLocalStorage()
  }, [])

  return (
    <div className="container mx-auto px-4 py-12 max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>Data Migration</CardTitle>
          <CardDescription>Migrating from threadily to threadify</CardDescription>
        </CardHeader>
        <CardContent>
          {migrationStatus === "migrating" && (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          )}

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
                  {migratedItems.map((item, index) => (
                    <li key={index}>
                      {item.oldKey} → {item.newKey}
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
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/">
            <Button className="flex items-center gap-2">
              Continue to Threadify <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
