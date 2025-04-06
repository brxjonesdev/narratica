import { useCallback, useEffect, useState } from 'react';
import { createNewLocation, NarrativeLocation } from '@/features/locations/types/Location';
import { useNarrativeStore } from '@/shared/stores/narrative-store-provider';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { fetchNarrativeLocations } from '../services/fetchNarrativeLocations';
import { addLocationToNarrative } from '../services/addLocationToNarrative';
import { deleteNarrativeLocation } from '../services/deleteLocation';
import { modifyNarrativeLocation } from '../services/modifyNarrativeLocation';

export const useLocations = () => {
  const { setLocationsGlobal } = useNarrativeStore((store) => store);
  const [locations, setLocations] = useState<NarrativeLocation[] | null>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeID, setActiveID] = useState<string | null>(null);
  const { id } = useParams();

  const fetchLocations = useCallback(
    async (id: string) => {
      try {
        setLoading(true);
        const result = await fetchNarrativeLocations(id);
        console.log('Locations:', result);
        if (!result.ok) {
          setError(result.error);
          return;
        }
        setLocations(result.data);
        setLocationsGlobal(result.data);
      } catch (error) {
        setError('Failed to fetch locations.' + error);
      } finally {
        setLoading(false);
      }
    },
    [setLocationsGlobal]
  );
  useEffect(() => {
    fetchLocations(id as string);
  }, [fetchLocations, id]);

  const addLocation = async () => {
    const newLocation = createNewLocation(id as string);
    setLocations((prev) => (prev ? [...prev, newLocation] : [newLocation]));
    setActiveID(newLocation.id);

    const result = await addLocationToNarrative(newLocation);

    if (!result.ok) {
      setLocations((prev) =>
        prev ? prev.filter((location) => location.id !== newLocation.id) : []
      );
      setActiveID(null);
      toast.error(result.error);
      return;
    }
  };

  const modifyLocation = async (location: NarrativeLocation) => {
    console.log('Location:', location);
    const updatedLocation = locations?.find((loc) => loc.id === location.id);
    setLocations((prev) =>
      prev ? prev.map((loc) => (loc.id === location.id ? location : loc)) : []
    );

    const result = await modifyNarrativeLocation(location);
    if (!result.ok) {
      setLocations((prev) =>
        prev ? prev.map((loc) => (loc.id === location.id ? updatedLocation! : loc)) : []
      );
      toast.error(result.error);
      return;
    }
  };

  const deleteLocation = async (locationID: string) => {
    const deletedLocation = locations?.find((location) => location.id === locationID);
    setLocations((prev) => (prev ? prev.filter((location) => location.id !== locationID) : []));
    setActiveID(null);

    const result = await deleteNarrativeLocation(locationID);
    if (!result.ok) {
      setLocations((prev) => (prev ? [...(prev as NarrativeLocation[]), deletedLocation!] : []));
      toast.error(result.error);
      return;
    }
  };

  const handleLocationSelect = (locationID: string | null) => {
    setActiveID(locationID);
  };

  return {
    locations,
    loading,
    error,
    addLocation,
    modifyLocation,
    deleteLocation,
    activeID,
    setActiveID,
    handleLocationSelect,
  };
};
