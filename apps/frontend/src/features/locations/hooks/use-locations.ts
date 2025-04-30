import { useCallback, useEffect, useState } from 'react';
import { useNarrativeStore } from '@/shared/stores/narrative-store-provider';
import { useParams } from 'next/navigation';
import { NarrativeLocation, createNewLocation } from '../types/Location';
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
    [setLocationsGlobal],
  );
  useEffect(() => {
    fetchLocations(id as string);
  }, [fetchLocations, id]);

  const addLocation = async () => {
    const newLocation = createNewLocation(id as string);
    setLocations((prev) => (prev ? [...prev, newLocation] : [newLocation]));
    setLocationsGlobal(locations ? [...locations, newLocation] : [newLocation]);
    setActiveID(newLocation.id);

    const result = await addLocationToNarrative(newLocation);

    if (!result.ok) {
      setLocations((prev) =>
        prev ? prev.filter((location) => location.id !== newLocation.id) : [],
      );
      setError(result.error);
      setActiveID(null);
      toast.error(result.error);
      return;
    }
  };

  const modifyLocation = async (location: NarrativeLocation) => {
    if (!locations) return;

    const index = locations.findIndex((loc) => loc.id === location.id);
    if (index === -1) return;

    const originalLocation = locations[index];
    const updatedLocations = [...locations];
    updatedLocations[index] = location;

    // Optimistically update
    setLocations(updatedLocations);
    setLocationsGlobal(updatedLocations);

    try {
      const result = await modifyNarrativeLocation(location);
      if (!result.ok) {
        // Revert on failure
        updatedLocations[index] = originalLocation;
        setLocations([...updatedLocations]);
        setLocationsGlobal([...updatedLocations]);
        setError(result.error);
        toast.error(result.error || 'Failed to modify location. Please try again later.');
      }
    } catch (error) {
      // Revert on error
      updatedLocations[index] = originalLocation;
      setLocations([...updatedLocations]);
      setLocationsGlobal([...updatedLocations]);
      toast.error('An unexpected error occurred. Please try again later.' + error);
    }
  };

  const deleteLocation = async (locationID: string) => {
    if (!locations) return;

    const originalLocations = [...locations];
    const remainingLocations = originalLocations.filter(
      (location) => location.id !== locationID,
    );

    setLocations(remainingLocations.length ? remainingLocations : null);
    setLocationsGlobal(remainingLocations);
    setActiveID(null);

    try {
      const result = await deleteNarrativeLocation(locationID);
      if (!result.ok) {
        setLocations(originalLocations);
        setLocationsGlobal(originalLocations);
        setError(result.error);
        toast.error(result.error || 'Failed to delete location. Please try again later.');
      }
    } catch (error) {
      setLocations(originalLocations);
      setLocationsGlobal(originalLocations);
      setError('Error deleting location');
      toast.error('An unexpected error occurred. Please try again later.' + error);
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
