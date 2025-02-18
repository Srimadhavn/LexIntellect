import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, FileText, Users, AlertTriangle, TrendingUp } from "lucide-react"

export function CaseAnalysis() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">Case Analysis</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Document Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              This contract outlines the terms and conditions for a software licensing agreement between Company A and
              Company B. Key points include...
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Entity Extraction</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Entity</TableHead>
                  <TableHead>Type</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Company A</TableCell>
                  <TableCell>Organization</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Company B</TableCell>
                  <TableCell>Organization</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>John Smith</TableCell>
                  <TableCell>Person</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Prediction Confidence Scores</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <ConfidenceBar label="Contract Type" score={0.95} />
            <ConfidenceBar label="Legal Implications" score={0.82} />
            <ConfidenceBar label="Risk Assessment" score={0.78} />
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Similar Cases</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center">
                <FileText className="mr-2 h-4 w-4 text-blue-500" />
                <span className="text-sm">Case #1234 - Software Licensing Agreement</span>
              </li>
              <li className="flex items-center">
                <FileText className="mr-2 h-4 w-4 text-blue-500" />
                <span className="text-sm">Case #5678 - Intellectual Property Dispute</span>
              </li>
              <li className="flex items-center">
                <FileText className="mr-2 h-4 w-4 text-blue-500" />
                <span className="text-sm">Case #9012 - Contract Breach</span>
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Action Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center">
                <AlertTriangle className="mr-2 h-4 w-4 text-yellow-500" />
                <span className="text-sm">Review clause 3.2 for potential ambiguities</span>
              </li>
              <li className="flex items-center">
                <Users className="mr-2 h-4 w-4 text-blue-500" />
                <span className="text-sm">Schedule meeting with client to discuss terms</span>
              </li>
              <li className="flex items-center">
                <BarChart className="mr-2 h-4 w-4 text-green-500" />
                <span className="text-sm">Conduct further risk assessment on section 5</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Predictive Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Likelihood of Favorable Outcome</span>
              <span className="text-sm font-medium text-green-600">75%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Estimated Case Duration</span>
              <span className="text-sm font-medium">4-6 months</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Potential Settlement Range</span>
              <span className="text-sm font-medium">$100,000 - $150,000</span>
            </div>
          </div>
          <div className="mt-4">
            <Button className="w-full">
              <TrendingUp className="mr-2 h-4 w-4" /> View Detailed Prediction Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ConfidenceBar({ label, score }: { label: string; score: number }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{(score * 100).toFixed(0)}%</span>
      </div>
      <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-200">
        <div
          style={{ width: `${score * 100}%` }}
          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
        ></div>
      </div>
    </div>
  )
}

