"use client"

import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send } from "lucide-react"

export default function MessageThreadPage() {
  const params = useParams()
  const threadId = params.id

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col">
      <Card className="flex-1 flex flex-col">
        <CardHeader>
          <CardTitle>Message Thread</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto">
          {/* Messages will go here */}
        </CardContent>
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input placeholder="Type your message..." />
            <Button>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
} 