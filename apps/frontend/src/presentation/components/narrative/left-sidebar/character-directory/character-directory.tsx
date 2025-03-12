import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/presentation/components/ui/sidebar';
import {Heart, HeartOff, Plus } from 'lucide-react';
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/presentation/components/ui/dropdown-menu';
import { Separator } from '@radix-ui/react-separator';
import { useCharacters } from '@/presentation/hooks/use-characters';
import Loading from '@/presentation/components/shared/loading';
import CharacterView from './view-character';

export default function CharacterDirectory() {
  const { characters, loading, error, addCharacter, setActiveID, activeID, deleteCharacter } = useCharacters();


  if (loading) return <Loading message="Getting your characters!" />;
  if (error) return <div>Error loading characters {error}</div>;
  return (
    <SidebarContent className="p-2">
      <SidebarGroup>
        <SidebarGroupLabel className="text-base font-semibold">Characters</SidebarGroupLabel>
        <SidebarGroupAction
          className="hover:bg-primary/10 hover:text-primary"
          onClick={() => {
            addCharacter();
          }}
        >
          <Plus /> <span className="sr-only">Add Character</span>
        </SidebarGroupAction>
        <Separator className="my-1.5" />
        <SidebarGroupContent>
          <SidebarMenu>
            {characters.map((character) => (
              <SidebarMenuItem
                key={character.id}
                className="my-1 hover:bg-primary/5 rounded-md py-1.5 "
              >
                <SidebarMenuButton
                  className="p-4 py-5"
                  onClick={() =>
                    setActiveID((prevId) => (prevId === character.id ? null : character.id))
                  }
                >
                  <div className="flex items-center gap-3 w-full py-2 justify-center">
                    <div className="flex flex-col flex-1 min-w-0 py-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium truncate text-md">{character.name}</span>
                        {character.isAlive ? (
                          <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500" />
                        ) : (
                          <HeartOff className="h-3.5 w-3.5 text-muted-foreground" />
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground truncate tracking-wider font-semibold">
                        {character.role}
                      </span>
                    </div>
                  </div>
                </SidebarMenuButton>

                <DropdownMenu
                  open={activeID === character.id}
                  onOpenChange={(open) => {
                    if (!open) setActiveID(null);
                  }}
                >
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuAction className="hover:bg-primary/10"></SidebarMenuAction>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    side="right"
                    className="w-[500px] overflow-y-auto h-[90vh] font-figtree my-10 flex flex-col "
                    sideOffset={30}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <CharacterView character={character} onDelete={deleteCharacter} />
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            ))}
            {characters.length === 0 && (
              <div className="my-2 flex flex-col items-center justify-center w-full h-full">
                <span className="text-sm text-muted-foreground">No characters found.</span>
                {/* Explain how to add one */}
              </div>
            )}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
}
