'use client';
import React from 'react';
import { Sidebar, SidebarHeader, SidebarRail } from '@/presentation/components/ui/sidebar';
import InfoCard from './info-card/info-card';
import CharacterDirectory from './character-directory/character-directory';

export default function LeftSidebar() {
  return (
    <Sidebar className="transition-all duration-300 ease-in-out">
      <SidebarHeader className="border-b h-32 flex items-center justify-center ">
        <InfoCard />
      </SidebarHeader>
      <CharacterDirectory />
      <SidebarRail />
    </Sidebar>
  );
}
