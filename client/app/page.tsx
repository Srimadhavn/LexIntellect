"use client"

import { useState } from "react"
import { LandingPage } from "@/components/landing-page"
import LoginPage from "@/components/login-page"
import { Dashboard } from "@/components/dashboard"
import { Layout } from "@/components/layout"

type UserRole = "client" | "lawyer"

export default function Home() {
  const [currentPage, setCurrentPage] = useState("landing")
  const [userRole, setUserRole] = useState<UserRole | null>(null)

  const handleLogin = (role: UserRole) => {
    setUserRole(role)
    setCurrentPage("dashboard")
  }

  switch (currentPage) {
    case "landing":
      return <LandingPage onGetStarted={() => setCurrentPage("login")} />
    case "login":
      return <LoginPage onLogin={handleLogin} />
    case "dashboard":
      return (
        <Dashboard userRole={userRole} />
      )
    default:
      return <div>Page not found</div>
  }
}

