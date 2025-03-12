import { location } from '@/entities/location'
import React from 'react'
import { InlineEdit } from '@/presentation/components/shared/inline-edit'
import { Label } from '@radix-ui/react-label'
import { Separator } from '@/presentation/components/ui/separator'
import { Checkbox } from '@/presentation/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/presentation/components/ui/select'
import { InlineEditableList } from '@/presentation/components/shared/inline-list-edit'
import { Input } from '@/presentation/components/ui/input'
import { Location } from '@/entities/Location'


interface LocationDetailsProps {
    location: Location
    onChange: (id: string, updatedLocation: Location) => void
}

export default function LocationDetails(
  { location, onChange }: LocationDetailsProps
) {



 

  return (
    <section className="py-4 space-y-4">
  
      
  
    </section>
  )
}