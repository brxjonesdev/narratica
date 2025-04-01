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
import { useMediaQuery } from 'react-responsive';
import InfoCard from '@/features/narratives/components/narrative/info-card/info-card';
import CharacterDirectory from '@/features/characters/components/characters';
import { Button } from '@/shared/ui/button';
import { BookOpen, FileText } from 'lucide-react';
import Notebook from '@/features/notebook/notebook';
import { LocationDirectory } from '@/features/locations/components/location-directory';

export default function NarrativeLayout({ children }: { children: React.ReactNode }) {
  const isMobile = useMediaQuery({ maxWidth: 768 });
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
            <SidebarHeader className="border-b h-32 flex items-center justify-center px-4 ">
              <InfoCard />
            </SidebarHeader>
            <CharacterDirectory />
            <SidebarRail />
          </Sidebar>
          {/* {!isMobile ? (
            <SidebarInset>{children}</SidebarInset>
          ) : (
            <SidebarInset>{children}</SidebarInset>
          )}
          <Sidebar className="transition-all duration-300 ease-in-out " side="right" style={{}}>
            <SidebarHeader className="border-b h-full max-h-32 flex flex-col">
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

            <LocationDirectory />
            <SidebarRail />
          </Sidebar> */}
        </SidebarProvider>
      </NarrativeStoreProvider>
    </main>
  );
}
