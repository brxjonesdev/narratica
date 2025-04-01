import { nanoid } from 'nanoid';
import toast from 'react-hot-toast';
export type Narrative = {
  userID: string;
  narrativeID: string;
  name: string;
  tagline: string;
  blurb: string;
  createdAt: string;
  updatedAt: string;
};

export function createNewNarrative(userID: string, data: Partial<Narrative>): Narrative {
  if (!data.name) {
    toast.error('Name is required');
  }

  const currentDate = new Date().toISOString();
  return {
    userID,
    narrativeID: `narrative_${nanoid(1)}-${nanoid(7)}-${nanoid(7)}-0-${nanoid(1)}-${nanoid(3)}`,
    name: data.name || '',
    tagline: data.tagline || '',
    blurb: data.blurb || '',
    createdAt: currentDate,
    updatedAt: currentDate,
  };
}
