import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';
import { Settings2Icon } from 'lucide-react';

export default function Settings() {
  return (
    <Link href="/narrative/1/settings">
      <Button variant={'ghost'}>
        <Settings2Icon />
      </Button>
    </Link>
  );
}
