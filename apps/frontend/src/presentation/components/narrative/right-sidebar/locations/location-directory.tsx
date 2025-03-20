import { Location } from "@/entities/Location";
import {
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/presentation/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/presentation/components/ui/dropdown-menu";
import LocationDetails from "@/presentation/components/narrative/right-sidebar/locations/views/location-details";
import { useLocations } from "@/presentation/hooks/use-locations";
import LocationView from "./view-location";

export function LocationDirectory() {
  const { locations, handleLocationSelect, activeID, handleLocationChange } = useLocations();

  return (
    <div>
      {locations.length > 0 ? (
        locations.map((location) => (
          <SidebarMenuItem
            key={location.id}
            className="my-1 hover:bg-primary/5 rounded-md py-1.5"
          >
            <SidebarMenuButton
              className="p-4 py-5"
              onClick={() => handleLocationSelect(location.id)}
            >
              <div className="flex items-center gap-3 w-full py-2 justify-center">
                <div className="flex flex-col flex-1 min-w-0 py-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium truncate text-md">
                      {location.name}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground truncate tracking-wider font-semibold">
                    {location.subname}
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
        <div className="my-2 flex flex-col items-center justify-center w-full flex-1 bg-white/10 rounded-xl min-h-[80vh]">
          <span className="text-sm text-muted-foreground">No locations found.</span>
        </div>
      )}
    </div>
  );
}
