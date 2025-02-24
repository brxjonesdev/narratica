import React from 'react';
import { Separator } from '@/components/ui/separator';
import Narratives from '@/components/dashboard/narratives';
import DashboardHeader from '@/components/dashboard/header';
import Roadmap from '@/components/dashboard/roadmap';

export default function Dashboard() {
  return (
    <main className="flex-1 flex font-figtree  justify-top flex-col items-center gap-4">
      <section className="border border-white/5 w-full h-full max-h-[75vh] max-w-6xl mx-4 rounded-xl rounded-t-none border-t-0 p-4 flex flex-col">
        <DashboardHeader />
        <Separator className="my-4" />
        <Narratives />
      </section>
      <Roadmap />
    </main>
  );
}
