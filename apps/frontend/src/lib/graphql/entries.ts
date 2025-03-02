// Fetch Entries for a narrative
export const GET_ENTRIES = `
query Query($narrativeID: ID!) {
  characters(where: { narrative_EQ: $narrativeID }) {
    id
    name
   details
  }

  locations(where: { narrative_EQ: $narrativeID }) {
    id
    name
    description
    details
  }
  items(where: { narrative_EQ: $narrativeID }) {
    id
    name
    description
    details
    
  }
  subplots(where: { narrative_EQ: $narrativeID }) {
    id
    title
    description
    details
    
  }
  factions(where: { narrative_EQ: $narrativeID }) {
    id
    name
    description
    details
}

}
`;

export type Character = {
  id: string;
  name: string;
  role: string;
  appearance: string;
  personality: string;
  backstory: string;
  goal: string;
  alignment: string;
  factions: { name: string }[];
  species: { name: string }[];
  subplots: { title: string }[];
};

export type Location = {
  id: string;
  name: string;
  description: string;
};

export type Item = {
  id: string;
  name: string;
  description: string;
  owner: { name: string };
  location: { name: string };
};

export type Subplot = {
  id: string;
  title: string;
  description: string;
  charactersInvolved: { name: string }[];
  itemsInvolved: { name: string }[];
};

export type Faction = {
  id: string;
  name: string;
  description: string;
  alignment: string;
  members: { name: string }[];
  allies: { name: string }[];
  enemies: { name: string }[];
};

export type Species = {
  id: string;
  name: string;
  description: string;
  alignment: string;
};

export type NarrativeData = {
  characters: Character[];
  locations: Location[];
  items: Item[];
  subplots: Subplot[];
  factions: Faction[];
  species: Species[];
};
