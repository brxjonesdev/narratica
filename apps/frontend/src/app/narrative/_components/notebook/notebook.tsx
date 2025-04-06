'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';
import { NotebookPen, Save } from 'lucide-react';
import { useToast } from '@/shared/hooks/use-toast';
import ReactMarkdown from 'react-markdown';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shared/ui/alert-dialog';
import { Input } from '@/shared/ui/input';
import { MoreVertical, Trash, Edit, FileText } from 'lucide-react';

export default function MarkdownNotebook() {
  const [notes, setNotes] = useState<{ [key: string]: string }>({});
  const [currentNote, setCurrentNote] = useState('');
  const [editMode, setEditMode] = useState(true);
  const [currentNoteId, setCurrentNoteId] = useState<string | null>(null);
  const { toast } = useToast();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState<string | null>(null);
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState('');

  // Load notes from localStorage on component mount
  useEffect(() => {
    const savedNotes = localStorage.getItem('markdown-notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  const saveNote = () => {
    if (!currentNote.trim()) return;

    const noteId = currentNoteId || `note-${Date.now()}`;
    const updatedNotes = {
      ...notes,
      [noteId]: currentNote,
    };

    setNotes(updatedNotes);
    setCurrentNoteId(noteId);

    // Save to localStorage
    localStorage.setItem('markdown-notes', JSON.stringify(updatedNotes));

    toast({
      title: 'Note saved',
      description: 'Your note has been saved successfully.',
    });
  };

  const createNewNote = () => {
    setCurrentNote('');
    setCurrentNoteId(null);
    setEditMode(true);
  };

  const selectNote = (id: string) => {
    setCurrentNote(notes[id]);
    setCurrentNoteId(id);
    setEditMode(false);
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const getNoteTitle = (content: string) => {
    const firstLine = content.split('\n')[0].replace(/^#+ /, '');
    if (firstLine.length > 0) {
      return firstLine.length > 30 ? firstLine.substring(0, 30) + '...' : firstLine;
    }
    return content.length > 30 ? content.substring(0, 30) + '...' : content || 'Untitled';
  };

  const deleteNote = (id: string) => {
    setNoteToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (noteToDelete) {
      const updatedNotes = { ...notes };
      delete updatedNotes[noteToDelete];

      setNotes(updatedNotes);
      localStorage.setItem('markdown-notes', JSON.stringify(updatedNotes));

      if (currentNoteId === noteToDelete) {
        setCurrentNote('');
        setCurrentNoteId(null);
        setEditMode(true);
      }

      setIsDeleteDialogOpen(false);
      setNoteToDelete(null);

      toast({
        title: 'Note deleted',
        description: 'Your note has been deleted successfully.',
      });
    }
  };

  const startRenameNote = (id: string) => {
    const noteTitle = getNoteTitle(notes[id]);
    setNewNoteTitle(noteTitle);
    setNoteToDelete(id); // Reusing this state to track which note to rename
    setIsRenameDialogOpen(true);
  };

  const confirmRename = () => {
    if (noteToDelete && newNoteTitle.trim()) {
      const noteContent = notes[noteToDelete];

      // If the first line is a markdown heading, replace it
      const lines = noteContent.split('\n');
      if (lines[0].startsWith('#')) {
        lines[0] = `# ${newNoteTitle}`;
      } else {
        // Otherwise, add a heading at the beginning
        lines.unshift(`# ${newNoteTitle}`);
      }

      const updatedContent = lines.join('\n');
      const updatedNotes = {
        ...notes,
        [noteToDelete]: updatedContent,
      };

      setNotes(updatedNotes);
      localStorage.setItem('markdown-notes', JSON.stringify(updatedNotes));

      if (currentNoteId === noteToDelete) {
        setCurrentNote(updatedContent);
      }

      setIsRenameDialogOpen(false);
      setNoteToDelete(null);

      toast({
        title: 'Note renamed',
        description: 'Your note has been renamed successfully.',
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <NotebookPen className="h-4 w-4 " />
          Notes
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] max-h-[80vh] flex flex-col font-figtree">
        <DialogHeader>
          <DialogTitle>Notebook</DialogTitle>
        </DialogHeader>

        <div className="flex h-full mt-4">
          <div className="w-1/4 border-r pr-4 overflow-y-auto max-h-[60vh]">
            <Button variant="outline" className="w-full mb-4" onClick={createNewNote}>
              New Note
            </Button>

            <div className="space-y-2">
              {Object.keys(notes).map((noteId) => (
                <div
                  key={noteId}
                  className={`p-2 rounded flex items-center justify-between hover:bg-muted ${
                    currentNoteId === noteId ? 'bg-muted' : ''
                  }`}
                >
                  <div
                    className="flex-1 cursor-pointer truncate"
                    onClick={() => selectNote(noteId)}
                  >
                    {getNoteTitle(notes[noteId])}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="font-figtree">
                      <DropdownMenuItem onClick={() => selectNote(noteId)}>
                        <FileText className="h-4 w-4 mr-2" />
                        Open
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => startRenameNote(noteId)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Rename
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => deleteNote(noteId)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          </div>

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
                {editMode ? 'Preview' : 'Edit'}
              </Button>

              <Button onClick={saveNote} disabled={!currentNote.trim()}>
                <Save className="h-4 w-4 mr-2" />
                Save Note
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="font-figtree">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your note.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Rename Dialog */}
      <AlertDialog open={isRenameDialogOpen} onOpenChange={setIsRenameDialogOpen}>
        <AlertDialogContent className="font-figtree">
          <AlertDialogHeader>
            <AlertDialogTitle>Rename Note</AlertDialogTitle>
            <AlertDialogDescription>Enter a new title for your note.</AlertDialogDescription>
          </AlertDialogHeader>
          <Input
            value={newNoteTitle}
            onChange={(e) => setNewNoteTitle(e.target.value)}
            className="my-4"
            placeholder="Note title"
          />
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmRename}>Rename</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Dialog>
  );
}
