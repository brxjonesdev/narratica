'use client';
import * as React from 'react';
import { ChevronDown, MoreHorizontal, Plus, Search } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarRail,
} from '@/components/ui/sidebar';
import InfoCard from './sidebar/info-card';
import { GET_ENTRIES, type NarrativeData } from '@/lib/graphql/entries';
import Loading from './sidebar/loading';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Label } from '../ui/label';

export function AppSidebar({ narrativeID }: { narrativeID: string }) {
  const [entries, setEntries] = React.useState<NarrativeData | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    setLoading(true);
    const fetchEntries = async () => {
      try {
        const response = await fetch('/api/graphql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: GET_ENTRIES,
            variables: { narrativeID: 'irene!' },
          }),
        });

        if (!response.ok) throw new Error('Failed to fetch entries');

        const { data }: { data: NarrativeData } = await response.json();
        setEntries(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, [narrativeID]);
  console.log('entries', entries, typeof entries);

  {
    /*
   
    
  */
  }

  return (
    <Sidebar className="transition-all duration-300 ease-in-out">
      <SidebarHeader className="p-2">
        <InfoCard />
      </SidebarHeader>

      <SidebarContent className="p-2 bg-white/5 m-2 rounded-xl">
      
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm tracking-wider">
            Narrative Synesis
          </SidebarGroupLabel>
          <SidebarGroupAction title="Add Entity" className="hover:bg-white/20">
            <Plus /> <span className="sr-only">Add Entity</span>
          </SidebarGroupAction>
          <form >
      <SidebarGroup className="px-0">
        <SidebarGroupContent className="relative">
          <Label htmlFor="search" className="sr-only">
            Search
          </Label>
          <SidebarInput
            id="search"
            placeholder="Search..."
            className="pl-8"
          />
          <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
        </SidebarGroupContent>
      </SidebarGroup>
    </form>
          {entries && (
            <SidebarGroupContent>
              {loading && <Loading message="Loading entries..." size="md" />}
              {error && <div className="p-2 text-red-500 text-sm">Error: {error}</div>}

              {entries && Object.values(entries).every((list) => list.length === 0) && (
                <div className="p-2 text-muted-foreground text-sm bg-white/10 rounded-lg mt-2 flex flex-col text-center">
                  <p>No entries found.</p>
                  <AlertDialog>
                    <AlertDialogTrigger className='text-xs mt-1 text-cyan-500/50 hover:underline font-semibold'>
                      <p>What&apos;s a synesis?</p>
                    </AlertDialogTrigger>
                    <AlertDialogContent className='font-figtree'>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete your account
                          and remove your data from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Continue</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              )}

              <SidebarMenu className="">
                {Object.entries(entries)
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  .filter(([_, list]) => list.length > 0)
                  .map(([category, items]) => (
                    <Collapsible defaultOpen className="group/collapsible" key={category}>
                      <SidebarGroup className="pr-1.5">
                        <SidebarGroupLabel asChild>
                          <CollapsibleTrigger className="hover:underline text-sm tracking-wider flex items-center">
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                            <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                          </CollapsibleTrigger>
                        </SidebarGroupLabel>
                        <CollapsibleContent>
                          <SidebarGroupContent>
                            <SidebarMenuSub className="ml-1.5 pl-2 mr-0 pr-0 border-muted-foreground/20 border-l-2">
                              {items.map((item) => (
                                <SidebarMenuItem key={item.id}>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <SidebarMenuButton className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-white/20 w-full">
                                        {item.name || item.title || 'Unnamed'}
                                      </SidebarMenuButton>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                      side="right"
                                      align="center"
                                      className="min-w-56 rounded-lg ml-8"
                                    ></DropdownMenuContent>
                                  </DropdownMenu>
                                </SidebarMenuItem>
                              ))}
                            </SidebarMenuSub>
                          </SidebarGroupContent>
                        </CollapsibleContent>
                      </SidebarGroup>
                    </Collapsible>
                  ))}
              </SidebarMenu>
            </SidebarGroupContent>
          )}
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
