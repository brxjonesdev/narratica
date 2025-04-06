import { nanoid } from 'nanoid';

export type NarrativeLocation = {
  id: string;
  name: string;
  subname: string;
  narrative: string;
  description: string;
  details: string;
  createdAt: string;
  updatedAt?: string;
};

export function createNewLocation(narrativeID: string): NarrativeLocation {
  return {
    id: `location-${nanoid(7)}-${nanoid(7)}-${nanoid(7)}`,
    name: 'New Location',
    subname: '',
    narrative: narrativeID,
    description: '',
    details: '',
    createdAt: new Date().toISOString(),
  };
}
