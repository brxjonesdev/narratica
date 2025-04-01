// src/services/narrativeService.ts
import { narrativeRepository } from "../repository/NarrativeRepository";

export const getNarrativeDetails = async (narrativeID: string) => {
  if (!narrativeID) return null;
  return await narrativeRepository.fetchNarrativeDetails(narrativeID);
};
