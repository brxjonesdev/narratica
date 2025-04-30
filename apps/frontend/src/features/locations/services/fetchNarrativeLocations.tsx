import { Result, ok, err } from '@/shared/types/result';
import { NarrativeLocation } from '@/features/locations/types/Location';
import { locationsRepository } from '@/features/locations/repository/LocationsRepository';

export async function fetchNarrativeLocations(
  narrativeID: string,
): Promise<Result<NarrativeLocation[], string>> {
  const result = await locationsRepository.fetchNarrativeLocations(narrativeID);
  if (!result.ok) {
    return err(result.error);
  }
  const sorted = result.data.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  );

  return ok(sorted);
}
