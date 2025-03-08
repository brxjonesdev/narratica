import React from 'react';
import { Separator } from '@/presentation/components/ui/separator';
import Narratives from '@/presentation/components/dashboard/narratives';
import DashboardHeader from '@/presentation/components/dashboard/header';
import Link from 'next/link';

export default function Dashboard() {
  return (
    <main className="flex-1 flex font-figtree  justify-top flex-col items-center gap-4">
      <section className="border border-white/5 w-full h-full  max-w-6xl mx-4 rounded-xl rounded-t-none border-t-0 p-4 flex flex-col">
        <DashboardHeader />
        <Separator className="my-4" />
        <Narratives />
      </section>
      <Link href="#">
        <div className="text-muted-foreground text-xs text-center flex flex-col gap-1 items-center hover:bg-white/5 p-2 pb-4 rounded-lg">
          <p>This is a work in progress. Please be patient as I add more features.</p>
        </div>
      </Link>
    </main>
  );
}
