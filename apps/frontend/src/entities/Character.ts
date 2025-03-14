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
  role?: 
    | 'protagonist'
    | 'antagonist'
    | 'supporting'
    | 'minor'
    | 'deuteragonist'
    | 'tritagonist'
    | 'mentor'
    | 'foil'
    | 'comic relief'
    | 'contagonist'
    | 'love interest'
    | 'rival'
    | 'sidekick'
    | 'herald'
    | 'guardian'
    | 'shapeshifter'
    | 'shadow'
    | 'ally'
    | 'bystander'
    | 'narrator'; // Expanded role options

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
  alignment?:
    | 'lawful-good'
    | 'neutral-good'
    | 'chaotic-good'
    | 'lawful-neutral'
    | 'true-neutral'
    | 'chaotic-neutral'
    | 'lawful-evil'
    | 'neutral-evil'
    | 'chaotic-evil'; // Expanded alignment options
  archtype?: string;

  // Meta Data
  createdAt: string;
  updatedAt: string;
  new?: boolean;
  // Relationships
  allies?: Relationship[];
  enemies?: Relationship[];
  family?: Relationship[];
  mentors?: Relationship[];
  mentees?: Relationship[];
  rivals?: Relationship[];
  loveInterests?: Relationship[];
  friends?: Relationship[];

};

export type Relationship = {
  id: string;
  name : string;
  description?: string;
  
};
