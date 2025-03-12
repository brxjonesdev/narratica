import { Character } from '@/entities/Character'
import { InlineEdit } from '@/presentation/components/shared/inline-edit'
import { Button } from '@/presentation/components/ui/button'
import { CardHeader, CardContent } from '@/presentation/components/ui/card'
import { Input } from '@/presentation/components/ui/input'
import { Separator } from '@/presentation/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/presentation/components/ui/tabs'

import { Delete } from 'lucide-react'
import CharacterDetails from './views/character-details'
import CharacterRelationships from './views/character-relationships'



// {
//     "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
//     "narrative": "nSD2X4p0JXlc2m-X-171170-m80l14f5-uh42gm",
//     "name": "Ririka Momobami",
//     "alias": [
//       "N/A"
//     ],
//     "description": "Ririka is the 105th president of the student council of Hyakkaou Private Academy. She is a cold and calculating individual who plays the game of high-stakes gambling with ruthless efficiency, often using her intelligence and cunning to manipulate situations for her gain.",
//     "backstory": "Ririka was born into the Momobami family, one of the 105 families that all strive for power in the student council of Hyakkaou Private Academy. As the president, she leads with an air of cold authority and remains at the top of the school's hierarchy.",
//     "appearance": "Ririka has long, straight silver hair and piercing, cold blue eyes. She usually wears the standard school uniform with a pristine, calculated appearance that reinforces her position of power.",
//     "personality": "She is extremely composed and cold-hearted, showing little to no empathy. Her sense of superiority makes her act in a distant and often condescending manner, while her intelligence and ruthlessness make her a formidable adversary.",
//     "role": "President of the Student Council",
//     "age": 16,
//     "height": "165 cm",
//     "weight": "55 kg",
//     "eyeColor": "Blue",
//     "hairColor": "Silver",
//     "skinColor": "Pale",
//     "bodyType": "Slim",
//     "strengths": [
//       "Intelligence",
//       "Manipulative skills",
//       "Strategic thinking"
//     ],
//     "weaknesses": [
//       "Cold demeanor",
//       "Lack of empathy",
//       "Ruthlessness"
//     ],
//     "fears": [
//       "Losing her status",
//       "Being outsmarted"
//     ],
//     "motivations": [
//       "Maintaining her position as president",
//       "Winning in all circumstances"
//     ],
//     "goals": [
//       "Ensure her dominance over the academy",
//       "Manipulate those around her for her benefit"
//     ],
//     "isAlive": true,
//     "isActiveInStory": true,
//     "alignment": "Lawful Evil",
//     "createdAt": "2025-03-08T00:00:00.000Z",
//     "updatedAt": "2025-03-08T00:00:00.000Z"
//   }


export default function CharacterView({character, onDelete}: {character: Character, onDelete: (id: string) => void}) {
    const options = [
        { label: 'Details', value: 'details', component: <CharacterDetails character={character}/> },
        { label: 'Relationships', value: 'relationships', component: <CharacterRelationships character={character}/> },
        { label: 'Mentions', value: 'mentions', component: null },
      ];

      console.log('character', character)

      function handleEdit(id, target, value) {
        console.log('handleEdit', id, target, value)
      }
    
  return (
    <>
    <CardHeader className="w-full flex items-start flex-col gap-2 h-fit">
                      <div className="flex justify-between items-center w-full">
                        <div>
                        <InlineEdit
                            value={character.name}
                            onChange={(value) => handleEdit(character.id, 'name', value)}
                            fontSize='2xl'
                            weight='bold'
                             />
                             <InlineEdit
                            value={character.role}
                            onChange={(value) => handleEdit(character.id, 'name', value)}
                            fontSize='sm'
                             />
                             </div>
                             
                        <Button className="hover:bg-red-600/60" variant={'ghost'} size={'icon'}
                            onClick={() => {
                               onDelete(character.id)
                            }}
                        >
                          <Delete />
                        </Button>
                      </div>
                    </CardHeader>

                    <Separator className="w-full" />

                    <CardContent className="overflow-y-scroll flex-1 flex pt-4 ">
                      <Tabs defaultValue="details" className="w-full flex-1 overflow-y-scroll  rounded-t-xl pr-4 flex flex-col">
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
  )
}
