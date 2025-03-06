export type Narrative = {
    userID: string
    narrativeID: string
    name: string
    tagline: string
    blurb: string
    createdAt: string
    updatedAt: string
}

export interface NarrativeRepository {
    create(narrative: Narrative): Promise<Narrative>
    update(narrative: Narrative): Promise<Narrative>
    delete(narrativeID: string): Promise<void>
    get(narrativeID: string): Promise<Narrative>
    updateName(narrativeID: string, name: string): Promise<Narrative>
    updateTagline(narrativeID: string, tagline: string): Promise<Narrative>
    updateBlurb(narrativeID: string, blurb: string): Promise<Narrative>
}