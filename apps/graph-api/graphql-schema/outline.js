const outline = `
type Outline @node{
  id: ID! 
  narrativeID: String!
  acts: [Act!]! @relationship(type: "HAS_ACT", direction: OUT)
}

type Act @node{
  id: ID! 
  title: String!
  order: Int!
  chapters: [Chapter!]! @relationship(type: "HAS_CHAPTER", direction: OUT)
}

type Chapter @node{
  id: ID! 
  title: String!
  order: Int!
  scenes: [Scene!]! @relationship(type: "HAS_SCENE", direction: OUT)
}

type Scene @node{
  id: ID! 
  title: String!
  order: Int!
  summary: String!
  content: String!
  characters: [Character!]! @relationship(type: "INCLUDES_CHARACTER", direction: OUT)
  locations: [Location!]! @relationship(type: "HAS_LOCATION", direction: OUT)
}


`
export default outline;