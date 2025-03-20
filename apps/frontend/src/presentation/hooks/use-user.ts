import { useState, useEffect } from 'react';
import { createClient } from '@/lib/utils/client';
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = await createClient();
      const { data } = await supabase.auth.getUser();

      if (!data) {
        setLoading(false);
        router.push('/auth');
        return;
      }
      setUser(data.user);
      setLoading(false);
    };

    fetchUser();
  }, [router]);

  return { user, loading };
};
