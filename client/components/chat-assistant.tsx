import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Paperclip, ThumbsUp, ThumbsDown } from "lucide-react"

export function ChatAssistant() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">Chat Assistant</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="h-[calc(100vh-12rem)]">
            <CardHeader>
              <CardTitle>Chat Thread</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 overflow-y-auto h-[calc(100%-8rem)]">
              <ChatMessage sender="user" message="Can you help me understand the key points of this contract?" />
              <ChatMessage
                sender="assistant"
                message="I'd be happy to help you understand the key points of the contract. Could you please provide me with some specific details about the contract or upload it so I can analyze it for you?"
              />
              <ChatMessage
                sender="user"
                message="It's a software licensing agreement between Company A and Company B."
              />
              <ChatMessage
                sender="assistant"
                message="Thank you for providing that information. Based on typical software licensing agreements, here are some key points to look for:

1. Scope of License: What specific software is being licensed?
2. License Type: Is it a perpetual or subscription-based license?
3. Usage Rights: How can the licensee use the software? Are there any restrictions?
4. Maintenance and Support: What level of support is provided?
5. Fees and Payment Terms: What are the costs and payment schedule?
6. Intellectual Property Rights: Who owns the IP?
7. Warranties and Disclaimers: What guarantees are provided?
8. Limitation of Liability: Are there caps on potential damages?
9. Termination Clauses: Under what conditions can the agreement be terminated?

Would you like me to elaborate on any of these points or analyze a specific section of your agreement?"
              />
            </CardContent>
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-2">
                <Input placeholder="Type your message..." className="flex-1" />
                <Button>
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
        <div>
          <Card className="h-[calc(100vh-12rem)]">
            <CardHeader>
              <CardTitle>Document Reference</CardTitle>
            </CardHeader>
            <CardContent className="overflow-y-auto h-[calc(100%-5rem)]">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Relevant sections of the document will be displayed here as you chat with the assistant. This helps
                provide context and quick reference to specific parts of the contract or legal document being discussed.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function ChatMessage({ sender, message }: { sender: "user" | "assistant"; message: string }) {
  return (
    <div className={`flex ${sender === "user" ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-3/4 p-3 rounded-lg ${sender === "user" ? "bg-blue-100 text-blue-900" : "bg-gray-100 text-gray-900"}`}
      >
        <p className="text-sm">{message}</p>
        {sender === "assistant" && (
          <div className="mt-2 flex justify-end space-x-2">
            <Button>
              <ThumbsUp className="h-4 w-4" />
              <span className="sr-only">Thumbs Up</span>
            </Button>
            <Button>
              <ThumbsDown className="h-4 w-4" />
              <span className="sr-only">Thumbs Down</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

