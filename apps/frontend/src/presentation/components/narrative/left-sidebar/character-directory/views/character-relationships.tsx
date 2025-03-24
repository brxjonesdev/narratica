'use client';

import { useState } from 'react';
import type { Character } from '@/entities/Character';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/presentation/components/ui/card';
import { Button } from '@/presentation/components/ui/button';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/presentation/components/ui/dropdown-menu';
import { Relationship, relationshipLabels, RelationshipType } from '@/entities/Relationship';
import { Delete, UserPlus } from 'lucide-react';
import { ScrollArea } from '@/presentation/components/ui/scroll-area';
import { Label } from '@/presentation/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/presentation/components/ui/dialog';
import { Textarea } from '@/presentation/components/ui/textarea';
import { InlineEdit } from '@/presentation/components/shared/inline-edit';

export default function CharacterRelationships({
  character,
  availableCharacters,
  onChange,
}: {
  character: Character;
  availableCharacters: Character[];
  onChange: (target: string, value: string | string[] | boolean | Relationship[]) => void;
}) {
  const [showDescriptionInput, setShowDescriptionInput] = useState(false);
  const [newRelationship, setNewRelationship] = useState<{
    selectedCharacter: Character | null;
    description: string;
    type: RelationshipType | null;
  }>({
    selectedCharacter: null,
    description: '',
    type: null,
  });

  const filteredCharacters = availableCharacters.filter((c) => c.id !== character.id);

  if (filteredCharacters.length === 0) {
    return (
      <div className="p-4 text-muted-foreground">
        <p>No other characters available to create relationships</p>
        <p>This feature will be available once more character are added!</p>
      </div>
    );
  }

  const handleAddRelationship = (
    type: RelationshipType,
    characterId: string,
    description: string
  ) => {
    onChange(type, [
      ...(character[type as RelationshipType] || []),
      {
        id: characterId,
        name: newRelationship.selectedCharacter?.name || '',
        description: description,
      },
    ]);
  };

  return (
    <section className="mt-2">
      <div className="w-full flex  justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="w-full">
              <UserPlus className="h-4 w-full" />
              Add Connection
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Relationship Type</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {Object.entries(relationshipLabels).map(([type, label]) => (
              <DropdownMenuSub key={type}>
                <DropdownMenuSubTrigger>
                  <span>{label}</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className="w-56">
                    <DropdownMenuLabel>Add {label}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {filteredCharacters
                      .filter((char) => {
                        const existingRelationship = character[type as RelationshipType]?.find(
                          (rel) => rel.id === char.id
                        );
                        return !existingRelationship;
                      })
                      .map((char) => (
                        <DropdownMenuItem
                          key={char.id}
                          onClick={() => {
                            setNewRelationship({
                              selectedCharacter: char,
                              description: '',
                              type: type as RelationshipType,
                            });
                            setShowDescriptionInput(true);
                          }}
                        >
                          {char.name}
                        </DropdownMenuItem>
                      ))}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <section className="overflow-y-scroll mt-2">
        {/* {!relationships.length && <div className="text-center py-8 text-muted-foreground">
          <p>No relationships have been added yet.</p>
          <p className="text-sm mt-2">Use the &quot;Add Relationship&quot; button to create connections between characters.</p>
        </div>} */}
        <ScrollArea className=" h-full">
          {Object.entries(relationshipLabels).map(([type, label]) => {
            return (
              <div key={type} className="mt-4">
                <Label>{label}</Label>
                <div>
                  {character[type as RelationshipType]?.map((relationship) => {
                    const relatedCharacter = availableCharacters.find(
                      (c) => c.id === relationship.id
                    );
                    return (
                      <Card
                        key={relationship.id}
                        className="mt-2 px-1 py-2 space-y-0 flex justify-between"
                      >
                        <CardHeader className="px-2 py-1">
                          <CardTitle className="font-medium truncate text-sm px-3">
                            {relatedCharacter?.name}
                          </CardTitle>
                          <CardDescription className="text-xs text-muted-foreground truncate tracking-wider font-semibold">
                            <InlineEdit
                              value={relationship.description as string}
                              onChange={(value: string) => {
                                const updatedRelationships =
                                  character[type as RelationshipType]?.map((rel) =>
                                    rel.id === relationship.id
                                      ? { ...rel, description: value }
                                      : rel
                                  ) || [];
                                onChange(type, updatedRelationships);
                              }}
                              fontSize="xs"
                            />
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                          <Button
                            size={'icon'}
                            variant={'ghost'}
                            className="hover:text-red-600"
                            // opens modal to delete relationship
                          >
                            <Delete />
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </ScrollArea>
      </section>
      <Dialog open={showDescriptionInput} onOpenChange={setShowDescriptionInput}>
        <DialogContent className="font-figtree">
          <DialogHeader>
            <DialogTitle className="text-sm">
              {`Describe the relationship between ${newRelationship.selectedCharacter?.name} and ${character.name}`}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-0">
            <div className="grid gap-2">
              <Textarea
                id="description"
                placeholder="Describe their relationship..."
                value={newRelationship.description}
                onChange={(e) =>
                  setNewRelationship({ ...newRelationship, description: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline">Cancel</Button>
            <Button
              onClick={() => {
                if (newRelationship.selectedCharacter?.id) {
                  handleAddRelationship(
                    newRelationship.type as RelationshipType,
                    newRelationship.selectedCharacter.id,
                    newRelationship.description
                  );
                  setShowDescriptionInput(false);
                }
              }}
            >
              Add Relationship
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
