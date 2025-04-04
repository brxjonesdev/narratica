import { Character } from "../types/Character";

interface CharacterRepository {
    fetchCharacters: (narrativeID: string) => Promise<Character[]>;
    addNewCharacter: (narrativeID: string, character: Character) => Promise<{ ok: boolean; data: Character | null }>;
    modifyCharacterByID: (characterID: string, character: Character) => Promise<{ ok: boolean }>;
    deleteCharacterByID: (characterID: string) => Promise<{ ok: boolean }>;

}

export const characterRepository: CharacterRepository = {
    async fetchCharacters(narrativeID: string): Promise<Character[]> {
        // Implement logic to fetch characters
        return [];
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