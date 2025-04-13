import React from 'react';
import { Card, CardHeader, CardDescription, CardTitle } from '@/shared/ui/card';

export default function MobileView({ children }: { children: React.ReactNode }) {
  return (
    <section className="p-4">
      {children}
    </section>
  );
}
