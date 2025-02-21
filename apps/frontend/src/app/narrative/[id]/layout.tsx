import React from 'react';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/narrative/sidebar';
import Menu from '@/components/narrative/menu';
import Settings from '@/components/narrative/settings';

export default function NarrativeLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="font-figtree">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b justify-between pr-4">
            <div className="flex items-center gap-2 px-3">
              <SidebarTrigger />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Menu />
            </div>
            <Settings />
          </header>
          {children}
        </SidebarInset>
      </SidebarProvider>
    </main>
  );
}
