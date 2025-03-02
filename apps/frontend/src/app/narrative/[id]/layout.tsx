import React from 'react';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/narrative/sidebar';

export default async function NarrativeLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const { id } = await params;
  console.log('narrative id:', id);
  return (
    <main className="font-figtree">
      <SidebarProvider defaultOpen={true}>
        <AppSidebar narrativeID={id} />
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
    </main>
  );
}
