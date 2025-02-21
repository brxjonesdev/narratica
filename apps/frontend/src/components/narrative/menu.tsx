'use client';
import React from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useRouter } from 'next/navigation';

export default function Menu() {
  const router = useRouter();
  const OPTIONS = [
    { label: 'Home', value: 'home' },
    { label: 'Outline', value: 'outline' },
    { label: 'Draft', value: 'draft' },
    { label: 'Review', value: 'review' },
  ];

  const handleChange = (value: string) => {
    if (value === 'home') return router.push(`/narrative/1`);
    router.push(`/narrative/1/${value}`);
  };
  return (
    <ToggleGroup type="single" defaultValue="home">
      {OPTIONS.map((option) => (
        <ToggleGroupItem
          key={option.value}
          value={option.value}
          onClick={() => handleChange(option.value)}
          className="tracking-widest font-bold"
        >
          {option.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
