'use client';
import { Result } from '@/shared/types/result';
import { narrativeRepository } from '../repository/NarrativeRepository';
import { Narrative } from '../types/Narrative';

export async function fetchUserNarratives(userId: string): Promise<Result<Narrative[], string>> {
  const result = await narrativeRepository.fetchUserNarratives(userId);
  if (!result.ok){
    return {
      ok: false,
      error: result.error,
    }
  } else {
    // sort narratives by updatedAt
    result.data.sort((a: { updatedAt: string }, b: { updatedAt: string }) => {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
    return {
      ok: true,
      data: result.data,
    }
  }
  
}

