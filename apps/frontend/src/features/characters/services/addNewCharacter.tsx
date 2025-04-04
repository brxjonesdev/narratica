import React from 'react'
import { Character } from '../types/Character'
import { characterRepository } from '../repository/CharacterRepository'

export async function addNewCharacter(userID: string, newCharacter: Character): Promise<{ ok: boolean; data: Character | null }> {
   return await characterRepository.addNewCharacter(userID, newCharacter);
}