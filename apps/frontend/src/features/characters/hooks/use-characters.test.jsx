import React from 'react';

import { describe, it, expect, vi, beforeEach } from 'vitest';

import { renderHook, waitFor, act } from '@testing-library/react';

import { fetchCharacters } from '../services/fetchCharacters';

import { useCharacters } from './use-characters';

import { wrapper } from '@/shared/test-utils';

import { addNewCharacter } from '../services/addNewCharacter';

import { createNewCharacter } from '@/features/characters/types/Character';
import { modifyCharacterByID } from '../services/modifyCharacterByID';
import { deleteCharacterByID } from '../services/deleteCharacterByID';



vi.mock('react-hot-toast', () => ({
    default: {
      success: vi.fn(),
      error: vi.fn(),
    },
  }));
  

vi.mock('next/navigation', () => ({
  useParams: vi.fn(() => ({ id: 'narrative-1' })),
}));

vi.mock('@/features/characters/services/fetchCharacters', () => ({
  fetchCharacters: vi.fn(),
}));

vi.mock('@/features/characters/services/addNewCharacter', () => ({
  addNewCharacter: vi.fn(),
}));

vi.mock('@/features/characters/types/Character', () => ({
  createNewCharacter: vi.fn(),
}));

vi.mock('@/features/characters/services/modifyCharacterByID', () => ({
    modifyCharacterByID: vi.fn(),
    }));

vi.mock('@/features/characters/services/deleteCharacterByID', () => ({
    deleteCharacterByID: vi.fn(),
}));

