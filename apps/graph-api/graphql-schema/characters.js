const characters = `
type Character @node {
  id: ID!
  narrative: ID! # Story this character belongs to

  # Basic Details
  name: String!
  subname: String
  alias: [String]
  description: String
  backstory: String
  appearance: String
  personality: String
  role: String # Protagonist, Antagonist, Side Character, etc.

  # Physical Attributes
  age: Int
  height: String
  weight: String
  eyeColor: String
  hairColor: String
  skinColor: String
  bodyType: String

  # Psychological Attributes
  strengths: [String]
  weaknesses: [String]
  fears: [String]
  motivations: [String]
  goals: [String]

  # Status
  isAlive: Boolean
  isActiveInStory: Boolean
  alignment: String # Good, Neutral, Evil, etc.
  archetype: String # Hero, Mentor, Shadow, etc.

  # Meta Data
  createdAt: DateTime
  updatedAt: DateTime

  # Relationships
  allies: [CharacterWithDesc!]! @relationship(type: "ALLIED_WITH", direction: OUT)
  enemies: [CharacterWithDesc!]! @relationship(type: "ENEMY_OF", direction: OUT)
  mentors: [CharacterWithDesc!]! @relationship(type: "MENTORED_BY", direction: OUT)
  mentees: [CharacterWithDesc!]! @relationship(type: "MENTORS", direction: OUT)
  loveInterests: [CharacterWithDesc!]! @relationship(type: "LOVE_INTEREST", direction: OUT)
  family: [CharacterWithDesc!]! @relationship(type: "FAMILY", direction: OUT)
  friends: [CharacterWithDesc!]! @relationship(type: "FRIENDS_WITH", direction: OUT)
  rivals: [CharacterWithDesc!]! @relationship(type: "RIVAL", direction: OUT)
}

# New type to hold the relationship description
type CharacterWithDesc {
  character: Character!
  description: String!
}

`;

export default characters;
