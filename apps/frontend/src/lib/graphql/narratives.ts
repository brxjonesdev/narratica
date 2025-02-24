// Fetch narratives for a user
export type GetUserNarrativesProps = {
    userID: string;
    tagline: string;
    name: string;
    blurb: string;
}
export const GET_USER_NARRATIVES = `
query Narratives($where: NarrativeWhere) {
    narratives(where: $where) {
      userID
      tagline
      name
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
}
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
`
