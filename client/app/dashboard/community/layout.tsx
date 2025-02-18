import { DashboardLayout } from "@/components/dashboard-layout"

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardLayout>{children}</DashboardLayout>
} 