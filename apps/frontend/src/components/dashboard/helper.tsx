'use client';
import React from 'react';
import { Button } from '../ui/button';
import { BadgeHelpIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function NarraticaHelper() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size={'icon'} variant={'ghost'} className="w-fit h-fit">
          <BadgeHelpIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="mt-2 font-figtree" asChild>
        <Card>
          <CardHeader className="p-2">
            <CardTitle>Narratica Help & Support</CardTitle>
            <CardDescription>Assistance, Tutorials, and Docs</CardDescription>
          </CardHeader>
          {/* <CardContent className='p-2'>
          
          </CardContent> */}
        </Card>
      </PopoverContent>
    </Popover>
  );
}
