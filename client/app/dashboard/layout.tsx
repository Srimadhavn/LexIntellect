import { DashboardLayout } from "@/components/dashboard-layout"

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout userRole="client">{children}</DashboardLayout>
} 

