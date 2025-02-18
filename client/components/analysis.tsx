"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { uploadDocument } from "@/services/documentService";

import {
  FileText,
  Upload,
  AlertTriangle,
  CheckCircle,
  Search,
  BarChart,
  Download,
  File,
  Clock
} from "lucide-react"
import { Progress } from "./ui/progress"
import { analyzeContract } from "@/services/analysis-service"
import { toast } from "@/components/ui/use-toast"

export function Analysis() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [analysisResult, setAnalysisResult] = useState<any>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setSelectedFile(file)
  }

  const startAnalysis = async () => {
    if (!selectedFile) return
    setAnalyzing(true)
    setProgress(0)

    try {
      // Start progress indication
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90))
      }, 500)

      // Use the uploadDocument service
      const result = await uploadDocument(selectedFile)
      
      // Transform the result to match your UI expectations
      const analysisResult = {
        metadata: {
          // Add any metadata you want to display
          filename: selectedFile.name,
          fileSize: `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB`,
          dateAnalyzed: new Date().toLocaleDateString()
        },
        summary: result.summary,
        keyPoints: [], // You might want to extract these from the summary
        risks: result.loopholes // The backend returns loopholes as risks
      }
      
      setAnalysisResult(analysisResult)
      
      // Complete progress
      clearInterval(progressInterval)
      setProgress(100)
      
      toast({
        title: "Analysis Complete",
        description: "Your document has been successfully analyzed.",
      })
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing your document.",
        variant: "destructive",
      })
      console.error("Analysis failed:", error)
    } finally {
      setAnalyzing(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Contract Analysis</h1>
        <div className="flex gap-4">
          <Input type="search" placeholder="Search previous analyses..." className="w-64" />
          <Button variant="outline">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload Contract
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div 
                className="border-2 border-dashed rounded-lg p-8 text-center hover:border-blue-500 transition-colors"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault()
                  const file = e.dataTransfer.files[0]
                  if (file) setSelectedFile(file)
                }}
              >
                <Input
                  type="file"
                  className="hidden"
                  id="file-upload"
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center gap-2"
                >
                  <File className="h-8 w-8 text-gray-400" />
                  <div className="space-y-1">
                    <p className="text-sm text-gray-600">
                      Drop your contract here or click to browse
                    </p>
                    <p className="text-xs text-gray-500">
                      Supports PDF, DOC, DOCX up to 10MB
                    </p>
                  </div>
                </label>
              </div>

              {selectedFile && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-500" />
                      <span className="text-sm font-medium">{selectedFile.name}</span>
                    </div>
                    <Button
                      onClick={() => setSelectedFile(null)}
                      variant="ghost"
                      size="sm"
                    >
                      Remove
                    </Button>
                  </div>
                  <Button
                    onClick={startAnalysis}
                    disabled={analyzing}
                    className="w-full"
                  >
                    {analyzing ? (
                      <>
                        <Clock className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing... {progress}%
                      </>
                    ) : (
                      "Start Analysis"
                    )}
                  </Button>
                  {analyzing && <Progress value={progress} />}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Analysis Results */}
        {analysisResult && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Analysis Results</span>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Metadata */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg text-sm">
                {Object.entries(analysisResult.metadata).map(([key, value]) => (
                  <div key={key}>
                    <p className="text-gray-500 capitalize">{key}</p>
                    <p className="font-medium">{value as string}</p>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div>
                <h3 className="font-medium mb-2">Summary</h3>
                <p className="text-gray-600 text-sm">{analysisResult.summary}</p>
              </div>

              {/* Key Points */}
              <div>
                <h3 className="font-medium mb-2"></h3>
                <ul className="space-y-2">
                  {analysisResult.keyPoints.map((point: string, index: number) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-1" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Risks */}
              <div>
                <h3 className="font-medium mb-2"></h3>
                <ul className="space-y-2">
                  {analysisResult.risks.map((risk: string, index: number) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <AlertTriangle className="h-4 w-4 text-yellow-500 mt-1" />
                      <span>{risk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
} 