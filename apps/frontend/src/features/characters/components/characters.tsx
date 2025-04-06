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
} from '@/shared/ui/sidebar';
import { Heart, HeartOff, Plus } from 'lucide-react';
import React from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/shared/ui/dropdown-menu';
import { Separator } from '@radix-ui/react-separator';
import Loading from '@/shared/loading';
import CharacterView from './view-character';
import { Character } from '@/features/characters/types/Character';
import { useCharacters } from '@/features/characters/hooks/use-characters';
import CharacterError from './characters-error';

export default function Characters() {
  const {
    characters,
    loading,
    error,
    addCharacter,
    setActiveID,
    activeID,
    deleteCharacter,
    modifyCharacter,
  } = useCharacters();
  if (loading) return <Loading message="Getting your characters!" />;
  if (error) return <CharacterError error={error} />;
  return (
    <SidebarContent className="p-2 flex flex-col  h-full ">
      <SidebarGroup className="flex-1 items-start justify-start ">
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
        <SidebarGroupContent className="flex-1">
          <SidebarMenu className="h-full">
            {characters?.length > 0 ? (
              characters.map((character) => (
                <SidebarMenuItem key={character.id} className="my-1  rounded-md py-1.5 ">
                  <SidebarMenuButton
                    className="p-4 py-8 bg-white/5 hover:bg-white/10"
                    onClick={
                      activeID === character.id
                        ? () => setActiveID(null)
                        : () => setActiveID(character.id)
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
                          {character.subname || 'No subname'}
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
                      className="w-[500px] overflow-y-auto h-[90vh] font-figtree my-10 flex flex-col bg-background rounded-lg shadow-lg"
                      sideOffset={30}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <CharacterView
                        availableCharacters={characters}
                        character={character}
                        onDelete={deleteCharacter}
                        updateCharacter={(updatedCharacter: Character) => {
                          modifyCharacter(updatedCharacter);
                        }}
                      />
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>
              ))
            ) : (
              <div className="my-2 flex flex-col items-center justify-center w-full flex-1  bg-white/5 rounded-xl ">
                <span className="text-sm text-muted-foreground">No characters found.</span>
                <span className="text-sm text-muted-foreground">
                  Click the + button to add one.{' '}
                </span>
              </div>
            )}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
}
