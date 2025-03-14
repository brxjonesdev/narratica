// src/hooks/useNarratives.ts
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useAuth } from './use-user';
import { Narrative } from '@/entities/Narrative';
import { fetchUserNarratives } from '@/usecases/fetchUserNarratives';

export const useUserNarratives = () => {
  const [narratives, setNarratives] = useState<Narrative[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (authLoading) return;
    const fetchNarratives = async () => {
      const userId = user?.id;
      if (!userId) {
        toast.error('User not found. Please log in again.');
        setLoading(false);
        router.push('/auth');
        return;
      }

      const userNarratives = await fetchUserNarratives(userId);
      if (!userNarratives) {
        toast.error('Failed to fetch user narratives. Please try again later.');
        setLoading(false);
        return;
      }
      setNarratives(userNarratives);
      setLoading(false);
    };

    fetchNarratives();
  }, [authLoading, user, router]);

  const addNarrative = (narrative: Narrative) => {
    setNarratives((prev) => [...prev, narrative]);
  };

  return { narratives, loading, addNarrative };
};
