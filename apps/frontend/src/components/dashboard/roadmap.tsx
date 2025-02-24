import Link from 'next/link';
import React from 'react';

export default function Roadmap() {
  return (
    <Link href="#">
      <div className="text-muted-foreground text-xs text-center flex flex-col gap-1 items-center hover:bg-white/5 p-2 rounded-lg">
        <p>This is a work in progress. Please be patient as I add more features.</p>
      </div>
    </Link>
  );
}
