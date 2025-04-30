import { Result, ok, err } from '@/shared/types/result';
import { NarrativeLocation } from '../types/Location';
import {
  buildLocationUpdateInput,
  CreateLocationResponse,
  DeleteLocationResponse,
  wasLocationNodeCreated,
  wasLocationNodeDeleted,
} from '../utils/locations';
import { GraphQLFetcher } from '@/lib/fetcher';

interface LocationsRepository {
  fetchNarrativeLocations: (
    narrativeID: string,
  ) => Promise<Result<NarrativeLocation[], string>>;
  addLocationToNarrative: (
    location: NarrativeLocation,
  ) => Promise<Result<NarrativeLocation, string>>;
  deleteLocation: (locationID: string) => Promise<Result<{ ok: boolean }, string>>;
  modifyLocation: (
    location: NarrativeLocation,
  ) => Promise<Result<{ ok: boolean }, string>>;
}

export const locationsRepository: LocationsRepository = {
  async fetchNarrativeLocations(narrativeID: string) {
    const FETCH_LOCATIONS = `
    query Locations($where: LocationWhere) {
  locations(where: $where) {
    id
    name
    subname
    narrative
    description
    details
    createdAt
    updatedAt
  }
}`;
    try {
      const response: { data?: { locations?: NarrativeLocation[] } } =
        await GraphQLFetcher(FETCH_LOCATIONS, { where: { narrative: narrativeID } });
      console.log('Locationsssss:', response);
      const locations = response?.data?.locations ?? [];
      return ok(locations);
    } catch {
      return err('Failed to fetch locations');
    }
  },

  async addLocationToNarrative(location: NarrativeLocation) {
    const ADD_LOCATION = `
    mutation Mutation($input: [LocationCreateInput!]!) {
  createLocations(input: $input) {
    info {
      nodesCreated
    }
    locations {
      id
      name
      subname
      narrative
      description
      details
      createdAt
      updatedAt
    }
  }
}`;
    const variables = {
      input: [location],
    };

    const response: CreateLocationResponse = await GraphQLFetcher(
      ADD_LOCATION,
      variables,
    );
    if (wasLocationNodeCreated(response)) {
      return ok(location);
    }
    return err('Failed to add location');
  },

  async deleteLocation(locationID: string) {
    const DELETE_LOCATION = `
      mutation Mutation($where: LocationWhere) {
    deleteLocations(where: $where) {
      nodesDeleted
    }
  }`;

    const response: DeleteLocationResponse = await GraphQLFetcher(DELETE_LOCATION, {
      where: { id: locationID },
    });
    console.log('Response:', response?.data?.deleteLocations?.nodesDeleted);
    if (wasLocationNodeDeleted(response)) {
      return ok({ ok: true });
    }
    return err('Failed to delete location');
  },

  async modifyLocation(location: NarrativeLocation) {
    const MODIFY_LOCATION = `
    mutation Mutation($where: LocationWhere, $update: LocationUpdateInput) {
  updateLocations(where: $where, update: $update) {
    info {
      nodesCreated
    }
  }
}
    `;
    const updatePayload = buildLocationUpdateInput(location);
    try {
      await GraphQLFetcher(MODIFY_LOCATION, {
        where: { id: location.id },
        update: updatePayload,
      });
      return ok({ ok: true });
    } catch (error) {
      console.error('Error modifying location:', error);
      return err(`Failed to modify location`);
    }
  },
};
