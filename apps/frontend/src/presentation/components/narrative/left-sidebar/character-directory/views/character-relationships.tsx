"use client"

import { useState } from "react"
import type { Character } from "@/entities/Character"
import { Card, CardContent, CardHeader, CardTitle } from "@/presentation/components/ui/card"
import { Button } from "@/presentation/components/ui/button"
import { Textarea } from "@/presentation/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/presentation/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/presentation/components/ui/accordion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/presentation/components/ui/tooltip"
import { Edit, Trash2, UserPlus } from "lucide-react"
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
} from "@/presentation/components/ui/dropdown-menu"

export type Relationship = {
  id: string
  name: string
  description?: string
}

type RelationshipType = "allies" | "enemies" | "family" | "mentors" | "mentees" | "rivals" | "loveInterests" | "friends"

const relationshipLabels: Record<RelationshipType, string> = {
  allies: "Allies",
  enemies: "Enemies",
  family: "Family",
  mentors: "Mentors",
  mentees: "Mentees",
  rivals: "Rivals",
  loveInterests: "Love Interests",
  friends: "Friends",
}

export default function CharacterRelationships({
  character,
  availableCharacters,
  onUpdate,
}: {
  character: Character
  availableCharacters: Character[]
  onUpdate: (updatedCharacter: Character) => void
}) {
  const [newRelationship, setNewRelationship] = useState<{
    type: RelationshipType | ""
    characterId: string
    description: string
  }>({
    type: "",
    characterId: "",
    description: "",
  })

  const [editingRelationship, setEditingRelationship] = useState<{
    type: RelationshipType
    index: number
    description: string
  } | null>(null)

  const [showDescriptionInput, setShowDescriptionInput] = useState(false)

  // Filter out the current character from available characters
  const filteredCharacters = availableCharacters.filter((c) => c.id !== character.id)

  if (filteredCharacters.length === 0) {
    return <div className="p-4 text-muted-foreground">No other characters available to create relationships</div>
  }

  const relationships = {
    allies: character.allies || [],
    enemies: character.enemies || [],
    family: character.family || [],
    mentors: character.mentors || [],
    mentees: character.mentees || [],
    rivals: character.rivals || [],
    loveInterests: character.loveInterests || [],
    friends: character.friends || [],
  }

  const hasAnyRelationships = Object.values(relationships).some((arr) => arr.length > 0)

  const handleAddRelationship = () => {
    if (!newRelationship.type || !newRelationship.characterId) return

    const selectedCharacter = availableCharacters.find((c) => c.id === newRelationship.characterId)
    if (!selectedCharacter) return

    const newRelationshipObj: Relationship = {
      id: selectedCharacter.id,
      name: selectedCharacter.name,
      description: newRelationship.description,
    }

    const updatedCharacter = { ...character }
    const relationshipType = newRelationship.type as RelationshipType

    if (!updatedCharacter[relationshipType]) {
      updatedCharacter[relationshipType] = []
    }

    updatedCharacter[relationshipType] = [...(updatedCharacter[relationshipType] || []), newRelationshipObj]

    onUpdate(updatedCharacter)

    // Reset form
    setNewRelationship({
      type: "",
      characterId: "",
      description: "",
    })
  }

  const handleEditRelationship = () => {
    if (!editingRelationship) return

    const { type, index, description } = editingRelationship
    const updatedCharacter = { ...character }

    if (updatedCharacter[type] && updatedCharacter[type]![index]) {
      updatedCharacter[type]![index].description = description
      onUpdate(updatedCharacter)
    }

    setEditingRelationship(null)
  }

  const handleDeleteRelationship = (type: RelationshipType, index: number) => {
    const updatedCharacter = { ...character }

    if (updatedCharacter[type]) {
      updatedCharacter[type] = [...updatedCharacter[type]!.slice(0, index), ...updatedCharacter[type]!.slice(index + 1)]

      onUpdate(updatedCharacter)
    }
  }

  return (
    <section className="bg-white/5 h-full rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Character Relationships</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <UserPlus className="h-4 w-4 mr-2" />
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
                    {filteredCharacters.map((char) => (
                      <DropdownMenuItem
                        key={char.id}
                        onClick={() => {
                          setNewRelationship({
                            type: type as RelationshipType,
                            characterId: char.id,
                            description: "",
                          })
                          setShowDescriptionInput(true)
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

      {/* Description Input Dialog */}
      <Dialog open={showDescriptionInput} onOpenChange={setShowDescriptionInput}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Description</DialogTitle>
            <DialogDescription>
              {newRelationship.characterId &&
                `Describe the relationship with ${filteredCharacters.find((c) => c.id === newRelationship.characterId)?.name}`}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="description">Description (Optional)</label>
              <Textarea
                id="description"
                placeholder="Describe their relationship..."
                value={newRelationship.description}
                onChange={(e) => setNewRelationship({ ...newRelationship, description: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDescriptionInput(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                handleAddRelationship()
                setShowDescriptionInput(false)
              }}
            >
              Add Relationship
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {!hasAnyRelationships ? (
        <div className="text-center py-8 text-muted-foreground">
          <p>No relationships have been added yet.</p>
          <p className="text-sm mt-2">Use the "Add Relationship" button to create connections between characters.</p>
        </div>
      ) : (
        <Accordion type="multiple" className="w-full">
          {(Object.entries(relationships) as [RelationshipType, Relationship[]][])
            .filter(([_, relations]) => relations.length > 0)
            .map(([type, relations]) => (
              <AccordionItem key={type} value={type}>
                <AccordionTrigger className="text-lg font-medium">
                  {relationshipLabels[type]} ({relations.length})
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-3 pt-2">
                    {relations.map((relation, index) => (
                      <Card key={`${relation.id}-${index}`} className="overflow-hidden">
                        <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
                          <CardTitle className="text-base">{relation.name}</CardTitle>
                          <div className="flex gap-2">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={() =>
                                          setEditingRelationship({
                                            type,
                                            index,
                                            description: relation.description || "",
                                          })
                                        }
                                      >
                                        <Edit className="h-4 w-4" />
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                      <DialogHeader>
                                        <DialogTitle>Edit Relationship</DialogTitle>
                                        <DialogDescription>
                                          Update the description of this relationship.
                                        </DialogDescription>
                                      </DialogHeader>
                                      <div className="grid gap-4 py-4">
                                        <div className="grid gap-2">
                                          <label htmlFor="edit-description">Description</label>
                                          <Textarea
                                            id="edit-description"
                                            placeholder="Describe their relationship..."
                                            value={editingRelationship?.description || ""}
                                            onChange={(e) =>
                                              setEditingRelationship((prev) =>
                                                prev ? { ...prev, description: e.target.value } : null,
                                              )
                                            }
                                          />
                                        </div>
                                      </div>
                                      <DialogFooter>
                                        <Button onClick={handleEditRelationship}>Save Changes</Button>
                                      </DialogFooter>
                                    </DialogContent>
                                  </Dialog>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Edit description</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>

                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-destructive"
                                    onClick={() => handleDeleteRelationship(type, index)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Remove relationship</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </CardHeader>
                        {relation.description && (
                          <CardContent className="p-4 pt-0">
                            <p className="text-sm text-muted-foreground">{relation.description}</p>
                          </CardContent>
                        )}
                      </Card>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
        </Accordion>
      )}
    </section>
  )
}

