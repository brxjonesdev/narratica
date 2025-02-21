import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function DashboardSettings() {
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

    </DropdownMenuContent>
  </DropdownMenu>
  
  );
}
