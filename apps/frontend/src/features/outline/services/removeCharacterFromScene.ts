import { err } from '@/shared/types/result';
import { outlineRepository } from '../repository/OutlineRepository';

export default async function removeCharacterFromScene(id: string, characterID: string) {
  if (!id || !characterID) return err('Missing id or characterID');
  const result = outlineRepository.removeCharacterFromScene(id, characterID);
  return result;
}
