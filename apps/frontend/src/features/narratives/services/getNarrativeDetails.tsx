// src/services/narrativeService.ts
import { Result, err, ok } from '@/shared/types/result';
import { narrativeRepository } from '../repository/NarrativeRepository';
import { Narrative } from '../types/Narrative';

export const getNarrativeDetails = async (
  narrativeID: string,
): Promise<Result<Partial<Narrative>, string>> => {
  if (!narrativeID) return err('narrativeID is required');
  const result = await narrativeRepository.fetchNarrativeDetails(narrativeID);
  if (!result.ok) return err(result.error);
  return ok(result.data);
};
