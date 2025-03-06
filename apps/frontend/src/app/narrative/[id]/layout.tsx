import React from 'react';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import LeftSidebar from '@/components/narrative/left-sidebar/left-sidebar';
import {Home} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Menu from '@/components/narrative/menu';
import RightSidebar from '@/components/narrative/right-sidebar/right-sidebar'

export default async function NarrativeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="font-figtree">
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
    </main>
  );
}
