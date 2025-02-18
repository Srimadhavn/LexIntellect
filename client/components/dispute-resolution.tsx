"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import {
  Scale,
  FileText,
  MessageSquare,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  Users,
  Filter,
  Search,
  ArrowRight,
  Loader2,
} from "lucide-react"
import { Badge } from "./ui/badge"
import { Textarea } from "./ui/textarea"
import { toast } from "./ui/use-toast"
import { analyzeDispute } from "@/services/disputeService"

interface DisputeCase {
  id: string
  title: string
  status: "Pending" | "In Progress" | "Resolved"
  priority: "High" | "Medium" | "Low"
  partyA: string
  partyB: string
  description: string
  proposedSolution?: string
  messages: Message[]
}

interface Message {
  id: string
  sender: string
  content: string
  timestamp: string
  type: "message" | "proposal" | "system"
}

interface AnalysisResult {
  claimantLegalReferences: string[]
  respondentLegalReferences: string[]
  suggestedResolution: string
  ethicalRecommendations: string[]
}

interface Argument {
  id: number
  content: string
  timestamp: string
}

interface DisputeAnalysis {
  caseLaws: string[]
  identifiedIssues: string[]
  proposedSolution: string
  legalBasis: string
  recommendedSteps: string[]
}

export function DisputeResolution() {
  const [cases, setCases] = useState<DisputeCase[]>([
    {
      id: "1",
      title: "Contract Breach - Company A vs Company B",
      status: "In Progress",
      priority: "High",
      partyA: "Company A",
      partyB: "Company B",
      description: "Contract breach dispute regarding delivery terms",
      messages: []
    }
  ])
  const [selectedCase, setSelectedCase] = useState<DisputeCase | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const [partyAArguments, setPartyAArguments] = useState<string[]>(["", ""])
  const [partyBArguments, setPartyBArguments] = useState<string[]>(["", ""])
  const [analyzing, setAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)

  const upcomingEvents = [
    {
      date: "2024-03-20",
      time: "10:00 AM",
      title: "Mediation Session",
      type: "Mediation",
    },
    {
      date: "2024-03-22",
      time: "2:00 PM",
      title: "Document Review",
      type: "Internal",
    },
  ]

  const handleAnalyzeDispute = async () => {
    if (partyAArguments.some(arg => !arg.trim()) || partyBArguments.some(arg => !arg.trim())) {
      toast({
        title: "Incomplete Arguments",
        description: "Please provide all two arguments for both parties.",
        variant: "destructive",
      })
      return
    }

    setAnalyzing(true)
    try {
      const result = await analyzeDispute(partyAArguments, partyBArguments)
      setAnalysisResult(result.analysis)
      toast({
        title: "Analysis Complete",
        description: "The dispute has been analyzed successfully.",
      })
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Failed to analyze the dispute. Please try again.",
        variant: "destructive",
      })
    } finally {
      setAnalyzing(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dispute Resolution System</h1>
        <Button variant="outline" onClick={() => {
          setPartyAArguments(["", "", ""])
          setPartyBArguments(["", "", ""])
          setAnalysisResult(null)
        }}>
          Reset Form
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Present Your Arguments</CardTitle>
          <p className="text-sm text-gray-500">Each party has two opportunities to state their case</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {[0, 1].map((index) => (
            <div key={index} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Claimant's Argument */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-blue-600">
                    Claimant's Statement {index + 1}
                  </label>
                  <Textarea
                    value={partyAArguments[index]}
                    onChange={(e) => {
                      const newArgs = [...partyAArguments]
                      newArgs[index] = e.target.value
                      setPartyAArguments(newArgs)
                    }}
                    placeholder={`Present your argument ${index + 1}...`}
                    className="h-24 border-blue-200 focus:border-blue-400"
                  />
                </div>

                {/* Respondent's Argument */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-red-600">
                    Respondent's Statement {index + 1}
                  </label>
                  <Textarea
                    value={partyBArguments[index]}
                    onChange={(e) => {
                      const newArgs = [...partyBArguments]
                      newArgs[index] = e.target.value
                      setPartyBArguments(newArgs)
                    }}
                    placeholder={`Present your response ${index + 1}...`}
                    className="h-24 border-red-200 focus:border-red-400"
                  />
                </div>
              </div>
              {index < 1 && <hr className="my-4 border-gray-200" />}
            </div>
          ))}

          <Button 
            onClick={handleAnalyzeDispute} 
            disabled={analyzing}
            className="w-full mt-6"
            size="lg"
          >
            {analyzing ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Analyzing Dispute...
              </>
            ) : (
              <>
                <Scale className="mr-2 h-5 w-5" />
                Analyze Arguments
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {analysisResult && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Analysis Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-medium mb-2">Suggested Resolution</h3>
              <p className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                {analysisResult.suggestedResolution}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-2 text-blue-600">Claimant's Legal References</h3>
                <ul className="space-y-2">
                  {analysisResult.claimantLegalReferences.map((ref, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-start gap-2 bg-blue-50 p-3 rounded-lg">
                      <FileText className="h-4 w-4 mt-1 text-blue-500" />
                      {ref}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-2 text-red-600">Respondent's Legal References</h3>
                <ul className="space-y-2">
                  {analysisResult.respondentLegalReferences.map((ref, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-start gap-2 bg-red-50 p-3 rounded-lg">
                      <FileText className="h-4 w-4 mt-1 text-red-500" />
                      {ref}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Ethical Recommendations</h3>
              <ul className="space-y-2">
                {analysisResult.ethicalRecommendations.map((rec, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-start gap-2 bg-green-50 p-3 rounded-lg">
                    <CheckCircle className="h-4 w-4 mt-1 text-green-500" />
                    {rec}
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

