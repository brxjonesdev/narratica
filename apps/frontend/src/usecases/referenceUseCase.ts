import { nanoid } from "nanoid";

export const fetchReferenceData = async (narrativeID: string | string[] | undefined) => {
  try {
    console.log(narrativeID, "hshs");
    const graphqlResponse = await fetch("http://localhost:3000/api/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query Query($where: CharacterWhere) {
  characters(where: $where) {
    name
    id
    details
  }
}

        `,
        variables: {
          where: { narrativeID_EQ: narrativeID },
        },
      }),
    });

    const { data } =  await graphqlResponse.json();
    console.log(data, "hshs really");
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return { characters: [] };
  }
};

export const createEntity = async (type: string, narrativeID: string | string[] | undefined) => {
  const entityID = nanoid(32);
  const singularType = type.slice(0, -1); // Example: "Characters" → "Character"
  
  try {
    const query = `
      mutation Create${type}($input: [${singularType}CreateInput!]!) {
        create${type}(input: $input) {
          info {
            nodesCreated
          }
          ${type.toLowerCase()} { 
            id
            name
            narrativeID
            details
          }
        }
      }
    `;

    const graphqlResponse = await fetch("/api/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: query,
        variables: {
          input: {
            id: entityID,
            name: `New ${type}`,
            narrativeID,
            details: "",
          },
        },
      }),
    });

    const { data } = await graphqlResponse.json();
    return data;
  } catch (error) {
    console.error(`Error creating ${type}:`, error);
    return null;
  }
};
