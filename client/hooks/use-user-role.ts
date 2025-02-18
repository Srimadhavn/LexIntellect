"use client"

import { useState, useEffect } from "react"

export function useUserRole() {
  // In a real app, this would fetch from your auth system
  const [userRole, setUserRole] = useState<"client" | "lawyer" | null>(null)

  useEffect(() => {
    // Simulate fetching user role from localStorage or session
    const savedRole = localStorage.getItem("userRole")
    if (savedRole === "client" || savedRole === "lawyer") {
      setUserRole(savedRole)
    }
  }, [])

  return userRole
} 