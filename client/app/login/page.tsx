"use client"

import LoginPage from "@/components/login-page"
import { useRouter } from "next/navigation"

export default function Login() {
  const router = useRouter()

  const handleLogin = (role: "client" | "lawyer") => {
    router.push("/dashboard")
  }

  return <LoginPage onLogin={handleLogin} />
} 