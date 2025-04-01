'use client';
import { narrativeRepository } from '../repository/NarrativeRepository';

export async function fetchUserNarratives(userId: string) {
  const narratives = await narrativeRepository.fetchUserNarratives(userId);
  return narratives.sort((a: { updatedAt: string }, b: { updatedAt: string }) => {
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });
}
