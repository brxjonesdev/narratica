import { narrativeRepository } from "../repository/NarrativeRepository";

export const updateNarrativeMetadata = async (id: string | string[] | undefined, values: { name: string; tagline: string; blurb: string }) => {
    if (!id) throw new Error('No narrative ID provided.');
    return await narrativeRepository.editNarrativeMetadata(id as string, values);
  };