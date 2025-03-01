import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { User, BookOpen, Link2, MessageSquareText, FileText, Gem, MapPin, Sparkles } from 'lucide-react'

// Import tab view components
import DetailsView from './tab-views/details-view'
import ResearchView from './tab-views/research-view'
import RelationshipsView from './tab-views/relationships-view'
import MentionsView from './tab-views/mentions-view'

// Import entity type
import { Entity, defaultEntity } from './entity-types'

export default function SubMenu({isNew = false, entity: providedEntity}: {isNew?: boolean, entity?: Partial<Entity>}) {
  // Merge provided entity with default values
  const entity: Entity = {
    ...defaultEntity,
    ...providedEntity,
    tags: [...(providedEntity?.tags || defaultEntity.tags)],
    details: { ...defaultEntity.details, ...(providedEntity?.details || {}) },
  } as Entity;

  // Get the appropriate icon based on entity type
  const getEntityIcon = () => {
    switch (entity.type) {
      case 'character': return <User className="h-5 w-5" />;
      case 'item': return <Gem className="h-5 w-5" />;
      case 'location': return <MapPin className="h-5 w-5" />;
      case 'subplot': return <BookOpen className="h-5 w-5" />;
      case 'concept': return <Sparkles className="h-5 w-5" />;
      default: return <FileText className="h-5 w-5" />;
    }
  };

  // Tab options with their components
  const options = [
    { label: 'Details', value: 'details', component: <DetailsView entity={entity} /> },
    { label: 'Research', value: 'research', component: <ResearchView entity={entity} /> },
    { label: 'Relationships', value: 'relationships', component: <RelationshipsView entity={entity} /> },
    { label: 'Mentions', value: 'mentions', component: <MentionsView entity={entity} /> },
  ]

  return (
    <Card className='font-figtree mt-4'>
      <CardHeader className="px-4 w-full flex items-start flex-row gap-4 h-fit">
        <section className='w-full'>
       
          <div className="flex items-center gap-2">
            <span className="bg-primary/10 text-primary p-1 rounded-md">
              {getEntityIcon()}
            </span>
            <CardTitle className='text-xl font-bold lg:text-2xl'>{entity.name}</CardTitle>
          </div>
          
          <CardDescription className='mt-2'>{entity.description}</CardDescription>
          
          <Separator className='w-full my-4' />
          
          {entity.tags.length > 0 && (
            <ScrollArea className="h-12 w-full">
              <div className='flex flex-wrap gap-2 pb-2 pr-4'>
                {entity.tags.map((tag: { id: React.Key | null | undefined; type: string; name: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined }) => (
                  <Badge 
                    key={tag.id} 
                    className='w-fit' 
                    variant={tag.type === 'status' ? 'default' : 'outline'}
                  >
                    {tag.name}
                  </Badge>
                ))}
              </div>
            </ScrollArea>
          )}
        </section>
        
        <div className="relative min-w-24 h-24 md:min-w-32 md:h-32 rounded-xl overflow-hidden bg-muted">
          {entity.image ? (
            <Image
              src={entity.image || "/placeholder.svg"}
              alt={entity.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-primary/10">
              {getEntityIcon()}
            </div>
          )}
        </div>
      </CardHeader>
      
      <Separator className='w-full' />

      <CardContent className='px-4 pt-4'>
        <Tabs defaultValue="details" className="w-full">
          <TabsList className='w-full'>
            {options.map((option) => (
              <TabsTrigger key={option.value} value={option.value} className='w-full' disabled={
                option.value !== 'details'
              }>
                {option.label}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {options.map((option) => (
            <TabsContent key={option.value} value={option.value} className='w-full'>
              {option.component}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
