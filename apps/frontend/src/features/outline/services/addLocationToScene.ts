import { err, ok } from "@/shared/types/result";
import { outlineRepository } from "../repository/OutlineRepository";
import { NarrativeLocation } from "@/features/locations/types/Location";

export default async function addLocationToScene(id: string, sceneID: string, location: Partial<NarrativeLocation>){
    if (!id || !sceneID || !location) return err("Missing id, sceneID or location");
    const result = await outlineRepository.addLocationToScene(sceneID, location);
    if (!result.ok) return err(result.error);
    return ok(result.data);
}