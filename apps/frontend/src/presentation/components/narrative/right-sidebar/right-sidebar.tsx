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
import { NotebookPen, SquareChartGantt } from "lucide-react"
import { useLocations } from "@/presentation/hooks/use-locations"
import { LocationDirectory } from "./locations/location-directory"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/presentation/components/ui/dialog"
import { Button } from "../../ui/button"





export default function RightSidebar() {
  
  return (
    <Sidebar className="transition-all duration-300 ease-in-out" side="right">
      <SidebarHeader className="border-b h-16 flex items-center justify-center">
      <Dialog>
  <DialogTrigger asChild>
    
    <Button variant="outline" className="w-full h-full text-sm font-normal">
    <NotebookPen className="h-4 w-4" />
      Open Notes
    </Button>
  </DialogTrigger>
  <DialogContent>
  
  </DialogContent>
</Dialog>


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

