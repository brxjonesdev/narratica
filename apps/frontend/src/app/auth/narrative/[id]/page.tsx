'use client';
import OutlineDirectory from '@/features/manuscript/components/outline-directory';
import { Button } from '@/shared/ui/button';
import { Separator } from '@/shared/ui/separator';
import { SidebarTrigger } from '@/shared/ui/sidebar';
import { Home } from 'lucide-react';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import Draft from '@/features/manuscript/components/draft';
import { useManuscript } from '@/features/manuscript/hooks/use-manuscript';
import { useNarrativeStore } from '@/shared/stores/narrative-store-provider';
import { useMediaQuery } from 'react-responsive';
import MobileView from '@/features/manuscript/components/mobile-view';

export default function NarrativeOutline() {
  const { locations, characters } = useNarrativeStore((store) => store);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const { story } = useManuscript();
  console.log('isMobile', isMobile);
  if (isMobile) {
    return (
      <MobileView>
        <OutlineDirectory story={story} locations={locations} characters={characters} />
      </MobileView>
    );
  }
  return (
    <Tabs defaultValue="outline" className="w-full h-full flex flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b justify-between pr-4 sticky top-0 bg-background z-10">
        <div className="flex items-center gap-2 px-3">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-4" />
          <Link href="/">
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <Home />
            </Button>
          </Link>
          <Separator orientation="vertical" className="h-4" />
          <TabsList className="font-figtree w-[400px]">
            <TabsTrigger value="outline" className="w-full tracking-wider">
              Outline
            </TabsTrigger>
            <TabsTrigger value="draft" className="w-full tracking-wider">
              Draft
            </TabsTrigger>
          </TabsList>
        </div>
      </header>
      <section className="flex flex-1 flex-col gap-4 px-6 py-4 rounded-xl font-figtree">
        <TabsContent value="outline" asChild>
          <OutlineDirectory story={story} locations={locations} characters={characters} />
        </TabsContent>
        <TabsContent value="draft" asChild>
          <Draft story={story} locations={locations} characters={characters} />
        </TabsContent>
      </section>
    </Tabs>
  );
}


