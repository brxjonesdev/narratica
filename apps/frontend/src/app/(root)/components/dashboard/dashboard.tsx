import React from 'react';
import { Separator } from '@/shared/ui/separator';
import Narratives from '@/app/(landing & dashboard)/components/dashboard/narratives';
import DashboardHeader from '@/app/(landing & dashboard)/components/dashboard/header';

export default function Dashboard() {
  return (
    <main className="flex-1 flex font-figtree  justify-top flex-col items-center gap-4">
      <section className="border border-white/5 w-full h-full  max-w-6xl mx-4 rounded-xl rounded-t-none border-t-0 p-4 flex flex-col">
        <DashboardHeader />
        <Separator className="my-4" />
        <Narratives />
      </section>
    </main>
  );
}
