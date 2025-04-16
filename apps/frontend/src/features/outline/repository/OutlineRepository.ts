import { err, ok, Result } from "@/shared/types/result";
import { Act, Chapter, createNewOutline, Outline, Scene } from "../types/Outline";
import { Character } from "@/features/characters/types/Character";
import { GraphQLFetcher } from "@/lib/fetcher";
import { NarrativeLocation } from "@/features/locations/types/Location";

interface OutlineRepository {
    getPlot : (narrativeID: string) => Promise<Result<Outline, string>>;
    addNewAct: (narrativeID: string, act: Act) => Promise<Result<{ ok: boolean }, string>>;
    modifyActByID: (actID: string, act: Partial<Act>) => Promise<Result<{ ok: boolean }, string>>;
    deleteActByID: (actID: string, chapters: string[], scenes: string[]) => Promise<Result<{ ok: boolean }, string>>;
    addNewChapter: (narrativeID: string, chapter: Chapter) => Promise<Result<{ ok: boolean }, string>>;
    modifyChapterByID: (chapterID: string, chapter: Partial<Chapter>) => Promise<Result<{ ok: boolean }, string>>;
    deleteChapterByID: (chapterID: string, scenes: string[]) => Promise<Result<{ ok: boolean }, string>>;
    addNewScene: (narrativeID: string, scene: Scene) => Promise<Result<{ ok: boolean }, string>>;
    modifySceneByID: (sceneID: string, scene: Partial<Scene>) => Promise<Result<{ ok: boolean }, string>>;
    deleteSceneByID: (sceneID: string) => Promise<Result<{ ok: boolean }, string>>;
    addCharacterToScene: (sceneID: string, character: Partial<Character>) => Promise<Result<{ ok: boolean }, string>>;
    removeCharacterFromScene: (sceneID: string, characterID: string) => Promise<Result<{ ok: boolean }, string>>;
    addLocationToScene: (sceneID: string, location: Partial<NarrativeLocation>) => Promise<Result<{ ok: boolean }, string>>;
    removeLocationFromScene: (sceneID: string, locationID: string) => Promise<Result<{ ok: boolean }, string>>;
}

