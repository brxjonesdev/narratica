import Dashboard from '@/app/_views/dashboard';
import LandingPage from '@/app/_views/landing';
import { createClient } from '@/lib/utils/server';

export default async function Page() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser()

  return user ? <Dashboard /> : <LandingPage />;
}
