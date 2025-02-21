// schema.js
export const typeDefs = `

type Narrative @node {
  userID: String!  # Unique identifier for the user
  name: String!    # The name of the narrative
  author: String!  # The author of the narrative
  tagline: String  # Optional tagline for the narrative
  blurb: String    # Optional blurb (short description)
}

`;