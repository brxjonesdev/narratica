'use client';
import React from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/presentation/components/ui/toggle-group';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

export default function Menu() {
  const router = useRouter();
  const { id } = useParams();
  const OPTIONS = [
    { label: 'Outline', value: 'outline' },
    { label: 'Draft', value: 'draft' },
    { label: 'Review', value: 'review' },
  ];

  const handleChange = (value: string) => {
    if (value === 'outline') return router.push(`/narrative/${id}`);
    router.push(`/narrative/${id}/${value}`);
  };
  return (
    <>
      <ToggleGroup type="single" defaultValue="outline">
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
    </>
  );
}
