import NarraticaHeader from '@/features/narratives/components/landing/header';
import NarraticaHero from '@/features/narratives/components/landing/hero';

export default function LandingPage() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center h-screen mx-4 font-figtree">
      <NarraticaHeader />
      <NarraticaHero />
    </main>
  );
}
