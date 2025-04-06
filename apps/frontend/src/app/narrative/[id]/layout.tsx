'use client';
import React from 'react';
import {
  Sidebar,
  SidebarInset,
  SidebarProvider,
  SidebarHeader,
  SidebarRail,
} from '@/shared/ui/sidebar';
import { NarrativeStoreProvider } from '@/shared/stores/narrative-store-provider';
import InfoCard from '@/app/narrative/_components/info-card/info-card';
import Characters from '@/features/characters/components/characters';
import { Button } from '@/shared/ui/button';
import { BookOpen, FileText } from 'lucide-react';
import Notebook from '@/app/narrative/_components/notebook/notebook';
import { Locations } from '@/features/locations/components/locations';

export default function NarrativeLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="font-figtree">
      <NarrativeStoreProvider>
        <SidebarProvider
          style={
            {
              '--sidebar-width': '20rem',
              '--sidebar-width-mobile': '20rem',
            } as React.CSSProperties
          }
          defaultOpen={true}
        >
          <Sidebar className="transition-all duration-300 ease-in-out">
            <SidebarHeader className="border-b min-h-32 max-h-32 flex items-center justify-center px-4 ">
              <InfoCard />
            </SidebarHeader>
            <Characters />
            <SidebarRail />
          </Sidebar>
          <SidebarInset>{children}</SidebarInset>
          <Sidebar className="transition-all duration-300 ease-in-out " side="right" style={{}}>
            <SidebarHeader className="border-b h-full min-h-32 max-h-32 flex flex-col">
              <div className="h-16 flex items-center justify-center bg-slate-400/5 rounded-xl">
                <p className="text-2xl text-center font-semibold tracking-wider">Narratica</p>
              </div>
              <div className="p-3 rounded-lg shadow-sm border flex h-16">
                <div className="flex gap-2 justify-between items-center w-full">
                  <Notebook />
                  <Button size="sm" variant="outline">
                    <BookOpen className="h-4 w-4" />
                    Preview
                  </Button>
                  <Button size="sm" variant="outline">
                    <FileText className="h-4 w-4 " />
                    Export
                  </Button>
                </div>
              </div>
            </SidebarHeader>

            <Locations />
            <SidebarRail />
          </Sidebar>
        </SidebarProvider>
      </NarrativeStoreProvider>
    </main>
  );
}
