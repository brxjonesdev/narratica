import { Character } from '@/features/characters/types/Character';
import { InlineEdit } from '@/shared/inline-edit';
import { Button } from '@/shared/ui/button';
import { CardHeader, CardContent } from '@/shared/ui/card';
import { Separator } from '@/shared/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';

import { Delete } from 'lucide-react';
import CharacterDetails from '@/features/characters/components/character-details';
import CharacterRelationships from '@/features/characters/components/character-relationships';
import { Relationship } from '@/features/characters/types/Relationship';

export default function CharacterView({
  availableCharacters,
  character,
  onDelete,
  updateCharacter,
}: {
  character: Character;
  availableCharacters: Character[];
  onDelete: (id: string) => void;
  updateCharacter: (updatedCharacter: Character) => void;
}) {
  function handleEdit(target: string, value: string | string[] | boolean | Relationship[]) {
    updateCharacter({
      ...character,
      [target]: value,
    });
  }

  const options = [
    {
      label: 'Details',
      value: 'details',
      component: <CharacterDetails character={character} onChange={handleEdit} />,
    },
    {
      label: 'Relationships',
      value: 'relationships',
      component: (
        <CharacterRelationships
          character={character}
          availableCharacters={availableCharacters}
          onChange={(target, value) => handleEdit(target, value)}
        />
      ),
    },
    { label: 'Mentions', value: 'mentions', component: null },
  ];

  return (
    <>
      <CardHeader className="w-full flex items-start flex-col gap-2 h-fit">
        <div className="flex justify-between items-center w-full">
          <div>
            <InlineEdit
              value={character.name}
              onChange={(value) => handleEdit('name', value)}
              fontSize="2xl"
              weight="bold"
            />
            <InlineEdit
              value={character.subname}
              onChange={(value) => handleEdit('subname', value)}
              fontSize="sm"
            />
          </div>

          <Button
            className="hover:bg-red-600/60"
            variant={'ghost'}
            size={'icon'}
            onClick={() => {
              onDelete(character.id);
            }}
          >
            <Delete />
          </Button>
        </div>
      </CardHeader>

      <Separator className="w-full" />

      <CardContent className="overflow-y-scroll flex-1 flex pt-4 ">
        <Tabs
          defaultValue="details"
          className="w-full flex-1 overflow-y-scroll  rounded-t-xl pr-4 flex flex-col"
        >
          <TabsList className="w-full">
            {options.map((option) => (
              <TabsTrigger
                key={option.value}
                value={option.value}
                className="w-full"
                disabled={option.value === 'mentions'}
              >
                {option.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {options.map((option) => (
            <TabsContent key={option.value} value={option.value} className="h-full">
              {option.component}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </>
  );
}
