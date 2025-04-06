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
    const newCharacter = createNewCharacter(id as string);
    console.log(newCharacter, 'horrrrrn');

    setCharacters([...characters, newCharacter]);
    setCharactersGlobal([...characters, newCharacter]);
    setActiveID(newCharacter.id);

    try {
      const result = await addNewCharacter(id as string, newCharacter);
      if (result.ok === false) {
        setError('Failed to add character. Please try again later.');
        setCharacters(characters);
        setCharactersGlobal(characters);
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
    // const originalCharacter = characters[index];
    characters[index] = character;
    setCharacters([...characters]);
    setCharactersGlobal([...characters]);

    try {
      const result = await modifyCharacterByID(character.id, character);
      if (result.ok === false) {
        setError('Failed to modify character. Please try again later.');
        setCharacters(characters);
        setCharactersGlobal(characters);
        toast.error('Failed to modify character. Please try again later.');
        return;
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again later.' + error);
      setCharacters(characters);
      setCharactersGlobal(characters);
      toast.error('An unexpected error occurred. Please try again later.');
    }
  };

  const deleteCharacter = async (characterID: string) => {
    const remainingCharacters = characters.filter((character) => character.id !== characterID);
    setCharacters(remainingCharacters);

    try {
      const result = await deleteCharacterByID(characterID);
      if (result.ok === false) {
        setError('Failed to delete character. Please try again later.');
        setCharacters(characters);
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
