import { useState } from 'react';

const useGraphQLRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = async (query, variables = {}) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables }),
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const { data } = await response.json();
      return data;
    } catch (err) {
      console.error('GraphQL request error:', err);
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { sendRequest, loading, error };
};

export default useGraphQLRequest;
