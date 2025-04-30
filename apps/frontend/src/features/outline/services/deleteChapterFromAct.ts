import { err, ok } from '@/shared/types/result';
import { outlineRepository } from '../repository/OutlineRepository';

export default async function deleteChapterFromAct(
  id: string,
  chapterID: string,
  scenes: string[],
) {
  if (!id) return err('narrativeID is required');
  if (!chapterID) return err('chapterID is required');

  const result = await outlineRepository.deleteChapterByID(chapterID, scenes);
  if (!result.ok) return err(result.error);
  return ok(result.data);
}
