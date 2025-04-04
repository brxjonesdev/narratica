import { narrativeRepository } from "../repository/NarrativeRepository";

export const removeNarrative = async (id: string | string[] | undefined) => {
    if (!id) throw new Error('No narrative ID provided.');
    return await narrativeRepository.deleteNarrative(id as string);
  };