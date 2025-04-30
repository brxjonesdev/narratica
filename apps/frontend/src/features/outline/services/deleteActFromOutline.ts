import { err, ok } from '@/shared/types/result';
import { outlineRepository } from '../repository/OutlineRepository';

export default async function deleteActFromOutline(
  id: string,
  actID: string,
  chapters: string[],
  scenes: string[],
) {
  if (!actID) return err('actID is required');
  if (!id) return err('id is required');

  const result = await outlineRepository.deleteActByID(actID, chapters, scenes);
  if (!result.ok) return err(result.error);
  return ok(result.data);
}
