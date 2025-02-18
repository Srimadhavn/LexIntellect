import type React from "react"
import { Sidebar } from "./sidebar"
import { Chatbot } from "./chatbot"

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
      <Chatbot />
    </div>
  )
}

