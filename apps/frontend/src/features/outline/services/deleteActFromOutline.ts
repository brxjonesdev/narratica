import { err, ok } from "@/shared/types/result";
import { outlineRepository } from "../repository/OutlineRepository";

export default async function deleteActFromOutline(id: string, actID: string) {
    if (!id) return err('narrativeID is required');
    if (!actID) return err('actID is required');

    const result = await outlineRepository.deleteActByID(actID);
    if (!result.ok) return err(result.error);
    return ok(result.data);
}