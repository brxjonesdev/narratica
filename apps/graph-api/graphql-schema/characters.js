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
    family: [Character!]! @relationship(type: "FAMILY", direction: OUT)
    friends: [Character!]! @relationship(type: "FRIEND", direction: OUT)
    loves: [Character!]! @relationship(type: "LOVES", direction: OUT)
    mentorOf: [Character!]! @relationship(type: "MENTOR_OF", direction: OUT)
    enemyOf: [Character!]! @relationship(type: "ENEMY_OF", direction: OUT)
    rivals: [Character!]! @relationship(type: "RIVAL", direction: OUT)
    colleagues: [Character!]! @relationship(type: "COLLEAGUE", direction: OUT)
    allies: [Character!]! @relationship(type: "ALLY", direction: OUT)
}

    type CharacterRelation @relationshipProperties {
      status: String # Status of relationship e.g. "Best friends", "Enemies"
      since: DateTime # Start of the relationship
      until: DateTime # End of the relationship (can be null for ongoing)
      events: [String] # Events that impacted the relationship
      intensity: Int # Intensity of the relationship from 1-10 (e.g., "deep friendship", "distant enemies")
    }
`;

export default characters;
