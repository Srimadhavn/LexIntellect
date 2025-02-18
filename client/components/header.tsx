"use client"

import { useState } from "react"
import { Bell, Search, User } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const [notifications, setNotifications] = useState([
    { id: 1, text: "New case assigned", time: "2m ago" },
    { id: 2, text: "Document review completed", time: "1h ago" },
  ])

  const menuItems = [
    {
      title: "Analysis",
      items: ["Case Analysis", "Risk Assessment", "Document Analysis"],
    },
    {
      title: "Profile",
      items: ["My Profile", "Settings", "Billing"],
    },
    {
      title: "Community",
      items: ["Forums", "Find Lawyers", "Expert Network"],
    },
    {
      title: "Resources",
      items: ["Knowledge Base", "Templates", "Guides"],
    },
    {
      title: "Support",
      items: ["Help Center", "Contact Us", "FAQs"],
    },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search functionality
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="flex h-16 items-center px-4 md:px-6">
        <div className="flex items-center gap-6 md:gap-8">
          <a className="hidden md:flex" href="#">
            <span className="font-bold text-xl">LegalAI</span>
          </a>
          <nav className="hidden md:flex gap-6">
            {menuItems.map((item) => (
              <DropdownMenu key={item.title}>
                <DropdownMenuTrigger className="text-sm font-medium transition-colors hover:text-primary">
                  {item.title}
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {item.items.map((subItem) => (
                    <DropdownMenuItem key={subItem}>{subItem}</DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
          </nav>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <form className="hidden md:flex" onSubmit={handleSearch}>
            <Input
              className="w-64 lg:w-80"
              placeholder="Search cases, documents..."
              type="search"
            />
          </form>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
                {notifications.length > 0 && (
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              {notifications.map((notification) => (
                <DropdownMenuItem key={notification.id}>
                  <div className="flex flex-col">
                    <span>{notification.text}</span>
                    <span className="text-xs text-gray-500">{notification.time}</span>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

