'use client';
import { ToggleGroup, ToggleGroupItem } from '@/presentation/components/ui/toggle-group';
import { useRouter, usePathname } from 'next/navigation';
import { useParams } from 'next/navigation';

export default function Menu() {
  const router = useRouter();
  const pathname = usePathname();
  const { id } = useParams();

  const OPTIONS = [
    { label: 'Outline', value: 'outline' },
    { label: 'Draft', value: 'draft' },
    { label: 'Review', value: 'review' },
  ];

  // Determine the current view from the pathname
  const getCurrentView = () => {
    // Check if the path ends with the ID (meaning we're on the outline page)
    if (pathname.endsWith(`/narrative/${id}`)) {
      return 'outline';
    }

    // Otherwise, extract the last segment of the path
    const segments = pathname.split('/');
    const lastSegment = segments[segments.length - 1];

    // Verify it's one of our valid options
    return OPTIONS.some((option) => option.value === lastSegment) ? lastSegment : 'outline'; // Default to outline if not found
  };

  const handleChange = (value: string) => {
    if (value === 'outline') return router.push(`/narrative/${id}`);
    router.push(`/narrative/${id}/${value}`);
  };

  return (
    <>
      <ToggleGroup type="single" value={getCurrentView()}>
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
