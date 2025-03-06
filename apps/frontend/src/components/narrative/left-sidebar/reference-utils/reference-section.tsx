import { SidebarGroup, SidebarGroupLabel, SidebarGroupAction, SidebarGroupContent, SidebarMenu, SidebarMenuButton } from '@/components/ui/sidebar'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from '@radix-ui/react-dropdown-menu'
import { Separator } from '@radix-ui/react-separator'
import { Plus } from 'lucide-react'
import React from 'react'
import SubMenu from './submenu'
import { Entity } from '@/entities/Entity'
import { Tag } from '@/entities/Tag'

interface ReferenceSectionProps {
  entities: Entity[];
  name: string;
  createEntity: () => void;
  availableTags: Tag[];
}

export default function ReferenceSection({entities, name, createEntity, availableTags} : ReferenceSectionProps) {
  return (
    <SidebarGroup>
        <SidebarGroupLabel>{name}</SidebarGroupLabel>
        <SidebarGroupAction 
        onClick={createEntity}
        title="Add Project" className="hover:bg-white/10 rounded-lg p-2">
          <Plus /> <span className="sr-only">Add {name}</span>
        </SidebarGroupAction>
        <Separator className='my-1.5'/>
        <SidebarGroupContent>
          <SidebarMenu>
            {entities.map((entity) => (
              <SidebarMenu  key={entity.id}>
              <DropdownMenu defaultOpen={entity.open}>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-white/20 w-full">
                    {entity.name}
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="right"
                  align="end"
                  className="w-[28rem] ml-8 p-0 border-none rounded-xl"
                >
                  <SubMenu entity={entity} availableTags={availableTags} />
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenu>
            
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
  )
}
