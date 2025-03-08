
export type GetUserNarrativesProps = {
  userID: string;
  tagline: string;
  name: string;
  blurb: string;
};
export const GET_USER_NARRATIVES =`
query Narratives($where: NarrativeWhere) {
  narratives(where: $where) {
    userID
    updatedAt
    tagline
    narrativeID
    name
    createdAt
    blurb
  }
}
  `;

// Create a new narrative
export type CreateNarrativeProps = {
  userID: string;
  narrativeID: string;
  name: string;
  tagline: string;
  blurb: string;
  createdAt: string;
  updatedAt: string;
};
export const CREATE_NARRATIVE = `
mutation CreateNarratives($input: [NarrativeCreateInput!]!) {
  createNarratives(input: $input) {
    narratives {
      userID
      tagline
      blurb
      name
    }
  }
}
`;

export const FETCH_NARRATIVE_DETAILS = `
query Narratives($where: NarrativeWhere) {
  narratives(where: $where) {
    name
    tagline
    blurb
    updatedAt
  }
}`;

export const UPDATE_NARRATIVE = `
mutation UpdateNarrative($where: NarrativeWhere!, $update: NarrativeUpdateInput!) {
  updateNarratives(where: $where, update: $update) {
    narratives {
      name
      tagline
      blurb
      updatedAt
    }
  }
}
`;
