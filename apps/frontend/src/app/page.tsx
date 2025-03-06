import Dashboard from '@/components/_views/dashboard';
import LandingPage from '@/components/_views/landing';
import { createClient } from '@/lib/utils/server';

export default async function Page() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? <Dashboard /> : <LandingPage />;
}
