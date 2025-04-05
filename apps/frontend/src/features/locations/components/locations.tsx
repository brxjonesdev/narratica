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
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from '@/shared/ui/dropdown-menu';
import { useLocations } from '@/features/locations/hooks/use-locations';
import LocationView from './view-location';
import { Plus } from 'lucide-react';
import LocationsError from './error';

export function Locations() {
  const { locations, handleLocationSelect, activeID, handleLocationChange, addLocation, error } =
    useLocations();

  if (!locations) {
    return null;
  }

  if (error){
    return <LocationsError error={error} />
  }

  return (
    <SidebarContent className="p-2 flex flex-col  h-full ">
      <SidebarGroup className='flex-1 items-start justify-start '>
        <SidebarGroupLabel className="text-base font-semibold mb-3">Locations</SidebarGroupLabel>
        <SidebarGroupAction
          className="hover:bg-primary/10 hover:text-primary"
          onClick={() => {
            addLocation();
          }}
        >
          <Plus /> <span className="sr-only">Add Character</span>
        </SidebarGroupAction>
        <SidebarGroupContent className='flex-1'>
          <SidebarMenu className='h-full'>
            {locations.length > 0 ? (
              locations.map((location) => (
                <SidebarMenuItem
                  key={location.id}
                  className="my-1 hover:bg-primary/5 rounded-md py-1.5"
                >
                  <SidebarMenuButton
                    className="p-4 py-8 bg-white/5 rounded-md hover:bg-primary/10"
                    onClick={() => handleLocationSelect(location.id)}
                  >
                    <div className="flex items-center gap-3 w-full py-2 justify-center">
                      <div className="flex flex-col flex-1 min-w-0 py-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium truncate text-md">{location.name}</span>
                        </div>
                        <span className="text-xs text-muted-foreground truncate tracking-wider font-semibold">
                          {location.subname || 'No subname'}
                        </span>
                      </div>
                    </div>
                  </SidebarMenuButton>

                  <DropdownMenu
                    open={activeID === location.id}
                    onOpenChange={(open) => {
                      if (!open) handleLocationSelect(null);
                    }}
                  >
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuAction className="hover:bg-primary/10" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      side="left"
                      className="w-[500px] overflow-y-auto h-[90vh] font-figtree my-10 flex flex-col"
                      sideOffset={290}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <LocationView location={location} handleChange={handleLocationChange} />
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>
              ))
            ) : (
              <div className="my-2 flex flex-col items-center justify-center w-full flex-1 bg-white/5 rounded-xl min-h-96">
                <span className="text-sm text-muted-foreground">No locations found.</span>
              </div>
            )}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
}
