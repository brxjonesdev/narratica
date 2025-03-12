import { Character } from '@/entities/Character'
import { InlineEdit } from '@/presentation/components/shared/inline-edit'
import { Button } from '@/presentation/components/ui/button'
import { CardHeader, CardContent } from '@/presentation/components/ui/card'
import { Separator } from '@/presentation/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/presentation/components/ui/tabs'

import { Delete } from 'lucide-react'
import CharacterDetails from './views/character-details'
import CharacterRelationships from './views/character-relationships'




export default function CharacterView({character, onDelete, updateCharacter}: {
  character: Character, 
  onDelete: (id: string) => void
  updateCharacter: (updatedCharacter: Character) => void
}) {
    const options = [
        { label: 'Details', value: 'details', component: <CharacterDetails initialCharacter={character} onChange={
          (target: string, value: string) => {
            handleEdit(target, value)
          }
        }
          /> },
        { label: 'Relationships', value: 'relationships', component: <CharacterRelationships character={character}/> },
        { label: 'Mentions', value: 'mentions', component: null },
      ];

      console.log('character', character)

      function handleEdit(target: string, value: string) {
        updateCharacter({
          ...character,
          [target]: value
        })
      }
    
  return (
    <>
    <CardHeader className="w-full flex items-start flex-col gap-2 h-fit">
                      <div className="flex justify-between items-center w-full">
                        <div>
                        <InlineEdit
                            value={character.name}
                            onChange={(value) => handleEdit( 'name', value)}
                            fontSize='2xl'
                            weight='bold'
                             />
                             <InlineEdit
                            value={character.subname}
                            onChange={(value) => handleEdit('subname', value)}
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
