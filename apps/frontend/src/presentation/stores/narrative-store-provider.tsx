'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'
import {
    type NarrativeStore,
    createNarrativeStore,
    initNarrativeStore,
} from './narrative-store'

export type NarrativeStoreApi = ReturnType<typeof createNarrativeStore>

export const NarrativeStoreContext = createContext<NarrativeStoreApi | undefined>(undefined)

export interface NarrativeStoreProviderProps {
  children: ReactNode
}

export const NarrativeStoreProvider = ({
    children,
  }: NarrativeStoreProviderProps) => {
    const storeRef = useRef<NarrativeStoreApi | null>(null)
    if (storeRef.current === null) {
      storeRef.current = createNarrativeStore(initNarrativeStore())
    }
  
    return (
      <NarrativeStoreContext.Provider value={storeRef.current}>
        {children}
      </NarrativeStoreContext.Provider>
    )
  }
  
  export const useNarrativeStore = <T,>(
    selector: (store: NarrativeStore) => T,
  ): T => {
    const narrativeStoreContext = useContext(NarrativeStoreContext)
  
    if (!narrativeStoreContext) {
      throw new Error(`useNarrativeStore must be used within NarrativeStoreProvider`)
    }
  
    return useStore(narrativeStoreContext, selector)
  }