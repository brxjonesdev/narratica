import { Tag } from "@/entities/Tag";

export const addTag = (tags: Tag[], tag: Tag): Tag[] => {
  return tags.some((t) => t.id === tag.id) ? tags : [...tags, tag];
};


export const removeTag = (tags: Tag[], tagId: string): Tag[] => {
  return tags.filter((tag) => tag.id !== tagId);
};
