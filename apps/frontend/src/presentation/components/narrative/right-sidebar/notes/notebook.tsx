"use client"

import { useState, useEffect } from "react"
import { Button } from "@/presentation/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/presentation/components/ui/dialog"
import { NotebookPen, Save } from "lucide-react"
import { useToast } from "@/presentation/hooks/use-toast"
import ReactMarkdown from "react-markdown"

export default function MarkdownNotebook() {
  const [notes, setNotes] = useState<{ [key: string]: string }>({})
  const [currentNote, setCurrentNote] = useState("")
  const [editMode, setEditMode] = useState(true)
  const [currentNoteId, setCurrentNoteId] = useState<string | null>(null)
  const { toast } = useToast()

  // Load notes from localStorage on component mount
  useEffect(() => {
    const savedNotes = localStorage.getItem("markdown-notes")
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes))
    }
  }, [])

  const saveNote = () => {
    if (!currentNote.trim()) return

    const noteId = currentNoteId || `note-${Date.now()}`
    const updatedNotes = {
      ...notes,
      [noteId]: currentNote,
    }

    setNotes(updatedNotes)
    setCurrentNoteId(noteId)

    // Save to localStorage
    localStorage.setItem("markdown-notes", JSON.stringify(updatedNotes))

    toast({
      title: "Note saved",
      description: "Your note has been saved successfully.",
    })
  }

  const createNewNote = () => {
    setCurrentNote("")
    setCurrentNoteId(null)
    setEditMode(true)
  }

  const selectNote = (id: string) => {
    setCurrentNote(notes[id])
    setCurrentNoteId(id)
    setEditMode(false)
  }

  const toggleEditMode = () => {
    setEditMode(!editMode)
  }

  // Get note title from content (first line or first few characters)
  const getNoteTitle = (content: string) => {
    const firstLine = content.split("\n")[0].replace(/^#+ /, "")
    if (firstLine.length > 0) {
      return firstLine.length > 30 ? firstLine.substring(0, 30) + "..." : firstLine
    }
    return content.length > 30 ? content.substring(0, 30) + "..." : content || "Untitled"
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full h-full text-sm font-normal">
          <NotebookPen className="h-4 w-4 mr-2" />
          Open Notes
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] max-h-[80vh] flex flex-col font-figtree">
        <DialogHeader>
          <DialogTitle>Notebook</DialogTitle>
        </DialogHeader>

        <div className="flex h-full mt-4">
          {/* Sidebar with note list */}
          <div className="w-1/4 border-r pr-4 overflow-y-auto max-h-[60vh]">
            <Button variant="outline" className="w-full mb-4" onClick={createNewNote}>
              New Note
            </Button>

            <div className="space-y-2">
              {Object.keys(notes).map((noteId) => (
                <div
                  key={noteId}
                  className={`p-2 rounded cursor-pointer hover:bg-muted ${currentNoteId === noteId ? "bg-muted" : ""}`}
                  onClick={() => selectNote(noteId)}
                >
                  {getNoteTitle(notes[noteId])}
                </div>
              ))}
            </div>
          </div>

          {/* Main content area */}
          <div className="w-3/4 pl-4 flex flex-col h-full">
            {editMode ? (
              <textarea
                className="flex-1 p-2 border rounded resize-none min-h-[50vh] bg-transparent"
                value={currentNote}
                onChange={(e) => setCurrentNote(e.target.value)}
                placeholder="Write your markdown here..."
              />
            ) : (
              <div
                className="flex-1 p-2 border rounded overflow-y-auto min-h-[50vh] prose prose-sm max-w-none"
                onClick={toggleEditMode}
              >
                <ReactMarkdown>{currentNote}</ReactMarkdown>
              </div>
            )}

            <div className="flex justify-between mt-4">
              <Button variant="outline" onClick={toggleEditMode}>
                {editMode ? "Preview" : "Edit"}
              </Button>

              <Button onClick={saveNote} disabled={!currentNote.trim()}>
                <Save className="h-4 w-4 mr-2" />
                Save Note
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}



