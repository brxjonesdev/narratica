'use client';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAuth } from '@/shared/hooks/use-user';
import { Narrative } from '@/features/narratives/types/Narrative';
import { fetchUserNarratives } from '../services/fetchUsersNarratives';

export const useUserNarratives = () => {
  const [narratives, setNarratives] = useState<Narrative[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, loading: authLoading } = useAuth();

  const fetchNarratives = useCallback(async () => {
    if (!user?.id) return;

    try {
      setLoading(true);
      const result = await fetchUserNarratives(user.id);
      setLoading(false);
      if (!result.ok) {
        setError(result.error as string);
        return;
      }
      setNarratives(result.data);
    } catch (error) {
      toast.error(`Failed to fetch narratives:`);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    if (!user || authLoading) return;
    fetchNarratives();
  }, [authLoading, user, fetchNarratives]);

  const addNarrative = (newNarrative: Narrative) => {
    setNarratives((prev) => [newNarrative, ...prev]);
  };

  return { narratives, loading, addNarrative, refetch: fetchNarratives, error };
};
