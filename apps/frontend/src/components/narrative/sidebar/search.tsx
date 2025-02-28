import { SidebarGroup, SidebarGroupContent, SidebarInput } from '@/components/ui/sidebar'
import { Label } from '@/components/ui/label'
import React from 'react'
import { Search as LucideSearch } from 'lucide-react'

export default function Search({query, setQuery}: {query: string, setQuery: React.Dispatch<React.SetStateAction<string>>}) {
  return (
    <form >
    <SidebarGroup className="px-0">
      <SidebarGroupContent className="relative">
        <Label htmlFor="search" className="sr-only">
          Search
        </Label>
        <SidebarInput
          id="search"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-8"
        />
        <LucideSearch className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
      </SidebarGroupContent>
    </SidebarGroup>
  </form>
  )
}
