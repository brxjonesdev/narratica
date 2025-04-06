// src/hooks/useNarrativeDetails.ts
import { useCallback, useEffect, useState } from 'react';
import { getNarrativeDetails } from '@/features/narratives/services/getNarrativeDetails';
import { err } from '@/shared/types/result';

type NarrativeDetails = {
  name: string;
  tagline: string;
  blurb: string;
};

export default function useNarrativeDetails(narrativeID: string | string[] | undefined) {
  const [info, setInfo] = useState<Partial<NarrativeDetails> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchNarrative = useCallback(async () => {
    const result = await getNarrativeDetails(narrativeID as string);
    if (!result.ok) {
      return err(result.error);
    }
    setInfo(result.data);
  }, [narrativeID]);

  useEffect(() => {
    fetchNarrative();
  }, [fetchNarrative, isModalOpen]);

  return { info, setInfo, isModalOpen, setIsModalOpen };
}
