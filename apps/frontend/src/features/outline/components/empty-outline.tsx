import React from 'react'

export default function EmptyOutline({addInitialAct}: {addInitialAct: (index: number) => void}) {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Your outline is empty</h2>
      <p className="mb-4">Start by adding an act to your outline.</p>
      <button onClick={
        () => addInitialAct(0)
      } className="bg-blue-500 text-white px-4 py-2 rounded">Add Act</button>
    </section>
  )
}
