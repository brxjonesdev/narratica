// Fetch Entries for a narrative
export const GET_ENTRIES = `
query Query($where: CharacterWhere) {
  characters(where: $where) {
    name
    id
    details
  }
}
`;
