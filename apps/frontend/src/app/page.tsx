import Dashboard from '@/app/_views/dashboard';
import LandingPage from '@/app/_views/landing';
import { createClient } from '@/lib/utils/server';

export default async function Page() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser()
  console.log('user', user)

  return user ? <Dashboard /> : <LandingPage />;
}
