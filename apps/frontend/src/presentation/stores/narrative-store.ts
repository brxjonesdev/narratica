import { Character } from '@/entities/Character'
import { Location } from '@/entities/Location'
import { Outline } from '@/entities/Outline'
import { createStore } from 'zustand/vanilla'

export type NarrativeState = {
    characters: Character[]
    locations: Location[]
    story: Outline
}

export type NarrativeActions = {
    setCharactersGlobal: (characters: Character[]) => void
    setLocationsGlobal: (locations: Location[]) => void
    setStoryGlobal: (story: Outline) => void
}

export type NarrativeStore = NarrativeState & NarrativeActions

export const initNarrativeStore = (): NarrativeState => {
    return {
        characters: [],
        locations: [],
        story: {
            id: '',
            narrativeID: '',
            acts: []
        }
    }
}

export const defaultInitState: NarrativeState = {
    characters: [],
    locations: [],
    story: {
        id: '',
        narrativeID: '',
        acts: []
    }
}

export const createNarrativeStore = (
    initState: NarrativeState = defaultInitState
) => {
    return createStore<NarrativeStore>()((set ) => ({
        ...initState,
        setCharactersGlobal: (characters: Character[]) => set(() => ({ characters })),
        setLocationsGlobal: (locations: Location[]) => set(() => ({ locations })),
        setStoryGlobal: (story: Outline) => set(() => ({ story }))
    }))
}