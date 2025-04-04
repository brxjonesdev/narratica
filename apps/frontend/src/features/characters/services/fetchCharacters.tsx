import { characterRepository } from "../repository/CharacterRepository";

export async function fetchCharacters(narrativeID: string) {
  return await characterRepository.fetchCharacters(narrativeID);
}