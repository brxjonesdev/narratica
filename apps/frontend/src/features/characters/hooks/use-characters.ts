/* eslint-disable react-hooks/exhaustive-deps */
import { Character, createNewCharacter } from '@/features/characters/types/Character';
import React, { useCallback } from 'react';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { useNarrativeStore } from '@/shared/stores/narrative-store-provider';
import { fetchCharacters } from '../services/fetchCharacters';
import { addNewCharacter } from '../services/addNewCharacter';
import { deleteCharacterByID } from '../services/deleteCharacterByID';
import { modifyCharacterByID } from '../services/modifyCharacterByID';

export const useCharacters = () => {
  const { setCharactersGlobal } = useNarrativeStore((store) => store);
  const [characters, setCharacters] = React.useState<Character[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [activeID, setActiveID] = React.useState<string | null>(null);
  const { id } = useParams();

  const fetchNarrativesCharacters = useCallback(async (narrativeID: string) => {
    setLoading(true);
    const result = await fetchCharacters(narrativeID);
    if (!result.ok) {
      setError('Failed to fetch characters. Please try again later.');
      setLoading(false);
      return;
    }
    setCharacters(result.data);
    setCharactersGlobal(result.data);
    setLoading(false);
  }, []);

  React.useEffect(() => {
    fetchNarrativesCharacters(id as string);
  }, []);

  const addCharacter = async () => {
    const newCharacter = createNewCharacter(id as string)
    setCharacters(prev => {
  const updated = [...prev, newCharacter];
  setCharactersGlobal(updated);
  return updated;
});

    setActiveID(newCharacter.id);

    try {
      const result = await addNewCharacter(id as string, newCharacter);
      if (result.ok === false) {
        setError('Failed to add character. Please try again later.');
        setCharacters(characters);
        setCharactersGlobal(characters);
        setActiveID(null);
        return;
      }
      toast.success('Character added successfully');
    } catch (error) {
      setError('An unexpected error occurred. Please try again later.' + error);
      setCharacters(characters);
      setCharactersGlobal(characters);
    }
  };

  const modifyCharacter = async (character: Character) => {
    const index = characters.findIndex((c) => c.id === character.id);
    if (index === -1) return;
  
    const updatedCharacters = [...characters];
    const originalCharacter = updatedCharacters[index];
    updatedCharacters[index] = character;
  
    // Optimistic update
    setCharacters(updatedCharacters);
    setCharactersGlobal(updatedCharacters);
  
    try {
      const result = await modifyCharacterByID(character.id, character);
      if (result.ok === false) {
        // Revert if failed
        updatedCharacters[index] = originalCharacter;
        setCharacters([...updatedCharacters]);
        setCharactersGlobal([...updatedCharacters]);
        setError('Failed to modify character. Please try again later.');
        toast.error('Failed to modify character. Please try again later.');
      }
    } catch (error) {
      // Revert if error
      updatedCharacters[index] = originalCharacter;
      setCharacters([...updatedCharacters]);
      setCharactersGlobal([...updatedCharacters]);
      setError('An unexpected error occurred. Please try again later.' + error);
      toast.error('An unexpected error occurred. Please try again later.');
    }
  };
  

  const deleteCharacter = async (characterID: string) => {
    const remainingCharacters = characters.filter((character) => character.id !== characterID);
    setCharacters(remainingCharacters);
    setCharactersGlobal(remainingCharacters);
    setActiveID(null);


    try {
      const result = await deleteCharacterByID(characterID);
      if (result.ok === false) {
        setError('Failed to delete character. Please try again later.');
        setCharacters(characters);
        setCharactersGlobal(characters);
        toast.error('Failed to delete character. Please try again later.');
        return;
      }

      toast.success('Character deleted successfully');
    } catch (error) {
      setError('An unexpected error occurred. Please try again later. + ' + error);
      setCharacters(characters);
      toast.error('An unexpected error occurred. Please try again later.');
    }
  };

  return {
    characters,
    loading,
    error,
    addCharacter,
    activeID,
    setActiveID,
    deleteCharacter,
    modifyCharacter,
  };
};
