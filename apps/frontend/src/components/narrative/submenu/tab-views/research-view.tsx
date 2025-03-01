import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, FileText } from "lucide-react"
import type { Entity } from "../entity-types"

export default function ResearchView({ entity }: { entity: Entity }) {
  return (
    <div className="space-y-4 py-2">
      {entity.research.length > 0 ? (
        entity.research.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-base">{item.title}</CardTitle>
              <CardDescription className="flex items-center gap-1 text-xs">
                <FileText className="h-3 w-3" />
                {item.source ? `Source: ${item.source}` : "Personal notes"} • {new Date(item.date).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <p className="text-sm">{item.content}</p>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="text-center py-8">
          <BookOpen className="h-12 w-12 mx-auto text-muted-foreground opacity-20 mb-2" />
          <h3 className="text-lg font-medium">No research notes yet</h3>
          <p className="text-sm text-muted-foreground">
            Add research notes, references, and inspirations for this {entity.type}.
          </p>
        </div>
      )}
    </div>
  )
}

