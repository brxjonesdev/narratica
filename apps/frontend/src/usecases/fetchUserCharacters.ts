import { Character } from '@/entities/Character';
import { GET_USER_CHARACTERS } from '@/infrastructure/graphql/characters';
import { GraphQLFetcher } from '@/lib/fetcher';

export async function fetchUserCharacters(narrativeID: string) {
  try {
    const response: { data: { characters: Character[] } } = await GraphQLFetcher(
      GET_USER_CHARACTERS,
      {
        where: {
          narrative_EQ: narrativeID,
        },
      }
    );
    return response.data.characters;
  } catch (error) {
    console.error('Error fetching user characters:', error);
    throw error;
  }
}
