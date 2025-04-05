import { Result, ok, err } from '@/shared/types/result';
import { NarrativeLocation } from '../types/Location';

interface LocationsRepository {
    fetchNarrativeLocations: (narrativeID: string) => Promise<Result<NarrativeLocation[], string>>;
    addLocationToNarrative: (narrativeID: string, location: NarrativeLocation) => Promise<Result<NarrativeLocation, string>>;

}

export const locationsRepository: LocationsRepository = {
    async fetchNarrativeLocations(narrativeID: string) {
        return ok([]);
    },

    async addLocationToNarrative(narrativeID: string, location: NarrativeLocation) {
        return ok(location);
    }
  
}
