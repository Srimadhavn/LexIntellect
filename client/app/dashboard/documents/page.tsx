"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Upload, Download, Trash2 } from "lucide-react"

export default function DocumentsPage() {
  const [documents, setDocuments] = useState([
    { id: 1, name: "Contract.pdf", date: "2024-02-20", type: "Legal Contract" },
    { id: 2, name: "Agreement.pdf", date: "2024-02-19", type: "Agreement" },
  ])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
        <Button className="bg-primary dark:bg-[#c7a44a]">
          <Upload className="mr-2 h-4 w-4" />
          Upload Document
        </Button>
      </div>

      <div className="grid gap-4">
        {documents.map((doc) => (
          <Card key={doc.id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
            <CardContent className="flex items-center justify-between p-6">
              <div className="flex items-center space-x-4">
                <FileText className="h-8 w-8 text-primary dark:text-[#c7a44a]" />
                <div>
                  <h3 className="font-medium">{doc.name}</h3>
                  <p className="text-sm text-muted-foreground">{doc.type} • {doc.date}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 