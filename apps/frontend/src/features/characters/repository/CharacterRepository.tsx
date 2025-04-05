import { Character } from "../types/Character";
import {Result, ok, err} from '@/shared/types/result';
import { GraphQLFetcher } from "@/lib/fetcher";

interface CharacterRepository {
    fetchCharacters: (narrativeID: string) => Promise<Result<Character[], string>>;
    addNewCharacter: (narrativeID: string, character: Character) => Promise<{ ok: boolean; data: Character | null }>;
    modifyCharacterByID: (characterID: string, character: Character) => Promise<{ ok: boolean }>;
    deleteCharacterByID: (characterID: string) => Promise<{ ok: boolean }>;

}

export const characterRepository: CharacterRepository = {
    async fetchCharacters(narrativeID: string): Promise<Result<Character[], string>> {
    const FETCH_CHARACTERS = `
query Characters($where: CharacterWhere) {
  characters(where: $where) {
    id
    narrative
    name
    alias
    description
    backstory
    appearance
    personality
    role
    age
    height
    weight
    eyeColor
    hairColor
    skinColor
    bodyType
    strengths
    weaknesses
    fears
    motivations
    goals
    isAlive
    isActiveInStory
    alignment
    createdAt
    updatedAt
  }
}`


try {
    console.log('narrativeID reposs', narrativeID);
    const response: { data?: { characters?: Character[] } } = await GraphQLFetcher(FETCH_CHARACTERS, { where: { narrative: narrativeID } });
    const characters = response?.data?.characters ?? [];
    return ok(characters);
} catch (error: string | unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return err(`Failed to fetch characters: ${errorMessage}`);
}
    },

    async addNewCharacter(narrativeID: string, character: Character): Promise<{ ok: boolean; data: Character | null }> {
        // Implement logic to add a new character
        return { ok: true, data: character };
    },

    async modifyCharacterByID(characterID: string, character: Character): Promise<{ ok: boolean }> {
        // Implement logic to modify a character by ID
        return { ok: true };
    },

    async deleteCharacterByID(characterID: string): Promise<{ ok: boolean }> {
        // Implement logic to delete a character by ID
        return { ok: true };
    },
};