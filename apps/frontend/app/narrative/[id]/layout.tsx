import React from 'react';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/presentation/components/ui/sidebar';
import LeftSidebar from '@/presentation/components/narrative/left-sidebar/left-sidebar';
import {Home} from 'lucide-react';
import { Separator } from '@/presentation/components/ui/separator';
import Link from 'next/link';
import { Button } from '@/presentation/components/ui/button';
import Menu from '@/presentation/components/narrative/menu';
import RightSidebar from '@/presentation/components/narrative/right-sidebar/right-sidebar'
import { NarrativeStoreProvider } from '@/presentation/stores/narrative-store-provider';


export default function NarrativeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="font-figtree">
      <NarrativeStoreProvider>
      <SidebarProvider defaultOpen={true}>
        <LeftSidebar/>
        <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b justify-between pr-4">
        <div className="flex items-center gap-2 px-3">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-4" />
          <Link href="/">
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <Home />
            </Button>
          </Link>
          <Separator orientation="vertical" className="h-4" />
          <Menu />
        </div>
      </header>
          {children}
          </SidebarInset>
          <RightSidebar/>
      </SidebarProvider>
      </NarrativeStoreProvider>
    </main>
  );
}
