import React, { useState } from 'react';
import { Card, CardContent, CardHeader,} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Delete,
  X,
} from 'lucide-react';
import DetailsView from './submenu-utils/details-view';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Entity } from '@/entities/Entity';
import { Tag } from '@/entities/Tag';



export default function SubMenu({ entity, availableTags }: { entity: Entity, availableTags: Tag[] }) {
  const [name, setName] = useState(entity.name)
  const [tags, setTags] = useState(entity.tags || [])
  const [isSelectingTag, setIsSelectingTag] = useState(false)
  
  const options = [
    { label: 'Details', value: 'details', component: <DetailsView content={entity.details} /> },
    { label: 'Relationships', value: 'relationships', component: null},
    { label: 'Mentions', value: 'mentions', component: null },
  ];

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value
    setName(newName)
    // updateEntity(entity.id, { name: newName })
  }

  const addTag = (tag) => {
    if (!tags.some((t) => t.id === tag.id)) {
      const newTags = [...tags, tag]
      setTags(newTags)
    }
  
    setIsSelectingTag(false)
  }

  const removeTag = (tagId: string) => {
    const newTags = tags.filter((tag) => tag.id !== tagId)
    setTags(newTags)
  }




  return (
    <Card className="font-figtree mt-4 max-h-[48rem] overflow-scroll">
      <CardHeader className="px-4 w-full flex items-start flex-col gap-2 h-fit">
        <div className='flex justify-between items-center w-full'>
        <Input
            className="w-full text-xl font-medium border-none bg-transparent p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none transition-colors rounded px-1"
            value={name}
            onChange={handleNameChange}
            placeholder="Entity name"
          />
          <Button className="hover:bg-red-600/60" variant={'ghost'} size={"icon"}>
            <Delete/>
          </Button>
        </div>
      
        <Separator className="w-full" />
        <div className="flex flex-wrap gap-2 mt-2">
            {tags?.map((tag) => (
              <Badge
                key={tag.id}
                variant="secondary"
                className="flex items-center gap-1 px-2 py-1 text-black"
                style={{ backgroundColor: tag.color }}
              >
                {tag.name}
                <button onClick={() => removeTag(tag.id)} className="ml-1 rounded-full hover:bg-muted p-0.5">
                  <X size={14} />
                </button>
              </Badge>
            ))}

            {isSelectingTag ? (
              <div className="relative">
                <Badge variant="outline" className="cursor-default" onClick={() => setIsSelectingTag(false)}>
                  Select a tag...
                </Badge>
                <div className="absolute top-full left-0 mt-1 bg-background border rounded-md shadow-md z-10 w-48 max-h-48 overflow-y-auto">
                  {availableTags
                    .filter((tag) => !tags.some((t) => t.id === tag.id))
                    .map((tag) => (
                      <div key={tag.id} className="px-2 py-1 hover:bg-muted cursor-pointer " onClick={() => addTag(tag)}>
                        {tag.name}
                      </div>
                      // SHOW message if no tags available
                    ))}
                </div>
              </div>
            ) : (
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-muted"
                onClick={() => setIsSelectingTag(true)}
              >
                + Add Tag
              </Badge>
            )}
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
    </Card>
  );
}
