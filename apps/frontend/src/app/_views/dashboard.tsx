import React from 'react';
import NarraticaHelper from '@/components/dashboard/helper';
import { Separator } from '@/components/ui/separator';
import DashboardSettings from '@/components/dashboard/settings';
import Narratives from '@/components/dashboard/narratives';

export default function Dashboard() {
  return (
    <main className="flex-1 flex font-figtree  justify-center">
      <section className="border border-white/5 w-full h-full max-h-[75vh] max-w-6xl mx-4 rounded-xl rounded-t-none border-t-0 p-4 flex flex-col">
        <header className="flex items-center justify-between">
          <div className="flex items-end gap-4">
            <h2 className="text-xl font-bold">Narratica</h2>
          </div>
          <div className="flex items-baseline gap-2">
            <NarraticaHelper />
            <DashboardSettings />
          </div>
        </header>
        <Separator className="my-4" />
        <section className="mt-4 flex-1 flex flex-col gap-4">
          <h3 className="font-bold">Your Narratives.</h3>
          <Narratives />
        </section>
      </section>
    </main>
  );
}
