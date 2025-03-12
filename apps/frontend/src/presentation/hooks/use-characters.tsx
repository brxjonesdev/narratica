import { Character } from '@/entities/Character';
import React from 'react';
import { useAuth } from './use-user';
import { useParams } from 'next/navigation';
import { fetchUserCharacters } from '@/usecases/fetchUserCharacters';
import { addNewCharacter } from '@/usecases/addNewCharacter';
import { nanoid } from 'nanoid';
import { deleteCharacterByID } from '@/usecases/deleteCharacter';
import toast from 'react-hot-toast';

export const useCharacters = () => {
  const [characters, setCharacters] = React.useState<Character[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [activeID, setActiveID] = React.useState<string | null>(null);
  const { user, loading: authLoading } = useAuth();
  const { id } = useParams();

  React.useEffect(() => {
    const fetchCharacters = async () => {
      if (authLoading) return;
      const userId = user?.id;
      if (!userId) {
        setError('User not found. Please log in again.');
        setLoading(false);
        return;
      }

      const userCharacters = await fetchUserCharacters(id as string);
      if (!userCharacters) {
        setError('Failed to fetch user characters. Please try again later.');
        setLoading(false);
        return;
      }
      setLoading(false);
      setCharacters(userCharacters);
    };

    fetchCharacters();
  }, [authLoading, id, user]);

  const addCharacter = async () => {
    const baseCharacter: Character = {
      id: `${nanoid(10)}-${nanoid(5)}-${nanoid(10)}-${nanoid(8)}}`,
      narrative: id as string,
      name: 'New Character',
      subname: 'Minor',
      isAlive: true,
      isActiveInStory: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (loading) return;
    const newCharacter = await addNewCharacter(id as string, baseCharacter);
    if (!newCharacter) {
      setError('Failed to add character. Please try again later.');
      return;
    }

    characters.push(newCharacter);
    setCharacters([...characters]);
   
    toast.success('Character added successfully');
  };

  const deleteCharacter = async (characterID: string) => {
    if (loading) return;
    const result: boolean = await deleteCharacterByID(characterID);
    if (!result) {
      setError('Failed to delete character. Please try again later.');
      return;
    }
    setCharacters((prevCharacters) =>
      prevCharacters.filter((character) => character.id !== characterID)
    );
    toast.success('Character deleted successfully');

  }

  return { characters, loading, error, addCharacter, activeID, setActiveID, deleteCharacter, setCharacters };
};
