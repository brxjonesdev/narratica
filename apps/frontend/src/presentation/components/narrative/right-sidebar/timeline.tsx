import { CalendarDays, MapPin } from "lucide-react"

import { cn } from "@/lib/utils"

interface TimelineEvent {
  id: number
  title: string
  date: string
  description: string
  location: string
}

interface TimelineProps {
  events: TimelineEvent[]
}

export function Timeline({ events }: TimelineProps) {
  return (
    <div className="space-y-1">
      {events.map((event, index) => (
        <div key={event.id} className="relative">
          <div className="flex items-start gap-2">
            <div className="flex flex-col items-center">
              <div className="mt-1 h-2 w-2 rounded-full bg-sidebar-primary" />
              {index < events.length - 1 && <div className="h-full w-0.5 bg-sidebar-border" />}
            </div>
            <div
              className={cn(
                "group w-full rounded-lg border border-sidebar-border bg-sidebar-accent/30 p-3 transition-colors hover:bg-sidebar-accent",
                index === events.length - 1 ? "mb-0" : "mb-3",
              )}
            >
              <h3 className="font-medium text-sidebar-foreground">{event.title}</h3>
              <div className="mt-1 flex items-center gap-2 text-xs text-sidebar-foreground/70">
                <CalendarDays className="h-3 w-3" />
                <span>{event.date}</span>
              </div>
              <div className="mt-1 flex items-center gap-2 text-xs text-sidebar-foreground/70">
                <MapPin className="h-3 w-3" />
                <span>{event.location}</span>
              </div>
              <p className="mt-2 text-sm text-sidebar-foreground/80">{event.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

