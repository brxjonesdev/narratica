import { Character } from '../types/Character';
import { characterRepository } from '../repository/CharacterRepository';
import { err, Result, ok } from '@/shared/types/result';
export async function addNewCharacter(
  narrativeID: string,
  newCharacter: Character,
): Promise<Result<Character, string>> {
  console.log('Adding new character:', newCharacter);

  if (!narrativeID) {
    return err('Narrative ID is required');
  }

  if (!newCharacter) {
    return err('Character data is required');
  }

  if (!newCharacter.id) {
    return err('Character ID is required');
  }

  const response = await characterRepository.addNewCharacter(newCharacter);
  if (!response.ok) {
    return err(response.error);
  }
  return ok(response.data);
}
