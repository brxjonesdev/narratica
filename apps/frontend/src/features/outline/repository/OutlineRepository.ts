import { err, ok, Result } from "@/shared/types/result";
import { Act, Chapter, createNewOutline, Outline, Scene } from "../types/Outline";
import { Character } from "@/features/characters/types/Character";
import { GraphQLFetcher } from "@/lib/fetcher";
import { NarrativeLocation } from "@/features/locations/types/Location";

interface OutlineRepository {
    getPlot : (narrativeID: string) => Promise<Result<Outline[], string>>;
    addNewAct: (narrativeID: string, act: Act) => Promise<Result<Act, string>>;
    modifyActByID: (actID: string, act: Partial<Act>) => Promise<Result<{ ok: boolean }, string>>;
    deleteActByID: (actID: string) => Promise<Result<{ ok: boolean }, string>>;
    addNewChapter: (narrativeID: string, chapter: Chapter) => Promise<Result<Chapter, string>>;
    modifyChapterByID: (chapterID: string, chapter: Partial<Chapter>) => Promise<Result<{ ok: boolean }, string>>;
    deleteChapterByID: (chapterID: string) => Promise<Result<{ ok: boolean }, string>>;
    addNewScene: (narrativeID: string, scene: Scene) => Promise<Result<Scene, string>>;
    modifySceneByID: (sceneID: string, scene: Partial<Scene>) => Promise<Result<{ ok: boolean }, string>>;
    deleteSceneByID: (sceneID: string) => Promise<Result<{ ok: boolean }, string>>;
    addCharacterToScene: (sceneID: string, character: Partial<Character>) => Promise<Result<{ ok: boolean }, string>>;
    removeCharacterFromScene: (sceneID: string, characterID: string) => Promise<Result<{ ok: boolean }, string>>;
    addLocationToScene: (sceneID: string, location: Partial<NarrativeLocation>) => Promise<Result<{ ok: boolean }, string>>;
    removeLocationFromScene: (sceneID: string, locationID: string) => Promise<Result<{ ok: boolean }, string>>;
}

export const outlineRepository: OutlineRepository = {

    async getPlot(narrativeID: string) {
        const FETCH_PLOT = `
       query Query($where: OutlineWhere) {
  outlines(where: $where) {
    id
    narrativeID
    acts {
      id
      title
      order
      chapters {
        id
        title
        order
        scenes {
          id
          title
          order
          summary
          content
          characters {
            name
            subname
          }
          locations {
            subname
            name
          }
        }
      }
    }
  }
}`
        try{
            const response = await GraphQLFetcher<{ data: { outlines: Outline[] } }>(FETCH_PLOT, { where: {
                narrativeID_EQ: narrativeID,
            }});
            console.log(response, "response")
            const plot = response.data?.outlines;
            console.log(plot, "plot");
            return ok(plot);
        } catch (error) {
            return err("Failed to fetch plot" + error);
        }
    },

    async addNewAct(narrativeID: string, act: Act) {
      const CHECK_OUTLINE = `
        query CheckOutline($where: OutlineWhere) {
          outlines(where: $where) {
            id
            narrativeID
          }
        }
      `;
    
      const INIT_OUTLINE = `
         mutation InitOutline($input: [OutlineCreateInput!]!) {
          createOutlines(input: $input) {
            outlines {
              id
              narrativeID
              acts {
                id
              }
            }
          }
        }
      `;
    
      const CREATE_ACT = `
        mutation Mutation($where: OutlineWhere, $update: OutlineUpdateInput) {
          updateOutlines(where: $where, update: $update) {
            info {
              nodesCreated
            }
          }
        }
      `;
    
      try {
        // Log the start of the function and the narrative ID
        console.log('Starting to add a new act for narrativeID:', narrativeID);
    
        // Checking if there is an existing outline for the narrative
        console.log('Checking if outline exists for narrativeID:', narrativeID);
    
        const { data: checkData } = await GraphQLFetcher<{ data: { outlines: Outline[] } }>(
          CHECK_OUTLINE,
          { where: { narrativeID_EQ: narrativeID } }
        );
    
        console.log('Fetched outline data:', checkData);
    
        let outline = checkData.outlines[0];

        console.log('Outline found:', outline);
    
        // If no outline exists, create a new one
        if (!outline || outline === undefined) {
          console.log('No outline found. Creating a new outline...');
          const newOutline = createNewOutline(narrativeID);
          console.log('New outline created:', newOutline);
    
         const response = await GraphQLFetcher<{ data: { createOutlines: { outlines: Outline[] } } }>(
            INIT_OUTLINE,
            { input: [
              {
                id: newOutline.id,
                narrativeID: newOutline.narrativeID,
              }
            ]}
          );
          console.log('Outline creation response:', response);
    
        outline = response.data.createOutlines.outlines[0];
          if (!outline) {
            console.error('Failed to create outline');
            return err("Outline not found");
          }
        }
    
        // Log the outline that was found or created
        console.log('Outline found or created:', outline);
    
        // Add the new act to the outline
        console.log('Adding new act:', act);
    
        const { data: actData } = await GraphQLFetcher<{ data: { createAct: Act } }>(
          CREATE_ACT,
          {
            where: {
              narrativeID_EQ: narrativeID
            },
            update: {
              acts: [
                {
                  create: [
                    {
                      node: act
                    }
                  ]
                }
              ]
            }
          }
        );
    
        console.log('Act creation response:', actData);
    
        return ok(actData.createAct);
      } catch (error) {
        console.error('Error while adding new act:', error);
        return err("Failed to fetch plot: " + error);
      }
    }
    ,
      
    async modifyActByID(actID: string, act: Partial<Act>) {
        const UPDATE_ACT = ``
    },

    async deleteActByID(actID: string) {
        const DELETE_ACT = ``
    },

    async addNewChapter(narrativeID: string, chapter: Chapter) {
        const CREATE_CHAPTER = ``
    },

    async modifyChapterByID(chapterID: string, chapter: Partial<Chapter>) {
        const UPDATE_CHAPTER = ``
    },

    async deleteChapterByID(chapterID: string) {
        const DELETE_CHAPTER = ``
    },

    async addNewScene(narrativeID: string, scene: Scene) {
        const CREATE_SCENE = ``
    },

    async modifySceneByID(sceneID: string, scene: Partial<Scene>) {
        const UPDATE_SCENE = ``
    },

    async deleteSceneByID(sceneID: string) {
        const DELETE_SCENE = ``
    },

    async addCharacterToScene(sceneID: string, character: Partial<Character>) {
        const ADD_CHARACTER_TO_SCENE = ``
    },

    async removeCharacterFromScene(sceneID: string, characterID: string) {
        const REMOVE_CHARACTER_FROM_SCENE = ``
    },

    async addLocationToScene(sceneID: string, location: Location) {
        const ADD_LOCATION_TO_SCENE = ``
    },

    async removeLocationFromScene(sceneID: string, locationID: string) {
        const REMOVE_LOCATION_FROM_SCENE = ``
    },


}