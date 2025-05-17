"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"

export default function RebrandPlan() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({})

  const toggleItem = (id: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const sections = [
    {
      title: "1. Code Changes",
      items: [
        { id: "code-1", text: "Update all localStorage keys from 'threadily-*' to 'threadify-*'" },
        { id: "code-2", text: "Update all file download names from 'threadily-*' to 'threadify-*'" },
        { id: "code-3", text: "Update package.json name from 'threadily' to 'threadify'" },
        { id: "code-4", text: "Update all import/export references to use the new name" },
        { id: "code-5", text: "Update any hardcoded references to 'threadily' in component text" },
      ],
    },
    {
      title: "2. SEO & Metadata",
      items: [
        { id: "seo-1", text: "Update all page titles from 'threadily' to 'threadify'" },
        { id: "seo-2", text: "Update all meta descriptions to use 'threadify'" },
        { id: "seo-3", text: "Update all Open Graph tags to use 'threadify'" },
        { id: "seo-4", text: "Update all Twitter card metadata to use 'threadify'" },
        { id: "seo-5", text: "Change all URLs from 'threadily.com' to 'threadify.pro'" },
        { id: "seo-6", text: "Update sitemap.xml with new domain" },
        { id: "seo-7", text: "Update robots.txt with new domain references" },
      ],
    },
    {
      title: "3. UI Elements",
      items: [
        { id: "ui-1", text: "Update logo and favicon to reflect new branding" },
        { id: "ui-2", text: "Update footer copyright text to use 'threadify'" },
        { id: "ui-3", text: "Update any UI components that display the app name" },
        { id: "ui-4", text: "Update any references in tooltips or help text" },
      ],
    },
    {
      title: "4. User Data & Storage",
      items: [
        { id: "data-1", text: "Create migration script for user localStorage data" },
        { id: "data-2", text: "Add code to detect and migrate old localStorage keys" },
        { id: "data-3", text: "Update any database references (if applicable)" },
      ],
    },
    {
      title: "5. External Services",
      items: [
        { id: "ext-1", text: "Update domain in analytics services (Google Analytics, etc.)" },
        { id: "ext-2", text: "Update domain in any API keys or external service configurations" },
        { id: "ext-3", text: "Update social media profiles to reflect new branding" },
      ],
    },
    {
      title: "6. Testing",
      items: [
        { id: "test-1", text: "Test all localStorage functionality after migration" },
        { id: "test-2", text: "Verify all links work with new domain" },
        { id: "test-3", text: "Test social sharing functionality with new metadata" },
        { id: "test-4", text: "Perform cross-browser testing" },
        { id: "test-5", text: "Test on mobile devices" },
      ],
    },
    {
      title: "7. Deployment",
      items: [
        { id: "deploy-1", text: "Set up DNS for threadify.pro" },
        { id: "deploy-2", text: "Configure SSL certificate for new domain" },
        { id: "deploy-3", text: "Set up 301 redirects from threadily.com to threadify.pro" },
        { id: "deploy-4", text: "Deploy updated codebase to production" },
        { id: "deploy-5", text: "Monitor for any issues after deployment" },
      ],
    },
  ]

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Rebrand Plan: threadily → threadify</CardTitle>
          <CardDescription>
            A comprehensive plan to change all instances of "threadily" to "threadify" and "threadily.com" to
            "threadify.pro"
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {sections.map((section) => (
              <div key={section.title} className="space-y-4">
                <h2 className="text-xl font-bold">{section.title}</h2>
                <div className="space-y-2">
                  {section.items.map((item) => (
                    <div key={item.id} className="flex items-start space-x-2">
                      <Checkbox
                        id={item.id}
                        checked={checkedItems[item.id] || false}
                        onCheckedChange={() => toggleItem(item.id)}
                      />
                      <label htmlFor={item.id} className="text-sm leading-tight cursor-pointer">
                        {item.text}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
