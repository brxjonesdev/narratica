export type Relationship = {
  id: string;
  name: string;
  description?: string;
};

export type RelationshipType =
  | 'allies'
  | 'enemies'
  | 'family'
  | 'mentors'
  | 'mentees'
  | 'rivals'
  | 'loveInterests'
  | 'friends';

export const relationshipLabels: Record<RelationshipType, string> = {
  allies: 'Allies',
  enemies: 'Enemies',
  family: 'Family',
  mentors: 'Mentors',
  mentees: 'Mentees',
  rivals: 'Rivals',
  loveInterests: 'Love Interests',
  friends: 'Friends',
};
