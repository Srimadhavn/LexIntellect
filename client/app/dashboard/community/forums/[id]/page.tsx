"use client"

import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageSquare } from "lucide-react"

export default function ForumTopicPage() {
  const params = useParams()
  const topicId = params.id

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Contract Law Discussion</CardTitle>
          <p className="text-sm text-gray-500">Started by John Doe, Esq.</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Discussion content */}
          <div className="space-y-6">
            {/* Messages */}
            <div className="flex gap-4">
              <Avatar>
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="font-medium">John Doe, Esq.</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Can someone explain the implications of clause 3.2 in standard contract templates?
                  </p>
                </div>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                  <button className="hover:text-gray-900">Reply</button>
                  <span>2h ago</span>
                </div>
              </div>
            </div>
          </div>

          {/* Reply input */}
          <div className="mt-6">
            <Input
              placeholder="Write your reply..."
              className="mb-2"
            />
            <Button>
              <MessageSquare className="h-4 w-4 mr-2" />
              Reply
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 