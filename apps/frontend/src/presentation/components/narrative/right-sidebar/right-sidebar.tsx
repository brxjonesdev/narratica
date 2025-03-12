"use client"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarRail,
} from "@/presentation/components/ui/sidebar"
import { SquareChartGantt } from "lucide-react"
import { useLocations } from "@/presentation/hooks/use-locations"
import { LocationDirectory } from "./locations/location-directory"




export default function StoryRightSidebar() {
  
  return (
    <Sidebar className="transition-all duration-300 ease-in-out" side="right">
      <SidebarHeader className="border-b h-[64px] flex items-center justify-center">

      </SidebarHeader>

      <SidebarContent className="p-1">
        <SidebarGroup>
          <SidebarGroupLabel className="text-base font-semibold">Locations</SidebarGroupLabel>
          

        <SidebarGroupContent>
          <SidebarMenu>  
            <LocationDirectory/>
          </SidebarMenu>
        </SidebarGroupContent>
        </SidebarGroup>
  

       
      </SidebarContent>
 
      <SidebarRail />
    </Sidebar>
  )
}

