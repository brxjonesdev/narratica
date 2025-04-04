import { Character } from '@/entities/Character';
import { GET_USER_CHARACTERS } from '@/infrastructure/graphql/characters';
import { GraphQLFetcher } from '@/lib/fetcher';

export const characters: Character[] = [
  {
    id: 'mark-scout',
    narrative: '57832327-c949-4968-af7d-45e737fhdjdjd874j4',
    name: 'Mark Scout',
    subname: 'A man divided between two lives.',
    alias: ['Mark'],
    description:
      'A mild-mannered Lumon Industries employee struggling with the loss of his wife and the mysteries of severance.',
    backstory:
      'Mark underwent the severance procedure to escape the grief of losing his wife. However, his two selves—Innies and Outies—begin to question the true nature of Lumon.',
    appearance: 'Short brown hair, light beard, wears Lumon standard attire.',
    personality: 'Quiet, introspective, skeptical, and empathetic.',
    role: 'protagonist',
    age: 40,
    height: '5\'10"',
    weight: '170 lbs',
    eyeColor: 'Brown',
    hairColor: 'Brown',
    skinColor: 'Fair',
    bodyType: 'Average build',
    strengths: ['Leadership', 'Loyalty', 'Critical thinking'],
    weaknesses: ['Guilt', 'Curiosity', 'Self-doubt'],
    fears: ['Being trapped', 'Losing control', 'Losing loved ones'],
    motivations: ["Uncovering Lumon's secrets", 'Reuniting with his wife'],
    goals: ['Escape Lumon', 'Expose the severance program'],
    isAlive: true,
    alignment: 'true-neutral',
    archtype: 'Reluctant Hero',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    new: false,
    allies: [{ id: 'helly-r', name: 'Helly R.', description: 'Fellow Lumon employee and rebel' }],
    enemies: [
      {
        id: 'harmony-cobel',
        name: 'Harmony Cobel',
        description: "Mark's overbearing boss at Lumon",
      },
    ],
    family: [{ id: 'devon-scout', name: 'Devon Scout', description: "Mark's supportive sister" }],
    mentors: [],
    mentees: [],
    rivals: [],
    loveInterests: [],
    friends: [
      { id: 'irving-b', name: 'Irving B.', description: 'Fellow severed employee at Lumon' },
    ],
  },
  {
    id: 'helly-r',
    narrative: '57832327-c949-4968-af7d-45e737fhdjdjd874j4',
    name: 'Helly Riggs',
    subname: 'Fighting for a life she doesn’t remember.',
    alias: [],
    description:
      'A new Lumon employee with a rebellious streak, determined to break free from the severance program.',
    backstory:
      "Helly's Outie is a willing participant in Lumon's experiments, but her Innie desperately wants to escape, leading to a battle between her two selves.",
    appearance: 'Red hair, sharp features, confident posture.',
    personality: 'Strong-willed, defiant, intelligent, impatient.',
    role: 'deuteragonist',
    age: 30,
    height: '5\'6"',
    weight: '135 lbs',
    eyeColor: 'Green',
    hairColor: 'Red',
    skinColor: 'Fair',
    bodyType: 'Slim',
    strengths: ['Determination', 'Charisma', 'Courage'],
    weaknesses: ['Impulsiveness', 'Trust issues', 'Recklessness'],
    fears: ['Losing her identity', 'Being trapped forever'],
    motivations: ['Escape Lumon', 'Find out the truth about herself'],
    goals: ['Sabotage the severance program', 'Expose the truth'],
    isAlive: true,
    alignment: 'chaotic-good',
    archtype: 'Rebel',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    new: false,
    allies: [
      { id: 'mark-scout', name: 'Mark Scout', description: "Helly's fellow severed employee" },
    ],
    enemies: [
      { id: 'harmony-cobel', name: 'Harmony Cobel', description: "Helly's overbearing supervisor" },
    ],
    family: [],
    mentors: [],
    mentees: [],
    rivals: [],
    loveInterests: [],
    friends: [],
  },
  {
    id: 'irving-b',
    narrative: '57832327-c949-4968-af7d-45e737fhdjdjd874j4',
    name: 'Irving B.',
    subname: 'The loyal follower of Lumon’s truths.',
    alias: [],
    description:
      'A senior employee at Lumon, dedicated to the company’s cause, though he begins to doubt its methods and his own memories.',
    backstory:
      'Irving is a deeply loyal employee who undergoes severance with a sense of purpose. However, as he uncovers more about Lumon, his faith begins to waver.',
    appearance: 'Short, balding, wears Lumon uniform with an air of discipline.',
    personality: 'Paternal, methodical, duty-driven.',
    role: 'supporting',
    age: 50,
    height: '5\'8"',
    weight: '180 lbs',
    eyeColor: 'Blue',
    hairColor: 'Brown',
    skinColor: 'Fair',
    bodyType: 'Stocky',
    strengths: ['Dedication', 'Wisdom', 'Leadership'],
    weaknesses: ['Stubbornness', 'Tendency to follow orders', 'Fear of rebellion'],
    fears: ['Failure', 'Disobedience', 'Dissension'],
    motivations: ['Maintain order', 'Help his colleagues', "Understand Lumon's secrets"],
    goals: ['Help Mark and Helly uncover the truth', 'Preserve the integrity of his team'],
    isAlive: true,
    alignment: 'lawful-good',
    archtype: 'Loyal Soldier',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    new: false,
    allies: [
      { id: 'mark-scout', name: 'Mark Scout', description: "Irving's fellow severed employee" },
    ],
    enemies: [
      { id: 'harmony-cobel', name: 'Harmony Cobel', description: "Irving's overbearing boss" },
    ],
    family: [],
    mentors: [],
    mentees: [],
    rivals: [],
    loveInterests: [],
    friends: [
      { id: 'mark-scout', name: 'Mark Scout', description: "Irving's fellow severed employee" },
    ],
  },
  {
    id: 'dylan',
    narrative: '57832327-c949-4968-af7d-45e737fhdjdjd874j4',
    name: 'Dylan',
    subname: 'The steadfast custodian of the severed world.',
    alias: [],
    description:
      'A no-nonsense employee at Lumon Industries who works in the accounting department and struggles with the ethics of the severance procedure.',
    backstory:
      'Dylan is a devoted employee who values the perks of Lumon’s severance program, but begins questioning the morality of the company’s methods as the truth unfolds.',
    appearance: 'Dark hair, glasses, neatly dressed in a corporate uniform.',
    personality: 'Pragmatic, analytical, loyal.',
    role: 'supporting',
    age: 33,
    height: '5\'9"',
    weight: '170 lbs',
    eyeColor: 'Brown',
    hairColor: 'Dark brown',
    skinColor: 'Fair',
    bodyType: 'Medium build',
    strengths: ['Analytical thinking', 'Loyalty', 'Pragmatism'],
    weaknesses: ['Avoidance of conflict', 'Rigid thinking', 'Fear of change'],
    fears: ['Losing his job', 'Revelations that challenge his beliefs'],
    motivations: ['Staying loyal to the company', 'Protecting his role at Lumon'],
    goals: ['Maintain order in his department', 'Ensure the stability of his career'],
    isAlive: true,
    alignment: 'lawful-neutral',
    archtype: 'Steady Worker',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    new: false,
    allies: [{ id: 'mark-scout', name: 'Mark Scout', description: "Dylan's colleague at Lumon" }],
    enemies: [
      {
        id: 'harmony-cobel',
        name: 'Harmony Cobel',
        description: "Dylan's overbearing superior at Lumon",
      },
    ],
    family: [],
    mentors: [],
    mentees: [],
    rivals: [],
    loveInterests: [],
    friends: [],
  },
  {
    id: 'harmony-cobel',
    narrative: '57832327-c949-4968-af7d-45e737fhdjdjd874j4',
    name: 'Harmony Cobel',
    subname: 'The controlling overseer of severed lives.',
    alias: [],
    description:
      'The head of the Wellness Committee at Lumon Industries, overseeing the severed employees with a strict and authoritarian approach.',
    backstory:
      'Harmony is dedicated to keeping the severance program running smoothly and will do anything to maintain control and order within the company.',
    appearance: 'Blonde hair, tall, immaculate and intimidating.',
    personality: 'Strict, authoritarian, disciplined, controlling.',
    role: 'antagonist',
    age: 45,
    height: '5\'9"',
    weight: '150 lbs',
    eyeColor: 'Blue',
    hairColor: 'Blonde',
    skinColor: 'Fair',
    bodyType: 'Lean',
    strengths: ['Organization', 'Control', 'Persistence'],
    weaknesses: ['Ruthlessness', 'Inflexibility', 'Lack of empathy'],
    fears: ['Loss of control', 'Failure of the program'],
    motivations: ['Maintaining order at Lumon', 'Enforcing company policy'],
    goals: ['Keep the severance program a secret', 'Prevent any rebellion within Lumon'],
    isAlive: true,
    alignment: 'lawful-evil',
    archtype: 'Authoritarian',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    new: false,
    allies: [
      { id: 'harmony-cobel', name: 'Harmony Cobel', description: 'Overseer of severed employees' },
    ],
    enemies: [
      {
        id: 'mark-scout',
        name: 'Mark Scout',
        description: "Harmony's target in her efforts to maintain control",
      },
    ],
    family: [],
    mentors: [],
    mentees: [],
    rivals: [],
    loveInterests: [],
    friends: [],
  },
];

export async function fetchUserCharacters(narrativeID: string) {
  // try {
  //   const response: { data: { characters: Character[] } } = await GraphQLFetcher(
  //     GET_USER_CHARACTERS,
  //     {
  //       where: {
  //         narrative_EQ: narrativeID,
  //       },
  //     }
  //   );
  //   return response.data.characters;
  // } catch (error) {
  //   console.error('Error fetching user characters:', error);
  //   throw error;
  // }

  return characters;
}
