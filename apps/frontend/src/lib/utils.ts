import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface NarrativeWhere {
  userID: string;
}

interface GraphQLVariables {
  where: NarrativeWhere;
}

interface GraphQLResponse<T> {
  data: T;
  errors?: any[];
}

export async function fetchGraphQLData<T>(
  query: string,
  variables: GraphQLVariables
): Promise<GraphQLResponse<T>> {
  const response = await fetch('https://localhost:4000', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query, // GraphQL query here
      variables, // Variables to pass with the query
    }),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data: GraphQLResponse<T> = await response.json();
  return data;
}
