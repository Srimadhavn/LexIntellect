"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { MessageSquare, Users, Search, Filter, Star, ThumbsUp } from "lucide-react"
import { useRouter } from "next/navigation"

export function Community({ userRole }: { userRole: "client" | "lawyer" | null }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("forums")

  const forumTopics = [
    {
      id: 1,
      title: "Contract Law Discussion",
      author: "John Doe, Esq.",
      replies: 23,
      views: 156,
      lastActivity: "2h ago",
    },
    {
      id: 2,
      title: "Intellectual Property Rights",
      author: "Jane Smith",
      replies: 15,
      views: 98,
      lastActivity: "5h ago",
    },
  ]

  const lawyers = [
    {
      id: 1,
      name: "Sarah Johnson",
      specialization: "Corporate Law",
      rating: 4.8,
      reviews: 127,
      available: true,
    },
    {
      id: 2,
      name: "Michael Chen",
      specialization: "Intellectual Property",
      rating: 4.9,
      reviews: 89,
      available: true,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Community</h1>
        <div className="flex space-x-4">
          <Input
            placeholder="Search discussions..."
            className="w-64"
            icon={<Search className="h-4 w-4" />}
          />
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          {userRole === "client" && (
            <Button>
              <MessageSquare className="h-4 w-4 mr-2" />
              Start Discussion
            </Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="forums" className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="forums">Forums</TabsTrigger>
          <TabsTrigger value="find-lawyers">Find Lawyers</TabsTrigger>
          <TabsTrigger value="my-discussions">My Discussions</TabsTrigger>
        </TabsList>

        <TabsContent value="forums" className="space-y-4">
          {forumTopics.map((topic) => (
            <Card 
              key={topic.id} 
              className="hover:bg-gray-50 cursor-pointer"
              onClick={() => router.push(`/dashboard/community/forums/${topic.id}`)}
            >
              <CardContent className="flex items-center justify-between p-6">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-blue-600 hover:underline">
                    {topic.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Started by {topic.author} • Last active {topic.lastActivity}
                  </p>
                </div>
                <div className="flex items-center space-x-8 text-sm text-gray-500">
                  <div className="flex items-center">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    {topic.replies} replies
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    {topic.views} views
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="find-lawyers" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lawyers.map((lawyer) => (
              <Card key={lawyer.id} className="hover:bg-gray-50">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>{lawyer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold">{lawyer.name}</h3>
                      <p className="text-sm text-gray-500">{lawyer.specialization}</p>
                      <div className="flex items-center mt-2">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm">{lawyer.rating}</span>
                        <span className="mx-1 text-gray-400">•</span>
                        <span className="text-sm text-gray-500">{lawyer.reviews} reviews</span>
                      </div>
                    </div>
                    <Button variant="outline" className="whitespace-nowrap">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my-discussions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Active Discussions</CardTitle>
            </CardHeader>
            <CardContent>
              {userRole === "client" ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Contract Review Question</h4>
                      <p className="text-sm text-gray-500">Last reply 1h ago</p>
                    </div>
                    <Button variant="outline">View Discussion</Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Legal Advice Thread</h4>
                      <p className="text-sm text-gray-500">2 new replies</p>
                    </div>
                    <Button variant="outline">Respond</Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 