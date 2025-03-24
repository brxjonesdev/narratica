import { Character } from '@/entities/Character';
import { Location } from '@/entities/Location';
import { Outline } from '@/entities/Outline';
import { createStore } from 'zustand/vanilla';

export type NarrativeState = {
  characters: Character[];
  locations: Location[];
  story: Outline;
};

export type NarrativeActions = {
  setCharactersGlobal: (characters: Character[]) => void;
  setLocationsGlobal: (locations: Location[]) => void;
  setStoryGlobal: (story: Outline) => void;
};

export type NarrativeStore = NarrativeState & NarrativeActions;

export const initNarrativeStore = (): NarrativeState => {
  return {
    characters: [],
    locations: [],
    story: {
      id: '57832327-c949-4968-afsdsd',
      narrativeID: '57832327-c949-4968-af7d-45e737fhdjdjd874j4',
      acts: [
        {
          id: '57832327-c949-4sdsd-af7d-45e737fhdjdjd874j4',
          narrativeID: '57832327-c949-4968-af7d-45e737fhdjdjd874j4',
          title: 'Act 1',
          order: 1,
          chapters: [
            {
              id: '57832327-c949-4968-af7d-45e737fhdjdjd874j4',
              actID: '57832327-c949-4968-af7d-45e737fhdjdjd874j4',
              title: 'Chapter 1',
              order: 1,
              scenes: [
                {
                  id: '57832327-c949-4968-af7d-45e737fhdjdjd874j4',
                  chapterID: '57832327-c949-4968-af7d-45e737fhdjdjd874j4',
                  title: 'Scene 1',
                  order: 1,
                  content: 'This is the content of the scene',
                  characters: [],
                  locations: [],
                  labels: [],
                },
              ],
            },
            {
              id: '57832327-c949-4968-af7d-45e737dsdsd4',
              actID: '57832327-c949-4968-af7d-45e737fhdjdjd874j4',
              title: 'Chapter 2',
              order: 2,
              scenes: [
                {
                  id: '57832327-c949-4968-af7d-45e737fhdjdjd874j4',
                  chapterID: '57832327-c949-4968-af7d-45e737fhdjdjd874j4',
                  title: 'Scene 2',
                  order: 1,
                  content: 'This is the content of the scene',
                  characters: [],
                  locations: [],
                  labels: [],
                },
                {
                  id: '57832327-c949-4968-af7d-45e737fhdj874j4',
                  chapterID: '57832327-c949-4968-af7d-45e737fhdjdjd874j4',
                  title: 'Scene 3',
                  order: 2,
                  content: 'This is the content of the scene',
                  characters: [
                    {
                      id: 'harmony-cobel',
                      narrative: '57832327-c949-4968-af7d-45e737fhdjdjd874j4',
                      name: 'Harmony Cobel',
                      subname: 'The controlling overseer of severed lives.',
                    },
                  ],
                  locations: [],
                  labels: [],
                },
              ],
            },
          ],
        },
      ],
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
    setLocationsGlobal: (locations: Location[]) => set(() => ({ locations })),
    setStoryGlobal: (story: Outline) => set(() => ({ story })),
  }));
};
