import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '../ui/button';
import { createClient } from '@/lib/utils/server';
import { redirect } from 'next/navigation';
import { Separator } from '../ui/separator';
import { UserCircle2Icon } from 'lucide-react';

export default async function DashboardSettings() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

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
            <form
              action={async () => {
                'use server';
                const supabase = await createClient();
                await supabase.auth.signOut();
                redirect('/');
              }}
              className="flex flex-col gap-2"
            >
              <Button type="submit" variant="secondary" className="w-full text-xs " size={'sm'}>
                Sign Out
              </Button>
            </form>
          </div>
        </section>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
