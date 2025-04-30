import { err, ok } from '@/shared/types/result';
import { Chapter } from '../types/Outline';
import { outlineRepository } from '../repository/OutlineRepository';

export default async function addChapterToAct(
  id: string,
  actID: string,
  chapter: Chapter,
) {
  if (!id) return err('narrativeID is required');
  if (!actID) return err('actID is required');
  if (!chapter) return err('chapter is required');
  if (!chapter.title) return err('chapter title is required');

  const result = await outlineRepository.addNewChapter(actID, chapter);
  if (!result.ok) return err(result.error);
  return ok(result.data);
}
