// "use client"

import {
  createNewAct,
  createNewChapter,
  createNewScene,
  type Outline,
  type Act,
  Scene,
  Chapter,
} from "@/features//outline/types/Outline"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import type { Character } from "@/features/characters/types/Character"
import type { NarrativeLocation } from "@/features/locations/types/Location"
import { addActToOutline } from "../services/addActToOutline"
import toast from "react-hot-toast"
import editActInOutline from "../services/editAct"
import deleteActFromOutline from "../services/deleteActFromOutline"
import addChapterToAct from "../services/addChapterToAct"
import editChapterInOutline from "../services/editChapter"
import deleteChapterFromAct from "../services/deleteChapterFromAct"
import addSceneToChapter from "../services/addSceneToChapter"
import editSceneInChapter from "../services/editScene"
import deleteSceneFromChapter from "../services/deleteSceneFromChapter"
import addCharacterToScene from "../services/addCharacterToScene"
import removeCharacterFromScene from "../services/removeCharacterFromScene"
import addLocationToScene from "../services/addLocationToScene"
import removeLocationFromScene from "../services/removeLocationFromScene"
import { fetchNarrativePlot } from "../services/fetchNarrativePlot"

export type ManuscriptActions = {
  story: Outline
  loading: boolean
  error: string | null
  acts: {
    add: (index: number) => Promise<void>
    edit: (actID: string, editedAct: Partial<Act>, original: Act) => Promise<void>
    delete: (actID: string) => Promise<void>
  }
  chapters: {
    add: (index: number, actID: string) => Promise<void>
    edit: (chapterID: string, editedChapter: Partial<Chapter>) => Promise<void>
    delete: (chapterID: string, scenes: string[]) => Promise<void>
  }
  scenes: {
    add: (index: number, chapterID: string) => Promise<void>
    edit: (sceneID: string, editedScene: Partial<Scene>) => Promise<void>
    delete: (sceneID: string) => Promise<void>
    characters: {
      add: (sceneID: string, character: Partial<Character>) => Promise<void>
      remove: ( sceneID:string, characterID: string) => Promise<void>
    }
    locations: {
      add: (sceneID: string, location: Partial<NarrativeLocation>) => Promise<void>
      remove: (sceneID:string,  locationID: string) => Promise<void>
    }
  }
}

