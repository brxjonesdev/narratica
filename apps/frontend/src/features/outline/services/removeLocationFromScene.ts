import { err, ok } from "@/shared/types/result";
import { outlineRepository } from "../repository/OutlineRepository";

export default async function removeLocationFromScene(sceneId:string, locationID: string){
    if (!sceneId || !locationID) return err("Missing scene id or locationID");
    const result = await outlineRepository.removeCharacterFromScene(sceneId, locationID);
    if (!result.ok) return err(result.error);
    return ok(result.data);
}