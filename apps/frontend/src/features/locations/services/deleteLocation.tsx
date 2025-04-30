import { err } from '@/shared/types/result';
import { locationsRepository } from '../repository/LocationsRepository';
export function deleteNarrativeLocation(locationID: string) {
  if (!locationID) {
    return err('Location ID is required');
  }
  return locationsRepository.deleteLocation(locationID);
}
