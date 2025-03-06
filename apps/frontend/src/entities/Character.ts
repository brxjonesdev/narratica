export type Character = {
    narrativeID?: string
    id: string
    name: string
    details: string
}

export interface CharacterRepository {
    create(character: Character): Promise<Character>
    update(character: Character): Promise<Character>
    delete(characterID: string): Promise<void>
    get(characterID: string): Promise<Character>
}