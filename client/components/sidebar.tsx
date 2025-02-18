"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  BarChart,
  Users,
  Scale,
  MessageSquare,
  FileText,
  Settings,
  HelpCircle,
  Menu,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"

export function Sidebar() {
  const router = useRouter()
  const [expanded, setExpanded] = useState(true)
  const [activeItem, setActiveItem] = useState<string | null>(null)

  const menuItems = [
    {
      title: "Analysis",
      icon: BarChart,
      items: ["Predictive Analysis", "Risk Assessment", "Contract Review"],
      paths: ["/analysis/predictive", "/analysis/risk", "/analysis/contract"],
    },
    {
      title: "Dispute Resolution",
      icon: Scale,
      items: ["New Case", "Active Cases", "Resolved Cases"],
      paths: ["/disputes/new", "/disputes/active", "/disputes/resolved"],
    },
    {
      title: "Community",
      icon: Users,
      items: ["Find Lawyers", "Discussion Forum", "Expert Advice"],
      paths: ["/community/lawyers", "/community/forum", "/community/experts"],
    },
    {
      title: "Documents",
      icon: FileText,
      items: ["Upload", "My Documents", "Shared Files"],
      paths: ["/documents/upload", "/documents/my", "/documents/shared"],
    },
    {
      title: "Messages",
      icon: MessageSquare,
      items: ["Inbox", "Sent", "Drafts"],
      paths: ["/messages/inbox", "/messages/sent", "/messages/drafts"],
    },
  ]

  const handleNavigation = (path: string, item: string) => {
    setActiveItem(item)
    router.push(path)
  }

  return (
    <div
      className={cn(
        "h-screen bg-white border-r border-gray-200 transition-all duration-300",
        expanded ? "w-64" : "w-16"
      )}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className={cn("font-semibold", !expanded && "hidden")}>Navigation</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setExpanded(!expanded)}
          className="hover:bg-gray-100"
        >
          {expanded ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>
      <nav className="p-2 space-y-2">
        {menuItems.map((item, idx) => (
          <div key={item.title} className="space-y-1">
            <button
              className={cn(
                "w-full flex items-center gap-3 p-2 rounded-lg transition-colors",
                activeItem === item.title
                  ? "bg-black text-white"
                  : "hover:bg-gray-100",
                !expanded && "justify-center"
              )}
              onClick={() => setActiveItem(item.title)}
            >
              <item.icon className="h-5 w-5" />
              {expanded && <span>{item.title}</span>}
            </button>
            {expanded && activeItem === item.title && (
              <div className="ml-9 space-y-1">
                {item.items.map((subItem, subIdx) => (
                  <button
                    key={subItem}
                    className={cn(
                      "w-full text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg p-2 transition-colors",
                      activeItem === subItem && "bg-gray-100"
                    )}
                    onClick={() => handleNavigation(item.paths[subIdx], subItem)}
                  >
                    {subItem}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
      <div className="absolute bottom-4 w-full px-2">
        <div className="space-y-2">
          {expanded ? (
            <>
              <Button variant="ghost" className="w-full justify-start">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <HelpCircle className="mr-2 h-4 w-4" />
                Help & Support
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" className="w-full justify-center">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="ghost" className="w-full justify-center">
                <HelpCircle className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

