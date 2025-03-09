import { Character } from '@/entities/Character'
import { Button } from '@/presentation/components/ui/button'
import { CardHeader, CardContent } from '@/presentation/components/ui/card'
import { Input } from '@/presentation/components/ui/input'
import { Separator } from '@/presentation/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/presentation/components/ui/tabs'
import { Delete } from 'lucide-react'


export default function CharacterView({character}: {character: Character}) {
    const options = [
        { label: 'Details', value: 'details', component: null },
        { label: 'Relationships', value: 'relationships', component: null },
        { label: 'Mentions', value: 'mentions', component: null },
      ];

      console.log('character', character)
    
  return (
    <>
    <CardHeader className="px-4 w-full flex items-start flex-col gap-2 h-fit">
                      <div className="flex justify-between items-center w-full">
                        <Input
                          className="w-full text-xl font-medium border-none bg-transparent p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none transition-colors rounded px-1"
                          placeholder="Entity name"
                        />
                        <Button className="hover:bg-red-600/60" variant={'ghost'} size={'icon'}>
                          <Delete />
                        </Button>
                      </div>
                    </CardHeader>

                    <Separator className="w-full" />

                    <CardContent className="px-4 pt-4 overflow-y-scroll">
                      <Tabs defaultValue="details" className="w-full">
                        <TabsList className="w-full">
                          {options.map((option) => (
                            <TabsTrigger
                              key={option.value}
                              value={option.value}
                              className="w-full"
                              disabled={option.value !== 'details'}
                            >
                              {option.label}
                            </TabsTrigger>
                          ))}
                        </TabsList>

                        {options.map((option) => (
                          <TabsContent key={option.value} value={option.value} className="w-full">
                            {option.component}
                          </TabsContent>
                        ))}
                      </Tabs>
                    </CardContent>
    </>
  )
}
