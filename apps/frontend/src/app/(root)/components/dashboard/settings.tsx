'use client';
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { Button } from '@/shared/ui/button';
import { Separator } from '@/shared/ui/separator';
import { UserCircle2Icon } from 'lucide-react';
import { useAuth } from '@/shared/hooks/use-user';

export default function DashboardSettings() {
  const { user, signOut } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <UserCircle2Icon className="h-5 w-5 text-white/80 hover:text-white cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="font-figtree">
        <section className="flex flex-col gap-2">
          <div className="p-2 bg-white/5 rounded-lg flex text-xs gap-1 flex-col text-center">
            <p className="">Signed in as</p>
            <span className="font-bold inline-block">{user?.user_metadata.name}</span>
            <Separator className="my-2" />
            <Button
              variant="secondary"
              className="w-full text-xs "
              size={'sm'}
              onClick={async () => {
                await signOut();
              }}
            >
              Sign Out
            </Button>
          </div>
        </section>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
