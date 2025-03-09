import { Character } from '@/entities/Character';

export async function addNewCharacter(
  narrativeID: string,
  character: Character
): Promise<Character | null> {
  return character;
}
