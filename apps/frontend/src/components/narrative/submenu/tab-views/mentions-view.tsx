import { Badge } from "@/components/ui/badge"
import { Bookmark, MessageSquareText } from "lucide-react"
import type { Entity } from "../entity-types"

export default function MentionsView({ entity }: { entity: Entity }) {
  return (
    <div className="space-y-4 py-2">
      {entity.mentions.length > 0 ? (
        entity.mentions.map((mention) => (
          <div key={mention.id} className="p-3 border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Bookmark className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{mention.chapter}</span>
                {mention.scene && <span className="text-sm text-muted-foreground">• {mention.scene}</span>}
              </div>
              <Badge variant={mention.importance > 7 ? "default" : "secondary"} className="text-xs">
                {mention.importance > 7 ? "Key Mention" : "Minor Mention"}
              </Badge>
            </div>
            <p className="text-sm italic">"{mention.context}"</p>
          </div>
        ))
      ) : (
        <div className="text-center py-8">
          <MessageSquareText className="h-12 w-12 mx-auto text-muted-foreground opacity-20 mb-2" />
          <h3 className="text-lg font-medium">No mentions yet</h3>
          <p className="text-sm text-muted-foreground">Track where this {entity.type} appears in your story.</p>
        </div>
      )}
    </div>
  )
}

