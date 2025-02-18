import React, { createContext, useContext, useState, ReactNode } from "react"

interface TabsContextProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

interface TabsProps {
  children: ReactNode
  defaultValue: string
  className?: string
}

interface TabsListProps {
  children: ReactNode
  className?: string
}

interface TabsTriggerProps {
  value: string
  children: ReactNode
  className?: string
}

interface TabsContentProps {
  value: string
  children: ReactNode
  className?: string
}

const TabsContext = createContext<TabsContextProps | undefined>(undefined)

export function Tabs({ children, defaultValue, className }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue)

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  )
}

export function TabsList({ children, className }: TabsListProps) {
  return <div className={className}>{children}</div>
}

export function TabsTrigger({ value, children, className }: TabsTriggerProps) {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error("TabsTrigger must be used within a Tabs component")
  }

  const { activeTab, setActiveTab } = context
  const isActive = activeTab === value

  return (
    <button
      className={`${className} py-2 px-4 ${
        isActive
          ? "border-b-2 border-blue-500 text-blue-500"
          : "text-gray-500 hover:text-gray-700"
      } focus:outline-none`}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  )
}

export function TabsContent({ value, children, className }: TabsContentProps) {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error("TabsContent must be used within a Tabs component")
  }

  const { activeTab } = context
  return activeTab === value ? <div className={className}>{children}</div> : null
} 