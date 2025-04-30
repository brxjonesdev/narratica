'use client';
import {
  type ManuscriptActions,
  useManuscript,
} from '@/features/outline/hooks/use-manuscript';
import { useNarrativeStore } from '@/shared/stores/narrative-store-provider';
import { useMediaQuery } from 'react-responsive';
import MobileView from '@/app/narrative/[id]/components/mobile-view';
import Loading from '@/shared/loading';
import OutlineError from '@/features/outline/components/error';
import { Button } from '@/shared/ui/button';
import { PlusCircle, X } from 'lucide-react';
import EmptyOutline from '@/features/outline/components/empty-outline';
import React from 'react';
import Outline from '@/features/outline/components/outline';

export default function NarrativeOutline() {
  const { locations, characters } = useNarrativeStore((store) => store);
  const isMobile = useMediaQuery({ minWidth: 0, maxWidth: 767 });
  const { story, acts, chapters, scenes, loading, error }: ManuscriptActions =
    useManuscript();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Adjust duration as needed
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
        <Loading message="Loading your story..." />
      </div>
    );
  }

  if (isMobile) {
    return (
      <MobileView>
        <section className="flex flex-col items-center justify-center h-screen px-4 text-center">
          <h2 className="text-xl font-semibold mb-4">Best Viewed on Desktop or Tablet</h2>
          <p className="text-base text-gray-600">
            This app is designed for larger screens and doesn’t currently support mobile
            view. For the best experience, please use a desktop or tablet.
          </p>
        </section>
      </MobileView>
    );
  }

  if (loading) {
    return <Loading message="Loading the next best story..." />;
  }

  if (error) {
    console.log(error);
    return <OutlineError message={error} />;
  }

  console.log('Story:', story);

  if (story === undefined) {
    // If there are no acts, show the empty outline component
    return <EmptyOutline addInitialAct={acts.add} />;
  }

  return (
    <section className="flex flex-1 flex-col gap-4 px-6 py-4 rounded-xl font-figtree">
      <section className="flex-1 bg-black/10 text-gray-300 rounded-xl space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-wider">Outline</h2>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              className="bg-black/30 text-white/80 hover:bg-black/40"
              variant="outline"
              onClick={() => {
                acts.add(story?.acts?.length ?? 0);
              }}
            >
              <PlusCircle size={18} className="" />
              Add Act
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <Outline 
            story={story}
            acts={acts}
            chapters={chapters}
            scenes={scenes}
            locations={locations}
            characters={characters} 
            loading={loading} 
            error={error}          
          />
        </div>
      </section>
    </section>
  );
}