export const outlineRepository: OutlineRepository = {

    async getPlot(narrativeID: string) {
        const FETCH_PLOT = `query Outlines($where: OutlineWhere, $limit: Int) {
  outlines(where: $where, limit: $limit) {
    id
    narrativeID
    acts {
      id
      title
      order
      chapters {
        id
        title
        order
        scenes {
          id
          title
          order
          summary
          content
          characters {
            id
            name
            subname
          }
          locations {
            id
            subname
            name
          }
        }
      }
    }
  }
}`
        try{
            const response = await GraphQLFetcher<{ data: { outlines: Outline[]} }>(FETCH_PLOT, { where: {
                narrativeID_EQ: narrativeID,
            },
            limit: 1 });
            console.log(response, "response")
            const plot = response.data?.outlines;
            console.log(plot, "plot");
            return ok(plot[0]);
        } catch (error) {
            return err("Failed to fetch plot" + error);
        }
    },

    async addNewAct(narrativeID: string, act: Act) {
      const CHECK_OUTLINE = `
        query CheckOutline($where: OutlineWhere) {
          outlines(where: $where) {
            id
            narrativeID
          }
        }
      `;
    
      const INIT_OUTLINE = `
         mutation Mutation($input: [OutlineCreateInput!]!) {
  createOutlines(input: $input) {
    info {
      nodesCreated
    }
    outlines {
      id
      narrativeID
      acts {
        id
        outlineID
      }
    }
  }
}
      `;
    
      const CREATE_ACT = `
       mutation Mutation($where: OutlineWhere, $update: OutlineUpdateInput) {
  updateOutlines(where: $where, update: $update) {
    info {
      nodesCreated
    }
  }
}
      `;
    
      try {
        // Log the start of the function and the narrative ID
        console.log('Starting to add a new act for narrativeID:', narrativeID);
    
        // Checking if there is an existing outline for the narrative
        console.log('Checking if outline exists for narrativeID:', narrativeID);
    
        const { data: checkData } = await GraphQLFetcher<{ data: { outlines: Outline[] } }>(
          CHECK_OUTLINE,
          { where: { narrativeID_EQ: narrativeID } }
        );
    
        console.log('Fetched outline data:', checkData);
    
        let outline = checkData.outlines[0];

        console.log('Outline found:', outline);
    
        // If no outline exists, create a new one
        if (!outline || outline === undefined) {
          console.log('No outline found. Creating a new outline...');
          const newOutline = createNewOutline(narrativeID);
          console.log('New outline created:', newOutline);
    
         const response = await GraphQLFetcher<{ data: { createOutlines: { outlines: Outline[] } } }>(
            INIT_OUTLINE,
            { input: [
              {
                id: newOutline.id,
                narrativeID: newOutline.narrativeID,
              }
            ]}
          );
          console.log('Outline creation response:', response);
    
        outline = response.data.createOutlines.outlines[0];
          if (!outline) {
            console.error('Failed to create outline');
            return err("Outline not found");
          }
        }
    
        // Log the outline that was found or created
        console.log('Outline found or created:', outline);
    
        // Add the new act to the outline
        console.log('Adding new act:', act);
    
        const response = await GraphQLFetcher<{ data: { updateOutlines: { info: { nodesCreated: number } } } }>(
          CREATE_ACT,
          {
            where: {
              narrativeID_EQ: narrativeID,
            },
            update: {
              acts: [
                {
                  create: [
                    {
                      node: {
                        id: act.id,
                        title: act.title,
                        order: act.order,
                    
                      }
                    }
                  ]
                }
              ]
            }
          }
        );

        if (!response.data?.updateOutlines) {
          return err("Failed to update outline with new act");
        }
    
        return ok({ok: true});
      } catch (error) {
        console.error('Error while adding new act:', error);
        return err("Failed to fetch plot: " + error);
      }
    } 
    ,
      
    async modifyActByID(actID: string, act: Partial<Act>) {
      console.log("Modifying act with ID:", actID, "with data:", act);
        const UPDATE_ACT = `
  mutation Mutation($where: ActWhere, $update: ActUpdateInput) {
  updateActs(where: $where, update: $update) {
    info {
      nodesCreated
    }
  }
}
        `
     try{
      const response = await GraphQLFetcher<{ data: { updateActs: { info: { nodesCreated: number } } } }>(UPDATE_ACT, {
        where: {
          id_EQ: actID
        },
        update: {    
          title_SET: act?.title,
        }
      });
      if(!response.data?.updateActs) {
        return err("Failed to update act");
      }
      return ok({ok: true});
     }
     catch (error) {
        return err("Failed to update act: " + error);
     }
    },

    async deleteActByID(actID: string, chapters: string[], scenes: string[]) {
        const DELETE_ACT = `mutation Mutation($where: ActWhere, $delete: ActDeleteInput) {
  deleteActs(where: $where, delete: $delete) {
    nodesDeleted
  }
}
`;

try {
  const response = await GraphQLFetcher<{ data: { deleteActs: { nodesDeleted: number } } }>(DELETE_ACT, {
    where: {
      id_EQ: actID
    },
    delete: {
      chapters: [
        {
          where: {
            node: {
              id_IN: chapters
            }
          },
          delete: {
            scenes: [
              {
                where: {
                  node: {
                    id_IN: scenes
                  }
                }
              }
            ]
          }
        }
      ]
    }
  });
  if (!response.data?.deleteActs) {
    return err("Failed to delete act");
  }
  return ok({ ok: true }); 
} catch (error) {
  return err("Failed to delete act: " + error);
}
    },

    async addNewChapter(actID: string, chapter: Chapter) {
        const CREATE_CHAPTER = `
        mutation addChapter($where: ActWhere, $update: ActUpdateInput) {
  updateActs(where: $where, update: $update) {
    info {
      nodesCreated
    }
  }
}
        `

    const response = await GraphQLFetcher<{ data: { updateActs: { info: { nodesCreated: number } } } }>(CREATE_CHAPTER, {
        where: {
          id_EQ: actID
        },
        update: {
          chapters: [
            {
              create: [
                {
                  node: {
                    id: chapter.id,
                    title: chapter.title,
                    order: chapter.order,
                  }
                }
              ]
            }
          ]
        }
    });

    if (!response.data?.updateActs) {
        return err("Failed to create chapter");
    }
    return ok({ok: true})
  },

    async modifyChapterByID(chapterID: string, chapter: Partial<Chapter>) {
        const UPDATE_CHAPTER = `
        mutation UpdateChapters($where: ChapterWhere, $update: ChapterUpdateInput) {
  updateChapters(where: $where, update: $update) {
    info {
      nodesCreated
    }
  }
}`

try{
const response = await GraphQLFetcher<{
  data: { updateChapters: { info: { nodesCreated: number } } }
}>(UPDATE_CHAPTER, {
    where: {
      id_EQ: chapterID
    },
    update: {
    title_SET: chapter?.title,
  }
  });
  if(!response.data?.updateChapters) {
    return err("Failed to update chapter");
  }

  return ok({ok: true});
}
catch (error) {
  return err("Failed to update chapter: " + error);
}
    },
    async deleteChapterByID(chapterID: string, scenes: string[]) {
      const DELETE_CHAPTER = `mutation DeleteChapters($where: ChapterWhere, $delete: ChapterDeleteInput) {
    deleteChapters(where: $where, delete: $delete) {
    nodesDeleted
    relationshipsDeleted
    }
  }`;

      try {
        const response = await GraphQLFetcher<{
          data: { deleteChapters: { nodesDeleted: number; relationshipsDeleted: number } };
        }>(DELETE_CHAPTER, {
          where: {
            id_EQ: chapterID,
          },
          delete: {
            scenes: [
              {
                where: {
                  node: {
                    id_IN: scenes,
                  },
                },
              },
            ],
          },
        });

        if (!response.data?.deleteChapters) {
          return err("Failed to delete chapter");
        }

        return ok({ ok: true });
      } catch (error) {
        return err("Failed to delete chapter: " + error);
      }
    },

    async addNewScene(chapterID: string, scene: Scene) {
        const CREATE_SCENE = `
        mutation UpdateChapters($where: ChapterWhere, $update: ChapterUpdateInput) {
  updateChapters(where: $where, update: $update) {
    info {
      nodesCreated
    }
  }
}`
console.log("Adding new scene to chapter with ID:", chapterID, "with data:", scene);

const response = await GraphQLFetcher<{ data: { updateChapters: { info: { nodesCreated: number } } } }>(CREATE_SCENE, {
  where: {
    id_EQ: chapterID
  },
  update: {
    scenes: [
      {
        create: [
          {
            node: {
              id: scene.id,
              title: scene.title,
              order: scene.order,
              summary: scene?.summary || "",
              content: scene?.content || "",
            }
          }
        ]
      }
    ]
  }
});

console.log(response, "response from addNewScene");

if(!response.data?.updateChapters) {
    return err("Failed to create scene");
}
return ok({ok: true})
    },

    async modifySceneByID(sceneID: string, scene: Partial<Scene>) {
      const UPDATE_SCENE = `mutation Mutation($where: SceneWhere, $update: SceneUpdateInput) {
        updateScenes(where: $where, update: $update) {
          info {
            nodesCreated
          }
        }
      }`;
    
      // Build update object dynamically
      const update: Record<string, unknown> = {};
      if (scene.title !== undefined) update.title_SET = scene.title;
      if (scene.summary !== undefined) update.summary_SET = scene.summary;
      if (scene.content !== undefined) update.content_SET = scene.content;
    
      if (Object.keys(update).length === 0) {
        return err("No valid fields to update");
      }
    
      try {
        const response = await GraphQLFetcher<{ data: { updateScenes: { info: { nodesCreated: number } } } }>(
          UPDATE_SCENE,
          {
            where: { id_EQ: sceneID },
            update,
          }
        );
    
        if (!response.data?.updateScenes) {
          return err("Failed to update scene");
        }
    
        return ok({ ok: true });
      } catch (error) {
        return err("Failed to update scene: " + error);
      }
    },
    

    async deleteSceneByID(sceneID: string) {
        const DELETE_SCENE = `mutation DeleteScenes($where: SceneWhere) {
  deleteScenes(where: $where) {
    nodesDeleted
  }
}`

try{
  const response = await GraphQLFetcher<{ data: { deleteScenes: { nodesDeleted: number } } }>(DELETE_SCENE, {
    where: {
      id_EQ: sceneID
    }
  });

  if (!response.data?.deleteScenes) {
    return err("Failed to delete scene");
  }

  return ok({ ok: true });
} catch (error) {
  return err("Failed to delete scene: " + error);
}
    },

    async addCharacterToScene(sceneID: string, character: Partial<Character>) {
        const ADD_CHARACTER_TO_SCENE = `
        mutation Mutation($where: SceneWhere, $update: SceneUpdateInput) {
  updateScenes(where: $where, update: $update) {
    info {
      relationshipsCreated
    }
  }
}`

try {
  const response = await GraphQLFetcher<{ data: { updateScenes: { info: { relationshipsCreated: number } } } }>(ADD_CHARACTER_TO_SCENE, {
    where: {
      id_EQ: sceneID
    },
    update: {
      characters: [
        {
          connect: [
            {
              where: {
                node: {
                  id_EQ: character.id
                }
              }
            }
          ]
        }
      ]
    }
  });

  if (!response.data?.updateScenes) {
    return err("Failed to add character to scene");
  }
  return ok({ ok: true });
}
catch (error) {
  return err("Failed to add character to scene: " + error);
}
    },

    async removeCharacterFromScene(sceneID: string, characterID: string) {
        const REMOVE_CHARACTER_FROM_SCENE = `mutation UpdateScenes($where: SceneWhere, $update: SceneUpdateInput) {
  updateScenes(where: $where, update: $update) {
    info {
      relationshipsDeleted
    }
  }
}`

      try {
        const response = await GraphQLFetcher<{ data: { updateScenes: { info: { relationshipsDeleted: number } } } }>(REMOVE_CHARACTER_FROM_SCENE, {
            where: {
                id_EQ: sceneID
            },
            update: {
                characters: [
                    {
                        disconnect: [
                            {
                                where: {
                                    node: {
                                        id_EQ: characterID
                                    }
                                }
                            }
                        ]
                    }
                ]
            }
        });

        if (!response.data?.updateScenes) {
            return err("Failed to remove character from scene");
        }
        return ok({ ok: true });
      }
      catch (error) {
        return err("Failed to remove character from scene: " + error);
      }
    
    },

    async addLocationToScene(sceneID: string, location: Partial<NarrativeLocation>) {
        const ADD_LOCATION_TO_SCENE = `mutation UpdateScenes($where: SceneWhere, $update: SceneUpdateInput) {
  updateScenes(where: $where, update: $update) {
    info {
      relationshipsCreated
    }
  }
}`;

        try {
            const response = await GraphQLFetcher<{ data: { updateScenes: { info: { relationshipsCreated: number } } } }>(
                ADD_LOCATION_TO_SCENE,
                {
                    where: {
                        id_EQ: sceneID,
                    },
                    update: {
                        locations: [
                            {
                                connect: [
                                    {
                                        where: {
                                            node: {
                                                id_EQ: location.id,
                                            },
                                        },
                                    },
                                ],
                            },
                        ],
                    },
                }
            );
            console.log(response, "response from addLocationToScene");
            if (!response.data?.updateScenes) {
                return err("Failed to add location to scene");
            }
            return ok({ ok: true });
        } catch (error) {
            return err("Failed to add location to scene: " + error);
        }
    },

    async removeLocationFromScene(sceneID: string, locationID: string) {
        const REMOVE_LOCATION_FROM_SCENE = `mutation UpdateScenes($where: SceneWhere, $update: SceneUpdateInput) {
  updateScenes(where: $where, update: $update) {
    info {
      relationshipsDeleted
    }
  }
}`;

        try {
            const response = await GraphQLFetcher<{ data: { updateScenes: { info: { relationshipsDeleted: number } } } }>(
                REMOVE_LOCATION_FROM_SCENE,
                {
                    where: {
                        id_EQ: sceneID,
                    },
                    update: {
                        locations: [
                            {
                                disconnect: [
                                    {
                                        where: {
                                            node: {
                                                id_EQ: locationID,
                                            },
                                        },
                                    },
                                ],
                            },
                        ],
                    },
                }
            );

            if (!response.data?.updateScenes) {
                return err("Failed to remove location from scene");
            }
            return ok({ ok: true });
        } catch (error: unknown) {
            return err("Failed to remove location from scene: " + error);
        }
    },


}