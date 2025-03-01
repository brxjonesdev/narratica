"use client"
import { SidebarGroupAction } from '@/components/ui/sidebar';
import { Plus } from 'lucide-react';
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export default function CreateEnitity({handleAdd}: {handleAdd: (entityType: string) => void}) {
  const [isOpen, setIsOpen] = React.useState(false);


  // Clicking one of the buttons should create a new entity of that type in state and open the details view for that entity
  // The entity should be added to the narrative and the sidebar should update to show the new entity
  const ENTITY_TYPES = [
    { label: 'Character', value: 'character' },
    { label: 'Location', value: 'location' },
    { label: 'Item', value: 'item' },
    { label: 'Subplot', value: 'subplot' },
    { label: 'Lore', value: 'lore' },
    { label: 'Faction', value: 'faction' },
    { label: 'Species', value: 'species' },
  ]
  return(
<DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
  <DropdownMenuTrigger asChild>
  <SidebarGroupAction title="Add Entity" className="hover:bg-white/20">
  <Plus /> <span className="sr-only">Add Entity</span>
</SidebarGroupAction>
  </DropdownMenuTrigger>
  <DropdownMenuContent
    align="start"
    side='right'
    className="w-fit bg-background border border-border rounded-md shadow-lg p-2"
    sideOffset={28}
    style={{ zIndex: 9999 }}
  >
    {ENTITY_TYPES.map((entity) => (
      <DropdownMenuItem key={entity.value} 
      onSelect={(e) => {
        e.preventDefault();
        handleAdd(entity.value);
        setIsOpen(false);
      }
      }
      className="cursor-pointer font-figtree text-sm text-center hover:bg-white/20" onClick={() => console.log(`Creating ${entity.label}`)}>
        {entity.label}
      </DropdownMenuItem>
    ))}
  </DropdownMenuContent>
</DropdownMenu>
)
}
