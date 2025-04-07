'use client';
import OutlineDirectory from '@/features/outline/components/outline-directory';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import Draft from '@/features/outline/components/draft';
import { useManuscript } from '@/features/outline/hooks/use-manuscript';
import { useNarrativeStore } from '@/shared/stores/narrative-store-provider';
import { useMediaQuery } from 'react-responsive';
import MobileView from '@/app/narrative/[id]/components/mobile-view';
import EmptyState from '@/features/narratives/components/empty-state';
import Loading from '@/shared/loading';
import OutlineError from '@/features/outline/components/error';

export default function NarrativeOutline() {
  const { locations, characters } = useNarrativeStore((store) => store);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const { story, acts, chapters, scenes, loading, error  } = useManuscript();
  if (isMobile) {
    return (
      <MobileView>
        <div>Hello</div>
      </MobileView>
    );
  }

  if(loading){
    return <Loading message='Loading the next best story...' />
  }

  if(error){
    console.log(error)
    return <OutlineError message={error} />
  }

  return (
    <section className="flex flex-1 flex-col gap-4 px-6 py-4 rounded-xl font-figtree">
      {story ? (<>
        <TabsContent value="outline" asChild>
          <OutlineDirectory 
          characters={characters}
           locations={locations} 
           story={story}
           acts={acts}
           chapters={chapters}
           scenes={scenes}
              />
        </TabsContent>
        <TabsContent value="draft" asChild>
          <Draft 
          characters={characters}
          locations={locations} 
          story={story}
          acts={acts}
          chapters={chapters}
          scenes={scenes}
          />
        </TabsContent>
      </>) : <EmptyState/>}
  </section>
  );
}
