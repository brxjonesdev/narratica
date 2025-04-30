import { NarrativeLocation } from '../types/Location';

export type CreateLocationResponse = {
  data: {
    createLocations: {
      locations: NarrativeLocation[];
      info: {
        nodesCreated: number;
      };
    };
  };
};

export type DeleteLocationResponse = {
  data: {
    deleteLocations: {
      nodesDeleted: number;
    };
  };
};

export function wasLocationNodeCreated(response: CreateLocationResponse) {
  return response?.data?.createLocations?.info?.nodesCreated > 0;
}

export function wasLocationNodeDeleted(response: DeleteLocationResponse) {
  return response?.data?.deleteLocations.nodesDeleted > 0;
}

export function buildLocationUpdateInput(
  data: Partial<NarrativeLocation>,
): Record<string, unknown> {
  const update: Record<string, unknown> = {};
  for (const key in data) {
    if (data[key as keyof NarrativeLocation] !== undefined) {
      update[key] = data[key as keyof NarrativeLocation];
    }
  }
  return update;
}
