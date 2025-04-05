import React from 'react'

export default function CharacterError({ error }: { error: string }) {
  return (
    <section className="flex flex-col items-center justify-center h-full bg-white/5 m-4 rounded-lg">
        <h2 className="text-xl font-semibold text-red-600">Something went wrong...</h2>
        <p className="text-gray-700">{error}</p>
    </section>
  )
}
