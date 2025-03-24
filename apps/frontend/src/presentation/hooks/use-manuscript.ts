import { Outline } from "@/entities/Outline";
import { useState } from "react";

export function useManuscript() {
    const [story, setStory] = useState<Outline>({
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
      });

    // fetching the story from the database
    // useEf


    


    // Act-related functions
    const addAct = () => {};
    const editAct = () => {};
    const deleteAct = () => {};

    // Chapter-related functions
    const addChapter = () => {};
    const editChapter = () => {};
    const deleteChapter = () => {};

    // Scene-related functions
    const addScene = () => {};
    const editScene = () => {};
    const deleteScene = () => {};

    // Character management within scenes
    const addCharacterToScene = () => {};
    const removeCharacterFromScene = () => {};

    // Location management within scenes
    const addLocationToScene = () => {};
    const removeLocationFromScene = () => {};

    return {
        story,
        acts: { add: addAct, edit: editAct, delete: deleteAct },
        chapters: { add: addChapter, edit: editChapter, delete: deleteChapter },
        scenes: { 
            add: addScene, edit: editScene, delete: deleteScene, 
            characters: { add: addCharacterToScene, remove: removeCharacterFromScene }, 
            locations: { add: addLocationToScene, remove: removeLocationFromScene } 
        }
    };
}
