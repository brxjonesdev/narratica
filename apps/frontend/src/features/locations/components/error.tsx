import React from 'react';

export default function LocationsError({ error }: { error: string }) {
  return (
    <section className="p-4">
      <h4>There was an error getting your locations</h4>
      <p>{error}</p>
    </section>
  );
}
