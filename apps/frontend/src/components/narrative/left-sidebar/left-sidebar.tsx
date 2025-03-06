"use client"
import React from 'react'
import {Sidebar, SidebarHeader, SidebarContent, SidebarRail } from '../../ui/sidebar'
import Reference from './reference'
import InfoCard from './info-card'

import { usePathname } from 'next/navigation'



export default function LeftSidebar() {
  const pathname = usePathname()
  const showSidebar = !pathname.includes('draft') && !pathname.includes('review')

  return (
    <>
    {showSidebar && (<Sidebar className="transition-all duration-300 ease-in-out">
      <InfoCard/>
      <SidebarHeader className=" bg-white/5 p-4 text-md m-2 mb-0 rounded-xl rounded-b-none font-bold">
        <p>Reference</p>
      </SidebarHeader>
      <div className=' h-0.5 bg-white/15 mx-2'/>

 
      <SidebarContent className="p-2 bg-white/5 m-2 mt-0 rounded-xl rounded-t-none">
     
        <Reference/>
      </SidebarContent>


      <SidebarRail />
    </Sidebar>)}
    </>
  )
}
