import { useCallback, useEffect, useState } from 'react';
import { createNewLocation, NarrativeLocation } from '@/features/locations/types/Location';
import { useNarrativeStore } from '@/shared/stores/narrative-store-provider';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { fetchNarrativeLocations } from '../services/fetchNarrativeLocations';
import { addLocationToNarrative } from '../services/addLocationToNarrative';

export const useLocations = () => {
  const { setLocationsGlobal } = useNarrativeStore((store) => store);
  const [locations, setLocations] = useState<NarrativeLocation[] | null>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeID, setActiveID] = useState<string | null>(null);
  const { id } = useParams();

  const fetchLocations = useCallback( async (id: string)=> {
    try {
      setLoading(true);
      const result = await fetchNarrativeLocations(id);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setLocations(result.data);
      setLocationsGlobal(result.data);
    }
    catch (error) {
      setError('Failed to fetch locations.' + error);
    }
    finally {
      setLoading(false);
    }
  },[setLocationsGlobal]);
  useEffect(()=> {
    fetchLocations(id as string);
  }, [fetchLocations, id])

  const addLocation = async () => {
    const newLocation = createNewLocation(id as string);
    const result = await addLocationToNarrative(id as string, newLocation);
    if (result.error){
      toast.error('Failed to add location. Please try again later.');
      return;
    }
    setLocations([...(locations ?? []), newLocation]);
    setLocationsGlobal([...locations ?? [], newLocation]);
    setActiveID(newLocation.id);
    toast.success('Location added successfully');
  }

  const modifyLocation = async (location: NarrativeLocation) => {
    
  }

  const deleteLocation = async (locationID: string) => {}

  return {
    locations,
    loading,
    error,
    addLocation,
    modifyLocation,
    deleteLocation,
    activeID,
    setActiveID,
  };
};
