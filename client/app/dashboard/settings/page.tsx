"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    profile: {
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 234 567 890"
    },
    notifications: {
      email: true,
      push: true,
      updates: true,
      marketing: false
    },
    preferences: {
      darkMode: false,
      compactView: false,
      autoSave: true,
      language: "English"
    }
  })

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success("Profile updated successfully")
  }

  const handleNotificationToggle = (key: keyof typeof settings.notifications) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key]
      }
    }))
    toast.success("Notification preferences updated")
  }

  const handlePreferenceToggle = (key: keyof typeof settings.preferences) => {
    setSettings(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: !prev.preferences[key]
      }
    }))
    toast.success("Preferences updated")
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Settings</h1>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    defaultValue={settings.profile.name}
                    onChange={e => setSettings(prev => ({
                      ...prev,
                      profile: { ...prev.profile, name: e.target.value }
                    }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue={settings.profile.email}
                    onChange={e => setSettings(prev => ({
                      ...prev,
                      profile: { ...prev.profile, email: e.target.value }
                    }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    defaultValue={settings.profile.phone}
                    onChange={e => setSettings(prev => ({
                      ...prev,
                      profile: { ...prev.profile, phone: e.target.value }
                    }))}
                  />
                </div>
                <Button type="submit">Save Changes</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="email-notif">Email Notifications</Label>
                <Switch
                  id="email-notif"
                  checked={settings.notifications.email}
                  onCheckedChange={() => handleNotificationToggle('email')}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="push-notif">Push Notifications</Label>
                <Switch
                  id="push-notif"
                  checked={settings.notifications.push}
                  onCheckedChange={() => handleNotificationToggle('push')}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="updates">Product Updates</Label>
                <Switch
                  id="updates"
                  checked={settings.notifications.updates}
                  onCheckedChange={() => handleNotificationToggle('updates')}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="marketing">Marketing Emails</Label>
                <Switch
                  id="marketing"
                  checked={settings.notifications.marketing}
                  onCheckedChange={() => handleNotificationToggle('marketing')}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>User Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="dark-mode">Dark Mode</Label>
                <Switch
                  id="dark-mode"
                  checked={settings.preferences.darkMode}
                  onCheckedChange={() => handlePreferenceToggle('darkMode')}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="compact">Compact View</Label>
                <Switch
                  id="compact"
                  checked={settings.preferences.compactView}
                  onCheckedChange={() => handlePreferenceToggle('compactView')}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="autosave">Auto-save Documents</Label>
                <Switch
                  id="autosave"
                  checked={settings.preferences.autoSave}
                  onCheckedChange={() => handlePreferenceToggle('autoSave')}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 