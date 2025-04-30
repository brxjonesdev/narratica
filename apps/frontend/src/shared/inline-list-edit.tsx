'use client';
import { InlineEdit } from './inline-edit';
import { Button } from '@/shared/ui/button';
import { Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InlineEditableListProps {
  items: string[];
  onChange: (items: string[]) => void;
  className?: string;
  title?: string;
  addButtonText?: string;
  placeholder?: string;
  emptyMessage?: string;
}

export function InlineEditableList({
  items = [],
  onChange,
  className,
  title,
  addButtonText = 'Add item',
  placeholder = 'Click to edit',
  emptyMessage = 'No items yet. Add one below.',
}: InlineEditableListProps) {
  const handleItemChange = (index: number, value: string) => {
    const newItems = [...items];
    newItems[index] = value;
    onChange(newItems);
  };

  const handleAddItem = () => {
    onChange([...items, '']);
  };

  const handleRemoveItem = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    onChange(newItems);
  };

  return (
    <div className={cn('space-y-2', className)}>
      {title && <h3 className="text-md font-bold text-muted-foreground">{title}</h3>}

      <div className="space-y-1">
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground italic">{emptyMessage}</p>
        ) : (
          items.map((item, index) => (
            <div key={index} className="group flex items-center gap-2">
              <div className="flex-1">
                <InlineEdit
                  value={item}
                  onChange={(value) => handleItemChange(index, value)}
                  placeholder={placeholder}
                />
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleRemoveItem(index)}
                aria-label="Remove item"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
          ))
        )}
      </div>

      <Button
        variant="outline"
        size="sm"
        className="mt-2 flex items-center gap-1"
        onClick={handleAddItem}
      >
        <Plus className="h-3.5 w-3.5" />
        <span>{addButtonText}</span>
      </Button>
    </div>
  );
}
