import React from 'react';
import { SidebarInset, SidebarProvider,} from '@/presentation/components/ui/sidebar';
import LeftSidebar from '@/presentation/components/narrative/left-sidebar/left-sidebar';
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
          {children}
          </SidebarInset>
          <RightSidebar/>
      </SidebarProvider>
      </NarrativeStoreProvider>
    </main>
  );
}
