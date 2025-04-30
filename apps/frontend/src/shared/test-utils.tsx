// test-utils.tsx
import { NarrativeStoreProvider } from '@/shared/stores/narrative-store-provider';
import React from 'react';

export const wrapper = ({ children }: { children: React.ReactNode }) => (
  <NarrativeStoreProvider>{children}</NarrativeStoreProvider>
);
