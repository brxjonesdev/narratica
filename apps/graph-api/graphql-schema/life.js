const life = `
type Character @node {
    id: ID!
    narrative: ID!
    name: String!
    description: String
    details: String
}


type Faction @node {
    id: ID!
    narrative: ID!
    name: String!
    description: String
    details: String
}

type Item @node {
    id: ID!
    narrative: ID!
    name: String!
    description: String
    details: String
}

type Subplot @node {
    id: ID!
    narrative: ID!
    title: String!
    description: String
    details: String
}

type Location @node {
    id: ID!
    narrative: ID!
    name: String!
    description: String
    details: String
}

`
export default life;