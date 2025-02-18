"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { MessageCircle, X, Minimize2, Maximize2, Loader2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { cn } from "@/lib/utils"

// You'll need to install the Google AI SDK
import { GoogleGenerativeAI } from "@google/generative-ai"

// Initialize the Gemini API with your API key
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "")
const model = genAI.getGenerativeModel({ model: "gemini-pro" })

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    setIsLoading(true)
    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: input }])

    try {
      // Create a chat session
      const chat = model.startChat({
        history: messages.map(msg => ({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.content }],
        })),
      })

      // Send message and get response
      const result = await chat.sendMessage(input)
      const response = await result.response
      const text = response.text()

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: text },
      ])
    } catch (error) {
      console.error("Error calling Gemini API:", error)
      setMessages((prev) => [
        ...prev,
        { 
          role: "assistant", 
          content: "I apologize, but I encountered an error. Please try again later." 
        },
      ])
    } finally {
      setIsLoading(false)
      setInput("")
    }
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 rounded-full w-12 h-12 bg-black text-white shadow-lg"
      >
        <MessageCircle />
      </Button>
    )
  }

  return (
    <Card
      className={cn(
        "fixed bottom-4 left-4 w-80 shadow-xl transition-all duration-300",
        isMinimized ? "h-14" : "h-96"
      )}
    >
      <CardHeader className="p-3 border-b flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium">AI Assistant</CardTitle>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setIsMinimized(!isMinimized)}
          >
            {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      {!isMinimized && (
        <>
          <CardContent className="p-3 overflow-y-auto h-[calc(100%-8rem)]">
            <div className="space-y-4">
              {messages.map((message, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex",
                    message.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[80%] rounded-lg p-3",
                      message.role === "user"
                        ? "bg-black text-white"
                        : "bg-gray-100 text-gray-900"
                    )}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <div className="p-3 border-t">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                disabled={isLoading}
              />
              <Button onClick={handleSend} disabled={isLoading}>
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send"}
              </Button>
            </div>
          </div>
        </>
      )}
    </Card>
  )
} 