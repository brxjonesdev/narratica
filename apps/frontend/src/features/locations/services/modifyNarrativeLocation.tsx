import { err, ok } from '@/shared/types/result';
import { locationsRepository } from '../repository/LocationsRepository';
import { NarrativeLocation } from '../types/Location';

export async function modifyNarrativeLocation(location: NarrativeLocation) {
  const result = await locationsRepository.modifyLocation(location);
  if (!result.ok) {
    return err(result.error);
  }
  return ok(result.data);
}
