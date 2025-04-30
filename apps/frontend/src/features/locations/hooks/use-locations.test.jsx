import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor, act } from '@testing-library/react';
import { fetchNarrativeLocations } from '../services/fetchNarrativeLocations';
import { addLocationToNarrative } from '../services/addLocationToNarrative';
import { deleteNarrativeLocation } from '../services/deleteLocation';
import { modifyNarrativeLocation } from '../services/modifyNarrativeLocation';
import { useNarrativeStore } from '@/shared/stores/narrative-store-provider';
import { useParams } from 'next/navigation';
import {wrapper} from '@/shared/test-utils';
import { useLocations } from './use-locations';
import { createNewLocation } from '../types/Location';


vi.mock('react-hot-toast', () => ({
    default: {
      error: vi.fn(),
    },
  }));
  

vi.mock('next/navigation', () => ({
  useParams: vi.fn(() => ({ id: 'narrative-1' })),
}));

vi.mock('@/features/locations/services/fetchNarrativeLocations', () => ({
    fetchNarrativeLocations: vi.fn()
}));

vi.mock('@/features/locations/types/Location', () => ({
    createNewLocation: vi.fn()
}));

vi.mock('@/features/locations/services/addLocationToNarrative', () => ({
    addLocationToNarrative: vi.fn()
}));

vi.mock('@/features/locations/services/deleteLocation', () => ({
    deleteNarrativeLocation: vi.fn()
}));

vi.mock('@/features/locations/services/modifyNarrativeLocation', () => ({
    modifyNarrativeLocation: vi.fn()
}));

