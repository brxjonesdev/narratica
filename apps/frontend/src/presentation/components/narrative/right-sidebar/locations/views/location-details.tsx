'use client';

import type React from 'react';
import { useState, useRef } from 'react';
import type { Location } from '@/entities/Location';
import { Button } from '@/presentation/components/ui/button';
import { Textarea } from '@/presentation/components/ui/textarea';
import ReactMarkdown from 'react-markdown';
import { Save, X } from 'lucide-react';

interface LocationDetailsProps {
  location: Location;
  onUpdate: (id: string, updatedLocation: Location) => void;
}

export default function LocationDetails({ location, onUpdate }: LocationDetailsProps) {
  const [content, setContent] = useState(location.details);
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSave = () => {
    setIsEditing(false);
    onUpdate(location.id, { ...location, details: content });
    console.log('location', location);
    console.log('content', content);
  };

  const handleCancel = () => {
    setContent(location.details);
    setIsEditing(false);
  };

  const handleClick = () => {
    if (!isEditing) {
      setIsEditing(true);
    }
  };

  const hasChanges = content !== location.details;

  return (
    <section className="w-full mx-3">
      {isEditing ? (
        <div className="space-y-2 h-full flex flex-col">
          <Textarea
            ref={textareaRef}
            value={content}
            onChange={handleContentChange}
            placeholder="Write your markdown content here..."
            className="font-mono w-full resize-none flex-1"
            autoFocus
          />
          <div className="flex gap-2 justify-end">
            <Button variant="outline" size="sm" onClick={handleCancel}>
              <X className="h-4 w-4 mr-1" /> Cancel
            </Button>
            <Button size="sm" onClick={handleSave} disabled={!hasChanges}>
              <Save className="h-4 w-4 mr-1" /> Save
            </Button>
          </div>
        </div>
      ) : (
        <div
          onClick={handleClick}
          className="border rounded-md p-4 h-full prose prose-invert max-w-none cursor-text"
        >
          {content ? (
            <ReactMarkdown>{content}</ReactMarkdown>
          ) : (
            <p className="text-muted-foreground">Click to add description...</p>
          )}
        </div>
      )}
      {hasChanges && !isEditing && (
        <Button onClick={() => setIsEditing(true)}>Continue Editing</Button>
      )}
    </section>
  );
}
