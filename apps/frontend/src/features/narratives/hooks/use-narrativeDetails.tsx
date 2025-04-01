// src/hooks/useNarrativeDetails.ts
import { useCallback, useEffect, useState } from 'react';
import { getNarrativeDetails } from '@/features/narratives/services/getNarrativeDetails';

type NarrativeDetails = {
  name: string;
  tagline: string;
  blurb: string;
};

export default function useNarrativeDetails(narrativeID: string | string[] | undefined) {
  const [info, setInfo] = useState<NarrativeDetails | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchNarrative = useCallback(async () => {
    const details = await getNarrativeDetails(narrativeID as string);
    setInfo(details);
  }, [narrativeID]);

  useEffect(() => {
    fetchNarrative();
  }, [fetchNarrative, isModalOpen]);

  return { info, setInfo, isModalOpen, setIsModalOpen };
}
