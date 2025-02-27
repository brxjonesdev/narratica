// Fetch Entries for a narrative
export const GET_ENTRIES = `
query Query($narrativeID: ID!) {
  characters(where: { narrativeID_EQ: $narrativeID }) {
    id
    name
    description
    role
  }
  locations(where: { narrativeID_EQ: $narrativeID }) {
    id
    name
    description
    type
    tags
    
  }
  items(where: { narrativeID_EQ: $narrativeID }) {
    id
    name
    description
    type
    tags
  }
  subplots(where: { narrativeID_EQ: $narrativeID }) {
    id
    name
    description
    status
  }
  lores(where: { narrativeID_EQ: $narrativeID }) {
    id
    title
    content
  }
  factions(where: { narrativeID_EQ: $narrativeID }) {
    id
    name
    description
    type
    locatedIn {
      name
    }
  }
  species(where: { narrativeID_EQ: $narrativeID }) {
    id
    name
    description
  }
}

`;
export type Character = {
  id: string;
  name: string;
  description: string;
  role: string;
};

export type Location = {
  id: string;
  name: string;
  description: string;
  type: string;
  tags: string[];
};

export type Item = {
  id: string;
  name: string;
  description: string;
  type: string;
  tags: string[];
};

export type Subplot = {
  id: string;
  name: string;
  description: string;
  status: string;
};

export type Lore = {
  id: string;
  title: string;
  content: string;
};

export type Faction = {
  id: string;
  name: string;
  description: string;
  type: string;
  locatedIn?: {
    name: string;
  };
};

export type Species = {
  id: string;
  name: string;
  description: string;
};

export type NarrativeData = {
  characters: Character[];
  locations: Location[];
  items: Item[];
  subplots: Subplot[];
  lores: Lore[];
  factions: Faction[];
  species: Species[];
};
