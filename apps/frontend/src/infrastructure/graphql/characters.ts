export const GET_USER_CHARACTERS = `
query Characters($where: CharacterWhere) {
  characters(where: $where) {
    id
    narrative
    name
    alias
    description
    backstory
    appearance
    personality
    role
    age
    height
    weight
    eyeColor
    hairColor
    skinColor
    bodyType
    strengths
    weaknesses
    fears
    motivations
    goals
    isAlive
    isActiveInStory
    alignment
    createdAt
    updatedAt
  }
}`;