describe('useLocations', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    })

    describe("fetching locations", () => {
        it("should handle a successful fetch", async () => {
            fetchNarrativeLocations.mockResolvedValue({
                ok: true,
                data: [
                    {
                        id: 'location-1',
                        name: 'Location 1',
                        subname: 'Subname 1',
                        description: 'Description 1',
                        narrative: 'narrative-1',
                        details: 'Details 1',
                        createdAt: '2023-01-01T00:00:00Z',
                        updatedAt: '2023-01-01T00:00:00Z',
                    }
                ]
            })
            const { result } = renderHook(() => useLocations(), { wrapper });
            expect(result.current.loading).toBe(true);
            await waitFor(()=> {
                expect(result.current.loading).toBe(false);
                expect(result.current.locations).toEqual([
                    {
                        id: 'location-1',
                        name: 'Location 1',
                        subname: 'Subname 1',
                        description: 'Description 1',
                        narrative: 'narrative-1',
                        details: 'Details 1',
                        createdAt: '2023-01-01T00:00:00Z',
                        updatedAt: '2023-01-01T00:00:00Z',
                    }
                ])
            })

        })

        it("should handle a failed fetch", async () => {
            fetchNarrativeLocations.mockResolvedValue({
                ok: false,
                error: 'Error fetching locations'
            })
            const { result } = renderHook(() => useLocations(), { wrapper });
            expect(result.current.loading).toBe(true);
            await waitFor(()=> {
                expect(result.current.loading).toBe(false);
                expect(result.current.locations).toEqual([])
                expect(result.current.error).toEqual('Error fetching locations')
            })
        })
    })

    describe("adding locations", () => {
        it('should add a location successfully', async () => {
            fetchNarrativeLocations.mockResolvedValue({
                ok: true,
                data: [
                    {
                        id: 'location-1',
                        name: 'Location 1',
                        subname: 'Subname 1',
                        description: 'Description 1',
                        narrative: 'narrative-1',
                        details: 'Details 1',
                        createdAt: '2023-01-01T00:00:00Z',
                        updatedAt: '2023-01-01T00:00:00Z',
                    }
                ]
            })
            const newLocation = {
                        id: 'location-2',
                        name: 'Location 2',
                        subname: 'Subname 2',
                        description: 'Description 1',
                        narrative: 'narrative-1',
                        details: 'Details 1',
                        createdAt: '2023-01-01T00:00:00Z',
                        updatedAt: '2023-01-01T00:00:00Z',

            }
            createNewLocation.mockReturnValue(newLocation)
            addLocationToNarrative.mockResolvedValue({
                ok: true,
            })

            const { result } = renderHook(() => useLocations(), { wrapper });
            expect(result.current.loading).toBe(true);
            expect(result.current.locations).toEqual([])
            expect(result.current.error).toBeNull()

            await waitFor(()=> {
                expect(result.current.loading).toBe(false);
                expect(result.current.locations).toEqual([
                    {
                        id: 'location-1',
                        name: 'Location 1',
                        subname: 'Subname 1',
                        description: 'Description 1',
                        narrative: 'narrative-1',
                        details: 'Details 1',
                        createdAt: '2023-01-01T00:00:00Z',
                        updatedAt: '2023-01-01T00:00:00Z',
                    },
                ])
            })

            act(()=> {
                result.current.addLocation(newLocation)
            })

            await waitFor(()=> {
                expect(result.current.locations).toEqual([
                    {
                        id: 'location-1',
                        name: 'Location 1',
                        subname: 'Subname 1',
                        description: 'Description 1',
                        narrative: 'narrative-1',
                        details: 'Details 1',
                        createdAt: '2023-01-01T00:00:00Z',
                        updatedAt: '2023-01-01T00:00:00Z',
                    },
                    newLocation,
                ])
            })
            
        })
        it('should handle an error when adding a location', async () => {
            fetchNarrativeLocations.mockResolvedValue({
                ok: true,
                data: [
                    {
                        id: 'location-1',
                        name: 'Location 1',
                        subname: 'Subname 1',
                        description: 'Description 1',
                        narrative: 'narrative-1',
                        details: 'Details 1',
                        createdAt: '2023-01-01T00:00:00Z',
                        updatedAt: '2023-01-01T00:00:00Z',
                    }
                ]
            })
            const newLocation = {
                id: 'location-2',
                name: 'Location 2',
                subname: 'Subname 2',
                description: 'Description 1',
                narrative: 'narrative-1',
                details: 'Details 1',
                createdAt: '2023-01-01T00:00:00Z',
                updatedAt: '2023-01-01T00:00:00Z',

            }
            createNewLocation.mockReturnValue(newLocation)
            addLocationToNarrative.mockResolvedValue({
                ok: false,
                error: "Error adding location"
            })

            const { result } = renderHook(() => useLocations(), { wrapper });
            expect(result.current.loading).toBe(true);
            expect(result.current.locations).toEqual([])
            expect(result.current.error).toBeNull()

            await waitFor(()=> {
                expect(result.current.loading).toBe(false);
                expect(result.current.locations).toEqual([
                    {
                        id: 'location-1',
                        name: 'Location 1',
                        subname: 'Subname 1',
                        description: 'Description 1',
                        narrative: 'narrative-1',
                        details: 'Details 1',
                        createdAt: '2023-01-01T00:00:00Z',
                        updatedAt: '2023-01-01T00:00:00Z',
                    },
                ])
            })

            act(()=> {
                result.current.addLocation(newLocation)
            })

            await waitFor(()=> {
                expect(result.current.error).toEqual("Error adding location")
            })
        })
    })

    describe("deleting locations", () => {
        it('should delete a location successfully', async () => {
            fetchNarrativeLocations.mockResolvedValue({
                ok: true,
                data: [
                    {
                        id: 'location-1',
                        name: 'Location 1',
                        subname: 'Subname 1',
                        description: 'Description 1',
                        narrative: 'narrative-1',
                        details: 'Details 1',
                        createdAt: '2023-01-01T00:00:00Z',
                        updatedAt: '2023-01-01T00:00:00Z',
                    },
                    {
                        id: 'location-2',
                        name: 'Location 2',
                        subname: 'Subname 2',
                        description: 'Description 2',
                        narrative: 'narrative-1',
                        details: 'Details 2',
                        createdAt: '2023-01-02T00:00:00Z',
                        updatedAt: '2023-01-02T00:00:00Z',
                    }
                ]
            })
            deleteNarrativeLocation.mockResolvedValue({
                ok: true,
            })

            const { result } = renderHook(() => useLocations(), { wrapper });
            expect(result.current.loading).toBe(true);
            expect(result.current.locations).toEqual([])
            expect(result.current.error).toBeNull()

            await waitFor(()=> {
                expect(result.current.loading).toBe(false);
                expect(result.current.locations).toEqual([
                    {
                        id: 'location-1',
                        name: 'Location 1',
                        subname: 'Subname 1',
                        description: 'Description 1',
                        narrative: 'narrative-1',
                        details: 'Details 1',
                        createdAt: '2023-01-01T00:00:00Z',
                        updatedAt: '2023-01-01T00:00:00Z',
                    },
                    {
                        id: 'location-2',
                        name: 'Location 2',
                        subname: 'Subname 2',
                        description: 'Description 2',
                        narrative: 'narrative-1',
                        details: 'Details 2',
                        createdAt: '2023-01-02T00:00:00Z',
                        updatedAt: '2023-01-02T00:00:00Z',
                    }
                ])
            })

            act(()=> {
                result.current.deleteLocation('location-2')
            })

            await waitFor(()=> {
                expect(result.current.locations).toEqual([
                    {
                        id: 'location-1',
                        name: 'Location 1',
                        subname: 'Subname 1',
                        description: 'Description 1',
                        narrative: 'narrative-1',
                        details: 'Details 1',
                        createdAt: '2023-01-01T00:00:00Z',
                        updatedAt: '2023-01-01T00:00:00Z',
                    }
                ])
            })
        })

        it('should handle an error when deleting a location', async () => {
            fetchNarrativeLocations.mockResolvedValue({
            ok: true,
            data: [
                {
                id: 'location-1',
                name: 'Location 1',
                subname: 'Subname 1',
                description: 'Description 1',
                narrative: 'narrative-1',
                details: 'Details 1',
                createdAt: '2023-01-01T00:00:00Z',
                updatedAt: '2023-01-01T00:00:00Z',
                },
                {
                id: 'location-2',
                name: 'Location 2',
                subname: 'Subname 2',
                description: 'Description 2',
                narrative: 'narrative-1',
                details: 'Details 2',
                createdAt: '2023-01-02T00:00:00Z',
                updatedAt: '2023-01-02T00:00:00Z',
                }
            ]
            });
            deleteNarrativeLocation.mockResolvedValue({
            ok: false,
            error: "Error deleting location"
            });

            const { result } = renderHook(() => useLocations(), { wrapper });
            expect(result.current.loading).toBe(true);
            expect(result.current.locations).toEqual([]);
            expect(result.current.error).toBeNull();

            await waitFor(() => {
            expect(result.current.loading).toBe(false);
            expect(result.current.locations).toEqual([
                {
                id: 'location-1',
                name: 'Location 1',
                subname: 'Subname 1',
                description: 'Description 1',
                narrative: 'narrative-1',
                details: 'Details 1',
                createdAt: '2023-01-01T00:00:00Z',
                updatedAt: '2023-01-01T00:00:00Z',
                },
                {
                id: 'location-2',
                name: 'Location 2',
                subname: 'Subname 2',
                description: 'Description 2',
                narrative: 'narrative-1',
                details: 'Details 2',
                createdAt: '2023-01-02T00:00:00Z',
                updatedAt: '2023-01-02T00:00:00Z',
                }
            ]);
            });

            act(() => {
            result.current.deleteLocation('location-2');
            });

            await waitFor(() => {
            expect(result.current.error).toEqual("Error deleting location");
            expect(result.current.locations).toEqual([
                {
                id: 'location-1',
                name: 'Location 1',
                subname: 'Subname 1',
                description: 'Description 1',
                narrative: 'narrative-1',
                details: 'Details 1',
                createdAt: '2023-01-01T00:00:00Z',
                updatedAt: '2023-01-01T00:00:00Z',
                },
                {
                id: 'location-2',
                name: 'Location 2',
                subname: 'Subname 2',
                description: 'Description 2',
                narrative: 'narrative-1',
                details: 'Details 2',
                createdAt: '2023-01-02T00:00:00Z',
                updatedAt: '2023-01-02T00:00:00Z',
                }
            ]);
            });
        });
    })

    describe("modifying locations", () => {
        it("should modify a location successfully", async () => {
            fetchNarrativeLocations.mockResolvedValue({
                ok: true,
                data: [
                    {
                        id: 'location-1',
                        name: 'Location 1',
                        subname: 'Subname 1',
                        description: 'Description 1',
                        narrative: 'narrative-1',
                        details: 'Details 1',
                        createdAt: '2023-01-01T00:00:00Z',
                        updatedAt: '2023-01-01T00:00:00Z',
                    }
                ]
            })
            const modifiedLocation = {
                id: 'location-1',
                name: 'Modified Location 1',
                subname: 'Modified Subname 1',
                description: 'Modified Description 1',
                narrative: 'narrative-1',
                details: 'Modified Details 1',
                createdAt: '2023-01-01T00:00:00Z',
                updatedAt: '2023-01-01T00:00:00Z',
            }
            modifyNarrativeLocation.mockResolvedValue({
                ok: true,
            })

            const { result } = renderHook(() => useLocations(), { wrapper });
            expect(result.current.loading).toBe(true);
            expect(result.current.locations).toEqual([])
            expect(result.current.error).toBeNull()

            await waitFor(()=> {
                expect(result.current.loading).toBe(false);
                expect(result.current.locations).toEqual([
                    {
                        id: 'location-1',
                        name: 'Location 1',
                        subname: 'Subname 1',
                        description: 'Description 1',
                        narrative: 'narrative-1',
                        details: 'Details 1',
                        createdAt: '2023-01-01T00:00:00Z',
                        updatedAt: '2023-01-01T00:00:00Z',
                    }
                ])
            })

            act(()=> {
                result.current.modifyLocation(modifiedLocation)
            })

            await waitFor(()=> {
                expect(result.current.locations).toEqual([
                    modifiedLocation,
                ])
            })
        })

        it("should handle an error when modifying a location", async () => {
            fetchNarrativeLocations.mockResolvedValue({
                ok: true,
                data: [
                    {
                        id: 'location-1',
                        name: 'Location 1',
                        subname: 'Subname 1',
                        description: 'Description 1',
                        narrative: 'narrative-1',
                        details: 'Details 1',
                        createdAt: '2023-01-01T00:00:00Z',
                        updatedAt: '2023-01-01T00:00:00Z',
                    }
                ]
            })
            const modifiedLocation = {
                id: 'location-1',
                name: 'Modified Location 1',
                subname: 'Modified Subname 1',
                description: 'Modified Description 1',
                narrative: 'narrative-1',
                details: 'Modified Details 1',
                createdAt: '2023-01-01T00:00:00Z',
                updatedAt: '2023-01-01T00:00:00Z',
            }
            modifyNarrativeLocation.mockResolvedValue({
                ok: false,
                error: "Error modifying location"
            })

            const { result } = renderHook(() => useLocations(), { wrapper });
            expect(result.current.loading).toBe(true);
            expect(result.current.locations).toEqual([])
            expect(result.current.error).toBeNull()

            await waitFor(()=> {
                expect(result.current.loading).toBe(false);
                expect(result.current.locations).toEqual([
                    {
                        id: 'location-1',
                        name: 'Location 1',
                        subname: 'Subname 1',
                        description: 'Description 1',
                        narrative: 'narrative-1',
                        details: 'Details 1',
                        createdAt: '2023-01-01T00:00:00Z',
                        updatedAt: '2023-01-01T00:00:00Z',
                    }
                ])
            })

            act(()=> {
                result.current.modifyLocation(modifiedLocation)
            })

            await waitFor(()=> {
                expect(result.current.error).toEqual("Error modifying location")
            })
            
        })
    })
})


