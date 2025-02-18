"use client"

import { PredictiveAnalysis } from "@/components/predictive-analysis"

export default function PredictivePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight dark:text-white">
        Predictive Case Analysis
      </h1>
      <p className="text-muted-foreground">
        Upload your case documents and get AI-powered predictions and recommendations.
      </p>
      <PredictiveAnalysis />
    </div>
  )
} 