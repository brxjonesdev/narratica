export type Character = {
  id: string;
  narrative: string;

  // Basic Details
  name: string;
  subname: string;
  alias?: string[];
  description?: string;
  backstory?: string;
  appearance?: string;
  personality?: string;
  role?: 'Protagonist' | 'Antagonist' | 'Supporting' | 'Minor';

  // Physical Attributes
  age?: number;
  height?: string;
  weight?: string;
  eyeColor?: string;
  hairColor?: string;
  skinColor?: string;
  bodyType?: string;

  // Psychological Attributes
  strengths?: string[];
  weaknesses?: string[];
  fears?: string[];
  motivations?: string[];
  goals?: string[];

  // Status
  isAlive: boolean;
  isActiveInStory: boolean;
  alignment?:
    | 'Chaotic Good'
    | 'Neutral Good'
    | 'Lawful Good'
    | 'Chaotic Neutral'
    | 'True Neutral'
    | 'Lawful Neutral'
    | 'Chaotic Evil'
    | 'Neutral Evil'
    | 'Lawful Evil';
  archtype?: string;

  // Meta Data
  createdAt: string;
  updatedAt: string;
  new?: boolean;
  // Relationships
  relationships?: Relationship[];
};

export type Relationship = {
  type: 'FAMILY' | 'FRIEND' | 'LOVES' | 'MENTOR_OF' | 'ENEMY_OF' | 'RIVAL' | 'COLLEAGUE' | 'ALLY';
  relatedCharacterId: string;
  status: string; // e.g., "Best friends", "Enemies"
  since: string; // Date when the relationship started
  until?: string; // Date when the relationship ended (if applicable)
  events?: string[]; // Events that affected the relationship
  intensity?: number; // Intensity of the relationship from 1-10 (e.g., deep friendship, distant rivalry)
};

