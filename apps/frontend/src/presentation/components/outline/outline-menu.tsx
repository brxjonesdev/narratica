"use client"


import { Button } from "@/presentation/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
} from "@/presentation/components/ui/dropdown-menu"
import { Switch } from "@/presentation/components/ui/switch"
import {
  ChevronDown,
  Maximize2,
  Minimize2,
  LayoutGridIcon as LayoutVertical,
  LayoutGridIcon as LayoutHorizontal,
  Settings2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useOutlineContext } from "@/presentation/context/OutlineContext"

export function OutlineDropdownMenu() {
  const { state, setState } = useOutlineContext()

  const handleAxisChange = (axis: "vertical" | "horizontal") => {
    setState((prev) => ({ ...prev, axis }))
  }

  const handleWidthChange = (width: "small" | "medium" | "large") => {
    setState((prev) => ({ ...prev, width }))
  }

  const handleHeightChange = (height: "small" | "medium" | "large" | "full") => {
    setState((prev) => ({ ...prev, height }))
  }

  const handleAutoTrackingChange = (enableAutoTracking: boolean) => {
    setState((prev) => ({ ...prev, enableAutoTracking }))
  }

  return (
    <DropdownMenu >
      <DropdownMenuTrigger asChild>
        <Button variant="default" size="sm" className="h-8 px-3 flex items-center gap-1.5 bg-white/10 text-white">
          <Settings2 className="h-4 w-4" />
          <span>Outline</span>
          <ChevronDown className="h-3.5 w-3.5 ml-1 opacity-70" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit font-figtree" align="end">
        <DropdownMenuLabel>Outline Settings</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* Axis Option */}
        <div className="px-2 py-1.5">
          <div className="text-xs font-medium mb-1.5 text-muted-foreground">Axis</div>
          <div className="flex bg-muted rounded-md p-0.5">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleAxisChange("vertical")}
              className={cn(
                "h-8 flex-1 px-3 rounded-sm",
                state.axis === "vertical"
                  ? "bg-background text-foreground shadow-sm"
                  : "bg-transparent text-muted-foreground hover:bg-background/50",
              )}
            >
              Vertical
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleAxisChange("horizontal")}
              className={cn(
                "h-8 flex-1 px-3 rounded-sm",
                state.axis === "horizontal"
                  ? "bg-background text-foreground shadow-sm"
                  : "bg-transparent text-muted-foreground hover:bg-background/50",
              )}
            >
       
              Horizontal
            </Button>
          </div>
        </div>

        <DropdownMenuSeparator />

        {/* Width Submenu */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <span className="flex items-center justify-between w-full">
              <span className="mr-auto">Width</span>
              <span className="ml-auto text-xs text-muted-foreground capitalize">{state.width}</span>
            </span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem
                onClick={() => handleWidthChange("small")}
                className={cn(state.width === "small" && "bg-muted")}
              >

                Small
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleWidthChange("medium")}
                className={cn(state.width === "medium" && "bg-muted")}
              >
     
                Medium
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleWidthChange("large")}
                className={cn(state.width === "large" && "bg-muted")}
              >
      
                Large
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        {/* Height Submenu */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <span className="flex items-center justify-between w-full">
              <span className="mr-auto">Height</span>
              <span className="ml-auto text-xs text-muted-foreground capitalize">{state.height}</span>
            </span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem
                onClick={() => handleHeightChange("small")}
                className={cn(state.height === "small" && "bg-muted")}
              >
                Small
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleHeightChange("medium")}
                className={cn(state.height === "medium" && "bg-muted")}
              >

                Medium
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleHeightChange("large")}
                className={cn(state.height === "large" && "bg-muted")}
              >

                Large
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleHeightChange("full")}
                className={cn(state.height === "full" && "bg-muted")}
              >
                Full
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuSeparator />

        {/* Auto Tracking Toggle */}
        <div className="px-2 py-1.5">
          <div className="flex items-center justify-between">
            <span className="text-sm">Auto Tracking</span>
            <Switch
              id="auto-tracking"
              checked={state.enableAutoTracking}
              onCheckedChange={handleAutoTrackingChange}
              className="data-[state=checked]:bg-primary"
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1 w-[22ch]">Automatically track character and location references</p>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

