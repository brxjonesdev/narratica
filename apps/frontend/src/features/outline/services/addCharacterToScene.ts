import { Character } from '@/features/characters/types/Character';
import { err, ok } from '@/shared/types/result';
import { outlineRepository } from '../repository/OutlineRepository';

export default async function addCharacterToScene(
  id: string,
  sceneID: string,
  character: Partial<Character>,
) {
  if (!id || !sceneID) return err('Invalid id or sceneID');
  if (!character) return err('Invalid character');

  const result = await outlineRepository.addCharacterToScene(sceneID, character);
  if (!result.ok) {
    return err(result.error);
  }
  return ok(result.data);
}
