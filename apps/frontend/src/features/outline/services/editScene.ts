import { err, ok } from '@/shared/types/result';
import { Scene } from '../types/Outline';
import { outlineRepository } from '../repository/OutlineRepository';

export default async function editSceneInChapter(
  id: string,
  sceneID: string,
  editedScene: Partial<Scene>,
) {
  if (!id) return err('narrativeID is required');
  if (!sceneID) return err('sceneID is required');
  if (!editedScene) return err('editedScene is required');

  const result = await outlineRepository.modifySceneByID(sceneID, editedScene);
  if (!result.ok) return err(result.error);
  return ok(result.data);
}
