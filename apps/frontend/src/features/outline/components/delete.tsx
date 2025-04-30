import React from 'react';
import { Button } from '@/shared/ui/button';

export default function Delete({
  func,
  children,
}: {
  func: () => void;
  children: React.ReactNode;
}) {
  return (
    <Button onClick={func} variant={'outline'} size={'sm'} className="w-full">
      {children}
    </Button>
  );
}
