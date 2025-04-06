const locations = `
    type Location @node {
        id: ID!
        name: String!
        subname: String
        narrative: ID! # Story this location belongs to
        description: String
        details: String
        createdAt: DateTime
        updatedAt: DateTime
    }
`;

export default locations;
