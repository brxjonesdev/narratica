import { err, ok } from "@/shared/types/result";
import { outlineRepository } from "../repository/OutlineRepository";

export default async function  deleteSceneFromChapter(id: string, sceneID: string) {
    if (!id) return err('narrativeID is required');
    if (!sceneID) return err('sceneID is required');

    const result = await outlineRepository.deleteSceneByID(sceneID);
    if (!result.ok) return err(result.error);
    return ok(result.data);

}