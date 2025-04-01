import { Character } from "../types/Character";

export function modifyCharacterByID(characterID: string, character: Character): Promise<{ ok: boolean }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ ok: true });
    }, 1000);
  });
}