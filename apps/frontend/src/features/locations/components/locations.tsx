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
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '@/shared/ui/dropdown-menu';
import { useLocations } from '@/features/locations/hooks/use-locations';
import { Delete, Plus } from 'lucide-react';
import LocationsError from './error';
import Loading from '@/shared/loading';
import { CardContent, CardHeader } from '@/shared/ui/card';
import { InlineEdit } from '@/shared/inline-edit';
import { Button } from '@/shared/ui/button';
import LocationDetails from './location-details';
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
} from '@/shared/ui/alert-dialog';

export function Locations() {
  const {
    locations,
    handleLocationSelect,
    activeID,
    modifyLocation,
    addLocation,
    error,
    loading,
    deleteLocation,
  } = useLocations();

  if (!locations) {
    return null;
  }

  if (loading) {
    return <Loading message="Loading locations..." />;
  }

  if (error) {
    return <LocationsError error={error} />;
  }

  return (
    <SidebarContent className="p-2 flex flex-col  h-full ">
      <SidebarGroup className="flex-1 items-start justify-start ">
        <SidebarGroupLabel className="text-base font-semibold mb-3">
          Locations
        </SidebarGroupLabel>
        <SidebarGroupAction
          className="hover:bg-primary/10 hover:text-primary"
          onClick={() => {
            addLocation();
          }}
        >
          <Plus /> <span className="sr-only">Add Character</span>
        </SidebarGroupAction>
        <SidebarGroupContent className="flex-1">
          <SidebarMenu className="h-full">
            {locations.length > 0 ? (
              locations.map((location) => (
                <SidebarMenuItem key={location.id} className="my-1  rounded-md py-1.5">
                  <SidebarMenuButton
                    className="p-4 py-8 bg-white/5 rounded-md hover:bg-primary/10"
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
                      <CardHeader className="w-full flex items-start flex-col gap-2 h-fit">
                        <div className="flex justify-between items-center w-full">
                          <div className="w-full">
                            <div className="flex items-baseline w-full">
                              <div className="flex flex-col">
                                <InlineEdit
                                  value={location.name}
                                  onChange={(value) =>
                                    modifyLocation({ ...location, name: value })
                                  }
                                  fontSize="2xl"
                                  weight="bold"
                                />
                                <InlineEdit
                                  value={location.subname}
                                  onChange={(value) =>
                                    modifyLocation({ ...location, subname: value })
                                  }
                                  fontSize="xs"
                                />
                              </div>
                            </div>
                          </div>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                className="hover:bg-red-600/60"
                                variant="ghost"
                                size="icon"
                              >
                                <Delete />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you sure you want to delete {location.name}?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will permanently
                                  delete {location.name} from your narrative.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  className=" hover:bg-red-600/80"
                                  onClick={() => deleteLocation(location.id)}
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </CardHeader>

                      <CardContent className="flex-1 flex ">
                        <LocationDetails location={location} onUpdate={modifyLocation} />
                      </CardContent>
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
