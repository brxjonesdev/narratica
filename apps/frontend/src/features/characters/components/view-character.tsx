import { Character } from '@/features/characters/types/Character';
import { InlineEdit } from '@/shared/inline-edit';
import { Button } from '@/shared/ui/button';
import { CardHeader, CardContent } from '@/shared/ui/card';
import { Separator } from '@/shared/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/shared/ui/alert-dialog';

import { Delete } from 'lucide-react';
import CharacterDetails from '@/features/characters/components/character-details';
import { Relationship } from '@/features/characters/types/Relationship';

export default function CharacterView({
  character,
  onDelete,
  updateCharacter,
}: {
  character: Character;
  onDelete: (id: string) => void;
  updateCharacter: (updatedCharacter: Character) => void;
}) {
  function handleEdit(
    target: string,
    value: string | string[] | boolean | Relationship[],
  ) {
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

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon" className="p-0">
                <Delete className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="font-figtree w-fit">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-xl">
                  Are you sure you want to delete {character.name.split(' ')[0]}?
                </AlertDialogTitle>
                <AlertDialogDescription className="text-sm">
                  This action cannot be undone. This will permanently delete this
                  character.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    onDelete(character.id);
                  }}
                  className="hover:bg-red-500 transition-colors ease-in-out duration-200"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
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
