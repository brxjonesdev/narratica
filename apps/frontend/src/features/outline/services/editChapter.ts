import { err, ok } from "@/shared/types/result";
import { Chapter } from "../types/Outline";
import { outlineRepository } from "../repository/OutlineRepository";


export default async function editChapterInOutline(id: string, chapterID: string, editedChapter: Partial<Chapter>){
    if (!id) return err('narrativeID is required');
    if (!chapterID) return err('chapterID is required');
    if (!editedChapter) return err('editedChapter is required');
    if(!editedChapter.title) return err('chapter title is required');

    const result = await outlineRepository.modifyChapterByID(chapterID, editedChapter);
    if (!result.ok) return err(result.error);
    return ok(result.data);

}