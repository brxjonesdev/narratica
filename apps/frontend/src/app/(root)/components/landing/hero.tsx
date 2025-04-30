import { PenTool } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import Link from 'next/link';

export default function NarraticaHero() {
  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className="flex gap-8  items-center justify-center flex-col">
          <div className="flex gap-4 flex-col w-full items-center">
            <h1 className="text-5xl md:text-7xl max-w-3xl  text-center font-regular font-bold">
              Every great story starts here.
            </h1>
            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-xl text-center">
              Build immersive worlds, develop rich characters, and structure compelling
              plots—all in one powerful writing space.{' '}
              <span className="text-wisteria font-semibold tracking-wide">Narratica</span>{' '}
              is your creative companion, designed to bring your stories to life like
              never before.
            </p>
          </div>
          <div className="flex flex-row gap-3">
            <Link href="/auth">
              <Button size="lg" className="gap-4" variant="outline">
                Start Writing <PenTool className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
