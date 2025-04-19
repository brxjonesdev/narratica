'use client';
import React from 'react';
import {
  Sidebar,
  SidebarInset,
  SidebarProvider,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
} from '@/shared/ui/sidebar';
import { NarrativeStoreProvider } from '@/shared/stores/narrative-store-provider';
import InfoCard from '@/app/narrative/_components/info-card/info-card';
import Characters from '@/features/characters/components/characters';
import { Button } from '@/shared/ui/button';
import { Home } from 'lucide-react';
import Notebook from '@/app/narrative/_components/notebook/notebook';
import { Locations } from '@/features/locations/components/locations';
import { Separator } from '@/shared/ui/separator';
import Link from 'next/link';

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
            <SidebarHeader className="border-b min-h-32 max-h-32 flex items-center justify-center">
              <InfoCard />
            </SidebarHeader>
            <Characters />
            <SidebarRail />
          </Sidebar>


          <SidebarInset>
      <header className="h-16 shrink-0 items-center gap-2 border-b justify-between pr-4 sticky top-0 bg-background z-10 hidden lg:flex">
        <div className="flex items-center gap-2 px-3">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-4" />
          <Link href="/">
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <Home />
            </Button>
          </Link>
          {/* <Separator orientation="vertical" className="h-4" /> */}
         
        </div>
      </header>
      {children}
  
            </SidebarInset>


          <Sidebar className="transition-all duration-300 ease-in-out " side="right" style={{}}>
            <SidebarHeader className="border-b h-full min-h-32 max-h-32 flex flex-col">
              <div className="h-16 flex items-center justify-center bg-slate-400/5 rounded-xl">
                <p className="text-2xl text-center font-semibold tracking-wider">Narratica</p>
              </div>
              <Notebook />
            </SidebarHeader>

            <Locations />
            <SidebarRail />
          </Sidebar>
        </SidebarProvider>
      </NarrativeStoreProvider>
    </main>
  );
}
