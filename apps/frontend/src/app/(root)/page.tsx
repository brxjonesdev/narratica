import Dashboard from '@/app/(root)/components/dashboard/dashboard';
import { createClient } from '@/lib/utils/server';
import LandingPage from '@/app/(root)/components/landing/landing';

export default async function Page() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? <Dashboard /> : <LandingPage />;
}
