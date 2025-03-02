import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  User,
  BookOpen,
  FileText,
  Gem,
  MapPin,
  Sparkles,
} from 'lucide-react';

// Import tab view components
import DetailsView from './tab-views/details-view';


export default function SubMenu({ entity }) {
  // Get the appropriate icon based on entity type
  const getEntityIcon = () => {
    switch (entity.type) {
      case 'character':
        return <User className="h-5 w-5" />;
      case 'item':
        return <Gem className="h-5 w-5" />;
      case 'location':
        return <MapPin className="h-5 w-5" />;
      case 'subplot':
        return <BookOpen className="h-5 w-5" />;
      case 'concept':
        return <Sparkles className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  // Tab options with their components
  const options = [
    { label: 'Details', value: 'details', component: <DetailsView entity={entity} /> },
    { label: 'Research', value: 'research', component: null },
    {
      label: 'Relationships',
      value: 'relationships',
      component: null,
    },
    { label: 'Mentions', value: 'mentions', component: null },
  ];

  return (
    <Card className="font-figtree mt-4 max-h-[48rem] overflow-scroll">
      <CardHeader className="px-4 w-full flex items-start flex-row gap-4 h-fit">
        <section className="w-full">
          <div className="flex items-center gap-2">
            <span className="bg-primary/10 text-primary p-1 rounded-md">{getEntityIcon()}</span>
            <CardTitle className="text-xl font-bold lg:text-2xl">{entity.name}</CardTitle>
          </div>

          <CardDescription className="mt-2">{entity.description}</CardDescription>

          <Separator className="w-full my-4" />

         
        </section>

        <div className="relative min-w-20 h-24 md:min-w-24 md:h-24 rounded-xl overflow-hidden bg-muted">
          {entity.image ? (
            <Image
              src={entity.image || '/placeholder.svg'}
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