export function useManuscript() {
  const [story, setStory] = useState<Outline | null>(null); // Initialize as null
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { id } = useParams()

  useEffect(() => {
    const fetchStory = async (narrativeID: string) => {
      setLoading(true)
      const response = await fetchNarrativePlot(narrativeID);
      if (!response.ok) {
        setError('Failed to fetch story. Please try again later.');
      setLoading(false)

        return;
      }
      setStory(response.data as Outline)
      setLoading(false)
    }
    fetchStory(id as string)
  }, [id])

  // Act-related functions
  const addAct = async (index: number) => {
    console.log("Adding act", story);
  
    if (!story) return; // Prevent adding if story is null
  
    const newAct = createNewAct(`New Act`, index);
  
    // adding new act to the local state
    setStory((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        acts: prev.acts ? [...prev.acts, newAct] : [newAct]
      };
    });
    const result = await addActToOutline(id as string, newAct)
    if (!result.ok) {
      setError(result.error as string)
      setStory((prev) => {
        if (!prev) return null
        return {
          ...prev,
          acts: prev.acts.filter((act) => act.id !== newAct.id),
        }
      }
      )
      return
    }
    toast.success("Act added successfully")
    return

  }
  const editAct = async (actID: string, editedAct: Partial<Act>, original: Act) => {
    setStory((prev) => {
      if (!prev) return null
      const updatedActs = prev.acts.map((act) => {
        if (act.id === actID) {
          return { ...act, ...editedAct }
        }
        return act
      })
      return {
        ...prev,
        acts: updatedActs,
      }
    })
    const result = await editActInOutline(id as string, actID, editedAct)
    if (!result.ok) {
      setError(result.error as string)
      setStory((prev) => {
        if (!prev) return null
        return {
          ...prev,
          acts: prev.acts.map((act) => {
            if (act.id === actID) {
              return original
            }
            return act
          }),
        }
      })
      return
    }
    toast.success("Act updated successfully")
  }
  const deleteAct = async (actID: string) => {
    const deletedAct = story?.acts.find((act) => act.id === actID)
    setStory((prev) => {
      if (!prev) return null
      return {
        ...prev,
        acts: prev.acts.filter((act) => act.id !== deletedAct?.id),
      }
    })
    const result = await deleteActFromOutline(id as string, actID, deletedAct?.chapters.map((chapter) => chapter.id) || [],
      deletedAct?.chapters.flatMap((chapter) => chapter.scenes.map((scene) => scene.id)) || [])
    if (!result.ok) {
      setError(result.error as string)
      setStory((prev) => {
        if (!prev) return null
        return {
          ...prev,
          acts: [...prev.acts, deletedAct as Act],
        }
      })
      return
    }
    toast.success("Act deleted successfully")
    return
  }

  // Chapter-related functions
  const addChapter = async (index: number, actID: string) => {
    const newChapter = createNewChapter(`New Chapter`, index, actID)
    setStory((prev) => {
      if (!prev) return null
      const updatedActs = prev.acts.map((act) => {
        if (act.id === actID) {
          return {
            ...act,
            chapters: [...act.chapters, newChapter],
          }
        }
        return act
      })
      return {
        ...prev,
        acts: updatedActs,
      }
    })
   const result = await addChapterToAct(id as string, actID, newChapter)
    if (!result.ok) {
      setError(result.error as string)
      setStory((prev) => {
        if (!prev) return null
        const updatedActs = prev.acts.map((act) => {
          if (act.id === actID) {
            return {
              ...act,
              chapters: act.chapters.filter((chapter) => chapter.id !== newChapter.id),
            }
          }
          return act
        })
        return {
          ...prev,
          acts: updatedActs,
        }
      })
      return
    }
    toast.success("Chapter added successfully")
    return
  }
  const editChapter = async (chapterID: string, editedChapter: Partial<Chapter>, orginal: Chapter) => {
    setStory((prev) => {
      if (!prev) return null
      const updatedActs = prev.acts.map((act) => {
        return {
          ...act,
          chapters: act.chapters.map((chapter) => {
            if (chapter.id === chapterID) {
              return { ...chapter, ...editedChapter }
            }
            return chapter
          }),
        }
      })
      return {
        ...prev,
        acts: updatedActs,
      }
    })
    const result = await editChapterInOutline(id as string, chapterID, editedChapter)
    if (!result.ok) {
      setError(result.error as string)
      setStory((prev) => {
        if (!prev) return null
        const updatedActs = prev.acts.map((act) => {
          return {
            ...act,
            chapters: act.chapters.map((chapter) => {
              if (chapter.id === chapterID) {
                return orginal
              }
              return chapter
            }),
          }
        })
        return {
          ...prev,
          acts: updatedActs,
        }
      })
      return
    }
    toast.success("Chapter updated successfully")
    return
  }
  const deleteChapter = async (chapterID: string, scenes: string[]) => {
    const deletedChapter = story?.acts
      .flatMap((act) => act.chapters)
      .find((chapter) => chapter.id === chapterID)
    setStory((prev) => {
      if (!prev) return null
      const updatedActs = prev.acts.map((act) => {
        return {
          ...act,
          chapters: act.chapters.filter((chapter) => chapter.id !== deletedChapter?.id),
        }
      })
      return {
        ...prev,
        acts: updatedActs,
      }
    })
    const result = await deleteChapterFromAct(id as string, chapterID, scenes)
    if (!result.ok) {
      setError(result.error as string)
      setStory((prev) => {
        if (!prev) return null
        const updatedActs = prev.acts.map((act) => {
          return {
            ...act,
            chapters: [...act.chapters, deletedChapter as Chapter],
          }
        })
        return {
          ...prev,
          acts: updatedActs,
        }
      })
      return
    }
    toast.success("Chapter deleted successfully")
    return
    
  }

  // Scene-related functions
  const addScene = async (index: number, chapterID: string) => {
    const newScene = createNewScene(`New Scene`, index, chapterID)
    setStory((prev) => {
      if (!prev) return null
      const updatedChapters = prev.acts.map((act) => {
        return {
          ...act,
          chapters: act.chapters.map((chapter) => {
            if (chapter.id === chapterID) {
              return {
                ...chapter,
                scenes: [...chapter.scenes, newScene],
              }
            }
            return chapter
          }),
        }
      })
      return {
        ...prev,
        acts: updatedChapters,
      }
    })
    const result = await addSceneToChapter(id as string, chapterID, newScene)
    if (!result.ok) {
      setError(result.error as string)
      setStory((prev) => {
        if (!prev) return null
        const updatedChapters = prev.acts.map((act) => {
          return {
            ...act,
            chapters: act.chapters.map((chapter) => {
              if (chapter.id === chapterID) {
                return {
                  ...chapter,
                  scenes: chapter.scenes.filter((scene) => scene.id !== newScene.id),
                }
              }
              return chapter
            }),
          }
        })
        return {
          ...prev,
          acts: updatedChapters,
        }
      })
      return
    }
    toast.success("Scene added successfully")
    return
  }
  const editScene = async (sceneID: string, editedScene: Partial<Scene>, orginal: Scene) => {
    setStory((prev) => {
      if (!prev) return null
      const updatedActs = prev.acts.map((act) => {
        return {
          ...act,
          chapters: act.chapters.map((chapter) => {
            return {
              ...chapter,
              scenes: chapter.scenes.map((scene) => {
                if (scene.id === sceneID) {
                  return { ...scene, ...editedScene }
                }
                return scene
              }),
            }
          }),
        }
      })
      return {
        ...prev,
        acts: updatedActs,
      }
    })
    const result = await editSceneInChapter(id as string, sceneID, editedScene)
    if (!result.ok) {
      setError(result.error as string)
      setStory((prev) => {
        if (!prev) return null
        const updatedActs = prev.acts.map((act) => {
          return {
            ...act,
            chapters: act.chapters.map((chapter) => {
              return {
                ...chapter,
                scenes: chapter.scenes.map((scene) => {
                  if (scene.id === sceneID) {
                    return orginal
                  }
                  return scene
                }),
              }
            }),
          }
        })
        return {
          ...prev,
          acts: updatedActs,
        }
      })
      return
    }
    
  }
  const deleteScene = async (sceneID: string) => {
    const deletedScene =  
      story?.acts.flatMap((act) => act.chapters)
      .flatMap((chapter) => chapter.scenes)
      .find((scene) => scene.id === sceneID)
 
    setStory((prev) => {
      if (!prev) return null
      const updatedActs = prev.acts.map((act) => {
        return {
          ...act,
          chapters: act.chapters.map((chapter) => {
            return {
              ...chapter,
              scenes: chapter.scenes.filter((scene) => scene.id !== deletedScene?.id),
            }
          }),
        }
      })
      return {
        ...prev,
        acts: updatedActs,
      }
    })

    const result = await deleteSceneFromChapter(id as string, sceneID)
    if (!result.ok) {
      setError(result.error as string)
      setStory((prev) => {
        if (!prev) return null
        const updatedActs = prev.acts.map((act) => {
          return {
            ...act,
            chapters: act.chapters.map((chapter) => {
              return {
                ...chapter,
                scenes: [...chapter.scenes, deletedScene as Scene],
              }
            }),
          }
        })
        return {
          ...prev,
          acts: updatedActs,
        }
      })
      return
    }
    toast.success("Scene deleted successfully")
    return
  }

  // Character management within scenes
  const addCharacter = async (sceneID: string, character: Partial<Character>) => {
    setStory((prev) => {
      if (!prev) return null
      const updatedActs = prev.acts.map((act) => {
        return {
          ...act,
          chapters: act.chapters.map((chapter) => {
            return {
              ...chapter,
              scenes: chapter.scenes.map((scene) => {
                if (scene.id === sceneID) {
                  return {
                    ...scene,
                    characters: [...scene.characters, character as Character],
                  }
                }
                return scene
              }),
            }
          }),
        }
      })
      return {
        ...prev,
        acts: updatedActs,
      }
    })
    const result = await addCharacterToScene(id as string, sceneID, character)
    if (!result.ok) {
      setError(result.error as string)
      setStory((prev) => {
        if (!prev) return null
        const updatedActs = prev.acts.map((act) => {
          return {
            ...act,
            chapters: act.chapters.map((chapter) => {
              return {
                ...chapter,
                scenes: chapter.scenes.map((scene) => {
                  if (scene.id === sceneID) {
                    return {
                      ...scene,
                      characters: scene.characters.filter((char) => char.id !== character?.id),
                    }
                  }
                  return scene
                }),
              }
            }),
          }
        })
        return {
          ...prev,
          acts: updatedActs,
        }
      })
      return
    }
    toast.success("Character added successfully")
    return
  }
  const removeCharacter= async (sceneID: string, characterID: string) => {
    const deletedCharacter = story?.acts
      .flatMap((act) => act.chapters)
      .flatMap((chapter) => chapter.scenes)
      .flatMap((scene) => scene.characters)
      .find((character) => character.id === characterID)

    setStory((prev) => {
      if (!prev) return null
      const updatedActs = prev.acts.map((act) => {
        return {
          ...act,
          chapters: act.chapters.map((chapter) => {
            return {
              ...chapter,
              scenes: chapter.scenes.map((scene) => {
                return {
                  ...scene,
                  characters: scene.characters.filter((char) => char.id !== characterID),
                }
              }),
            }
          }),
        }
      })
      return {
        ...prev,
        acts: updatedActs,
      }
    })
    const result = await removeCharacterFromScene(sceneID, characterID)
    if (!result.ok) {
      setError(result.error as string)
      setStory((prev) => {
        if (!prev) return null
        const updatedActs = prev.acts.map((act) => {
          return {
            ...act,
            chapters: act.chapters.map((chapter) => {
              return {
                ...chapter,
                scenes: chapter.scenes.map((scene) => {
                  return {
                    ...scene,
                    characters: [...scene.characters, deletedCharacter as Character],
                  }
                }),
              }
            }),
          }
        })
        return {
          ...prev,
          acts: updatedActs,
        }
      })
      return
    }
    toast.success("Character removed successfully")
    return  
  }

  // Location management within scenes
  const addLocation = async (sceneID: string, location: Partial<NarrativeLocation>) => {
    setStory((prev) => {
      if (!prev) return null
      const updatedActs = prev.acts.map((act) => {
        return {
          ...act,
          chapters: act.chapters.map((chapter) => {
            return {
              ...chapter,
              scenes: chapter.scenes.map((scene) => {
                if (scene.id === sceneID) {
                  return {
                    ...scene,
                    locations: [...scene.locations, location as NarrativeLocation],
                  }
                }
                return scene
              }),
            }
          }),
        }
      })
      return {
        ...prev,
        acts: updatedActs,
      }
    })
    const result = await addLocationToScene(id as string, sceneID, location)
    if (!result.ok) {
      setError(result.error as string)
      setStory((prev) => {
        if (!prev) return null
        const updatedActs = prev.acts.map((act) => {
          return {
            ...act,
            chapters: act.chapters.map((chapter) => {
              return {
                ...chapter,
                scenes: chapter.scenes.map((scene) => {
                  if (scene.id === sceneID) {
                    return {
                      ...scene,
                      locations: scene.locations.filter((loc) => loc.id !== location?.id),
                    }
                  }
                  return scene
                }),
              }
            }),
          }
        })
        return {
          ...prev,
          acts: updatedActs,
        }
      })
      return
    }
    toast.success("Location added successfully")
    return
  }
  const removeLocation = async (sceneID: string, locationID: string) => {
    const deletedLocation = story?.acts
      .flatMap((act) => act.chapters)
      .flatMap((chapter) => chapter.scenes)
      .flatMap((scene) => scene.locations)
      .find((location) => location.id === locationID)
    setStory((prev) => {
      if (!prev) return null
      const updatedActs = prev.acts.map((act) => {
        return {
          ...act,
          chapters: act.chapters.map((chapter) => {
            return {
              ...chapter,
              scenes: chapter.scenes.map((scene) => {
                return {
                  ...scene,
                  locations: scene.locations.filter((loc) => loc.id !== locationID),
                }
              }),
            }
          }),
        }
      })
      return {
        ...prev,
        acts: updatedActs,
      }
    })
    const result = await removeLocationFromScene(sceneID, locationID)
    if (!result.ok) {
      setError(result.error as string)
      setStory((prev) => {
        if (!prev) return null
        const updatedActs = prev.acts.map((act) => {
          return {
            ...act,
            chapters: act.chapters.map((chapter) => {
              return {
                ...chapter,
                scenes: chapter.scenes.map((scene) => {
                  return {
                    ...scene,
                    locations: [...scene.locations, deletedLocation as NarrativeLocation],
                  }
                }),
              }
            }),
          }
        })
        return {
          ...prev,
          acts: updatedActs,
        }
      })
      return
    }
    toast.success("Location removed successfully")
    return

  }

  return {
    story,
    loading,
    error,
    acts: { add: addAct, edit: editAct, delete: deleteAct },
    chapters: { add: addChapter, edit: editChapter, delete: deleteChapter },
    scenes: {
      add: addScene,
      edit: editScene,
      delete: deleteScene,
      characters: { add: addCharacter, remove: removeCharacter},
      locations: { add: addLocation, remove: removeLocation},
    },
  } as ManuscriptActions
}
