"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  BarChart, 
  Calendar, 
  CheckCircle, 
  Clock, 
  FileText, 
  Plus, 
  Upload,
  Search,
  AlertCircle,
  Scale,
  ArrowRight
} from "lucide-react"
import { Input } from "./ui/input"
import { Progress } from "./ui/progress"
import { DashboardLayout } from "./dashboard-layout"
import { PredictiveAnalysis } from "./predictive-analysis"
import { cn } from "@/lib/utils"

type UserRole = "client" | "lawyer" | null

export function Dashboard({ userRole }: { userRole: UserRole | null }) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const startAnalysis = async () => {
    if (!selectedFile) return
    
    setAnalyzing(true)
    setAnalysisProgress(0)

    // Simulate analysis progress
    for (let i = 0; i <= 100; i += 20) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setAnalysisProgress(i)
    }

    setAnalyzing(false)
    setSelectedFile(null)
  }

  return (
    <DashboardLayout userRole={userRole}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold dark:text-white">Analysis Dashboard</h1>
          <div className="flex gap-4">
            <Input 
              type="search" 
              placeholder="Search cases..." 
              className="w-64 border-primary/20 dark:border-[#c7a44a]/20 dark:bg-gray-900 dark:text-white focus:border-primary dark:focus:border-[#c7a44a]"
            />
            <Button className="bg-primary dark:bg-[#c7a44a] hover:bg-primary/90 dark:hover:bg-[#c7a44a]/90 dark:text-black">
              <Search className="mr-2 h-4 w-4" /> Search
            </Button>
          </div>
        </div>

        {userRole === "lawyer" && (
          <div className="flex items-center space-x-4">
            <Button className="bg-primary hover:bg-primary/90">
              Lawyer Specific Action
            </Button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SummaryCard title="Active Cases" value="24" icon={<FileText className="h-6 w-6 text-primary dark:text-[#c7a44a]" />} />
          <SummaryCard title="Predictive Analysis" value="8" icon={<Scale className="h-6 w-6 text-primary dark:text-[#c7a44a]" />} />
          <SummaryCard title="Completed" value="142" icon={<CheckCircle className="h-6 w-6 text-primary" />} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-primary/20 dark:border-[#c7a44a]/20 dark:bg-gray-900">
            <CardHeader>
              <CardTitle className="dark:text-white">Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: "Contract Review Completed", time: "2 hours ago", icon: CheckCircle, status: "success" },
                  { title: "New Case Analysis", time: "5 hours ago", icon: Scale, status: "pending" },
                  { title: "Document Update", time: "1 day ago", icon: FileText, status: "info" },
                  { title: "Client Meeting Scheduled", time: "2 days ago", icon: Calendar, status: "info" },
                ].map((activity, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <div className="flex items-center gap-3">
                      <activity.icon className={cn(
                        "h-5 w-5",
                        activity.status === "success" && "text-green-500",
                        activity.status === "pending" && "text-yellow-500",
                        activity.status === "info" && "text-blue-500"
                      )} />
                      <div>
                        <p className="text-sm font-medium dark:text-white">{activity.title}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20 dark:border-[#c7a44a]/20 dark:bg-gray-900">
            <CardHeader>
              <CardTitle className="dark:text-white">Case Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Success Rate</p>
                    <div className="mt-2 flex items-baseline">
                      <p className="text-2xl font-semibold text-green-600 dark:text-green-400">78%</p>
                      <span className="ml-2 text-sm text-green-600 dark:text-green-400">+2.5%</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Active Cases</p>
                    <div className="mt-2 flex items-baseline">
                      <p className="text-2xl font-semibold text-blue-600 dark:text-blue-400">24</p>
                      <span className="ml-2 text-sm text-blue-600 dark:text-blue-400">Active</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium dark:text-white">Case Distribution</p>
                  <div className="space-y-3">
                    {[
                      { type: "Contract Disputes", percentage: 45 },
                      { type: "Corporate Law", percentage: 30 },
                      { type: "Civil Litigation", percentage: 25 },
                    ].map((item, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500 dark:text-gray-400">{item.type}</span>
                          <span className="font-medium dark:text-white">{item.percentage}%</span>
                        </div>
                        <Progress value={item.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-primary/20 dark:border-[#c7a44a]/20 dark:bg-gray-900">
          <CardHeader>
            <CardTitle className="dark:text-white">Latest Predictions Overview</CardTitle>
            <Button 
              variant="ghost" 
              onClick={() => window.location.href = '/dashboard/predict'}
              className="text-primary dark:text-[#c7a44a]"
            >
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  case: "Commercial Contract Dispute",
                  probability: 82,
                  strengths: ["Strong documentation", "Precedent cases"],
                  weaknesses: ["Timeline gaps"]
                },
                {
                  case: "Employment Termination",
                  probability: 65,
                  strengths: ["Clear violation"],
                  weaknesses: ["Missing witness statement"]
                }
              ].map((analysis, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium dark:text-white">{analysis.case}</h3>
                    <span className="text-sm font-medium text-primary dark:text-[#c7a44a]">
                      {analysis.probability}% Success
                    </span>
                  </div>
                  <Progress value={analysis.probability} className="bg-primary/20" />
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                      <p className="text-sm font-medium mb-1 dark:text-gray-300">Strengths</p>
                      <ul className="text-sm space-y-1">
                        {analysis.strengths.map((s, i) => (
                          <li key={i} className="flex items-center gap-1 text-green-600 dark:text-green-400">
                            <CheckCircle className="h-3 w-3" />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1 dark:text-gray-300">Weaknesses</p>
                      <ul className="text-sm space-y-1">
                        {analysis.weaknesses.map((w, i) => (
                          <li key={i} className="flex items-center gap-1 text-red-600 dark:text-red-400">
                            <AlertCircle className="h-3 w-3" />
                            {w}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

function SummaryCard({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) {
  return (
    <Card className="border-primary/20 dark:border-[#c7a44a]/20 dark:bg-gray-900">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium dark:text-white">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold dark:text-white">{value}</div>
      </CardContent>
    </Card>
  )
}

function AnalysisResults() {
  const results = [
    {
      id: 1,
      document: "Service Agreement.pdf",
      status: "High Risk",
      issues: 3,
      date: "2024-03-10",
    },
    {
      id: 2,
      document: "NDA Contract.pdf",
      status: "Low Risk",
      issues: 0,
      date: "2024-03-09",
    },
    {
      id: 3,
      document: "Employment Contract.pdf",
      status: "Medium Risk",
      issues: 1,
      date: "2024-03-08",
    },
  ]

  return (
    <div className="space-y-4">
      {results.map((result) => (
        <div key={result.id} className="flex items-center justify-between p-4 border border-primary/20 rounded-lg">
          <div>
            <p className="font-medium">{result.document}</p>
            <p className="text-sm text-muted-foreground">{result.date}</p>
          </div>
          <div className="flex items-center gap-4">
            <span className={`px-3 py-1 rounded-full text-sm ${
              result.status === "High Risk" ? "bg-destructive/20 text-destructive" :
              result.status === "Medium Risk" ? "bg-primary/20 text-primary" :
              "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
            }`}>
              {result.status}
            </span>
            {result.issues > 0 && (
              <span className="flex items-center text-sm text-destructive">
                <AlertCircle className="h-4 w-4 mr-1" />
                {result.issues} issues
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

function KeyFindings() {
  const findings = [
    {
      category: "Legal Compliance",
      items: [
        "Missing governing law clause",
        "Incomplete liability provisions",
        "Non-standard termination terms",
      ],
    },
    {
      category: "Risk Assessment",
      items: [
        "High-risk indemnification clause",
        "Ambiguous payment terms",
        "Unclear intellectual property rights",
      ],
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {findings.map((finding) => (
        <div key={finding.category}>
          <h3 className="font-medium mb-2">{finding.category}</h3>
          <ul className="space-y-2">
            {finding.items.map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}