import NarraticaHeader from '@/presentation/components/landing/header';
import NarraticaHero from '@/presentation/components/landing/hero';

export default function LandingPage() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center h-screen mx-4 font-figtree">
      <NarraticaHeader />
      <NarraticaHero />
    </main>
  );
}
