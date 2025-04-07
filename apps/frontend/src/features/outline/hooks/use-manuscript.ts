import { createNewAct, createNewChapter, createNewScene, Outline } from '@/features//outline/types/Outline';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { fetchNarrativePlot } from '../services/fetchNarrativePlot';

export function useManuscript() {
  const [story, setStory] = useState<Outline | null>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();


  useEffect(() => {
 const fetchStory = async (narrativeID: string) => {
      setLoading(true);
      // const response = await fetchNarrativePlot(narrativeID);
      // if (!response.ok) {
      //   setError('Failed to fetch story. Please try again later.');
      //   return;
      // }
      setStory({
        id: '1',
        narrativeID: 'My Story',
        acts: [],
      });
      setLoading(false);
 }
    fetchStory(id as string);
  }, [id]);


  // Act-related functions
  const addAct = async (index: number) => {
    const newAct = createNewAct(`New Act`, index);
    setStory((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        acts: [...prev.acts, newAct],
      };
    });

  };
  const editAct = async () => {};
  const deleteAct = async () => {};

  // Chapter-related functions
  const addChapter = async (index: number, actID: string) => {
    const newChapter = createNewChapter(`New Chapter`, index, actID);
    setStory((prev) => {
      if (!prev) return null;
      const updatedActs = prev.acts.map((act) => {
        if (act.id === actID) {
          return {
            ...act,
            chapters: [...act.chapters, newChapter],
          };
        }
        return act;
      });
      return {
        ...prev,
        acts: updatedActs,
      };
    }
    );

  };
  const editChapter = async () => {};
  const deleteChapter = async () => {};

  // Scene-related functions
  const addScene = async (index: number, chapterID: string) => {
    const newScene = createNewScene(`New Scene`, index, chapterID);
    setStory((prev) => {
      if (!prev) return null;
      const updatedChapters = prev.acts.map((act) => {
        return {
          ...act,
          chapters: act.chapters.map((chapter) => {
            if (chapter.id === chapterID) {
              return {
                ...chapter,
                scenes: [...chapter.scenes, newScene],
              };
            }
            return chapter;
          }),
        };
      });
      return {
        ...prev,
        acts: updatedChapters,
      };
    });
    
  };
  const editScene = async () => {};
  const deleteScene = async () => {};

  // Character management within scenes
  const addCharacterToScene = async () => {};
  const removeCharacterFromScene = async () => {};

  // Location management within scenes
  const addLocationToScene = async () => {};
  const removeLocationFromScene = async () => {};

  return {
    story,
    loading,
    error,
    acts: { add: addAct, edit: editAct, delete: deleteAct },
    chapters: { add: addChapter, edit: editChapter, delete: deleteChapter },
    scenes: {
      add: addScene,
      edit: editScene,
      delete: deleteScene,
      characters: { add: addCharacterToScene, remove: removeCharacterFromScene },
      locations: { add: addLocationToScene, remove: removeLocationFromScene },
    },
  };
}
