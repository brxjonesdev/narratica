import { characterRepository } from '../repository/CharacterRepository';
import { ok, err, Result } from '@/shared/types/result';
import { Character } from '../types/Character';

export async function fetchCharacters(narrativeID: string): Promise<Result<Character[], string>> {
  const result = await characterRepository.fetchCharacters(narrativeID);
  if (!result.ok) {
    return err('Failed to fetch characters');
  } else {
    return ok(result.data);
  }
}
