'use client';
import React from 'react';
import { SidebarInset, SidebarProvider } from '@/presentation/components/ui/sidebar';
import LeftSidebar from '@/presentation/components/narrative/left-sidebar/left-sidebar';
import RightSidebar from '@/presentation/components/narrative/right-sidebar/right-sidebar';
import { NarrativeStoreProvider } from '@/presentation/stores/narrative-store-provider';
import { useMediaQuery } from 'react-responsive';

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
          <LeftSidebar />
          {!isMobile ? (
            <SidebarInset>{children}</SidebarInset>
          ) : (
            <SidebarInset>{children}</SidebarInset>
          )}

          <RightSidebar />
        </SidebarProvider>
      </NarrativeStoreProvider>
    </main>
  );
}
