"use client"
import {
  Sidebar,
  SidebarHeader,
  SidebarRail,
} from "@/presentation/components/ui/sidebar"
import { LocationDirectory } from "./locations/location-directory"
import Notebook from "./notes/notebook"





export default function RightSidebar() {
  
  return (
    <Sidebar className="transition-all duration-300 ease-in-out" side="right">
      <SidebarHeader className="border-b h-16 flex items-center justify-center">
      <Notebook/>


      </SidebarHeader>
      <LocationDirectory/>
      <SidebarRail />
    </Sidebar>
  )
}

