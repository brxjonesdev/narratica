import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Link2 } from "lucide-react"
import type { Entity } from "../entity-types"

export default function RelationshipsView({ entity }: { entity: Entity }) {
  return (
    <div className="space-y-4 py-2">
      {entity.relationships.length > 0 ? (
        entity.relationships.map((relationship) => (
          <div key={relationship.id} className="flex items-start gap-3 p-3 border rounded-lg">
            <Avatar className="h-10 w-10">
              <AvatarFallback>{relationship.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-medium truncate">{relationship.name}</h3>
                <Badge variant="outline">{relationship.type}</Badge>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">{relationship.description}</p>
              <div className="mt-1">
                <div className="flex justify-between text-xs">
                  <span>Relationship Strength</span>
                  <span>{relationship.strength}/10</span>
                </div>
                <Progress value={relationship.strength * 10} className="h-1.5 mt-1" />
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-8">
          <Link2 className="h-12 w-12 mx-auto text-muted-foreground opacity-20 mb-2" />
          <h3 className="text-lg font-medium">No relationships defined</h3>
          <p className="text-sm text-muted-foreground">Connect this {entity.type} to other entities in your world.</p>
        </div>
      )}
    </div>
  )
}

