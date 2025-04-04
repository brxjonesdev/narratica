import { characterRepository } from "../repository/CharacterRepository";

export async function deleteCharacterByID(narrativeID: string): Promise<{ ok: boolean }> {
  return await characterRepository.deleteCharacterByID(narrativeID);
}