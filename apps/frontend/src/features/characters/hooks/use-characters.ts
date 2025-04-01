import { Character, createNewCharacter } from '@/features/characters/types/Character';
import React, { useCallback } from 'react';
import { useAuth } from '@/shared/hooks/use-user';
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
  const { user, loading: authLoading } = useAuth();
  const { id } = useParams();


  const fetchNarrativesCharacters = useCallback(async (narrativeID: string) => {
    if (!user?.id) return;
    try {
      setLoading(true);
      const characters = await fetchCharacters(narrativeID);
      setCharacters(characters ?? []);
      setCharactersGlobal(characters ?? []);
    } catch (error) {
      toast.error(`Failed to fetch characters:`);
      setError('Failed to fetch characters.' + error);
    } finally {
      setLoading(false);
    }
  }, [setCharactersGlobal, user?.id]);

  React.useEffect(() => {
    if (!user?.id) return;
    fetchNarrativesCharacters(id as string);

  }, [authLoading, fetchNarrativesCharacters, id, loading, user?.id]);


  const addCharacter = async () => {
    const newCharacter = createNewCharacter(id as string);
    const result = await addNewCharacter(id as string, newCharacter);
    if (result.ok === false) {
      setError('Failed to add character. Please try again later.');
      return;
    }
    setCharacters([...characters, newCharacter]);
    setCharactersGlobal([...characters, newCharacter]);
    setActiveID(newCharacter.id);
    toast.success('Character added successfully');
  } 


  const modifyCharacter = async (character: Character) => {
    const result = await modifyCharacterByID(character.id, character);
    if (result.ok === false) {
      setError('Failed to modify character. Please try again later.');
      toast.error('Failed to modify character. Please try again later.');
      return;
    }
    const index = characters.findIndex((c) => c.id === character.id);
    characters[index] = character;
    setCharacters([...characters]);
    setCharactersGlobal([...characters]);
    toast.success('Character modified successfully');
  }


  const deleteCharacter = async (characterID: string) => {
    const result = await deleteCharacterByID(characterID);
    if(result.ok === false) {
      setError('Failed to delete character. Please try again later.');
      toast.error('Failed to delete character. Please try again later.');
      return;
    }
    const remainingCharacters = characters.filter((character) => character.id !== characterID);
    setCharacters(remainingCharacters);
    toast.success('Character deleted successfully');
  }

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






