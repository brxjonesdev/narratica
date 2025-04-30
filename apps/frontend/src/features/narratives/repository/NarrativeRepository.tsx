import { Narrative } from '../types/Narrative';
import { GraphQLFetcher } from '@/lib/fetcher';
import { Result, ok, err } from '@/shared/types/result';

interface NarrativeRepository {
  fetchUserNarratives: (userId: string) => Promise<Result<Narrative[], string>>;
  addNewNarrative: (
    id: string,
    narrative: Narrative,
  ) => Promise<Result<Narrative, string>>;
  fetchNarrativeDetails: (narrativeID: string) => Promise<Result<Narrative, string>>;
  editNarrativeMetadata: (
    narrativeID: string,
    updates: Partial<Narrative>,
  ) => Promise<Result<Narrative, string>>;
  deleteNarrative: (narrativeID: string) => Promise<Result<null, string>>;
}

export const narrativeRepository: NarrativeRepository = {
  async fetchUserNarratives(userId: string) {
    const GET_USER_NARRATIVES = `
      query Narratives($where: NarrativeWhere) {
        narratives(where: $where) {
          userID
          updatedAt
          tagline
          narrativeID
          name
          createdAt
          blurb
        }
      }
    `;

    try {
      const response: { data?: { narratives?: Narrative[] } } = await GraphQLFetcher(
        GET_USER_NARRATIVES,
        { where: { userID_EQ: userId } },
      );

      const narratives = response?.data?.narratives ?? [];
      return ok(narratives);
    } catch (error: string | unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return err(`Failed to fetch narratives: ${errorMessage}`);
    }
  },

  async addNewNarrative(id: string, narrative: Narrative) {
    const CREATE_NARRATIVE = `
     mutation Mutation($input: [NarrativeCreateInput!]!) {
  createNarratives(input: $input) {
    narratives {
      userID
      narrativeID
      name
      tagline
      blurb
      createdAt
      updatedAt
    }
  }
}
    `;
    try {
      const response: { data?: { createNarratives?: { narratives: Narrative[] } } } =
        await GraphQLFetcher(CREATE_NARRATIVE, {
          input: [
            {
              userID: id,
              narrativeID: narrative.narrativeID,
              tagline: narrative.tagline,
              blurb: narrative.blurb,
              name: narrative.name,
              updatedAt: narrative.updatedAt,
              createdAt: narrative.createdAt,
            },
          ],
        });
      console.log('response', response);

      const created = response?.data?.createNarratives?.narratives[0];
      if (!created) return err('Narrative was not created.');
      return ok(created);
    } catch (error) {
      console.log('error', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return err(`Failed to create narrative: ${errorMessage}`);
    }
  },

  async fetchNarrativeDetails(narrativeID: string) {
    const GET_NARRATIVE_DETAILS = `
      query Narratives($where: NarrativeWhere) {
        narratives(where: $where) {
          name
          tagline
          blurb
          updatedAt
        }
      }
    `;

    try {
      const response = await fetch('/api/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: GET_NARRATIVE_DETAILS,
          variables: { where: { narrativeID_EQ: narrativeID } },
        }),
      });

      if (!response.ok) return err('Network error while fetching narrative details.');

      const data: { data?: { narratives?: Narrative[] } } = await response.json();
      const narrative = data?.data?.narratives?.[0];

      if (!narrative) return err('Narrative not found.');
      console.log('narrative', narrative);
      return ok(narrative);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return err(`Failed to fetch narrative details: ${errorMessage}`);
    }
  },

  async editNarrativeMetadata(narrativeID: string, updates: Partial<Narrative>) {
    const UPDATE_NARRATIVE = `
      mutation UpdateNarrative($where: NarrativeWhere!, $update: NarrativeUpdateInput!) {
        updateNarratives(where: $where, update: $update) {
          narratives {
            narrativeID
            name
            tagline
            blurb
            updatedAt
          }
        }
      }
    `;

    try {
      const response: { data?: { updateNarratives?: { narratives: Narrative[] } } } =
        await GraphQLFetcher(UPDATE_NARRATIVE, {
          where: { narrativeID_EQ: narrativeID },
          update: updates,
        });

      const updated = response?.data?.updateNarratives?.narratives[0];
      if (!updated) return err('No narrative was updated.');
      return ok(updated);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return err(`Failed to update narrative: ${errorMessage}`);
    }
  },

  async deleteNarrative(narrativeID: string) {
    const DELETE_NARRATIVE = `
    mutation Mutation($where: NarrativeWhere, $deleteOutlinesWhere2: OutlineWhere, $delete: OutlineDeleteInput, $deleteCharactersWhere2: CharacterWhere, $deleteLocationsWhere2: LocationWhere) {
  deleteNarratives(where: $where) {
    nodesDeleted
  }
  deleteOutlines(where: $deleteOutlinesWhere2, delete: $delete) {
    nodesDeleted
  }
  deleteCharacters(where: $deleteCharactersWhere2) {
    nodesDeleted
  }
  deleteLocations(where: $deleteLocationsWhere2) {
    nodesDeleted
  }
}
    `;

    // needs to delete all the narrative's data

    try {
      await GraphQLFetcher(DELETE_NARRATIVE, {
        where: {
          narrativeID_EQ: narrativeID,
        },
        deleteOutlinesWhere2: {
          narrativeID_EQ: narrativeID,
        },
        delete: {
          acts: [
            {
              delete: {
                chapters: [
                  {
                    delete: {
                      scenes: [
                        {
                          delete: null,
                        },
                      ],
                    },
                  },
                ],
              },
            },
          ],
        },
        deleteCharactersWhere2: {
          narrative_EQ: narrativeID,
        },
        deleteLocationsWhere2: {
          narrative_EQ: narrativeID,
        },
      });

      return ok(null); // success, nothing to return
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return err(`Failed to delete narrative: ${errorMessage}`);
    }
  },
};
