import { ChevronRight, MapPin } from "lucide-react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/presentation/components/ui/accordion"
import { Badge } from "@/presentation/components/ui/badge"

interface Location {
  id: number
  name: string
  type: string
  description: string
  keyLocations: string[]
}

interface LocationDetailsProps {
  locations: Location[]
}

export function LocationDetails({ locations }: LocationDetailsProps) {
  return (
    <Accordion type="multiple" className="w-full">
      {locations.map((location) => (
        <AccordionItem key={location.id} value={location.id.toString()} className="border-sidebar-border">
          <AccordionTrigger className="py-3 text-sm hover:no-underline">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-sidebar-primary" />
              <span>{location.name}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-3 pt-1">
            <div className="space-y-2 text-sm">
              <Badge variant="outline" className="bg-sidebar-accent/50">
                {location.type}
              </Badge>
              <p className="text-sidebar-foreground/80">{location.description}</p>
              <div className="mt-2">
                <h4 className="mb-1 text-xs font-medium text-sidebar-foreground/70">Key Locations:</h4>
                <ul className="space-y-1">
                  {location.keyLocations.map((place, index) => (
                    <li key={index} className="flex items-center gap-2 text-xs">
                      <ChevronRight className="h-3 w-3" />
                      <span>{place}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

