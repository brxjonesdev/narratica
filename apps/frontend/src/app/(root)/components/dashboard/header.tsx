import React from 'react';
import DashboardSettings from './settings';

export default function DashboardHeader() {
  return (
    <header className="flex items-end justify-between">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-bold">Narratica</h2>
      </div>
      <div className="flex items-end gap-2">
        <DashboardSettings />
      </div>
    </header>
  );
}
