import { NarrativeLocation } from '../types/Location';
import { locationsRepository } from '@/features/locations/repository/LocationsRepository';
import { err, ok } from '@/shared/types/result';

export async function addLocationToNarrative(newLocation: NarrativeLocation) {
  const result = await locationsRepository.addLocationToNarrative(newLocation);
  if (!result.ok) {
    return err(result.error);
  }
  return ok(result.data);
}
