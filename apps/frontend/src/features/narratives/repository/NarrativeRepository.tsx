import { Narrative } from '../types/Narrative';
import { GraphQLFetcher } from '@/lib/fetcher';
interface NarrativeRepository {
  fetchUserNarratives: (userId: string) => Promise<Narrative[]>;
  addNewNarrative: (
    id: string,
    narrative: Narrative
  ) => Promise<{ ok: boolean; data: Narrative | null }>;
  fetchNarrativeDetails: (narrativeID: string) => Promise<Narrative | null>;
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
        {
          where: {
            userID_EQ: userId,
          },
        }
      );

      return response?.data?.narratives ?? [];
    } catch (error) {
      console.error('Failed to fetch user narratives:', error);
      return [];
    }
  },

  async addNewNarrative(id: string, narrative: Narrative) {
    const CREATE_NARRATIVE = `
  mutation CreateNarratives($input: [NarrativeCreateInput!]!) {
    createNarratives(input: $input) {
      narratives {
        narrativeID
        userID
        tagline
        blurb
        name
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
              tagline: narrative.tagline,
              blurb: narrative.blurb,
              name: narrative.name,
            },
          ],
        });

      return {
        ok: true,
        data: response?.data?.createNarratives?.narratives[0] ?? null,
      };
    } catch (error) {
      console.error('Failed to create narrative:', error);
      return { ok: false, data: null };
    }
  },

  async fetchNarrativeDetails(narrativeID: string): Promise<Narrative | null> {
    try {
      const response = await fetch('/api/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            query Narratives($where: NarrativeWhere) {
              narratives(where: $where) {
                name
                tagline
                blurb
                updatedAt
              }
            }
          `,
          variables: { where: { narrativeID_EQ: narrativeID } },
        }),
      });

      if (!response.ok) throw new Error('Failed to fetch narrative details.');

      const data: { data: { narratives: Narrative[] } } = await response.json();
      return data.data.narratives[0] ?? null;
    } catch (error) {
      console.error('Error fetching narrative details:', error);
      return null;
    }
  }
};
