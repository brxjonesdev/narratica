import { err, ok } from "@/shared/types/result";
import { outlineRepository } from "../repository/OutlineRepository";
import { Act } from "../types/Outline";

export default async function editActInOutline(id: string, actID: string, editedAct: Partial<Act>){
    if (!id) return err('narrativeID is required');
    if (!actID) return err('actID is required');
    if (!editedAct) return err('editedAct is required');

    
    const result = await outlineRepository.modifyActByID(actID, editedAct);
    if (!result.ok) return err(result.error);
    return ok(result.data);

}