describe('useCharacters()', () => {
  beforeEach(() => {
    
    vi.clearAllMocks();
  });

  describe('fetching characters', () => {
    it('fetches characters on mount', async () => {
      fetchCharacters.mockResolvedValue({
        ok: true,

        data: [
          { id: 1, name: 'Character 1' },

          { id: 2, name: 'Character 2' },
        ],
      });

      const { result } = renderHook(() => useCharacters(), { wrapper });

      expect(result.current.loading).toBe(true);

      await waitFor(() => {
        expect(fetchCharacters).toHaveBeenCalledWith('narrative-1');

        expect(result.current.characters).toEqual([
          { id: 1, name: 'Character 1' },

          { id: 2, name: 'Character 2' },
        ]);
      });

      expect(result.current.error).toBe(null);
    });

    it('handles fetch failure', async () => {
      fetchCharacters.mockResolvedValue({
        ok: false,

        error: 'Failed to fetch characters',
      });

      const { result } = renderHook(() => useCharacters(), { wrapper });

      await waitFor(() => {
        expect(result.current.characters).toEqual([]);

        expect(result.current.error).toEqual(
          'Failed to fetch characters. Please try again later.',
        );
      });

      expect(result.current.loading).toBe(false);
    });
  });

  describe('adding characters', () => {
    it('handles when a character is added successfully', async () => {
     

      const newCharacter = {
        id: 2,

        narrative: 'narrative-1',

        name: 'New Character',

        subname: 'New Subname',

        alignment: 'lawful-good',

        role: 'protagonist',

        isAlive: true,

        createdAt: new Date().toISOString(),

        updatedAt: new Date().toISOString(),
      };

      createNewCharacter.mockReturnValue(newCharacter);

      addNewCharacter.mockResolvedValue({
        ok: true,
      });

      const { result } = renderHook(() => useCharacters(), { wrapper });
      await act(async () => {
        await result.current.addCharacter();
      });

      await waitFor(() => {
        expect(result.current.activeID).toBe(newCharacter.id);

        expect(createNewCharacter).toHaveBeenCalledWith('narrative-1');

        expect(addNewCharacter).toHaveBeenCalledWith('narrative-1', newCharacter);

        expect(result.current.characters).toEqual([newCharacter]);
      });
    });

    it("handles when a character fails to be added", async () => {

        const newCharacter = {
            id: 2,
    
            narrative: 'narrative-1',
    
            name: 'New Character',
    
            subname: 'New Subname',
    
            alignment: 'lawful-good',
    
            role: 'protagonist',
    
            isAlive: true,
    
            createdAt: new Date().toISOString(),
    
            updatedAt: new Date().toISOString(),
          };

        createNewCharacter.mockReturnValue(newCharacter);
        addNewCharacter.mockResolvedValue({
            ok: false,
    
            error: 'Failed to add character',
          });
        const { result } = renderHook(() => useCharacters(), { wrapper });
        await act(async () => {
            await result.current.addCharacter();
          });

        await waitFor(() => {
            expect(result.current.characters).toEqual([]);
    
            expect(result.current.error).toEqual(
              'Failed to add character. Please try again later.',
            );
          });
    })

   
  });

  describe('modifying characters', () => {
    beforeEach(()=> {
        vi.clearAllMocks();
    })
    it('handles when a character is modified successfully', async () => {

        const originalCharacter = {
            id: 1,
            name: 'Original Character',
            subname: 'Original Subname',
            alignment: 'lawful-good',
            role: 'protagonist',
            isAlive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
      
          const modifiedCharacter = {
            ...originalCharacter,
            name: 'Modified Character',
            subname: 'Modified Subname',
            alignment: 'neutral-good',
            role: 'antagonist',
            isAlive: false,
          };
          
          modifyCharacterByID.mockResolvedValue({ok: true})
            fetchCharacters.mockResolvedValue({
                ok: true,
                data: [originalCharacter]
            });
       

            const { result } = renderHook(() => useCharacters(), { wrapper });
            

            await waitFor(() => {
                expect(result.current.characters).toEqual([originalCharacter]);
                expect(result.current.error).toBe(null);
            }
            );

            await act(async () => {
                await result.current.modifyCharacter(modifiedCharacter);
            }
            );

            await waitFor(() => {
                expect(result.current.characters).toEqual([modifiedCharacter]);
                expect(result.current.error).toBe(null);
            }
            );
            expect(modifyCharacterByID).toHaveBeenCalledWith(
                1,
                modifiedCharacter,
              );
              expect(fetchCharacters).toHaveBeenCalledWith('narrative-1');
              expect(result.current.characters).toEqual([modifiedCharacter]);
              expect(result.current.error).toBe(null);
           
    });
    it("handles when a character fails to be modified", async () => {
       
        const originalCharacter = {
            id: 1,
            name: 'Original Character',
            subname: 'Original Subname',
            alignment: 'lawful-good',
            role: 'protagonist',
            isAlive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
      
          const modifiedCharacter = {
            id: 1,
            name: 'Modified Character',
            subname: 'Modified Subname',
            alignment: 'neutral-good',
            role: 'antagonist',
            isAlive: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };

          fetchCharacters.mockResolvedValue({
            ok: true,
            data: [originalCharacter]
        })
        modifyCharacterByID.mockResolvedValue({
            ok: false,
          });

        const { result } = renderHook(() => useCharacters(), { wrapper });

        await waitFor(() => {
            expect(result.current.characters).toEqual([originalCharacter]);
            expect(result.current.error).toBe(null);
        }
        );

        await act(async () => {
            await result.current.modifyCharacter(modifiedCharacter);
        }
        );
        await waitFor(() => {
            expect(result.current.characters).toEqual([originalCharacter]);
            expect(result.current.error).toEqual(
                'Failed to modify character. Please try again later.',
              );
        }
        );
        expect(modifyCharacterByID).toHaveBeenCalledWith(
            1,
            modifiedCharacter,
          );
          expect(fetchCharacters).toHaveBeenCalledWith('narrative-1');
          expect(result.current.characters).toEqual([originalCharacter]);
          expect(result.current.error).toEqual(
            'Failed to modify character. Please try again later.',
          );
    })
  });

  describe('deleting characters', () => {
    it("handles when a character is deleted successfully", async () => {
        fetchCharacters.mockResolvedValue({
            ok: true,
            data: [
                { id: 1, name: 'Character 1' },
                { id: 2, name: 'Character 2' },
              ],
        })

        deleteCharacterByID.mockResolvedValue({
            ok: true,
        })
        const { result } = renderHook(() => useCharacters(), { wrapper });

        await waitFor(() => {
            expect(result.current.characters).toEqual([
                { id: 1, name: 'Character 1' },
                { id: 2, name: 'Character 2' },
              ]);
        }
        );
        await act(async () => {
            await result.current.deleteCharacter(1);
        }
        );
        await waitFor(() => {
            expect(result.current.characters).toEqual([
                { id: 2, name: 'Character 2' },
              ]);
        }
        );
        expect(result.current.error).toBe(null);
        expect(fetchCharacters).toHaveBeenCalledWith('narrative-1');
        expect(result.current.characters).toEqual([
            { id: 2, name: 'Character 2' },
          ]);
    })

    it("handles when a character fails to be deleted", async () => {
        fetchCharacters.mockResolvedValue({
            ok: true,
            data: [
                { id: 1, name: 'Character 1' },
                { id: 2, name: 'Character 2' },
              ],
        })

        deleteCharacterByID.mockResolvedValue({
            ok: false,
        })
        const { result } = renderHook(() => useCharacters(), { wrapper });

        await waitFor(() => {
            expect(result.current.characters).toEqual([
                { id: 1, name: 'Character 1' },
                { id: 2, name: 'Character 2' },
              ]);
        }
        );
        await act(async () => {
            await result.current.deleteCharacter(1);
        }
        );
        await waitFor(() => {
            expect(result.current.characters).toEqual([
                { id: 1, name: 'Character 1' },
                { id: 2, name: 'Character 2' },
              ]);
              expect(result.current.error).toEqual(
                'Failed to delete character. Please try again later.',
              );
        }
        );
    })
  })
});
