'use client';
import { Sidebar, SidebarHeader, SidebarRail } from '@/presentation/components/ui/sidebar';
import { LocationDirectory } from './locations/location-directory';
import Notebook from './notes/notebook';
import { Button } from '@/presentation/components/ui/button';
import { FileText, BookOpen } from 'lucide-react';

export default function RightSidebar() {
  return (
    <Sidebar className="transition-all duration-300 ease-in-out " side="right">
      <SidebarHeader className="border-b h-full max-h-32 flex flex-col">
  <div className="h-16 flex items-center justify-center bg-slate-400/5 rounded-xl">
    <p className="text-2xl text-center font-semibold tracking-wider">Narratica</p>
  </div>
  <div className="p-3 rounded-lg shadow-sm border flex h-16">
    <div className="flex gap-2 justify-between items-center w-full">
      <Notebook />
      <Button size="sm" variant="outline">
        <BookOpen className="h-4 w-4 mr-2" />
        Preview
      </Button>
      <Button size="sm" variant="outline">
        <FileText className="h-4 w-4 mr-2" />
        Export
      </Button>
    
    </div>
  </div>
</SidebarHeader>

      <LocationDirectory />
      <SidebarRail />
    </Sidebar>
  );
}
