"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import {
  LayoutDashboard,
  FileText,
  Settings,
  User,
  LogOut,
  Menu,
  Bell,
  MessageCircle,
  BarChart,
  FolderOpen,
  Users,
  Scale,
  Gavel
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { ThemeToggle } from "./theme-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { Notifications } from "./notifications"

interface DashboardLayoutProps {
  children: React.ReactNode
  userRole: "client" | "lawyer" | null
}

export function DashboardLayout({ children, userRole }: DashboardLayoutProps) {
  const router = useRouter()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const navItems = [
    { label: "Analysis", icon: BarChart, href: "/dashboard/analysis" },
    { label: "Community", icon: Users, href: "/dashboard/community" },
    { label: "Profile", icon: User, href: "/dashboard/profile" }
  ]

  const sidebarItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      icon: FileText,
      label: "Contract Analysis",
      href: "/dashboard/analysis",
    },
    {
      icon: Scale,
      label: "Predictive Analysis",
      href: "/dashboard/predict",
    },
    {
      icon: Scale,
      label: "Dispute Resolution",
      href: "/dashboard/disputes",
    },
    {
      icon: FolderOpen,
      label: "Documents",
      href: "/dashboard/documents",
    },
    {
      icon: Users,
      label: "Community",
      href: "/dashboard/community",
    },
    {
      icon: Settings,
      label: "Settings",
      href: "/dashboard/settings",
    },
  ]

  return (
    <div className="min-h-screen bg-background dark:bg-gray-950">
      {/* Top Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 dark:bg-gray-950/80 backdrop-blur-sm border-b border-border dark:border-gray-800">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center space-x-8">
            <Link href="/dashboard" className="text-xl font-semibold dark:text-white hover:text-primary dark:hover:text-primary/90 transition-colors">LexIntellect</Link>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Notifications />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatar.png" alt="User" />
                    <AvatarFallback>
                      {userRole === "lawyer" ? "LA" : "CL"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {userRole === "lawyer" ? "John Doe" : "Client Name"}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {userRole === "lawyer" ? "lawyer@example.com" : "client@example.com"}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push('/dashboard/settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/dashboard/messages')}>
                  <MessageCircle className="mr-2 h-4 w-4" />
                  <span>Messages</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/dashboard/documents')}>
                  <FileText className="mr-2 h-4 w-4" />
                  <span>Documents</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600 dark:text-red-400" onClick={() => router.push('/auth/signin')}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-72 transform border-r border-border dark:border-gray-800 bg-background dark:bg-gray-950 transition-transform duration-200 ease-in-out",
          !isSidebarOpen && "-translate-x-full"
        )}
      >
        <nav className="p-6 space-y-2">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center rounded-lg px-4 py-3 text-sm font-medium hover:bg-primary/10 dark:hover:bg-[#c7a44a]/10 transition-colors dark:text-gray-200"
            >
              <item.icon className="mr-3 h-5 w-5 text-primary dark:text-[#c7a44a]" />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div
        className={cn(
          "fixed top-16 right-0 bottom-0 overflow-y-auto transition-all duration-200 ease-in-out dark:bg-gray-950",
          isSidebarOpen ? "lg:ml-72" : "ml-0",
          isSidebarOpen ? "w-[calc(100%-18rem)]" : "w-full"
        )}
      >
        {/* Page Content */}
        <main className="h-full p-8">{children}</main>
      </div>
    </div>
  )
}