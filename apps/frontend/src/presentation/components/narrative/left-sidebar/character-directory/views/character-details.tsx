import { Character } from '@/entities/Character'
import React from 'react'
import { InlineEdit } from '@/presentation/components/shared/inline-edit'
import { Label } from '@radix-ui/react-label'
import { Separator } from '@/presentation/components/ui/separator'
import { Checkbox } from '@/presentation/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/presentation/components/ui/select'
import { InlineEditableList } from '@/presentation/components/shared/inline-list-edit'
import { Input } from '@/presentation/components/ui/input'
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/presentation/components/ui/tabs'
// import ArchetypeSelector from '../util-comps/archetype-selector'
import useSingleCharacter from '@/presentation/hooks/use-singleCharacter'


interface CharacterDetailsProps {
  initialCharacter: Character
  onChange: (target: string, value: string) => void
}

export default function CharacterDetails({ initialCharacter, onChange }: CharacterDetailsProps) {
  // const {handleChange, character } = useSingleCharacter(initialCharacter)
  // if (!initialCharacter) return <div>No character selected</div>

  const handleChange = onChange
  const character = initialCharacter

 

  return (
    <section className="py-4 space-y-4">
      {/* Status */}
      <div className="flex items-center text-sm gap-2">
        <Label className="font-semibold">Status:</Label>
        <div className={`flex items-center gap-2 font-bold ${character.isAlive ? "text-green-500" : "text-red-500"}`}>
          {character.isAlive ? "Alive" : "Deceased"}
          <Checkbox checked={character.isAlive} onCheckedChange={(checked) => handleChange("isAlive", checked)} />
        </div>
      </div>

      {/* Aliases */}
      <div className="text-sm">
        <InlineEditableList
          items={character.alias as string[]}
          onChange={(items) => handleChange("alias", items)}
          title="Also Known As"
          addButtonText="Add new alias"
          placeholder="Edit this alias"
        />
      </div>

      {/* Alignment */}
      <div className="text-sm flex items-center gap-2 justify-between">
        <Label className="font-semibold">Alignment:</Label>
        <Select value={character.alignment} onValueChange={(value) => handleChange("alignment", value)}>
          <SelectTrigger className="w-1/2 mr-2">
            <SelectValue placeholder="Select alignment" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="lawful-good">Lawful Good</SelectItem>
            <SelectItem value="neutral-good">Neutral Good</SelectItem>
            <SelectItem value="chaotic-good">Chaotic Good</SelectItem>
            <SelectItem value="lawful-neutral">Lawful Neutral</SelectItem>
            <SelectItem value="true-neutral">True Neutral</SelectItem>
            <SelectItem value="chaotic-neutral">Chaotic Neutral</SelectItem>
            <SelectItem value="lawful-evil">Lawful Evil</SelectItem>
            <SelectItem value="neutral-evil">Neutral Evil</SelectItem>
            <SelectItem value="chaotic-evil">Chaotic Evil</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Role */}
      <div className="flex items-center text-sm gap-2 justify-between">
        <Label className="font-semibold">Role:</Label>
        <Select value={character.role} onValueChange={(value) => handleChange("role", value)}>
          <SelectTrigger className="w-1/2 mr-2">
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="protagonist">Protagonist</SelectItem>
            <SelectItem value="antagonist">Antagonist</SelectItem>
            <SelectItem value="deuteragonist">Deuteragonist (Secondary Lead)</SelectItem>
            <SelectItem value="tritagonist">Tritagonist (Tertiary Lead)</SelectItem>
            <SelectItem value="mentor">Mentor</SelectItem>
            <SelectItem value="foil">Foil</SelectItem>
            <SelectItem value="comic-relief">Comic Relief</SelectItem>
            <SelectItem value="contagonist">Contagonist (Tempts the Protagonist)</SelectItem>
            <SelectItem value="love-interest">Love Interest</SelectItem>
            <SelectItem value="rival">Rival</SelectItem>
            <SelectItem value="sidekick">Sidekick</SelectItem>
            <SelectItem value="herald">Herald (Bringer of Change)</SelectItem>
            <SelectItem value="guardian">Guardian (Moral Compass)</SelectItem>
            <SelectItem value="shapeshifter">Shapeshifter (Allegiance Unknown)</SelectItem>
            <SelectItem value="shadow">Shadow (Dark Reflection of Protagonist)</SelectItem>
            <SelectItem value="ally">Ally</SelectItem>
            <SelectItem value="bystander">Bystander</SelectItem>
            <SelectItem value="narrator">Narrator</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Description */}
      <div>
        <Label className="font-semibold">Description</Label>
        <InlineEdit
          value={character.description || ""}
          onChange={(value) => handleChange("description", value)}
          fontSize="sm"
          mode="textarea"
          rows={6}
        />
      </div>

      <Separator className="my-4" />

      {/* Personality */}
      <div>
        <Label className="font-semibold">Personality</Label>
        <InlineEdit
          value={character.personality || ""}
          onChange={(value) => handleChange("personality", value)}
          fontSize="sm"
          mode="textarea"
          rows={6}
        />
      </div>

      <Separator className="my-4" />

      {/* Appearance */}
      <div>
        <Label className="font-semibold">Appearance</Label>
        <InlineEdit
          value={character.appearance || ""}
          onChange={(value) => handleChange("appearance", value)}
          fontSize="sm"
          mode="textarea"
          rows={6}
        />
      </div>

      {/* Physical Attributes */}
      <div className="py-6 px-6 rounded-xl bg-slate-500/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-4">
            <Label htmlFor="age" className="w-24 flex-shrink-0">
              Age
            </Label>
            <Input
              id="age"
              value={character.age || ""}
              onChange={(e) => handleChange("age", e.target.value)}
              className="flex-grow"
            />
          </div>
          <div className="flex items-center space-x-4">
            <Label htmlFor="height" className="w-24 flex-shrink-0">
              Height
            </Label>
            <Input
              id="height"
              value={character.height || ""}
              onChange={(e) => handleChange("height", e.target.value)}
              className="flex-grow"
            />
          </div>
          <div className="flex items-center space-x-4">
            <Label htmlFor="weight" className="w-24 flex-shrink-0">
              Weight
            </Label>
            <Input
              id="weight"
              value={character.weight || ""}
              onChange={(e) => handleChange("weight", e.target.value)}
              className="flex-grow"
            />
          </div>
          <div className="flex items-center space-x-4">
            <Label htmlFor="eyeColor" className="w-24 flex-shrink-0">
              Eye Color
            </Label>
            <Input
              id="eyeColor"
              value={character.eyeColor || ""}
              onChange={(e) => handleChange("eyeColor", e.target.value)}
              className="flex-grow"
            />
          </div>
          <div className="flex items-center space-x-4">
            <Label htmlFor="hairColor" className="w-24 flex-shrink-0">
              Hair Color
            </Label>
            <Input
              id="hairColor"
              value={character.hairColor || ""}
              onChange={(e) => handleChange("hairColor", e.target.value)}
              className="flex-grow"
            />
          </div>
          <div className="flex items-center space-x-4">
            <Label htmlFor="skinColor" className="w-24 flex-shrink-0">
              Skin Color
            </Label>
            <Input
              id="skinColor"
              value={character.skinColor || ""}
              onChange={(e) => handleChange("skinColor", e.target.value)}
              className="flex-grow"
            />
          </div>
          <div className="flex items-center space-x-4 col-span-2">
            <Label htmlFor="bodyType" className="flex-shrink-0">
              Body Type
            </Label>
            <Select value={character.bodyType || ""} onValueChange={(value) => handleChange("bodyType", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select body type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="endomorph">Endomorph</SelectItem>
                <SelectItem value="mesomorph">Mesomorph</SelectItem>
                <SelectItem value="ectomorph">Ectomorph</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Separator className="my-4" />

      {/* Character Traits */}
      <section className="space-y-8">
        <div>
          <Label htmlFor="strengths" className="font-semibold text-lg">
            Strengths
          </Label>
          <InlineEditableList
            items={character.strengths || []}
            onChange={(items) => handleChange("strengths", items)}
            addButtonText="Add strength"
            placeholder="Enter a strength"
          />
        </div>
        <div>
          <Label htmlFor="weaknesses" className="font-semibold text-lg">
            Weaknesses
          </Label>
          <InlineEditableList
            items={character.weaknesses || []}
            onChange={(items) => handleChange("weaknesses", items)}
            addButtonText="Add weakness"
            placeholder="Enter a weakness"
          />
        </div>
        <div>
          <Label htmlFor="fears" className="font-semibold text-lg">
            Fears
          </Label>
          <InlineEditableList
            items={character.fears || []}
            onChange={(items) => handleChange("fears", items)}
            addButtonText="Add fear"
            placeholder="Enter a fear"
          />
        </div>
        <div>
          <Label htmlFor="motivations" className="font-semibold text-lg">
            Motivations
          </Label>
          <InlineEditableList
            items={character.motivations || []}
            onChange={(items) => handleChange("motivations", items)}
            addButtonText="Add motivation"
            placeholder="Enter a motivation"
          />
        </div>
        <div>
          <Label htmlFor="goals" className="font-semibold text-lg">
            Goals
          </Label>
          <InlineEditableList
            items={character.goals || []}
            onChange={(items) => handleChange("goals", items)}
            addButtonText="Add goal"
            placeholder="Enter a goal"
          />
        </div>
      </section>
    </section>
  )
}