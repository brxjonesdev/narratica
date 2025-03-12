'use client';
import React from 'react';
import { Sidebar, SidebarFooter, SidebarHeader, SidebarRail } from '@/presentation/components/ui/sidebar';
import InfoCard from './info-card/info-card';
import CharacterDirectory from './character-directory/character-directory';
import { Separator } from '@/presentation/components/ui/separator';
import { Info } from 'lucide-react';

export default function LeftSidebar() {
  return (
    <Sidebar className="transition-all duration-300 ease-in-out">
           <SidebarHeader className="border-b h-[65px] max-h-[65px] flex items-center justify-center">
           <InfoCard />
</SidebarHeader>
    
      <CharacterDirectory />
  
      
      <SidebarRail />
    </Sidebar>
  );
}


// <InfoCard />
// <Separator />