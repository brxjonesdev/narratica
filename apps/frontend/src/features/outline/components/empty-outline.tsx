import React from 'react'
import { Button } from '@/shared/ui/button';

export default function EmptyOutline({addInitialAct}: {addInitialAct: (index: number) => void}) {
  return (
    <section className="flex flex-1 flex-col px-6 py-4 rounded-xl font-figtree items-center justify-center text-center ">
      <h2 className="text-3xl font-bold ">Your outline is empty</h2>
      <p className="text-muted-foreground">Start by adding an act to your outline.</p>
      <Button onClick={
        () => addInitialAct(0)
      } className="px-4 py-2 rounded w-[250px] mt-6">
        Start New Outline</Button>
    </section>
  )
}
