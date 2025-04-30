import { renderHook, act } from '@testing-library/react-hooks';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useManuscript } from '../hooks/useManuscript';
import * as fetchService from '../services/fetchNarrativePlot';
import * as addActService from '../services/addActToOutline';
import { useNarrativeStore } from '@/shared/stores/narrative-store-provider';

// Mock Next.js useParams
vi.mock('next/navigation', () => ({
  useParams: () => ({ id: 'test-narrative-id' }),
}));

// Mock toast
vi.mock('react-hot-toast', () => ({
  default: {
    success: vi.fn(),
  },
  success: vi.fn(),
}));

// Mock narrative store
vi.mock('@/shared/stores/narrative-store-provider', () => ({
  useNarrativeStore: vi.fn(),
}));

// Mock services
vi.mock('../services/fetchNarrativePlot');
vi.mock('../services/addActToOutline');

describe('useManuscript hook', () => {
  const mockOutline = {
    id: null,
    narrativeID: 'test-narrative-id',
    acts: [],
  };

  beforeEach(() => {
    vi.clearAllMocks();

    // Mock store return
    useNarrativeStore.mockReturnValue({
      characters: [],
      locations: [],
    });

    // Mock fetch
    fetchNarrativePlot.mockResolvedValue({
      ok: true,
      data: mockOutline,
    });

    // Default mock for addActToOutline
    addActToOutline.mockResolvedValue({ ok: true });
  });

  it('should initialize with loading and fetch story', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useManuscript());
    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.story?.narrativeID).toBe('test-narrative-id');
  });

  it('should add a new act', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useManuscript());
    await waitForNextUpdate();

    await act(async () => {
      await result.current.acts.add(0);
    });

    expect(result.current.story?.acts.length).toBe(1);
    expect(addActService.addActToOutline).toHaveBeenCalled();
  });

  it('should handle act addition failure gracefully', async () => {
    addActToOutline.mockResolvedValue({ ok: false, error: 'Add failed' });

    const { result, waitForNextUpdate } = renderHook(() => useManuscript());
    await waitForNextUpdate();

    await act(async () => {
      await result.current.acts.add(0);
    });

    expect(result.current.error).toBe('Add failed');
    expect(result.current.story?.acts.length).toBe(0);
  });

  // Additional tests can be done for:
  // - editAct
  // - deleteAct
  // - addChapter
  // - editScene / character / location

});
