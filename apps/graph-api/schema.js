export const typeDefs = `
type Narrative @node {
  userID: String!  # Unique identifier for the user
  narrativeID: ID!  # Unique identifier for the narrative
  name: String!    # The name of the narrative
  tagline: String  # Optional tagline for the narrative
  blurb: String    # Optional blurb (short description)
  createdAt: DateTime!  # Timestamp of when the narrative was created
  updatedAt: DateTime!  # Timestamp of when the narrative was last updated
}

type Character @node {
  narrativeID: ID!  # Link to the narrative this character belongs to
  id: ID!  # Unique identifier for the character
  name: String!  # Name of the character
  description: String  # Optional description of the character
  role: String  # Optional role of the character (e.g., protagonist, antagonist)
  backstory: String  # Optional backstory of the character

  friends: [Character!]! @relationship(type: "FRIEND_OF", direction: OUT)  # A character's friends
  enemies: [Character!]! @relationship(type: "ENEMY_OF", direction: OUT)  # A character's enemies
  romanticInterests: [Character!]! @relationship(type: "ROMANTIC_INTEREST_OF", direction: OUT)  # A character's romantic interests
  family: [Character!]! @relationship(type: "FAMILY_OF", direction: OUT)  # Family connections (siblings, parents, etc.)

  mentor: [Character!]! @relationship(type: "MENTORS", direction: OUT)  # A character's mentors
  mentees: [Character!]! @relationship(type: "MENTORED_BY", direction: IN)  # A character's mentees

  partOfFaction: [Faction!]! @relationship(type: "MEMBER_OF", direction: OUT)  # A character who is part of a faction/group
  involvedInSubplot: [Subplot!]! @relationship(type: "PART_OF_SUBPLOT", direction: OUT)  # A character involved in a subplot
  partOfLore: [Lore!]! @relationship(type: "PART_OF_LORE", direction: OUT)  # A character who is part of the lore

  residesIn: [Location!]! @relationship(type: "RESIDES_IN", direction: OUT)  # Location where the character lives
  travelsTo: [Location!]! @relationship(type: "TRAVELS_TO", direction: OUT)  # Locations the character travels to
}

type Location @node {
  narrativeID: ID!  # Link to the narrative this location belongs to
  id: ID!  # Unique identifier for the location
  name: String!  # Name of the location
  description: String  # Optional description of the location
  type: String  # Type of location (e.g., city, forest, castle)
  tags: [String!]  # Tags associated with the location (e.g., magical, historical)

  partOfFaction: [Faction!]! @relationship(type: "LOCATED_IN", direction: OUT)  # Factions that are located in this place
  involvedInSubplot: [Subplot!]! @relationship(type: "PART_OF_SUBPLOT", direction: OUT)  # Subplots that take place in this location
}

type Item @node {
  narrativeID: ID!  # Link to the narrative this item belongs to
  id: ID!  # Unique identifier for the item
  name: String!  # Name of the item
  description: String  # Optional description of the item
  type: String  # Type of item (e.g., weapon, artifact, tool)
  tags: [String!]  # Tags associated with the item (e.g., magical, historical)

  ownedBy: [Character!]! @relationship(type: "OWNED_BY", direction: OUT)  # Characters who own this item
}

type Subplot @node {
  narrativeID: ID!  # Link to the narrative this subplot belongs to
  id: ID!  # Unique identifier for the subplot
  name: String!  # Name of the subplot
  description: String  # Optional description of the subplot
  status: String  # Status of the subplot (e.g., ongoing, completed)

  involvesCharacters: [Character!]! @relationship(type: "INVOLVES_CHARACTER", direction: OUT)  # Characters involved in this subplot
  takesPlaceInLocation: [Location!]! @relationship(type: "TAKES_PLACE_IN", direction: OUT)  # Locations where this subplot takes place
}

type Lore @node {
  narrativeID: ID!  # Link to the narrative this lore belongs to
  id: ID!  # Unique identifier for the lore
  title: String!  # Title of the lore
  content: String  # Content of the lore (e.g., history, mythology)

  relatedToCharacters: [Character!]! @relationship(type: "RELATED_TO_CHARACTER", direction: OUT)  # Characters related to this lore
  relatedToLocations: [Location!]! @relationship(type: "RELATED_TO_LOCATION", direction: OUT)  # Locations related to this lore
  relatedToItems: [Item!]! @relationship(type: "RELATED_TO_ITEM", direction: OUT)  # Items related to this lore
}

type Faction @node {
  narrativeID: ID!  # Link to the narrative this faction belongs to
  id: ID!  # Unique identifier for the faction
  name: String!  # Name of the faction
  description: String  # Optional description of the faction
  type: String  # Type of faction (e.g., guild, government, rebel group)

  members: [Character!]! @relationship(type: "MEMBER_OF", direction: OUT)  # Characters who are members of this faction
  locatedIn: [Location!]! @relationship(type: "LOCATED_IN", direction: OUT)  # Locations where this faction operates
}

type Species @node {
  narrativeID: ID!  # Link to the narrative this species belongs to
  id: ID!  # Unique identifier for the species
  name: String!  # Name of the species
  description: String  # Optional description of the species

  characters: [Character!]! @relationship(type: "BELONGS_TO", direction: OUT)  # Characters belonging to this species
}
`