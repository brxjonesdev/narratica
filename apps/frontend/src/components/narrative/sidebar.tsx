'use client';
import * as React from 'react';
import { BadgeHelpIcon, ChevronDown, Plus } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarRail,
} from '@/components/ui/sidebar';
import InfoCard from './sidebar/info';
import { GET_ENTRIES, type NarrativeData } from '@/lib/graphql/entries';
import Loading from './sidebar/loading';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Separator } from '../ui/separator';
import Search from './sidebar/search';

import CreateEnitity from './sidebar/create-entity';
import SubMenu from './submenu/submenu';

export function AppSidebar({ narrativeID }: { narrativeID: string }) {
  const [entries, setEntries] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [query, setQuery] = React.useState<string>('');

  React.useEffect(() => {
    setLoading(true);
    const fetchEntries = async () => {
      try {
        const response = await fetch('/api/graphql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: GET_ENTRIES,
            variables: { narrativeID },
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

  function handleAddEntity(category: string) {
    // add an entry to the array that matches the category in the entries
    if (!entries) return;
    const newEntry = {
      id: null,
      name: `New ${category.charAt(0).toUpperCase() + category.slice(1)}`,
      description: 'Description',
      isNew: true,
      details: '',
    };
    setEntries((prevEntries) => ({
      ...prevEntries,
      [category]: [...(prevEntries[category] || []), newEntry],
    }));
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
          <CreateEnitity handleAdd={handleAddEntity} />
          <Search query={query} setQuery={setQuery} />
          <Separator className="my-2" />
          {loading && <Loading message="Loading entries..." size="md" />}
          {entries && (
            <SidebarGroupContent>
              {error && <div className="p-2 text-red-500 text-sm">Error: {error}</div>}

              {entries && Object.values(entries).every((list) => list.length === 0) && (
                <div className="p-2 text-muted-foreground text-sm bg-white/10 rounded-lg mt-2 flex flex-col text-center">
                  <p>No entries found.</p>
                </div>
              )}

              <SidebarMenu className="">
                {Object.entries(entries)

                  .map(([category, list]) => [
                    category,
                    list.filter((item) => item.name.toLowerCase().includes(query.toLowerCase())),
                  ])
                  .filter(([_, list]) => list.length > 0)
                  .map(([category, items]) => (
                    <Collapsible defaultOpen className="group/collapsible" key={category}>
                      <SidebarGroup className="p-1">
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
                                  <DropdownMenu defaultOpen={item.isNew}>
                                    <DropdownMenuTrigger asChild>
                                      <SidebarMenuButton className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-white/20 w-full">
                                        {item.name || item.title || 'Unnamed'}
                                      </SidebarMenuButton>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                      side="right"
                                      align="center"
                                      className="w-[28rem] ml-8 p-0 border-none rounded-xl"
                                    >
                                      <SubMenu entity={item} />
                                    </DropdownMenuContent>
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
      <SidebarFooter className="flex items-start justify-around gap-2 flex-row">
        <p className="text-xs text-muted-foreground pb-2">Synesis- Build 022825.1</p>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
