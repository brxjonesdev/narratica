import NarraticaHeader from '@/app/(root)/components/landing/header';
import NarraticaHero from '@/app/(root)/components/landing/hero';

export default function LandingPage() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center h-screen mx-4 font-figtree">
      <NarraticaHeader />
      <NarraticaHero />
    </main>
  );
}
