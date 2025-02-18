"use client"

import { Community } from "@/components/community"
import { useUserRole } from "@/hooks/use-user-role"

export default function CommunityPage() {
  const userRole = useUserRole()
  
  return <Community userRole={userRole} />
} 