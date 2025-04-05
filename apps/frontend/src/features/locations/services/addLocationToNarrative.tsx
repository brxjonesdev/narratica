import { Location } from "../types/Location";

export function addLocationToNarrative(narrativeID: string, location: Location) {
    return {
        ok: true,
        error: null,
    };
}