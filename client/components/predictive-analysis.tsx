"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Scale, Upload, FileText, AlertCircle } from "lucide-react"
import { toast } from "sonner"

interface PredictionResult {
  winProbability: number
  recommendedSteps: string[]
  oppositionWeaknesses: string[]
  keyEvidenceStrength: {
    [key: string]: "strong" | "moderate" | "weak"
  }
  riskFactors: string[]
}

export function PredictiveAnalysis() {
  const [files, setFiles] = useState<File[]>([])
  const [analyzing, setAnalyzing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [caseSummary, setCaseSummary] = useState("")
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(event.target.files || [])
    setFiles([...files, ...newFiles])
  }

  const analyzePrediction = async () => {
    if (!caseSummary.trim()) {
      toast.error("Please provide a case summary")
      return
    }

    if (files.length === 0) {
      toast.error("Please upload at least one document")
      return
    }

    setAnalyzing(true)
    setProgress(0)

    try {
      const formData = new FormData()
      files.forEach(file => formData.append('files', file))
      formData.append('caseSummary', caseSummary)

      const response = await fetch('/api/predict', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error('Analysis failed')
      }

      const result = await response.json()
      setPredictionResult(result)
      setProgress(100)
      toast.success("Analysis completed successfully")
    } catch (error) {
      console.error('Analysis failed:', error)
      toast.error("Failed to analyze case. Please try again.")
    } finally {
      setAnalyzing(false)
    }
  }

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-6">
      <Card className="border-primary/20 dark:border-[#c7a44a]/20 dark:bg-gray-900">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 dark:text-white">
            <Scale className="h-6 w-6 text-primary dark:text-[#c7a44a]" />
            Predictive Case Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Case Summary Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium dark:text-gray-200">Case Summary</label>
            <Textarea
              placeholder="Provide a brief summary of the case..."
              value={caseSummary}
              onChange={(e) => setCaseSummary(e.target.value)}
              className="h-32 dark:bg-gray-800 dark:border-gray-700"
            />
          </div>

          {/* File Upload Section */}
          <div className="border-2 border-dashed border-primary/20 dark:border-[#c7a44a]/20 rounded-lg p-6 text-center">
            <Input
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileUpload}
              className="hidden"
              id="evidence-upload"
            />
            <label htmlFor="evidence-upload" className="cursor-pointer">
              <Upload className="h-8 w-8 mx-auto mb-2 text-primary dark:text-[#c7a44a]" />
              <p className="dark:text-gray-300">Upload case documents and evidence</p>
              <p className="text-sm text-muted-foreground">Supports PDF, DOC, DOCX, TXT</p>
            </label>
          </div>

          {/* Uploaded Files List */}
          {files.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium dark:text-gray-200">Uploaded Files</h3>
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between text-sm dark:text-gray-300 p-2 bg-primary/5 dark:bg-[#c7a44a]/5 rounded">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary dark:text-[#c7a44a]" />
                    {file.name}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* Analysis Button */}
          <Button
            onClick={analyzePrediction}
            disabled={analyzing || files.length === 0 || !caseSummary}
            className="w-full bg-primary dark:bg-[#c7a44a] hover:bg-primary/90 dark:hover:bg-[#c7a44a]/90 dark:text-black"
          >
            {analyzing ? "Analyzing..." : "Start Predictive Analysis"}
          </Button>

          {/* Progress Bar */}
          {analyzing && (
            <div className="space-y-2">
              <Progress value={progress} className="bg-primary/20" />
              <p className="text-sm text-center dark:text-gray-300">
                Analyzing case documents... {progress}%
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results Section */}
      {predictionResult && (
        <Card className="border-primary/20 dark:border-[#c7a44a]/20 dark:bg-gray-900">
          <CardHeader>
            <CardTitle className="dark:text-white">Analysis Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Win Probability */}
            <div className="space-y-2">
              <h3 className="text-lg font-medium dark:text-white">Case Strength</h3>
              <div className="flex items-center gap-4">
                <Progress 
                  value={predictionResult.winProbability} 
                  className="bg-primary/20" 
                />
                <span className="text-lg font-bold dark:text-white">
                  {predictionResult.winProbability}%
                </span>
              </div>
            </div>

            {/* Recommended Steps */}
            <div className="space-y-2">
              <h3 className="text-lg font-medium dark:text-white">Recommended Steps</h3>
              <ul className="space-y-2">
                {predictionResult.recommendedSteps.map((step, index) => (
                  <li key={index} className="flex items-start gap-2 dark:text-gray-300 p-2 bg-primary/5 dark:bg-[#c7a44a]/5 rounded">
                    <AlertCircle className="h-5 w-5 text-primary dark:text-[#c7a44a] mt-0.5 shrink-0" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Opposition Weaknesses */}
            <div className="space-y-2">
              <h3 className="text-lg font-medium dark:text-white">Opposition Weaknesses</h3>
              <ul className="space-y-2">
                {predictionResult.oppositionWeaknesses.map((weakness, index) => (
                  <li key={index} className="flex items-start gap-2 dark:text-gray-300 p-2 bg-primary/5 dark:bg-[#c7a44a]/5 rounded">
                    <AlertCircle className="h-5 w-5 text-primary dark:text-[#c7a44a] mt-0.5 shrink-0" />
                    <span>{weakness}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Risk Factors */}
            <div className="space-y-2">
              <h3 className="text-lg font-medium dark:text-white">Risk Factors</h3>
              <ul className="space-y-2">
                {predictionResult.riskFactors.map((risk, index) => (
                  <li key={index} className="flex items-start gap-2 dark:text-gray-300 p-2 bg-primary/5 dark:bg-[#c7a44a]/5 rounded">
                    <AlertCircle className="h-5 w-5 text-primary dark:text-[#c7a44a] mt-0.5 shrink-0" />
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 