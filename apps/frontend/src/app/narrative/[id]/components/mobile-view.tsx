import React from 'react';
import { Card, CardHeader, CardDescription, CardTitle } from '@/shared/ui/card';

export default function MobileView({ children }: { children: React.ReactNode }) {
  return (
    <section className="p-4">
      <Card className="font-figtree p-0 w-full sm:w-fit">
        <CardHeader className="p-4 space-y-0">
          <CardTitle className="text-lg font-bold tracking-wide py-0">Narratica</CardTitle>
          <CardDescription className="text-xs py-0">
            Narratica is a tool geared towards and is best viewed on a desktop.
            <br />
            However, you can still view the narrative outline here on mobile.
          </CardDescription>
        </CardHeader>
      </Card>
      <div className="px-4">{children}</div>
    </section>
  );
}
