import { characterRepository } from '../repository/CharacterRepository';
import { Character } from '../types/Character';

export async function modifyCharacterByID(
  characterID: string,
  character: Character,
): Promise<{ ok: boolean }> {
  return await characterRepository.modifyCharacterByID(characterID, character);
}
