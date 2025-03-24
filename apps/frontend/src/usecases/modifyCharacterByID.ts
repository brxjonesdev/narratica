import { Character } from '@/entities/Character';
import { GraphQLFetcher } from '@/lib/fetcher';

export async function modifyCharacterByID(characterID: string, character: Character) {
  //   try {
  //     const response: { data: { modifyCharacter: boolean } } = await GraphQLFetcher(
  //       MODIFY_CHARACTER_BY_ID,
  //       {
  //         characterID,
  //         character,
  //       }
  //     );
  //     if (!response) {
  //       return false;
  //     }
  //     const { data } = response;
  //     return data.modifyCharacter;
  //   } catch (error) {
  //     console.error('Failed to modify character:', error);
  //   }
  return { character };
}
