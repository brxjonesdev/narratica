"use client";
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '../ui/button';
import { createClient } from '@/lib/utils/client';
import { useRouter } from 'next/navigation';

export default function DashboardSettings() {
  const supabase = createClient();
  const router = useRouter();

  const signOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };


  return (
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
    <Avatar className="h-[35px] w-[35px] cursor-pointer">
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback></AvatarFallback>
    </Avatar>
    </DropdownMenuTrigger>
    <DropdownMenuContent className='font-figtree'>
      <DropdownMenuLabel>Settings</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <div className='p-2 bg-white/5 rounded-lg flex text-xs flex-wrap gap-1'>
        <p className=''>
          Signed in as
        </p>
        <span className='font-bold inline-block'>Braxton Jones</span>
      </div>
      <Button
        variant='secondary'
        className='w-full mt-2'
        onClick={signOut}
      >
        SignOut

        
      </Button>

    </DropdownMenuContent>
  </DropdownMenu>
  
  );
}
