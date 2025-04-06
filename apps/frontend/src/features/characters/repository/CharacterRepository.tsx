import { Character } from '../types/Character';
import { Result, ok, err } from '@/shared/types/result';
import { GraphQLFetcher } from '@/lib/fetcher';
import {
  buildUpdateInput,
  CreateCharactersResponse,
  DeleteCharactersResponse,
  wasCharacterNodeCreated,
  wasCharacterNodeDeleted,
} from '@/features/characters/utils/character';

interface CharacterRepository {
  fetchCharacters: (narrativeID: string) => Promise<Result<Character[], string>>;
  addNewCharacter: (
    narrativeID: string,
    character: Character
  ) => Promise<Result<Character, string>>;
  modifyCharacterByID: (
    characterID: string,
    character: Character
  ) => Promise<Result<{ ok: boolean }, string>>;
  deleteCharacterByID: (characterID: string) => Promise<Result<{ ok: boolean }, string>>;
}

export const characterRepository: CharacterRepository = {
  async fetchCharacters(narrativeID: string) {
    const FETCH_CHARACTERS = `
        query Characters($where: CharacterWhere) {
        characters(where: $where) {
            id
            narrative
            name
            subname
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
}`;

    try {
      const response: { data?: { characters?: Character[] } } = await GraphQLFetcher(
        FETCH_CHARACTERS,
        { where: { narrative: narrativeID } }
      );
      const characters = response?.data?.characters ?? [];
      return ok(characters);
    } catch (error: string | unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return err(`Failed to fetch characters: ${errorMessage}`);
    }
  },

  async addNewCharacter(narrativeID: string, character: Character) {
    const ADD_CHARACTER = `
    mutation Mutation($input: [CharacterCreateInput!]!) {
  createCharacters(input: $input) {
    characters {
      id
      narrative
      subname
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
      archetype
      createdAt
      updatedAt
    }
    info {
      nodesCreated
    }
  }
}`;
    const variables = {
      input: [
        {
          ...character,
        },
      ],
    };
    const response: CreateCharactersResponse = await GraphQLFetcher(ADD_CHARACTER, variables);
    console.log('Response:', response);
    if (wasCharacterNodeCreated(response)) {
      return ok(response.data.createCharacters.characters[0]);
    }
    return err('Failed to add character');
  },

  async modifyCharacterByID(characterID: string, character: Character) {
    const MODIFY_CHARACTER = `
    mutation UpdateCharacters($where: CharacterWhere, $update: CharacterUpdateInput) {
  updateCharacters(where: $where, update: $update) {
    info {
      nodesCreated
    }
  }
}`;
    const updatePayload = buildUpdateInput(character);
    try {
      await GraphQLFetcher(MODIFY_CHARACTER, {
        where: { id: characterID },
        update: updatePayload,
      });
      return ok({ ok: true });
    } catch (error: string | unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return err(`Failed to modify character: ${errorMessage}`);
    }
  },

  async deleteCharacterByID(characterID: string) {
    const DELETE_CHARACTER = `
    mutation DeleteCharacters($where: CharacterWhere) {
  deleteCharacters(where: $where) {
    nodesDeleted
  }
}
    `;
    const response: DeleteCharactersResponse = await GraphQLFetcher(DELETE_CHARACTER, {
      where: { id: characterID },
    });
    console.log('Response:', response?.data?.deleteCharacters.nodesDeleted);
    if (wasCharacterNodeDeleted(response)) {
      return ok({ ok: true });
    }
    return err('Failed to delete character');
  },
};
