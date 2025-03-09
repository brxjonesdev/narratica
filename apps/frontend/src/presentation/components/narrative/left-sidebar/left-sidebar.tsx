'use client';
import React from 'react';
import { Sidebar, SidebarHeader, SidebarRail } from '../../ui/sidebar';
import InfoCard from './info-card/info-card';
import CharacterDirectory from './character-directory/character-directory';
import { Separator } from '@/presentation/components/ui/separator';

export default function LeftSidebar() {
  return (
    <Sidebar className="transition-all duration-300 ease-in-out">
      <SidebarHeader className=" bg-white/5 text-2xl font-bold text-center tracking-wider py-4">
        <p>Narratica</p>
      </SidebarHeader>
      <InfoCard />
      <Separator />
      <CharacterDirectory />
      <SidebarRail />
    </Sidebar>
  );
}
