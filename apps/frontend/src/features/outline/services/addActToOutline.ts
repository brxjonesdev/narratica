import { err, ok } from '@/shared/types/result';
import { Act } from '../types/Outline';
import { outlineRepository } from '../repository/OutlineRepository';

export async function addActToOutline(id: string, act: Act) {
  if (!id) return err('narrativeID is required');
  if (!act.id) return err('actID is required');

  const result = await outlineRepository.addNewAct(id, act);
  if (!result.ok) return err(result.error);
  return ok(result.data);
}
