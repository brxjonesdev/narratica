const narratives = `
type Narrative @node {
  userID: String!  # Unique identifier for the user
  narrativeID: ID!  # Unique identifier for the narrative
  name: String!    # The name of the narrative
  tagline: String  # Optional tagline for the narrative
  blurb: String    # Optional blurb (short description)
  createdAt: DateTime!  # Timestamp of when the narrative was created
  updatedAt: DateTime!  # Timestamp of when the narrative was last updated
}



`;

export default narratives;