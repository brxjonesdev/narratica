"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Input } from "@/presentation/components/ui/input"
import { Textarea } from "@/presentation/components/ui/textarea"
import { Check, X, } from "lucide-react"
import { cn } from "@/lib/utils"

interface InlineEditProps {
  value: string
  onChange: (value: string) => void
  className?: string
  placeholder?: string
  inputClassName?: string
  mode?: "input" | "textarea"
  rows?: number
  fontSize?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl"
  weight?: "normal" | "bold" | "bolder" 
}

export function InlineEdit({
  value,
  onChange,
  className,
  placeholder = "Click to edit",
  inputClassName,
  mode = "input",
  rows = 3,
  fontSize = "sm",
  weight = "normal",
}: InlineEditProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [inputValue, setInputValue] = useState(value)
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditing])

  const handleClick = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    onChange(inputValue)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setInputValue(value)
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave()
    } else if (e.key === "Escape") {
      handleCancel()
    }
  }

  return (
    <div className={cn("group relative", className)}>
      {isEditing ? (
        <div className={`flex items-center gap-2 p-2.5 ${mode === "textarea" ? "flex-col" : "flex-row"}`}>
          {mode === "input" ? (
            // make the focus color better
            <Input
              ref={inputRef as React.RefObject<HTMLInputElement>}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onBlur={handleSave}
              onKeyDown={handleKeyDown}
              className={cn(`py-1 text-${fontSize}`, inputClassName)}
              placeholder={placeholder}
            />
          ) : (
            <Textarea
              ref={inputRef as React.RefObject<HTMLTextAreaElement>}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onBlur={handleSave}
              onKeyDown={handleKeyDown}
              className={cn("min-h-[80px] resize-none mx-4 w-full", inputClassName)}
              placeholder={placeholder}
              rows={rows}
            />
          )}
          <div className={`flex items-center gap-1 `}>
            <button
              onClick={handleSave}
              className="rounded-full p-1 text-green-600 hover:bg-green-100"
              aria-label="Save"
            >
              <Check className="h-4 w-4" />
            </button>
            <button
              onClick={handleCancel}
              className="rounded-full p-1 text-red-600 hover:bg-red-100"
              aria-label="Cancel"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={handleClick}
          className="flex cursor-pointer items-center rounded-md px-3 py-1.5 hover:bg-muted/50"
        >
          <span className={cn(`block whitespace-pre-wrap text-${fontSize} font-${weight}`, !value && "text-muted-foreground")}>
            {value || placeholder}
          </span>
         
        </div>
      )}
    </div>
  )
}

