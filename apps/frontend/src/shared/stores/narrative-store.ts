import { Character } from '@/features/characters/types/Character';
import { NarrativeLocation } from '@/features/locations/types/Location';
import { Outline } from '@/features/outline/types/Outline';
import { createStore } from 'zustand/vanilla';

export type NarrativeState = {
  characters: Character[];
  locations: NarrativeLocation[];
  story: Outline;
};

export type NarrativeActions = {
  setCharactersGlobal: (characters: Character[]) => void;
  setLocationsGlobal: (locations: NarrativeLocation[]) => void;
  setStoryGlobal: (story: Outline) => void;
};

export type NarrativeStore = NarrativeState & NarrativeActions;

export const initNarrativeStore = (): NarrativeState => {
  return {
    characters: [],
    locations: [],
    story: {
      id: '',
      narrativeID: '',
      acts: [],
    },
  };
};

export const defaultInitState: NarrativeState = {
  characters: [],
  locations: [],
  story: {
    id: '',
    narrativeID: '',
    acts: [],
  },
};

export const createNarrativeStore = (initState: NarrativeState = defaultInitState) => {
  return createStore<NarrativeStore>()((set) => ({
    ...initState,
    setCharactersGlobal: (characters: Character[]) => set(() => ({ characters })),
    setLocationsGlobal: (locations: NarrativeLocation[]) => set(() => ({ locations })),
    setStoryGlobal: (story: Outline) => set(() => ({ story })),
  }));
};
