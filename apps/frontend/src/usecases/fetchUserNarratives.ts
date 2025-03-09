import { Narrative } from '@/entities/Narrative';
import { GET_USER_NARRATIVES } from '@/infrastructure/graphql/narratives';
import { GraphQLFetcher } from '@/lib/fetcher';

export async function fetchUserNarratives(userId: string) {
  try {
    const response: { data: { narratives: Narrative[] } } = await GraphQLFetcher(
      GET_USER_NARRATIVES,
      {
        where: {
          userID_EQ: userId,
        },
      }
    );
    if (!response) {
      return null;
    }
    const { data } = response;
    return data.narratives;
  } catch (error) {
    console.error('Failed to fetch user narratives:', error);
  }
}
