// Type definitions for entities

export interface EntityTag {
  id: string;
  name: string;
  type?: 'status' | 'category' | 'attribute';
}

export interface EntityRelationship {
  id: string;
  name: string;
  type: string;
  description: string;
  strength: number;
}

export interface EntityMention {
  id: string;
  context: string;
  chapter: string;
  scene?: string;
  importance: number;
}

export interface EntityResearch {
  id: string;
  title: string;
  content: string;
  source?: string;
  date: string;
}

export interface Entity {
  id: string;
  name: string;
  type: 'character' | 'item' | 'location' | 'subplot' | 'concept';
  description: string;
  image?: string;
  tags: EntityTag[];
  details: Record<string, any>;
  research: EntityResearch[];
  relationships: EntityRelationship[];
  mentions: EntityMention[];
  createdAt: string;
  updatedAt: string;
  status: 'draft' | 'review' | 'final';
}

// Default placeholder if no entity is provided
export const defaultEntity: Entity = {
  id: 'placeholder',
  name: 'New Entity',
  type: 'character',
  description: 'Start building your world by adding details to this entity.',
  tags: [
    { id: '1', name: 'New', type: 'status' },
    { id: '2', name: 'Draft', type: 'status' },
  ],
  details: {
    age: 'Unknown',
    occupation: 'Undefined',
    traits: ['Mysterious'],
    background: 'Yet to be written...',
  },
  research: [],
  relationships: [],
  mentions: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  status: 'draft',
};
