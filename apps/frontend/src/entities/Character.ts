export type Character = {
  id: string;
  narrative: string;

  // Basic Details
  name: string;
  alias?: string[];
  description?: string;
  backstory?: string;
  appearance?: string;
  personality?: string;
  role: 'Protagonist' | 'Antagonist' | 'Supporting' | 'Minor';

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
};
