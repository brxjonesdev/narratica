import { Character } from '@/features/characters/types/Character';
export type CreateCharactersResponse = {
  data: {
    createCharacters: {
      characters: Character[];
      info: {
        nodesCreated: number;
      };
    };
  };
};

export type DeleteCharactersResponse = {
  data: {
    deleteCharacters: {
      nodesDeleted: number;
    };
  };
};
export function wasCharacterNodeCreated(response: CreateCharactersResponse) {
  return response?.data?.createCharacters?.info?.nodesCreated > 0;
}

export function wasCharacterNodeDeleted(response: DeleteCharactersResponse) {
  return response?.data?.deleteCharacters.nodesDeleted > 0;
}

export function buildUpdateInput(data: Partial<Character>): Record<string, unknown> {
  const update: Record<string, unknown> = {};
  for (const key in data) {
    if (data[key as keyof Character] !== undefined) {
      update[key] = data[key as keyof Character];
    }
  }
  return update;
}
