import { Result } from "@/shared/types/result";
import { Outline } from "../types/Outline";
import { outlineRepository } from "../repository/OutlineRepository";

export async function fetchNarrativePlot(narrativeID: string): Promise<Result<Outline, string>> {
    const result = await outlineRepository.getPlot(narrativeID);
    if (!result.ok) {
        return { ok: false, error: result.error };
    }
    return { ok: true, data: result.data[0] };
}