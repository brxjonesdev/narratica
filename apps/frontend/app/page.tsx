import Dashboard from '@/presentation/views/dashboard';
import LandingPage from '@/presentation/views/landing';
import { createClient } from '@/lib/utils/server';

export default async function Page() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? <Dashboard /> : <LandingPage />;
}
