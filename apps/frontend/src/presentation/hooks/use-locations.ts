
import { useEffect, useState } from "react";
import { Location } from "@/entities/Location";
import  modifyLocationByID from "@/usecases/modifyLocationByID";
import { useNarrativeStore } from "../stores/narrative-store-provider";
import { nanoid } from "nanoid";




export const useLocations = () => {
  const {setLocationsGlobal} = useNarrativeStore((store) => store);
  const [locations, setLocations] = useState<Location[] | null>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeID, setActiveID] = useState<string | null>(null);

 

  useEffect(() => {
    const locations = [
      {
        id: "1",
        name: "Location 1",
        subname: "Subname",
        narrative: "Narrative",
        description: "Description",
        details: "Details",
      },
      {
        id: "2",
        name: "Location 2",
        subname: "Subname",
        narrative: "Narrative",
        description: "Description",
        details: "Details",
      },
      {
        id: "3",
        name: "Location 3",
        subname: "Subname",
        narrative: "Narrative",
        description: "Description",
        details: "Details",
      },
    ]
    setLoading(false);
    setLocations(locations);
    setLocationsGlobal([]);
  }, [setLocationsGlobal]);

 





  const handleLocationSelect = (id: string | null) => {
    setActiveID(id);
  }

  const handleLocationChange = async (locationID: string, updatedLocation: Location) => {
    if (!locations) {
      setError("Locations not found");
      return;
    }

    const newLocation = await modifyLocationByID({ locationID, updatedLocation });
    if (!newLocation) {
      setError("Failed to update location. Please try again later.");
      return;
    }
 
    const locationIndex = locations.findIndex((location) => location.id === locationID);
    if (locationIndex === -1) {
      setError("Location not found");
      return;
    }

    console.log(`Updating location with ID: ${locationID}`);
    locations[locationIndex] = updatedLocation;
    setLocations([...locations]);
  }

  const addLocation = () => {
    const newLocation: Location = {
      id: `${nanoid(10)}-${nanoid(5)}-${nanoid(10)}-${nanoid(8)}`,
      name: "New Location",
      subname: "Subname",
      narrative: "Narrative",
      description: "Description",
      details: "Details",
    };

    setLocations((prevLocations) => (prevLocations ? [...prevLocations, newLocation] : [newLocation]));
    setLocationsGlobal([...locations || [], newLocation]);
    setActiveID(newLocation.id);
  };

  return { locations, loading, error, activeID, handleLocationSelect, handleLocationChange, addLocation, setActiveID };}