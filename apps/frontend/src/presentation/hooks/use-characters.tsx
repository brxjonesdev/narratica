import { Character } from '@/entities/Character';
import React from 'react';
import { useAuth } from './use-user';
import { useParams } from 'next/navigation';
import { fetchUserCharacters } from '@/usecases/fetchUserCharacters';
import { addNewCharacter } from '@/usecases/addNewCharacter';
import { nanoid } from 'nanoid';

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
      role: 'Minor',
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
    setCharacters((prevCharacters) => [...prevCharacters, { ...newCharacter, new: true }]);
    setActiveID(newCharacter.id);
  };

  return { characters, loading, error, addCharacter, activeID, setActiveID };
};
