import { Narrative } from '../types/Narrative';
import { narrativeRepository } from '../repository/NarrativeRepository';

export function addNewNarrative(id: string, narrative: Narrative) {
  return narrativeRepository.addNewNarrative(id, narrative);
}
