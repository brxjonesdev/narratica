'use client';
import React from 'react';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarRail,
} from '@/presentation/components/ui/sidebar';
import { usePathname } from 'next/navigation';

export default function RightSidebar() {
  const pathname = usePathname();
  const showSidebar = pathname.includes('draft');
  return (
    <>
      {showSidebar && (
        <Sidebar className="transition-all duration-300 ease-in-out" side="right">
          <SidebarHeader className="p-2"></SidebarHeader>

          <SidebarContent className="p-2 bg-white/5 m-2 rounded-xl"></SidebarContent>

          <SidebarRail />
        </Sidebar>
      )}
    </>
  );
}
