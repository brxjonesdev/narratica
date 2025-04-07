import { err, ok, Result } from "@/shared/types/result";
import { Act, Chapter, Outline, Scene } from "../types/Outline";
import { Character } from "@/features/characters/types/Character";
import { GraphQLFetcher } from "@/lib/fetcher";

interface OutlineRepository {
    getPlot : (narrativeID: string) => Promise<Result<Outline, string>>;
    addNewAct: (narrativeID: string, act: Act) => Promise<Result<Act, string>>;
    modifyActByID: (actID: string, act: Act) => Promise<Result<{ ok: boolean }, string>>;
    deleteActByID: (actID: string) => Promise<Result<{ ok: boolean }, string>>;
    addNewChapter: (narrativeID: string, chapter: Chapter) => Promise<Result<Chapter, string>>;
    modifyChapterByID: (chapterID: string, chapter: Chapter) => Promise<Result<{ ok: boolean }, string>>;
    deleteChapterByID: (chapterID: string) => Promise<Result<{ ok: boolean }, string>>;
    addNewScene: (narrativeID: string, scene: Scene) => Promise<Result<Scene, string>>;
    modifySceneByID: (sceneID: string, scene: Scene) => Promise<Result<{ ok: boolean }, string>>;
    deleteSceneByID: (sceneID: string) => Promise<Result<{ ok: boolean }, string>>;
    addCharacterToScene: (sceneID: string, character: Character) => Promise<Result<{ ok: boolean }, string>>;
    removeCharacterFromScene: (sceneID: string, characterID: string) => Promise<Result<{ ok: boolean }, string>>;
    addLocationToScene: (sceneID: string, location: Location) => Promise<Result<{ ok: boolean }, string>>;
    removeLocationFromScene: (sceneID: string, locationID: string) => Promise<Result<{ ok: boolean }, string>>;
}

export const outlineRepository: OutlineRepository = {

    async getPlot(narrativeID: string) {
        const FETCH_PLOT = ``
        try{
            const response = await GraphQLFetcher<{ data: { plot: Outline } }>(FETCH_PLOT, { where: {
                narrative: narrativeID
            }});
            const plot = response.data.plot;
            return ok(plot);
        } catch (error) {
            return err("Failed to fetch plot" + error);
        }
    },

    async addNewAct(narrativeID: string, act: Act) {
        const CREATE_ACT = ``
    },

    async modifyActByID(actID: string, act: Act) {
        const UPDATE_ACT = ``
    },

    async deleteActByID(actID: string) {
        const DELETE_ACT = ``
    },

    async addNewChapter(narrativeID: string, chapter: Chapter) {
        const CREATE_CHAPTER = ``
    },

    async modifyChapterByID(chapterID: string, chapter: Chapter) {
        const UPDATE_CHAPTER = ``
    },

    async deleteChapterByID(chapterID: string) {
        const DELETE_CHAPTER = ``
    },

    async addNewScene(narrativeID: string, scene: Scene) {
        const CREATE_SCENE = ``
    },

    async modifySceneByID(sceneID: string, scene: Scene) {
        const UPDATE_SCENE = ``
    },

    async deleteSceneByID(sceneID: string) {
        const DELETE_SCENE = ``
    },

    async addCharacterToScene(sceneID: string, character: Character) {
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