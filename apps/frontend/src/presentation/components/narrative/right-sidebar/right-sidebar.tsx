"use client"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarRail,
} from "@/presentation/components/ui/sidebar"
import { Timeline } from "./timeline"
import { LocationDetails } from "./location-details"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/presentation/components/ui/tabs"


// Sample data - replace with your actual story data
const timelineEvents = [
  {
    id: 1,
    title: "The Beginning",
    date: "January 15, 1920",
    description: "Our protagonist arrives in the small coastal town of Millhaven.",
    location: "Millhaven Harbor",
  },
  {
    id: 2,
    title: "First Encounter",
    date: "January 20, 1920",
    description: "A mysterious stranger appears at the local tavern with an unusual proposition.",
    location: "The Rusty Anchor Tavern",
  },
  {
    id: 3,
    title: "The Discovery",
    date: "February 3, 1920",
    description: "Hidden documents reveal the town's dark secret and history.",
    location: "Millhaven Library",
  },
  {
    id: 4,
    title: "The Confrontation",
    date: "February 15, 1920",
    description: "Our hero faces the antagonist for the first time at the lighthouse.",
    location: "Millhaven Lighthouse",
  },
  {
    id: 5,
    title: "The Escape",
    date: "February 16, 1920",
    description: "A narrow escape leads to a journey into the unknown.",
    location: "Coastal Cliffs",
  },
]

const locations = [
  {
    id: 1,
    name: "Millhaven",
    type: "Coastal Town",
    description: "A small fishing town with a mysterious past, surrounded by fog most mornings.",
    keyLocations: ["Harbor", "Town Square", "Lighthouse", "Library", "The Rusty Anchor Tavern"],
  },
  {
    id: 2,
    name: "Coastal Cliffs",
    type: "Natural Formation",
    description: "Treacherous cliffs overlooking the violent sea, with hidden caves and passages.",
    keyLocations: ["Smuggler's Cave", "Widow's Peak", "The Narrow Path"],
  },
  {
    id: 3,
    name: "Blackwood Forest",
    type: "Dense Forest",
    description: "An ancient forest with trees so tall and dense that sunlight barely reaches the ground.",
    keyLocations: ["The Old Oak", "Witch's Cottage", "Forgotten Shrine", "Hunter's Cabin"],
  },
]

export default function StoryRightSidebar() {
  return (
    <Sidebar className="transition-all duration-300 ease-in-out" side="right">
      <SidebarHeader className="border-b h-[64px] flex items-center justify-center">

      </SidebarHeader>

      <SidebarContent className="p-1">
  

        <SidebarGroup className="mt-4" >
        <Tabs defaultValue="locations" className="w-full">
  <TabsList className="w-full">
    <TabsTrigger value="locations" className="w-full">Locations</TabsTrigger>
    <TabsTrigger value="timeline" className="w-full">Timeline</TabsTrigger>
  </TabsList>
  <TabsContent value="timeline">
    <Timeline events={timelineEvents} />
  </TabsContent>
  <TabsContent value="locations">
    <LocationDetails locations={locations} />
  </TabsContent>
</Tabs>

        </SidebarGroup>
      </SidebarContent>
    <SidebarFooter>
      <div className="p-2 text-xl font-semibold bg-white/10 rounded-xl text-center">
        <p>Narratica</p>
      </div>
    </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

