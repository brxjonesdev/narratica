import { err, ok } from '@/shared/types/result';
import { Scene } from '../types/Outline';
import { outlineRepository } from '../repository/OutlineRepository';

export default async function addSceneToChapter(
  id: string,
  chapterID: string,
  newScene: Scene,
) {
  if (!id) return err('narrativeID is required');
  if (!chapterID) return err('chapterID is required');
  if (!newScene) return err('newScene is required');

  const result = await outlineRepository.addNewScene(chapterID, newScene);
  if (!result.ok) return err(result.error);
  return ok(result.data);
}
