const characters = `
type Character @node {
  id: ID!
  narrative: ID! # Story this character belongs to

  # Basic Details
  name: String!
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
 
  allies: [Character!]! @relationship(type: "ALLIED_WITH", direction: OUT)
  enemies: [Character!]! @relationship(type: "ENEMY_OF", direction: OUT)
  mentors: [Character!]! @relationship(type: "MENTORED_BY", direction: OUT)
  mentees: [Character!]! @relationship(type: "MENTORS", direction: OUT)
  loveInterests: [Character!]! @relationship(type: "LOVE_INTEREST", direction: OUT)
  family: [Character!]! @relationship(type: "FAMILY", direction: OUT)
  friends: [Character!]! @relationship(type: "FRIENDS_WITH", direction: OUT)
  rivals: [Character!]! @relationship(type: "RIVAL", direction: OUT)

}
`;

export default characters;
