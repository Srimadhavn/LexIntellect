"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle, Send } from "lucide-react"

export default function MessagesPage() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello, how can I help?", sender: "ai" },
    { id: 2, text: "I need help with a contract", sender: "user" },
  ])

  return (
    <div className="space-y-6 h-[calc(100vh-12rem)]">
      <h1 className="text-3xl font-bold tracking-tight">Messages</h1>

      <div className="flex flex-col h-full">
        <div className="flex-1 space-y-4 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <Card className={`max-w-[80%] ${msg.sender === 'user' ? 'bg-primary text-white' : ''}`}>
                <CardContent className="p-3">
                  <p>{msg.text}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="mt-4 flex gap-2">
          <Input placeholder="Type your message..." className="flex-1" />
          <Button>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
} 